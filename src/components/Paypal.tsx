import { PayPalButton } from "react-paypal-button-v2";
import Cookies from 'universal-cookie';

import {
  PAY_PAL_CLIENT_ID,
  API_SERVER,
  API_PATH,
  EMAIL_PATH,
} from '../constants';
import useEmail from '../lib/use-email';
import usePrice from '../lib/use-price';
import useUserAddress from '../lib/use-useraddress';
import useUserDetails from '../lib/use-user-details';
import useGetProductsToMail from '../lib/use-get-products-to-mail';

const cookies = new Cookies();
const session = cookies.get('session');

type TPayPalProps = {
  dataFromParent: number,
};

export default function PayPal(props: TPayPalProps) {
  const [email] = useEmail(session);
  const [price] = usePrice(session);
  const [userDetails] = useUserDetails(email, session);
  const [userAddress] = useUserAddress(email, session);
  const [products] = useGetProductsToMail(session);

  /**
   * Call it when the transaction completed successfully and products needs
   * to be marked as paid for.
   *
   * @return void
   */
  async function completed () {
    await fetch(API_SERVER + API_PATH + '?part=getproductsincart&sessiontoken=' + session)
      .then(response => response.json())
      .catch(error => console.log(error.message));

    await fetch(API_SERVER + API_PATH + '?part=setproductpaid&sessiontoken=' + session, {mode: 'no-cors'})
      .catch(error => console.log(error.message));

    await fetch(API_SERVER + EMAIL_PATH + '?part=purchased&email=' + email + '&token=' + session
      + '&price=' + price
      + '&firstname=' + userDetails.firstName
      + '&lastname=' + userDetails.lastName
      + '&birthday=' + userDetails.birthday
      + '&mobile=' + userAddress.dMobile
      + '&address1=' + userAddress.dAddress1
      + '&address2=' + userAddress.dAddress2
      + '&city=' + userAddress.dCity
      + '&state=' + userAddress.dState
      + '&zip=' + userAddress.dZip
      + '&country=' + userAddress.dCountry
      + '&comment=' + userAddress.dComment
      + '&products=' + products
      , {mode: 'no-cors'})
      .catch(error => console.log(error.message));
  }

  function reload () {
    window.location.href = "/checkout";
  }

  return (
    <PayPalButton
      amount={props.dataFromParent}
    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={() => {
        // here to write the SUCCESS script
        completed();
        alert("We will contact you in email");
        setTimeout(reload, 2000);

        // OPTIONAL: Call your server to save the transaction
        //    return fetch("/paypal-transaction-complete", {
        //        method: "post",
        //        body: JSON.stringify({
        //            orderId: data.orderID
        //        })
        //    });
      }}
      options={{
        disableFunding: "card",
        clientId: PAY_PAL_CLIENT_ID,
        currency: "EUR"
      }}
    />
  );
}
