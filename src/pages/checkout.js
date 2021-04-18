import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const session = cookies.get('session');

import Header from '../components/Header';
import PayPal from '../components/Paypal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import event from '../lib/gtag';
import { requestFactory } from '../lib/request';

import {
  API_SERVER,
  API_PATH,
} from '../constants';

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

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        className={this.props.isLoading ?
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
}

class CartItems extends React.Component {
  constructor(props) {
    super(props);

    this.delProductFromCart = props.delProductFromCart;
    this.trashHover = this.trashHover.bind(this);
    this.trashNormal = this.trashNormal.bind(this);
  }

  trashHover(e) {
    e.target.src = '/trash-b.png';
  }
  trashNormal(e) {
    e.target.src = '/trash.png';
  }

  getProductImageLink(idName) {
    if(!idName) return '';
    return '/product_photos/' + productDetailHash[idName].imageName;
  }

  render() {
    return (
      <div>
        <Loading isLoading={this.props.loading} />
        {Object.values(this.props.products).map((product, i) =>
          <div key={'keyID' + i}>
            <div className="row">
              <div className="col-md-5">
                <Image
                  src={this.getProductImageLink(product.idname)}
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
                              onClick={() => this.delProductFromCart(product.id)}
                              onMouseEnter={this.trashHover}
                              onMouseLeave={this.trashNormal}
                            >
                              <img
                                src="/trash.png"
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
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingProducts: false,
      price: '0',
      shipping: '0',
      myEmail: '',
      loggedIn: 'no',
      products: [],
      inCart: '0',
      showPaypal: 'hidePaypal',
      coupon: '',
      priceModifier: 1,
      checked: 0,
      ...props,
    };

    this.getPrice = this.getPrice.bind(this);
    this.getShipping = this.getShipping.bind(this);
    this.amILoggedIn = this.amILoggedIn.bind(this);
    this.getProductsInCart = this.getProductsInCart.bind(this);
    this.delProductFromCart = this.delProductFromCart.bind(this);
    this.reload = this.reload.bind(this);
    this.myAccount = this.myAccount.bind(this);
    this.pressedCheckout = this.pressedCheckout.bind(this);
    this.handleCouponChange = this.handleCouponChange.bind(this);
    this.getUserAddress = this.getUserAddress.bind(this);
  }

  getPrice() {
    listenRequest({
      query: { part: 'totalcheckout', sessiontoken: session },
      options: { json: true },
    })
      .then(({ topay }) => {
        const modifier = this.state.priceModifier;
        const newPrice = Math.floor(topay * modifier);
        this.setState({ price: newPrice });
      })
      .catch(error => console.log(error.message));
  }

  getShipping() {
    listenRequest({
      query: { part: 'getshippinginfo', sessiontoken: session },
      options: { json: true },
    })
      .then(({ shippinginfo }) => {
        this.setState({ shipping: shippinginfo });
      })
      .catch(error => console.log(error.message));
  }

  amILoggedIn() {
    listenRequest({
      query: { part: 'amiloggedin', sessiontoken: session },
      options: { json: true },
    })
      .then(({ email }) => {
        if (email !== 'nodata') {
          this.setState({ myEmail: email, loggedIn: 'yes', checked: 1 });
        } else {
          this.myAccount ();
        }
      })
      .catch(error => console.log(error.message));
  }

  getProductsInCart() {
    listenRequest({
      query: { part: 'getproductsincart', sessiontoken: session },
      options: { json: true },
    })
      .then(({ products }) => {
        if(!products) products = {};
        this.setState({ products, inCart: Object.keys(products).length });
      })
      .catch(error => console.log(error.message));
  }

  delProductFromCart(id) {
    this.setState({ loadingProducts: true });

    listenRequest({
      query: { part: 'delproductfromcart', id: id, sessiontoken: session },
      fetchOptions: { mode: 'no-cors' },
    })

    setTimeout(this.reload, 1000);
  }

  reload() {
    window.location.href = "/checkout";
  }

  myAccount() {
    window.location.href = "/my-account";
  }

  pressedCheckout() {
    event('begin_checkout', {
      value: this.state.price,
      coupon: this.state.coupon,
      currency: 'EUR',
    })

    if (this.state.checked == '0') {
      this.amILoggedIn();
    } else {
      let loggedIn = this.state.loggedIn;
      if (loggedIn == 'no') {
        this.myAccount();
      } else {
        this.setState({ showPaypal: 'showPaypal' });
      }
    }
  }

  handleCouponChange(event) {
    let coupon = event.target.value.toLowerCase();
    let priceModifier = 1;

    if(coupon === 'mynafriend10') priceModifier = 0.9;
    else if(coupon === 'mynagift15') priceModifier = 0.85;

    this.setState({ coupon, priceModifier });

    setTimeout(this.getPrice, 200);
  }

  getUserAddress() {
    listenRequest({
      query: { part: 'getaddressdata', email: this.state.myEmail, sessiontoken: session },
      options: { json: true },
    })
      .then(({ success, addressdata }) => {
        const { type, address1, city, zip, country } = addressdata;
        const neededData = [type, address1, city, zip, country];

        if (this.state.loggedIn == 'yes' && neededData.some(value => value === '0')) {
          this.myAccount();
        }
      })
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    this.getProductsInCart();
    this.getPrice();
    this.getShipping();
    setTimeout(this.getUserAddress, 500);
  }

  render() {
		return (
			<Container fluid>
      <Header />
        <Nav />
        <Ping />
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-12 ce capitalLetters">
            <h2><strong>Your Loved Pieces</strong></h2>
            <div className={this.state.inCart ? 'd-none' : 'd-block'}>
              <div className='spacer25px'></div>
              <p><i>Your cart is empty.</i> <br /><br /><a href="/shop-collections"><button className="startshoppingButton">START SHOPPING HERE</button></a></p>
            </div>
          </div>
        </div>
        <div className="spacer25px"></div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            Cart / {this.state.inCart} items
            <hr />
            <CartItems
              products={this.state.products}
              delProductFromCart={this.delProductFromCart}
              loading={this.state.loadingProducts}
            />
            <div className="spacer50px"></div>
            <div className="row">
              <div className="col-md-4">
                <div className="noBorder mediumFont ceMob">
                  <a href="/shop-collections">
                    <button className="startshoppingButton">CONTINUE SHOPPING</button>
                  </a>
                </div>
              </div>
              <div className="col-md-4 ce">
                <p className="capitalLetters">Total: €{this.state.price}</p>
                <p className="capitalLetters">{this.state.shipping ? this.state.shipping : 'free shipping'}</p>
                <p><input type="text" value={this.state.coupon} onChange={this.handleCouponChange} placeholder="Coupon code" /></p>
              </div>
              <div className="col-md-4">
                <div className="noBorder mediumFont right ceMob">
                  <button
                    className="cartButton"
                    onClick={this.pressedCheckout}
                  >CHECKOUT</button>
                </div>
                <div className={this.state.showPaypal}>
                  <PayPal dataFromParent = {this.state.price} />
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
}
