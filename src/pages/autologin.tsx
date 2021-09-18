import { useEffect } from 'react';
import {
  API_SERVER,
  API_PATH,
} from '../constants';
import fetch from 'isomorphic-unfetch';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const session = cookies.get('session');

export default function Autologin() {

  async function handleRequest() {
    const searchParams = new URLSearchParams(window.location.search);
    const part = searchParams.get('part');
    const token = searchParams.get('token');

    if (part === 'login' && token !== null) {
      const email = searchParams.get('email');
      await fetch(
        API_SERVER + API_PATH + '?part=login&logintoken=' + token + '&email=' + email + '&sessiontoken=' + session,
        { mode: 'no-cors' },
      );
    }

    redirect();
  }

  function redirect() {
    window.location.href = "/my-account";
  }

  useEffect(() => {
    handleRequest()
  }, []);

  return (
    <div></div>
  );
}
