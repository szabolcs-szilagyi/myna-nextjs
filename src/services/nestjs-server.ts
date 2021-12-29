import { API_SERVER, API_PATH } from "../constants";
import { request, requestFactory } from "../lib/request";
import UserDataValidationError from "../lib/UserDataValidationError";

const requestLegacy = requestFactory(API_SERVER + API_PATH);

type TProductDetails = {
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

export async function loadProductDetails(
  idName: string
): Promise<TProductDetails> {
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

type TProductBasicInfo = {
  idName: string;
  price: number;
  pic1: string;
};

export async function getAllProductBasicInfos(): Promise<TProductBasicInfo[]> {
  const rawResults = await request(API_SERVER + "product/basic-infos", {
    options: { json: true }
  });

  return rawResults as TProductBasicInfo[];
}

export type TCartConentItem = {
  amount: number;
  id: number;
  idName: string;
  paid: boolean;
  size: string;
};

export type TCartConents = Record<string, TCartConentItem>;

export async function getCartContent(): Promise<TCartConents> {
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
    } as TCartConentItem;

    return memo;
  }, {});

  return results;
}

export async function getInCart() {
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

export async function getLoggedinEmail(
  sessionToken: string
): Promise<string | null> {
  const rawResponse = await requestLegacy({
    query: {
      part: "amiloggedin",
      sessiontoken: sessionToken
    },
    options: { json: true }
  });

  const { email } = rawResponse;

  if (email !== "nodata") return email;
  else return null;
}

type TLoginBasicData = {
  email: string;
  loginToken: string;
};
export async function loginWithEmail(
  inputEmail: string,
  sessionToken: string
): Promise<TLoginBasicData> {
  const rawLoginData = await requestLegacy({
    query: {
      part: "loginmail",
      email: inputEmail,
      session: sessionToken
    },
    options: { json: true }
  });

  const toReturn: TLoginBasicData = {
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

type TUserData = {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
};
export async function saveUserData(
  userData: TUserData,
  sessionToken: string
): Promise<void> {
  const validInput = Object.values(userData).every(value => value !== "");

  if (!validInput) {
    throw new UserDataValidationError("All fields must be filled!", userData);
  }

  await requestLegacy({
    query: {
      part: "updateuserdata",
      email: userData.email,
      firstname: userData.firstName,
      lastname: userData.lastName,
      birthday: userData.birthday,
      sessiontoken: sessionToken
    }
  });
}

type TAddressData = {
  email: string;
  mobile: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  comment: string;
};
export async function saveAddressData(
  addressData: TAddressData,
  sessionToken: string
): Promise<void> {
  const mandatoryFields = ["email", "address1", "city", "zip"];
  const validInput = mandatoryFields.every(value => addressData[value] !== "");

  if (!validInput)
    throw new UserDataValidationError(
      "All mandatory fields must be filed!",
      addressData
    );

  await requestLegacy({
    query: {
      part: "setaddressdata",
      type: "1",
      sessiontoken: sessionToken,
      ...addressData
    }
  });
}

type TUpdateNewsletterSubscription = {
  action: string;
  email: string;
  token: string;
};
export async function updateNewsletterSubscription(
  updateDetails: TUpdateNewsletterSubscription
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

export async function finalizePurchase(
  userDetails: TUserData & TAddressData,
  price: string,
  products: object,
  sessionToken: string
): Promise<void> {
  await requestLegacy({
    query: {
      part: "setproductpaid",
      sessiontoken: sessionToken
    },
    fetchOptions: { mode: "no-cors" }
  });

  await requestLegacy({
    query: {
      part: "purchased",
      email: userDetails.email,
      token: sessionToken,
      price,
      firstname: userDetails.firstName,
      lastname: userDetails.lastName,
      birthday: userDetails.birthday,
      mobile: userDetails.mobile,
      address1: userDetails.address1,
      address2: userDetails.address2,
      city: userDetails.city,
      state: userDetails.state,
      zip: userDetails.zip,
      country: userDetails.country,
      comment: userDetails.comment,
      products
    },
    fetchOptions: { mode: "no-cors" }
  });
}
