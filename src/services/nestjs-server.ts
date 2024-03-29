import { API_SERVER, API_PATH } from "../constants";
import { request, requestFactory } from "../lib/request";

const requestLegacy = requestFactory(API_SERVER + API_PATH);

type ProductDetails = {
  productIdToCart: string;
  productName: string;
  namePl: string;
  productColor: string;
  productPrice: number;
  description: string;
  descriptionPl: string;
  compCare: string;
  compositionAndCarePl: string;
  availability: string;
  isOneSize: boolean;
  photos: {
    photo1: string | null;
    photo2: string | null;
    photo3: string | null;
    photo4: string | null;
    photo5: string | null;
    photo6: string | null;
    photo7: string | null;
    photo8: string | null;
    photo9: string | null;
  };
};

export async function getListOfAvailableProducts(
): Promise<string[]> {
  const rawResult: unknown = await request(
    API_SERVER + "product/available",
    { options: { json: true } }
  );

  if(rawResult instanceof Array) {
    return rawResult;
  } else {
    throw new Error('Unknown data received when getting available products.');
  }
}

export async function loadProductDetails(
  idName: string
): Promise<ProductDetails> {
  const rawDetails = await requestLegacy({
    query: {
      part: "getproductdata",
      productname: idName
    },
    options: { json: true }
  });

  const { productdetails } = rawDetails;

  return {
    productIdToCart: productdetails.id,
    productName: productdetails.productname,
    namePl: productdetails.namePl,
    productColor: productdetails.productcolor,
    productPrice: productdetails.productprice,
    description: productdetails.desclong,
    descriptionPl: productdetails.descriptionPl,
    compCare: productdetails.compcare,
    compositionAndCarePl: productdetails.compositionAndCarePl,
    availability: productdetails.availability,
    isOneSize: productdetails.is_one_size,
    photos: {
      photo1: productdetails.pic1,
      photo2: productdetails.pic2,
      photo3: productdetails.pic3,
      photo4: productdetails.pic4,
      photo5: productdetails.pic5,
      photo6: productdetails.pic6,
      photo7: productdetails.pic7,
      photo8: productdetails.pic8,
      photo9: productdetails.pic9
    }
  };
}

export async function getAvailability(
  idName: string,
  size: string
): Promise<number | null> {
  const rawResult: any = await request(
    API_SERVER + "cart/more-accurate-availability",
    {
      query: { idName, size },
      options: { json: true }
    }
  );

  const { availability } = rawResult;
  return availability;
}

export async function addProductToCart(
  idName: string,
  size: string
): Promise<void> {
  await request(API_SERVER + "cart", {
    fetchOptions: {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idName, size }),
      method: "POST"
    }
  });
}

type ProductBasicInfo = {
  idName: string;
  price: number;
  pic1: string;
};

export async function getAllProductBasicInfos(): Promise<ProductBasicInfo[]> {
  const rawResults = await request(API_SERVER + "product/basic-infos", {
    options: { json: true }
  });

  return rawResults as ProductBasicInfo[];
}

export type CartContentItem = {
  amount: number;
  id: number;
  idName: string;
  paid: boolean;
  size: string;
};

export type CartContents = Record<string, CartContentItem>;

export async function getCartContent(): Promise<CartContents> {
  const rawResults = await request(API_SERVER + "cart/products-in-cart", {
    options: { json: true }
  });

  const results = rawResults.reduce((memo: any, value: any, i: number) => {
    memo[i] = {
      amount: parseInt(value.amount, 10),
      id: parseInt(value.id, 10),
      idName: value.idName,
      paid: value.paid,
      size: value.size
    } as CartContentItem;

    return memo;
  }, {});

  return results;
}

export async function getInCart(): Promise<number | void> {
  try {
    const output = await request(`${API_SERVER}cart/products-in-cart`, {
      options: { json: true }
    });
    return output.length;
  } catch (error) {
    return console.log(error.message);
  }
}

export async function getProductsTotalPrice(): Promise<number> {
  const rawResult = await request(API_SERVER + "cart/total", {
    options: { json: true }
  });

  const { topay } = rawResult;

  return topay;
}

export async function getShippingText(): Promise<string> {
  const rawResult = await request(API_SERVER + "address/shipping-info", {
    options: { json: true }
  });

  const { shippinginfo } = rawResult;

  return shippinginfo;
}

export async function removeProductFromCart(id: number): Promise<void> {
  await request(API_SERVER + `cart/${id}`, {
    fetchOptions: { method: "DELETE" }
  });
}

export async function validateSession(): Promise<boolean> {
  const rawResult = await request(API_SERVER + "session/is-valid", {
    options: { json: true }
  });

  const { isValid } = rawResult;

  return isValid;
}

type LoginBasicData = {
  email: string;
  loginToken: string;
};

export async function loginWithEmail(
  inputEmail: string,
  sessionToken: string
): Promise<LoginBasicData> {
  const rawLoginData = await requestLegacy({
    query: {
      part: "loginmail",
      email: inputEmail,
      session: sessionToken
    },
    options: { json: true }
  });

  const toReturn: LoginBasicData = {
    email: rawLoginData.email,
    loginToken: rawLoginData.logintoken
  };

  await requestLegacy({
    query: {
      part: "login",
      logintoken: toReturn.loginToken,
      email: toReturn.email,
      sessiontoken: sessionToken
    },
    fetchOptions: { mode: "no-cors" }
  });

  return toReturn;
}

type UpdateNewsletterSubscription = {
  action: string;
  email: string;
  token: string;
};
export async function updateNewsletterSubscription(
  updateDetails: UpdateNewsletterSubscription
): Promise<void> {
  const { action, email, token } = updateDetails;

  await requestLegacy({
    query: {
      part: action,
      email,
      token
    },
    fetchOptions: { mode: "no-cors" }
  });
}

export async function subscribeToNewsletter(email: string): Promise<void> {
  const { token } = await requestLegacy({
    query: {
      part: "setnewslettersubscription",
      email
    },
    options: { json: true }
  });

  await requestLegacy({
    query: {
      part: "subscribenewsletter",
      email,
      token
    }
  });
}

export async function finalizePurchase(): Promise<void> {
  const price = await getProductsTotalPrice();

  await request(API_SERVER + "cart/complete-purchase", {
    fetchOptions: {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price }),
      method: "POST"
    }
  });
}
