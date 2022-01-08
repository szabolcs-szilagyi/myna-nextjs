import { PayPalButton } from "react-paypal-button-v2";

import { PAY_PAL_CLIENT_ID } from "../constants";
import getConfig from "next/config";
import { finalizePurchase } from "../services/nestjs-server";

const {
  publicRuntimeConfig: { mockPayPal }
} = getConfig();

interface PayPalProps {
  dataFromParent: number;
}

export default function PayPal(props: PayPalProps) {

  /**
   * Call it when the transaction completed successfully and products needs
   * to be marked as paid for.
   *
   * @return void
   */
  async function completed() {
    try {
      await finalizePurchase();
    } catch (error) {
      console.log(error.message);
    }
  }

  function reload() {
    window.location.href = "/checkout";
  }

  async function onSuccess() {
    // here to write the SUCCESS script
    await completed();
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
