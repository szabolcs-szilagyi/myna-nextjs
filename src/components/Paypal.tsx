import { PayPalButton } from "react-paypal-button-v2";
import Cookies from "universal-cookie";

import { PAY_PAL_CLIENT_ID } from "../constants";
import useEmail from "../lib/use-email";
import usePrice from "../lib/use-price";
import useUserAddress from "../lib/use-useraddress";
import useUserDetails from "../lib/use-user-details";
import useGetProductsToMail from "../lib/use-get-products-to-mail";
import { finalizePurchase } from "../services";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { mockPayPal }
} = getConfig();

const cookies = new Cookies();
const session = cookies.get("session");

interface PayPalProps {
  dataFromParent: number;
}

export default function PayPal(props: PayPalProps) {
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
  async function completed() {
    try {
      await finalizePurchase(
        {
          email,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          birthday: userDetails.birthday,
          mobile: userAddress.dMobile,
          address1: userAddress.dAddress1,
          address2: userAddress.dAddress2,
          city: userAddress.dCity,
          state: userAddress.dState,
          zip: userAddress.dZip,
          country: userAddress.dCountry,
          comment: userAddress.dComment
        },
        price,
        products,
        session
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  function reload() {
    window.location.href = "/checkout";
  }

  function onSuccess() {
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
  }

  const realComponent = (
    <PayPalButton
      amount={props.dataFromParent}
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={() => onSuccess()}
      options={{
        disableFunding: "card",
        clientId: PAY_PAL_CLIENT_ID,
        currency: "EUR"
      }}
    />
  );

  const mockComponent = (
    <button data-cy="mockPayPalButton" onClick={() => onSuccess()}>
      PayPal mock
    </button>
  );

  return mockPayPal ? mockComponent : realComponent;
}
