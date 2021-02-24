import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import {API_SERVER as API_SERVER} from '../src/constants';
import Cookies from 'universal-cookie';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import "../src/styles.css";
const cookies = new Cookies();
const session = cookies.get('session');

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.options = countryList().getData();

    this.state = {
      options: this.options,
      value: null,
      myEmail: '',
      loginOrEdit: 'login',
      inputEmail: '',
      loginEmail: '',
      loginToken: '',
      textOnLoginButton: 'SUBMIT',
      textOnSaveButton: 'SAVE & CHECKOUT',
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
      dMobile: ''
    };

    this.setLabel = this.setLabel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange7 = this.handleChange7.bind(this);
    this.handleChange8 = this.handleChange8.bind(this);
    this.handleChange9 = this.handleChange9.bind(this);
    this.handleChange10 = this.handleChange10.bind(this);
    this.handleChange11 = this.handleChange11.bind(this);
    this.amILoggedIn = this.amILoggedIn.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.createToken = this.createToken.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.saveDetails = this.saveDetails.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.saveAddressData = this.saveAddressData.bind(this);
    this.loadAddressData = this.loadAddressData.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.redirect = this.redirect.bind(this);

  }

  changeHandler = value => {
    this.setState({ value }, () => {  });
    setTimeout(this.setLabel, 500);
  }

  setLabel () {
    let tmp = this.state.value;
    let tmp2 = tmp["label"];
    this.setState({ dCountry: tmp2 }, () => { console.log (this.state.dCountry); });
  }
  handleChange (event) {
    this.setState({inputEmail: event.target.value}, () => { });
  }
  handleChange1 (event) {
    this.setState({firstName: event.target.value}, () => { });
  }
  handleChange2 (event) {
    this.setState({lastName: event.target.value}, () => { });
  }
  handleChange3 (event) {
    this.setState({birthday: event.target.value}, () => { });
  }
  handleChange4 (event) {
    this.setState({dMobile: event.target.value}, () => { });
  }
  handleChange5 (event) {
    this.setState({dAddress1: event.target.value}, () => { });
  }
  handleChange6 (event) {
    this.setState({dAddress2: event.target.value}, () => { });
  }
  handleChange7 (event) {
    this.setState({dCity: event.target.value}, () => { });
  }
  handleChange8 (event) {
    this.setState({dState: event.target.value}, () => { });
  }
  handleChange9 (event) {
    this.setState({dZip: event.target.value}, () => { });
  }
  handleChange10 (event) {
    this.setState({dCountry: event.target.value}, () => { });
  }
  handleChange11 (event) {
    this.setState({dComment: event.target.value}, () => { });
  }
  amILoggedIn () {
    fetch(API_SERVER + 'listen.php?part=amiloggedin&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['email'];
      if (tmp != "nodata") {
        this.setState({ myEmail: tmp, loginOrEdit: 'edit' });
      }
    })
    .catch(error => console.log(error.message));
  }
  sendLogin () {
    setTimeout(this.createToken, 100);
    setTimeout(this.sendMail, 500);
  }
  createToken () {
    fetch(API_SERVER + 'listen.php?part=loginmail&email=' + this.state.inputEmail)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp1 = data['email'];
      let tmp2 = data['logintoken'];
      this.setState({ loginEmail: tmp1, loginToken: tmp2 });
    })
    .catch(error => console.log(error.message));
  }
  sendMail () {
    //fetch(API_SERVER + 'amazon-ses-smtp.php?part=login&email=' + this.state.loginEmail + '&token=' + this.state.loginToken, {mode: 'no-cors'});
    //this.setState({ textOnLoginButton: 'SENT' });
    let url = "/autologin?part=login&token=" + this.state.loginToken + "&email=" + this.state.loginEmail;
    window.location.href = url;
  }
  saveDetails () {
    let crossRoad;
    crossRoad = 0;
    if (this.state.myEmail == '') { crossRoad = 1; }
    if (this.state.firstName == '') { crossRoad = 1; }
    if (this.state.lastName == '') { crossRoad = 1; }
    if (this.state.birthday == '') { crossRoad = 1; }
    if (this.state.dCountry == '') { crossRoad = 1; }
    if (this.state.dAddress1 == '') { crossRoad = 1; }
    if (this.state.dCity == '') { crossRoad = 1; }
    if (this.state.zip == '') { crossRoad = 1; }
    if (crossRoad == 0) {
      this.saveUserData ();
      setTimeout(this.saveAddressData, 1000);
      this.setState({ textOnSaveButton: 'SAVED' })
      setTimeout(this.redirect, 1500);
    }
  }
  saveUserData () {
    let email = this.state.myEmail;
    let fname = this.state.firstName;
    let lname = this.state.lastName;
    let bday = this.state.birthday;
    let crossRoad;
    crossRoad = 0;
    if (email == '') { crossRoad = 1; }
    if (fname == '') { crossRoad = 1; }
    if (lname == '') { crossRoad = 1; }
    if (bday == '') { crossRoad = 1; }
    if (crossRoad == 0) {
      fetch(API_SERVER + 'listen.php?part=updateuserdata&email=' + this.state.myEmail + '&firstname=' + this.state.firstName + '&lastname=' + this.state.lastName + '&birthday=' + this.state.birthday  + '&sessiontoken=' + session)
      .then(response => response.json())
		  .then(output => {
        let data = output;
        let tmp = data['success'];
      })
      .catch(error => console.log(error.message));
    }
  }
  loadUserData () {
    fetch(API_SERVER + 'listen.php?part=getuserdata&email=' + this.state.myEmail + '&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['userdata'];
      let firstNameT = tmp['firstname'];
      let lastNameT = tmp['lastname'];
      let birthdayT = tmp['birthday'];
      if (firstNameT == 'nodata') { firstNameT = ''; }
      if (lastNameT == 'nodata') { lastNameT = ''; }
      if (birthdayT == '1901-01-01') { birthdayT = ''; }
      this.setState({ firstName: firstNameT, lastName: lastNameT, birthday: birthdayT });
    })
    .catch(error => console.log(error.message));
  }
  saveAddressData () {
    let address1 = this.state.dAddress1;
    let city = this.state.dCity;
    let zip = this.state.zip;
    let crossRoad;
    crossRoad = 0;
    if (address1 == '') { crossRoad = 1; }
    if (city == '') { crossRoad = 1; }
    if (zip == '') { crossRoad = 1; }
    if (crossRoad == 0) {
      fetch(API_SERVER + 'listen.php?part=setaddressdata&email=' + this.state.myEmail + '&type=1&mobile=' + this.state.dMobile + '&address1=' + this.state.dAddress1 + '&address2=' + this.state.dAddress2 + '&city=' + this.state.dCity + '&state=' + this.state.dState + '&zip=' + this.state.dZip + '&country=' + this.state.dCountry + '&comment=' + this.state.dComment  + '&sessiontoken=' + session)
      .then(response => response.json())
		  .then(output => {
        let data = output;
        let tmp = data['success'];
      })
      .catch(error => console.log(error.message));
    }
  }
  loadAddressData () {
    fetch(API_SERVER + 'listen.php?part=getaddressdata&email=' + this.state.myEmail + '&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['addressdata'];
      let type = tmp['type'];
      let mobile = tmp['mobile'];
      let address1 = tmp['address1'];
      let address2 = tmp['address2'];
      let city = tmp['city'];
      let state = tmp['state'];
      let zip = tmp['zip'];
      let country = tmp['country'];
      let comment = tmp['comment'];
      if (mobile == '0') { mobile = ''; }
      if (address1 == '0') { address1 = ''; }
      if (address2 == '0') { address2 = ''; }
      if (city == '0') { city = ''; }
      if (country == '0') { country = ''; }
      if (zip == '0') { zip = ''; }
      this.setState({ dMobile: mobile, dAddress1: address1, dAddress2: address2, dCity: city, dState: state, dZip: zip, dCountry: country, dComment: comment });
    })
    .catch(error => console.log(error.message));
  }
  checkEmail () {
    fetch(API_SERVER + 'listen.php?part=getemail&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['email'];
      this.setState({ myEmail: tmp });
    })
    .catch(error => console.log(error.message));
  }
  redirect () {
    window.location.href = "/checkout";
  }

  componentDidMount() {
    setTimeout(this.amILoggedIn, 100);
    setTimeout(this.checkEmail, 300);
    //setTimeout(this.loadUserData, 900);
    //setTimeout(this.loadAddressData, 1000);
  }
  render() {
    if (this.state.loginOrEdit == 'login') {
      return (
        <Container fluid>
          <Header />
          <Nav />
          <Ping />
            <div className="spacer50px" />
            <div className="row">
              <div className="col-md-12 ce capitalLetters">
                <h2><strong>Login to your account</strong></h2>
                <p>Please give your email address to continue</p>
                <div className="spacer50px" />
                <input className="loginEmail" type="text" value={this.state.inputEmail} onChange={this.handleChange} maxLength="128" placeholder="enter your email here" />
                <div className="spacer50px" />
                <div className="noBorder mediumFont"><button type="button" className="cartButton" onClick={this.sendLogin}>{this.state.textOnLoginButton}</button></div>
              </div>
            </div>
            <Footer />
        </Container>
      );
    }
    if (this.state.loginOrEdit == 'edit') {
      return (
        <Container fluid>
          <Header />
          <Nav />
          <Ping />
            <div className="spacer10px" />
            <div className="row">
              <div className="col-md-12 ce capitalLetters">
                <h2><strong>Your account</strong></h2>
                <div className="row">
                  <div className="col-md-2" />
                  <div className="col-md-4">
                    <div className="spacer25px" />
                    <input className="userDetails" type="text" value={this.state.firstName} onChange={this.handleChange1} maxLength="128" placeholder="* NAME" />
                    <div className="spacer10px" />
                    <input className="userDetails" type="text" value={this.state.lastName} onChange={this.handleChange2} maxLength="128" placeholder="* SURNAME" />
                    <div className="spacer10px" />
                    <input className="userDetails" type="text" value={this.state.birthday} onChange={this.handleChange3} maxLength="10" placeholder="* DATE OF BIRTH (YYYY-MM-DD)" />
                    <div className="spacer10px" />
                    <input className="userDetails" type="text" value={this.state.dMobile} onChange={this.handleChange4} maxLength="32" placeholder="* MOBILE NUMBER" />
                    <div className="spacer10px" />
                    <Select className="userDetails"
                      options={this.state.options}
                      value={this.state.value}
                      onChange={this.changeHandler}
                    />
                    <div className="spacer10px" />
                  </div>
                  <div className="col-md-4">
                    <div className="spacer25px" />
                    <input className="userDetails" type="text" value={this.state.dAddress1} onChange={this.handleChange5} maxLength="128" placeholder="* ADDRESS LINE 1" />
                    <div className="spacer10px" />
                    <input className="userDetails" type="text" value={this.state.dAddress2} onChange={this.handleChange6} maxLength="128" placeholder="ADDRESS LINE 2" />
                    <div className="spacer10px" />
                    <input className="userDetails" type="text" value={this.state.dCity} onChange={this.handleChange7} maxLength="128" placeholder="* CITY" />
                    <div className="spacer10px" />
                    <input className="userDetails" type="text" value={this.state.dZip} onChange={this.handleChange9} maxLength="64" placeholder="* POSTAL CODE" />
                    <div className="spacer10px" />
                    <div className="paddingtop5px">* Country: {this.state.dCountry}</div>
                    <div className="spacer10px" />
                  </div>
                  <div className="col-md-2" />
                </div>
                <div className="row">
                  <div className="col-md-12 ce">
                    <div className="spacer10px" />
                    <div className="noBorder mediumFont"><button type="button" className="cartButton" onClick={this.saveDetails}>{this.state.textOnSaveButton}</button></div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
        </Container>
      );
    }
	}
}
