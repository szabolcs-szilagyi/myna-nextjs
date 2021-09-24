import { useEffect, useState } from "react";
import {
  API_SERVER,
  API_PATH,
} from '../constants';

function getUserDetails(email, session) {
  return fetch(API_SERVER + API_PATH + '?part=getuserdata&email=' + email + '&sessiontoken=' + session)
    .then(response => response.json())
    .then(output => {
      const tmp = output['userdata'];
      const firstNameT = tmp['firstname'];
      const lastNameT = tmp['lastname'];
      const birthdayT = tmp['birthday'];
      return {
        firstName: firstNameT,
        lastName: lastNameT,
        birthday: birthdayT,
      };
    })
}

export default function useUserDetails(email, session) {
  const [details, setData] = useState({} as any);
  const [error, setError] = useState();

  useEffect(() => {
    getUserDetails(email, session)
      .then(setData)
      .catch(setError)
  }, [email, session]);

  return [details, error];
}
