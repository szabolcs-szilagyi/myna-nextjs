import { useEffect } from 'react';
import { updateNewsletterSubscription } from '../services';

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

export default function Newsletter() {

  async function handleRequest() {
    const searchParams = new URLSearchParams(window.location.search);
    const part = searchParams.get('part') as EPart;
    const token: string | null = searchParams.get('token');
    const email = searchParams.get('email');
    const action: EAction | undefined = possibleActionsToPerform[part];

    if (token !== null && action !== undefined) {
      await updateNewsletterSubscription({ action, email, token });
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
