import React, { useState, Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import Cookies from 'universal-cookie';

import {
  PAY_PAL_CLIENT_ID,
  API_SERVER,
  API_PATH,
  EMAIL_PATH,
} from '../constants';

const cookies = new Cookies();
const session = cookies.get('session');

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myEmail: '',
      price: '',
      address: [],
      userDetails: [],
      productDetails: [],
      firstName: '',
      lastName: '',
      birthday: '',
      dName: '',
      dAddress1: '',
      dAddress2: '',
      dCity: '',
      dState: '',
      dZip: '',
      dCountry: '',
      dComment: '',
      dProducts: '',
      dMobile: ''
    };
    this.getPrice = this.getPrice.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getItToMail = this.getItToMail.bind(this);
    this.completed = this.completed.bind(this);
    this.setPaid = this.setPaid.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.getUserAddress = this.getUserAddress.bind(this);
    this.reload = this.reload.bind(this);
  }

  getPrice () {
    fetch(API_SERVER + API_PATH + '?part=totalcheckout&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['topay'];
      this.setState({ price: tmp });
    })
    .catch(error => console.log(error.message));
  }
  getEmail () {
    fetch(API_SERVER + API_PATH + '?part=getemail&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['email'];
      this.setState({ myEmail: tmp });
    })
    .catch(error => console.log(error.message));
  }
  getItToMail () {
    fetch(API_SERVER + API_PATH + '?part=getproducttomail&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['products'];
      this.setState({ dProducts: tmp });
    })
    .catch(error => console.log(error.message));
  }
  completed () {
    fetch(API_SERVER + API_PATH + '?part=getproductsincart&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      this.setState({ productDetails: data });
    })
    .catch(error => console.log(error.message));

    setTimeout(this.setPaid, 500);
    setTimeout(this.sendMail, 1000);
  }
  setPaid () {
    fetch(API_SERVER + API_PATH + '?part=setproductpaid&sessiontoken=' + session, {mode: 'no-cors'})
  }
  sendMail () {
    fetch(API_SERVER + EMAIL_PATH +'?part=purchased&email=' + this.state.myEmail + '&token=' + session
    + '&price=' + this.state.price
    + '&firstname=' + this.state.firstName
    + '&lastname=' + this.state.lastName
    + '&birthday=' + this.state.birthday
    + '&mobile=' + this.state.dMobile
    + '&address1=' + this.state.dAddress1
    + '&address2=' + this.state.dAddress2
    + '&city=' + this.state.dCity
    + '&state=' + this.state.dState
    + '&zip=' + this.state.dZip
    + '&country=' + this.state.dCountry
    + '&comment=' + this.state.dComment
    + '&products=' + this.state.dProducts
    , {mode: 'no-cors'})
  }
  getUserDetails () {
    fetch(API_SERVER + API_PATH + '?part=getuserdata&email=' + this.state.myEmail + '&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['userdata'];
      let firstNameT = tmp['firstname'];
      let lastNameT = tmp['lastname'];
      let birthdayT = tmp['birthday'];
      this.setState({ firstName: firstNameT, lastName: lastNameT, birthday: birthdayT });
    })
    .catch(error => console.log(error.message));
  }
  getUserAddress () {
    fetch(API_SERVER + API_PATH + '?part=getaddressdata&email=' + this.state.myEmail + '&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
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
      this.setState({ dName: name, dMobile: mobile, dAddress1: address1, dAddress2: address2, dCity: city, dState: state, dZip: zip, dCountry: country, dComment: comment });
    })
    .catch(error => console.log(error.message));
  }
  reload () {
    window.location.href = "/checkout";
  }
  componentDidMount () {
    this.getEmail ();
    this.getPrice ();
    setTimeout(this.getUserDetails, 500);
    setTimeout(this.getUserAddress, 1000);
    setTimeout(this.getItToMail, 1500);
  }

  render() {
    return (
      <PayPalButton
        amount={this.props.dataFromParent}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          // here to write the SUCCESS script
          this.completed();
          alert("We will contact you in email");
          setTimeout(this.reload, 2000);

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
}
