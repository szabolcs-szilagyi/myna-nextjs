import { useEffect } from 'react';
import {
  API_SERVER,
  API_PATH,
} from '../constants';
import fetch from 'isomorphic-unfetch';

enum EPart {
  SUBSCRIBE = 'subscribenewsletter',
  UNSUBSCRIBE = 'unsubscribe',
}

enum EAction {
  CONFIRM = 'confirmnewslettersubscription',
  DELETE = 'delnewslettersubscription',
}

const possibleActionsToPerform: Record<EPart, EAction> = {
  [EPart.SUBSCRIBE]: EAction.CONFIRM,
  [EPart.UNSUBSCRIBE]: EAction.DELETE,
}

export default function Ping() {

  async function handleRequest() {
    const searchParams = new URLSearchParams(window.location.search);
    const part = searchParams.get('part');
    const token: string | null = searchParams.get('token');
    const email = searchParams.get('email');
    const action: EAction | undefined = possibleActionsToPerform[part as EPart];

    if (token !== null && action !== undefined) {
      await fetch(
        API_SERVER + API_PATH + '?part=' + action + '&email=' + email + '&token=' + token,
        { mode: 'no-cors' },
      );
    }

    redirect();
  }

  function redirect() {
    window.location.href = '/';
  }

  useEffect(() => {
    handleRequest()
  }, []);

  return (
    <div></div>
  );
}
