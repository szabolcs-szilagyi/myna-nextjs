import { useEffect, useState } from 'react';
import {
  API_SERVER,
  API_PATH,
} from '../constants';

function getEmail(session) {
  return fetch(API_SERVER + API_PATH + '?part=getemail&sessiontoken=' + session)
    .then(response => response.json())
    .then(({ email }) => {
      console.log('set email', email);
      return email;
    })
}

export default function useEmail(session) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  useEffect(() => {
    getEmail(session)
      .then(setEmail)
      .catch(setError);
  }, [session])

  return [email, error];
}
