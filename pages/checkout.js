import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import { useRouter } from 'next/router';
import {API_SERVER as API_SERVER} from '../src/constants';
import Cookies from 'universal-cookie';
import Header from '../components/Header';
import PayPal from '../components/Paypal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import "../src/styles.css";
const cookies = new Cookies();
const session = cookies.get('session');

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

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: 'visible',
      price: '0',
      shipping: '0',
      myEmail: '',
      loggedIn: 'no',
      activeCoupon: '',
      products: [],
      productsImg: [],
      productsPrice: [],
      inCart: '0',
      productRender: [],
      trash: './trash.png',
      emptyCartAlert: '',
      showPaypal: 'hidePaypal',
      amountLimit: '',
      amount: [],
      amountId: [],
      coupon: '',
      priceModifier: 1,
      checked: 0,
      ...props,
    };

    this.getPrice = this.getPrice.bind(this);
    this.getShipping = this.getShipping.bind(this);
    this.amILoggedIn = this.amILoggedIn.bind(this);
    this.getProductsInCart = this.getProductsInCart.bind(this);
    this.getImagesPrice = this.getImagesPrice.bind(this);
    this.getInCart = this.getInCart.bind(this);
    this.createProductRender = this.createProductRender.bind(this);
    this.addImages = this.addImages.bind(this);
    this.delProductFromCart = this.delProductFromCart.bind(this);
    this.reload = this.reload.bind(this);
    this.myAccount = this.myAccount.bind(this);
    this.trashHover = this.trashHover.bind(this);
    this.trashNormal = this.trashNormal.bind(this);
    this.pressedCheckout = this.pressedCheckout.bind(this);
    this.getAmount = this.getAmount.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.handleCouponChange = this.handleCouponChange.bind(this);
    this.getUserAddress = this.getUserAddress.bind(this);
  }

  getPrice () {
    fetch(API_SERVER + 'listen.php?part=totalcheckout&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['topay'];
      let delivery = data['delivery'];
      let products = data['products'];
      let modifier = this.state.priceModifier;
      let ovr = tmp * modifier;
      let ovr2 = Math.floor(ovr);
      this.setState({ price: ovr2 });
    })
    .catch(error => console.log(error.message));
  }
  getShipping () {
    fetch(API_SERVER + 'listen.php?part=getshippinginfo&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['shippinginfo'];
      this.setState({ shipping: tmp });
    })
    .catch(error => console.log(error.message));
  }
  amILoggedIn () {
    fetch(API_SERVER + 'listen.php?part=amiloggedin&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['email'];
      if (tmp != "nodata") {
        this.setState({ myEmail: tmp, loggedIn: 'yes', checked: 1 });
      } else {
        this.myAccount ();
      }
    })
    .catch(error => console.log(error.message));
  }
  getProductsInCart () {
    fetch(API_SERVER + 'listen.php?part=getproductsincart&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['products'];
      this.setState({ products: tmp });
    })
    .catch(error => console.log(error.message));
    console.log (this.state.products);
  }
  getImagesPrice (e) {
    let idName = e;
    fetch(API_SERVER + 'listen.php?part=getproductdata&productname=' + idName)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['productdetails'];
      let pic = tmp['pic1'];
      let price = tmp['productprice'];
      this.setState(previousState => ({
        productsImg: [...previousState.productsImg, pic]
      }));
      this.setState(previousState => ({
        productsPrice: [...previousState.productsPrice, price]
      }));
    })
    .catch(error => console.log(error.message));
  }

  getInCart () {
    fetch(API_SERVER + 'listen.php?part=getproductsnumberincart&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['nr'];
      if (tmp == '0') { this.setState({ emptyCartAlert: <div><div className='spacer25px' /><p><i>Your cart is empty.</i> <br /><br /><a href="/autumn-collection"><button className="startshoppingButton">START SHOPPING HERE</button></a></p></div> }); }
      this.setState({ inCart: tmp });
    })
    .catch(error => console.log(error.message));
  }

  createProductRender () {
    let prod = this.state.products;
    let images = this.state.productsImg;
    let prices = this.state.productsPrice;
    let tmp = [];

    for (let i=0; i < this.state.inCart; i++) {
      const id = prod[i]['id'];
      const idT = "t" + id;
      const size = prod[i]['size'];
      const idName = prod[i]['idname'];

      let amountLimit;
      fetch(API_SERVER + 'listen.php?part=onstock&idname=' + idName + '&size=' + size)
        .then(response => response.json())
        .then(output => {
          let data = output;
          amountLimit = data['onstock'];
          this.setState({ amountLimit: amountLimit });
        })
        .catch(error => console.log(error.message));

      const {
        imageName,
        pricc,
      } = productDetailHash[idName];
      const imgsrc = API_SERVER + 'productphotos/' + imageName;

      tmp[i] = <div key={"keyID" + i}><div className="row"><div className="col-md-5"><img className="dyn" src={imgsrc} /></div>
      <div className="col-md-7">
        <div className="cartIconContainer"><div className="vertical-center">
        <table className="cartCo"><tbody><tr>
        <td>{idName}</td>
        <td>

        </td>
        <td>
          <span className="capitalLetters">{size}</span>

        </td>
        <td>€{pricc}</td>
        <td><a id={idT} href="#" onClick={this.delProductFromCart} onMouseEnter={this.trashHover} onMouseLeave={this.trashNormal}><img src={this.state.trash} width="35" height="35" /></a></td>
        </tr></tbody></table>
        </div></div>
      </div></div><hr /></div>
    }
    this.setState({ productRender: tmp });
  }
  addImages () {
    let nr = this.state.inCart;
    let prod = this.state.products;
    console.log ("now");
    console.log (prod);
    let hlp;
    let i;
    for (i=0; i<nr; i++) {
      hlp = prod[i]['idname'];
      console.log ("hlp:");
      console.log (hlp);
      this.getImagesPrice (hlp);
    }
  }
  delProductFromCart (e) {
    this.setState({ visibility: 'invisible' });
    let idTmp = e.currentTarget.id;
    let id = idTmp.substring(1);
    fetch(API_SERVER + 'listen.php?part=delproductfromcart&id=' + id + '&sessiontoken=' + session, {mode: 'no-cors'})
    setTimeout(this.reload, 1000);
  }
  reload () {
    window.location.href = "/checkout";
  }
  myAccount () {
    window.location.href = "/my-account";
  }
  trashHover () {
    this.setState({ trash: './trash-b.png' });
  }
  trashNormal () {
    this.setState({ trash: './trash.png' });
  }
  pressedCheckout () {
    if (this.state.checked == '0') {
      this.amILoggedIn();
    } else {
      let loggedIn = this.state.loggedIn;
      if (loggedIn == 'no') {
        this.myAccount ();
      } else {
        this.setState({ showPaypal: 'showPaypal' });
      }
    }
  }
  getAmount () {
    let nr = this.state.inCart;
    let prod = this.state.products;
    let amount;
    let id = [];
    let i;
    let tm1;
    let tm2;
    let tmp = [];
    let tmpId = [];
    for (i=0; i<nr; i++) {
      id[i] = prod[i]['id'];
      fetch(API_SERVER + 'listen.php?part=getamountincart&id=' + id[i] + '&pin=558240')
      .then(response => response.json())
  		.then(output => {
        let data = output;
        tm1 = data['amount'];
        tm2 = data['id'];
        tmp.push({ tm1 });
        tmpId.push({ tm2 });
        //console.log (this.state.products);
      })
      .catch(error => console.log(error.message));
    }
    this.setState({ amount: tmp }, () => { console.log (this.state.amount); });
    this.setState({ amountId: tmpId }, () => { console.log (this.state.amountId); });
    this.createProductRender ();
  }

  changeAmount (e) {
    let idTmp = e.currentTarget.id;
    let id = idTmp.substr(1);
    let value = e.currentTarget.value;
    fetch(API_SERVER + 'listen.php?part=setamountincart&id=' + id + '&amount=' + value + '&pin=558240', {mode: 'no-cors'})
  }

  changeSize (e) {}

  handleCouponChange (event) {
    let tmp = event.target.value;
    let text = tmp.toLowerCase();
    this.setState({priceModifier: 1}, () => { });
    this.setState({coupon: text}, () => { if (text == 'mynafriend10') { this.setState({priceModifier: 0.9}, () => { }); } });
    this.setState({coupon: text}, () => { if (text == 'mynagift15') { this.setState({priceModifier: 0.85}, () => { }); } });
    setTimeout(this.getPrice, 200);
  }
  getUserAddress () {
    fetch(API_SERVER + 'listen.php?part=getaddressdata&email=' + this.state.myEmail + '&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let valid = data['success'];
      let tmp = data['addressdata'];
      let type = tmp['type'];
      let name = tmp['name'];
      let mobile = tmp['mobile'];
      let address1 = tmp['address1'];
      let address2 = tmp['address2'];
      let city = tmp['city'];
      let state = tmp['state'];
      let zip = tmp['zip'];
      let country = tmp['country'];
      let comment = tmp['comment'];
      if (this.state.loggedIn == 'yes') {
        if (valid == '0') { this.myAccount (); }
        if (type == '0') { this.myAccount (); }
        if (address1 == '0') { this.myAccount (); }
        if (city == '0') { this.myAccount (); }
        if (country == '0') { this.myAccount (); }
        if (zip == '0') { this.myAccount (); }
      }
    })
    .catch(error => console.log(error.message));
    this.getAmount ();
  }

  componentDidMount() {
    this.getProductsInCart();
    this.getInCart();
    this.getPrice ();
    this.getShipping ();
    setTimeout(this.getUserAddress, 500);
  }

  render() {
		return (
			<Container fluid>
      <Header />
        <Nav />
        <Ping />
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-12 ce capitalLetters">
            <h2><strong>Your Loved Pieces</strong></h2>
            {this.state.emptyCartAlert}
          </div>
        </div>
        <div className="spacer25px" />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            Cart / {this.state.inCart} items
            <hr />
            <div className={this.state.visibility}>
              {this.state.productRender}
            </div>
            <div className="spacer50px" />
            <div className="row">
              <div className="col-md-4">
                <div className="noBorder mediumFont ceMob"><a href="/shop-collections"><button className="startshoppingButton">CONTINUE SHOPPING</button></a></div>
              </div>
              <div className="col-md-4 ce">
                <p className="capitalLetters">Total: €{this.state.price}</p>
                <p className="capitalLetters">incl. {this.state.shipping ? this.state.shipping : 'free shipping'}</p>
                <p><input type="text" value={this.state.coupon} onChange={this.handleCouponChange} placeholder="Coupon code" /></p>
              </div>
              <div className="col-md-4">
                <div className="noBorder mediumFont right ceMob"><button className="cartButton" onClick={this.pressedCheckout}>CHECKOUT</button></div>
                <div className={this.state.showPaypal}>
                  <PayPal dataFromParent = {this.state.price} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>


        <Footer />
      </Container>
		);
	}
}
