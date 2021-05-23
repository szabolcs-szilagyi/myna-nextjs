import { Component } from 'react';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Container from 'react-bootstrap/Container';

import {
  API_SERVER,
  API_PATH,
} from '../constants';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';

const cookies = new Cookies();
const session = cookies.get('session');

export default class MyAccount extends Component {
  options: any;
  state: any;

  constructor(props) {
    super(props);

    this.options = countryList().getData();

    this.state = {
      value: null,
      myEmail: '',
      loginOrEdit: 'login',
      inputEmail: '',
      loginEmail: '',
      loginToken: '',
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

    this.handleInputChange = this.handleInputChange.bind(this);

    this.amILoggedIn = this.amILoggedIn.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.createToken = this.createToken.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.saveDetails = this.saveDetails.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.saveAddressData = this.saveAddressData.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.redirect = this.redirect.bind(this);

  }

  handleSelectChange = name => value => {
    this.setState({ [name]: value });
  }

  handleInputChange({ target: { value, name } }) {
    console.log(name, value);
    this.setState({ [name]:  value });
  }

  amILoggedIn () {
    fetch(API_SERVER + API_PATH + '?part=amiloggedin&sessiontoken=' + session)
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
    fetch(API_SERVER + API_PATH + '?part=loginmail&email=' + this.state.inputEmail)
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
    if (this.state.dCountry?.label == '') { crossRoad = 1; }
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
      fetch(API_SERVER + API_PATH + '?part=updateuserdata&email=' + this.state.myEmail + '&firstname=' + this.state.firstName + '&lastname=' + this.state.lastName + '&birthday=' + this.state.birthday  + '&sessiontoken=' + session)
      .then(response => response.json())
		  .then(output => {
        let data = output;
        let tmp = data['success'];
      })
      .catch(error => console.log(error.message));
    }
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
      fetch(API_SERVER + API_PATH + '?part=setaddressdata&email=' + this.state.myEmail + '&type=1&mobile=' + this.state.dMobile + '&address1=' + this.state.dAddress1 + '&address2=' + this.state.dAddress2 + '&city=' + this.state.dCity + '&state=' + this.state.dState + '&zip=' + this.state.dZip + '&country=' + this.state?.dCountry.label + '&comment=' + this.state.dComment  + '&sessiontoken=' + session)
      .then(response => response.json())
		  .then(output => {
        let data = output;
        let tmp = data['success'];
      })
      .catch(error => console.log(error.message));
    }
  }

  checkEmail () {
    fetch(API_SERVER + API_PATH + '?part=getemail&sessiontoken=' + session)
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
                <h1><strong>Login to your account</strong></h1>
                <p>Please give your email address to continue</p>
                <div className="spacer50px" />
                <input
                  className="loginEmail"
                  type="text"
                  value={this.state.inputEmail}
                  name="inputEmail"
                  onChange={this.handleInputChange}
                  maxLength={128}
                  placeholder="enter your email here"
                />
                <div className="spacer50px" />
                <div className="noBorder mediumFont">
                  <button
                    type="button"
                    className="cartButton"
                    onClick={this.sendLogin}
                  >SUBMIT</button>
                </div>
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
                <h1><strong>Your account</strong></h1>
                <div className="row">
                  <div className="col-md-2" />
                  <div className="col-md-4">
                    <div className="spacer25px" />
                    <input
                      className="userDetails"
                      type="text"
                      value={this.state.firstName}
                      name="firstName"
                      onChange={this.handleInputChange}
                      maxLength={128}
                      placeholder="* NAME"
                    />
                    <div className="spacer10px" />
                    <input
                      className="userDetails"
                      type="text"
                      value={this.state.lastName}
                      name="lastName"
                      onChange={this.handleInputChange}
                      maxLength={128}
                      placeholder="* SURNAME"
                    />
                    <div className="spacer10px" />
                    <input
                      className="userDetails"
                      type="text"
                      value={this.state.birthday}
                      name="birthday"
                      onChange={this.handleInputChange}
                      maxLength={10}
                      placeholder="* DATE OF BIRTH (YYYY-MM-DD)"
                    />
                    <div className="spacer10px" />
                    <input
                      className="userDetails"
                      type="text"
                      value={this.state.dMobile}
                      name="dMobile"
                      onChange={this.handleInputChange}
                      maxLength={32}
                      placeholder="* MOBILE NUMBER"
                    />
                    <div className="spacer10px" />
                    <Select
                      className="userDetails"
                      options={this.options}
                      value={this.state.dCountry}
                      onChange={this.handleSelectChange('dCountry')}
                    />
                    <div className="spacer10px" />
                  </div>
                  <div className="col-md-4">
                    <div className="spacer25px" />
                    <input
                      className="userDetails"
                      type="text"
                      value={this.state.dAddress1}
                      name="dAddress1"
                      onChange={this.handleInputChange}
                      maxLength={128}
                      placeholder="* ADDRESS LINE 1"
                    />
                    <div className="spacer10px" />
                    <input
                      className="userDetails"
                      type="text"
                      value={this.state.dAddress2}
                      name="dAddress2"
                      onChange={this.handleInputChange}
                      maxLength={128}
                      placeholder="ADDRESS LINE 2"
                    />
                    <div className="spacer10px" />
                    <input
                      className="userDetails"
                      type="text"
                      value={this.state.dCity}
                      name="dCity"
                      onChange={this.handleInputChange}
                      maxLength={128}
                      placeholder="* CITY"
                    />
                    <div className="spacer10px" />
                    <input
                      className="userDetails"
                      type="text"
                      value={this.state.dZip}
                      name="dZip"
                      onChange={this.handleInputChange}
                      maxLength={64}
                      placeholder="* POSTAL CODE"
                    />
                    <div className="spacer10px" />
                    <div className="paddingtop5px">* Country: {this.state.dCountry.label}</div>
                    <div className="spacer10px" />
                  </div>
                  <div className="col-md-2" />
                </div>
                <div className="row">
                  <div className="col-md-12 ce">
                    <div className="spacer10px" />
                    <div className="noBorder mediumFont">
                      <button
                        type="button"
                        className="cartButton"
                        onClick={this.saveDetails}
                      >{this.state.textOnSaveButton}</button>
                    </div>
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
