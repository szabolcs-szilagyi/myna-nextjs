import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Cookies from 'universal-cookie';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import PayPal from '../components/Paypal';
import Ping from '../components/Ping';
import {
    API_PATH, API_SERVER
} from '../constants';
import event from '../lib/gtag';
import { requestFactory } from '../lib/request';

const cookies = new Cookies();
const session = cookies.get('session');

type CheckoutProduct = {
  id: number,
  idname: string,
  size: string,
}

const listenRequest = requestFactory(API_SERVER + API_PATH);

const productDetailHash = {
  'alyss-dress': { imageName: 'mynawebshop-alyssdress-1.jpg', pricc: '215' },
  'aster-green': { imageName: 'mynawebshop-greenpants-1.jpg', pricc: '139' },
  'aster-sand': { imageName: 'mynawebshop-linenpants-1.jpg', pricc: '139' },
  'bella-blouse': { imageName: 'bella-blouse-01.jpg', pricc: '79' },
  'bella-hand-painted-blouse': { imageName: 'bella-print-01.jpg', pricc: '129' },
  'calla-cream': { imageName: 'mynawebshop-whitejeans-1.jpg', pricc: '155' },
  'dahlia-blouse': { imageName: 'dahlia-blouse-01.jpg', pricc: '105' },
  'delphi-culottes': { imageName: 'delphi-culottes-01.jpg', pricc: '95' },
  'gea-cream': { imageName: 'mynawebshop-whitetop-1.jpg', pricc: '75' },
  'iris-vest': { imageName: 'iris-vest-01.jpg', pricc: '75' },
  'ivy-cream': { imageName: 'mynawebshop-whitetshirt-1.jpg', pricc: '75' },
  'leya-wrap-dress': { imageName: 'leya-wrap-dress-01.jpg', pricc: '319' },
  'lili-top': { imageName: 'lili-top-shadow-01.jpg', pricc: '69' },
  'lili-top-satin': { imageName: 'lili-top-satin-01.jpg', pricc: '69' },
  'lisia-dress': { imageName: 'lisia-dress-01.jpg', pricc: '179' },
  'lotus-sand': { imageName: 'mynawebshop-whitedress-1.jpg', pricc: '225' },
  'magna-scarf': { imageName: 'mynawebshop-magnascarf-1.jpg', pricc: '99' },
  'nolia-dustpink': { imageName: 'mynawebshop-pinkdress-1.jpg', pricc: '215' },
  'reeva-denim-jacket': { imageName: 'reeva-denim-jacket-01.jpg', pricc: '159' },
  'senna-skirt': { imageName: 'senna-skirt-01.jpg', pricc: '135' },
  'tilja-top': { imageName: 'mynawebshop-tiljatop-1.jpg', pricc: '115' },
  'tuli-dress': { imageName: 'tuli-dress-01.jpg', pricc: '169' },
};

function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        'zIndex': 100,
        'backgroundColor': 'rgba(0,0,0, 0.3)',
      }}
      className={isLoading ?
                 'col-md-12 blur-divs-after visible' :
                 'col-md-12 invisible'}
    >
      <div
        style={{
          top: '50%',
          left: '50%',
          position: 'relative'
        }}
        className="spinner-border"
      ></div>
    </div>
  );
}

function getProductImageLink(idName: string) {
  if(!idName) return '';
  return '/product_photos/' + productDetailHash[idName].imageName;
}

interface CartItemsProps {
  loading: boolean;
  products: object;
  delProductFromCart: (productId: number) => void;
}

function CartItems ({ loading, products, delProductFromCart }: CartItemsProps) {
  const [trashImageSrc, setTrashImageSrc] = useState('/trash.png');

  function trashHover() {
    setTrashImageSrc('/trash-b.png');
  }

  function trashNormal() {
    setTrashImageSrc('/trash.png');
  }

  return (
    <div>
      <Loading isLoading={loading} />
      {Object.values(products).map((product: CheckoutProduct, i) =>
        <div key={'keyID' + i}>
          <div className="row">
            <div className="col-md-5">
              <Image
                src={getProductImageLink(product.idname)}
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
                        <td>{product.idname}</td>
                        <td> </td>
                        <td>
                          <span className="capitalLetters">{product.size}</span>
                        </td>
                        <td>€{productDetailHash[product.idname].pricc}</td>
                        <td>
                          <a
                            id={'t' + product.id}
                            href="#"
                            onClick={() => delProductFromCart(product.id)}
                            onMouseEnter={trashHover}
                            onMouseLeave={trashNormal}
                          >
                            <img
                              src={trashImageSrc}
                              width="35"
                              height="35"
                            />
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
      )}
    </div>
  );
}

function getProductsInCart(session: string): Promise<object> {
  return listenRequest({
    query: { part: 'getproductsincart', sessiontoken: session },
    options: { json: true },
  })
    .then(({ products }) => {
      return products || {};
    })
    .catch(error => {
      console.log(error.message);
      return {};
    });
}

