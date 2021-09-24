import {
  API_SERVER,
  API_PATH,
} from '../constants';
import { useEffect, useState } from "react";

function getUserAddress (email, session) {
  return fetch(API_SERVER + API_PATH + '?part=getaddressdata&email=' + email + '&sessiontoken=' + session)
    .then(response => response.json())
    .then(({ addressdata }) => {
      return {
        dMobile: addressdata.mobile,
        dAddress1: addressdata.address1,
        dAddress2: addressdata.address2,
        dCity: addressdata.city,
        dState: addressdata.state,
        dZip: addressdata.zip,
        dCountry: addressdata.country,
        dComment: addressdata.comment,
      };
    });
}

export default function useUserAddress(email, session) {
  const [data, setData] = useState({} as any);
  const [error, setError] = useState();

  useEffect(() => {
    getUserAddress(email, session)
      .then(setData)
      .catch(setError);
  }, [email, session]);

  return [data, error];
}
