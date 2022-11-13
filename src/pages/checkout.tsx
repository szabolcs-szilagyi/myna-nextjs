import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import PayPal from "../components/Paypal";
import getProductLink from "../lib/get-product-link";
import event from "../lib/gtag";
import {
  getAllProductBasicInfos,
  TCartConentItem,
  TCartConents
} from "../services";
import {
  getCartContent,
  getProductsTotalPrice,
  getShippingText,
  removeProductFromCart,
  validateSession
} from "../services/nestjs-server";

type CheckoutProduct = Pick<TCartConentItem, "id" | "idName" | "size">;
type TProductBasicInfo = {
  imageName: string;
  price: number;
};
type TProductDetailsRecord = Record<string, TProductBasicInfo>;

export async function getStaticProps() {
  const details = await getAllProductBasicInfos();
  const productDetailHash: TProductDetailsRecord = details.reduce(
    (acc, current) => {
      acc[current.idName] = {
        imageName: current.pic1,
        price: current.price
      };
      return acc;
    },
    {}
  );

  return { props: { productDetailHash } };
}

function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        zIndex: 100,
        backgroundColor: "rgba(0,0,0, 0.3)"
      }}
      className={
        isLoading ? "col-md-12 blur-divs-after visible" : "col-md-12 invisible"
      }
    >
      <div
        style={{
          top: "50%",
          left: "50%",
          position: "relative"
        }}
        className="spinner-border"
      ></div>
    </div>
  );
}

function getProductImageLink(
  productDetailHash: TProductDetailsRecord,
  idName: string
) {
  if (!idName) return "";
  return getProductLink(productDetailHash[idName].imageName);
}

interface CartItemsProps {
  loading: boolean;
  products: TCartConents;
  delProductFromCart: (productId: number) => void;
  productDetailHash: TProductDetailsRecord;
}

