import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  API_SERVER,
  API_PATH,
} from '../constants';
const cookies = new Cookies();
const session = cookies.get('session');

export default function Ping() {

  function doPing() {
    if(session == 'undefined') {
      fetch(API_SERVER + API_PATH + '?part=ping')
        .then(response => response.json())
        .then(({ sessiontoken }) => {
          cookies.set('session', sessiontoken, { maxAge: 1800 });
        })
        .catch(error => console.log(error.message));
      setTimeout(redirect, 1000);
    }

    if(session != 'undefined') {
      fetch(API_SERVER + API_PATH + '?part=ping&sessiontoken=' + session)
        .then(response => response.json())
        .then(({ sessiontoken }) => {
          cookies.set("session", sessiontoken, { maxAge: 1800 });
        })
        .catch(error => console.log(error.message));
    }
  }

  function redirect () {
    window.location.href = "/";
  }

  function componentDidMount() {
    doPing();
  }

  useEffect(componentDidMount, []);

  return (
    <div></div>
  );
}
