import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import {
  API_SERVER,
  API_PATH,
} from '../constants';
const cookies = new Cookies();

function doPing(session?: string) {
  const queryString = session === undefined ?
    '?part=ping' :
    '?part=ping&sessiontoken=' + session;

  return fetch(API_SERVER + API_PATH + queryString)
    .then(response => response.json())
    .then(({ sessiontoken }) => {
      return sessiontoken;
    });
}

export default function usePing() {
  const [session, setSession] = useState(cookies.get('session'));
  const [error, setError] = useState();
  const tDoPing = useRef(throttle(() => {
    doPing(session)
      .then((sessionToken) => {
        cookies.set('session', sessionToken, { maxAge: 1800 });
        setSession(sessionToken);
      })
      .catch(setError);
  }, 1000))

  useEffect(() => {
    tDoPing.current();
  }, []);

  return [session, error];
}
