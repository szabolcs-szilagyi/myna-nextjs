import { useEffect, useState } from 'react';
import {
  API_SERVER,
  API_PATH,
} from '../constants';

function getPrice(session) {
  return fetch(API_SERVER + API_PATH + '?part=totalcheckout&sessiontoken=' + session)
    .then(response => response.json())
    .then(({ topay }) => {
      return topay;
    });
}

export default function usePrice(session) {
  const [price, setPrice] = useState('');
  const [error, setError] = useState();

  useEffect(() => {
    getPrice(session)
      .then(setPrice)
      .catch(setError);
  }, [session])

  return [price, error];
}
