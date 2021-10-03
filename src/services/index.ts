import {
  API_SERVER,
  API_PATH,
} from '../constants';
import { requestFactory } from '../lib/request';

const request = requestFactory(API_SERVER + API_PATH);

export async function loadProductDetails(idName: string): Promise<unknown> {
  const rawDetails = await request({
    query: {
      part: 'getproductdata',
      productname: idName,
    },
    options: { json: true },
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
      photo9: productdetails.pic9,
    },
  };
}

export async function getAvailability(
  idName: string,
  size: string,
  sessionToken: string
): Promise<number | null> {
  const rawResult = await request({
    query: {
      part: 'availabilityexact',
      idname: idName,
      size,
      sessiontoken: sessionToken,
    },
    options: { json: true },
  });

  const { availability } = rawResult;
  return availability;
}

export async function addProductToCart(
  idName: string,
  size: string,
  sessionToken: string
): Promise<void> {
  await request({
    query: {
      part: 'addproducttocart',
      idname: idName,
      size,
      sessiontoken: sessionToken,
    }
  })
}