function CartItems({
  loading,
  products,
  delProductFromCart,
  productDetailHash
}: CartItemsProps) {
  const [trashImageSrc, setTrashImageSrc] = useState("/trash.png");

  function trashHover() {
    setTrashImageSrc("/trash-b.png");
  }

  function trashNormal() {
    setTrashImageSrc("/trash.png");
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div data-cy="cartItems">
        {Object.values(products).map((product: CheckoutProduct, i) => (
          <div key={"keyID" + i}>
            <div className="row">
              <div className="col-md-5">
                <Image
                  src={getProductImageLink(productDetailHash, product.idName)}
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </div>
              <div className="col-md-7">
                <div className="cartIconContainer">
                  <div className="vertical-center">
                    <table className="cartCo">
                      <tbody>
                        <tr>
                          <td>{product.idName}</td>
                          <td> </td>
                          <td>
                            <span className="capitalLetters">
                              {product.size}
                            </span>
                          </td>
                          <td>€{productDetailHash[product.idName].price}</td>
                          <td>
                            <a
                              id={"t" + product.id}
                              href="#"
                              onClick={() => delProductFromCart(product.id)}
                              onMouseEnter={trashHover}
                              onMouseLeave={trashNormal}
                              data-cy="deleteButton"
                            >
                              <img src={trashImageSrc} width="35" height="35" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

async function getProductsInCart(): Promise<TCartConents> {
  try {
    const products = await getCartContent();
    return products;
  } catch (e) {
    console.log(e.message);
    return {};
  }
}

async function getPrice(priceModifier: number): Promise<number> {
  try {
    const toPay = await getProductsTotalPrice();
    const modifier = priceModifier;
    const newPrice = Math.floor(toPay * modifier);
    return newPrice;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
}

async function getShipping(): Promise<string> {
  try {
    const shippingText = await getShippingText();
    return shippingText;
  } catch (error) {
    console.log(error.message);
    return "";
  }
}

type TCheckoutProps = {
  productDetailHash: TProductDetailsRecord;
};

export default function Checkout({ productDetailHash }: TCheckoutProps) {
  const [state, setState] = useState({
    loadingProducts: false,
    price: 0,
    shipping: "",
    products: {},
    inCart: 0,
    showPaypal: "hidePaypal"
  });
  const [priceModifier, setPriceModifier] = useState(1);
  const [coupon, setCoupon] = useState("");
  const { t } = useTranslation("checkout");
  const [isSessionValid, setIsSessionValid] = useState(false);

  const router = useRouter();

  async function delProductFromCart(id: number) {
    setState({
      ...state,
      loadingProducts: true
    });

    await removeProductFromCart(id);

    setTimeout(() => router.reload(), 1000);
  }

  function pressedCheckout() {
    event("begin_checkout", {
      value: state.price,
      coupon,
      currency: "EUR"
    });

    if (!isSessionValid) {
      router.push("/my-account");
    } else {
      setState({
        ...state,
        showPaypal: "showPaypal"
      });
    }
  }

  function handleCouponChange(event: ChangeEvent<HTMLInputElement>) {
    const newCoupon = event.target.value.toLowerCase();
    let newPriceModifier = 1;

    if (newCoupon === "mynafriend10") newPriceModifier = 0.9;
    else if (newCoupon === "mynagift15") newPriceModifier = 0.85;
    else if (newCoupon === "summersale20") newPriceModifier = 0.8;
    else if (newCoupon === "amazingdeal") newPriceModifier = 0.4;

    setCoupon(newCoupon);
    setPriceModifier(newPriceModifier);
  }

  async function intiateData() {
    const [products, price, shipping, sessionValidationResult] = await Promise.all([
      getProductsInCart(),
      getPrice(priceModifier),
      getShipping(),
      validateSession(),
    ]);

    setIsSessionValid(sessionValidationResult);
    setState({
      ...state,
      products,
      inCart: Object.keys(products).length,
      price,
      shipping
    });
  }

  useEffect(() => {
    intiateData();
  }, [priceModifier]);

  return (
    <Container fluid>
      <Header />
      <Nav />
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1>
            <strong>{t("Your Loved Pieces")}</strong>
          </h1>
          <div
            className={state.inCart ? "d-none" : "d-block"}
            data-cy="emptyCartMessagePane"
          >
            <div className="spacer25px"></div>
            <p>
              <i>{t("Your cart is empty")}</i>
              <br />
              <br />
              <Link href="/shop-collections">
                <a>
                  <button className="startshoppingButton col-md-2">
                    {t("START SHOPPING HERE")}
                  </button>
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="spacer25px"></div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {t("cart-counter-message", { count: state.inCart })}
          <hr />
          <CartItems
            products={state.products}
            delProductFromCart={delProductFromCart}
            loading={state.loadingProducts}
            productDetailHash={productDetailHash}
          />
          <div className="spacer50px"></div>
          <div className="row">
            <div className="col-md-4">
              <div className="noBorder mediumFont ceMob">
                <Link href="/shop-collections">
                  <a>
                    <button className="startshoppingButton col-md-10">
                      {t("CONTINUE SHOPPING")}
                    </button>
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-4 ce">
              <p className="capitalLetters" data-cy="totalPrice">
                {t("Total")}: €{state.price}
              </p>
              <p className="capitalLetters" data-cy="shippingPriceInfo">
                {t(state.shipping.replace(".", "-"))}
              </p>
              <p>
                <input
                  type="text"
                  value={coupon}
                  onChange={handleCouponChange}
                  placeholder={t("Coupon code")}
                  data-cy="couponInput"
                />
              </p>
            </div>
            <div className="col-md-4">
              <Link href="/my-account">
                <a
                  className="cartButton col-md-10 float-md-right d-block text-center text-uppercase"
                  data-cy="deliveryDetailsButton"
                >
                  {t("Delivery details")}
                </a>
              </Link>
              <div className="spacer25px col-md-10 float-md-right"></div>
              <button
                className="cartButton col-md-10 float-md-right"
                onClick={pressedCheckout}
                data-cy="checkoutButton"
              >
                {t("CHECKOUT")}
              </button>
              <div
                className={[
                  state.showPaypal,
                  "col-md-10",
                  "p-md-0",
                  "float-md-right"
                ].join(" ")}
                data-cy="payPalHolder"
              >
                <PayPal dataFromParent={state.price} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
      <Footer />
    </Container>
  );
}