function getPrice(session: string, priceModifier: number): Promise<number> {
  return listenRequest({
    query: { part: 'totalcheckout', sessiontoken: session },
    options: { json: true },
  })
    .then(({ topay }) => {
      const modifier = priceModifier;
      const newPrice = Math.floor(topay * modifier);
      return newPrice;
    })
    .catch(error => {
      console.log(error.message);
      return 0;
    });
}

function getShipping(session: string): Promise<string> {
  return listenRequest({
    query: { part: 'getshippinginfo', sessiontoken: session },
    options: { json: true },
  })
    .then(({ shippinginfo }) => {
      return shippinginfo;
    })
    .catch(error => {
      console.log(error.message);
      return '';
    });
}

export default function Checkout() {
  const [state, setState] = useState({
    loadingProducts: false,
    price: 0,
    shipping: '',
    myEmail: '',
    loggedIn: 'no',
    products: {},
    inCart: 0,
    showPaypal: 'hidePaypal',
    checked: 0,
  });
  const [priceModifier, setPriceModifier] = useState(1);
  const [coupon, setCoupon] = useState('');
  const { t } = useTranslation('checkout');

  const router = useRouter();

  function amILoggedIn() {
    listenRequest({
      query: { part: 'amiloggedin', sessiontoken: session },
      options: { json: true },
    })
      .then(({ email }) => {
        if (email !== 'nodata') {
          setState({
            ...state,
            myEmail: email,
            loggedIn: 'yes',
            checked: 1,
          });
        } else {
          router.push('/my-account');
        }
      })
      .catch(error => console.log(error.message));
  }

  function delProductFromCart(id: number) {
    setState({
      ...state,
      loadingProducts: true,
    });

    listenRequest({
      query: { part: 'delproductfromcart', id: id, sessiontoken: session },
      fetchOptions: { mode: 'no-cors' },
    })

    setTimeout(() => router.reload(), 1000);
  }

  function pressedCheckout() {
    event('begin_checkout', {
      value: state.price,
      coupon,
      currency: 'EUR',
    })

    if (state.checked === 0) {
      amILoggedIn();
    } else {
      const loggedIn = state.loggedIn;
      if (loggedIn == 'no') {
        router.push('/my-account');
      } else {
        setState({
          ...state,
          showPaypal: 'showPaypal',
        });
      }
    }
  }

  function handleCouponChange(event: ChangeEvent<HTMLInputElement>) {
    const newCoupon = event.target.value.toLowerCase();
    let newPriceModifier = 1;

    if(newCoupon === 'mynafriend10') newPriceModifier = 0.9;
    else if(newCoupon === 'mynagift15') newPriceModifier = 0.85;
    else if(newCoupon === 'thespecial20') newPriceModifier = 0.8;

    setCoupon(newCoupon)
    setPriceModifier(newPriceModifier);
  }

  async function intiateData() {
    const products = await getProductsInCart(session);
    const price = await getPrice(session, priceModifier);
    const shipping = await getShipping(session);

    setState({
      ...state,
      products,
      inCart: Object.keys(products).length,
      price,
      shipping,
    })
  }

  useEffect(
    () => { intiateData() },
    [priceModifier]
  )

  return (
    <Container fluid>
      <Header />
      <Nav />
      <Ping />
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Your Loved Pieces')}</strong></h1>
          <div className={state.inCart ? 'd-none' : 'd-block'}>
            <div className='spacer25px'></div>
            <p>
              <i>{t('Your cart is empty')}</i><br />
              <br />
              <Link href="/shop-collections">
                <a><button className="startshoppingButton">{t('START SHOPPING HERE')}</button></a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="spacer25px"></div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {t('cart-counter-message', { count: state.inCart })}
          <hr />
          <CartItems
            products={state.products}
            delProductFromCart={delProductFromCart}
            loading={state.loadingProducts}
          />
          <div className="spacer50px"></div>
          <div className="row">
            <div className="col-md-4">
              <div className="noBorder mediumFont ceMob">
                <Link href="/shop-collections">
                  <a><button className="startshoppingButton">{t('CONTINUE SHOPPING')}</button></a>
                </Link>
              </div>
            </div>
            <div className="col-md-4 ce">
              <p className="capitalLetters">{t('Total')}: €{state.price}</p>
              <p className="capitalLetters">{t(state.shipping.replace('.', '-'))}</p>
              <p>
                <input
                  type="text"
                  value={coupon}
                  onChange={handleCouponChange}
                  placeholder={t('Coupon code')}
                />
              </p>
            </div>
            <div className="col-md-4">
              <div className="noBorder mediumFont right ceMob">
                <button
                  className="cartButton"
                  onClick={pressedCheckout}
                >{t('CHECKOUT')}</button>
              </div>
              <div className={state.showPaypal}>
                <PayPal dataFromParent = {state.price} />
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
