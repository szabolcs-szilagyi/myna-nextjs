import { useEffect, useState } from "react";
import {
  API_SERVER,
  API_PATH,
} from '../constants';

function getItToMail(session) {
  return fetch(API_SERVER + API_PATH + '?part=getproducttomail&sessiontoken=' + session)
    .then(response => response.json())
    .then(({ products }) => {
      return products;
    })
}

export default function useGetProductsToMail(session) {
  const [products, setProducts] = useState({} as any);
  const [error, setError] = useState();

  useEffect(() => {
    getItToMail(session)
      .then(setProducts)
      .catch(setError)
  }, [session])

  return [products, error];
}
