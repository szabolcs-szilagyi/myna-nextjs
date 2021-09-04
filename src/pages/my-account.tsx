import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation'

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

export default function MyAccount() {
  const router = useRouter();
  const { t } = useTranslation('my-account');

  const options = countryList().getData();

  const [addressState, setAddressState] = useState({
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
    dCountry: '' as any,
    dComment: '',
    dMobile: ''
  });

  useEffect(() => {
    amILoggedIn();
  }, []);

  const handleSelectChange = name => value => {
    setAddressState({
      ...addressState,
      [name]: value,
    });
  }

  function handleInputChange({ target: { value, name } }) {
    setAddressState({
      ...addressState,
      [name]: value,
    });
  }

  function amILoggedIn() {
    fetch(API_SERVER + API_PATH + '?part=amiloggedin&sessiontoken=' + session)
      .then(response => response.json())
      .then(data => {
        if (data.email != "nodata") {
          setAddressState({
            ...addressState,
            myEmail: data.email,
            loginOrEdit: 'edit'
          });
        }
      })
      .catch(error => console.log(error.message));
  }

  async function createToken() {
    return fetch(API_SERVER + API_PATH + '?part=loginmail&email=' + addressState.inputEmail)
      .then(response => response.json())
      .then(data => {
        setAddressState({
          ...addressState,
          loginEmail: data.email,
          loginToken: data.logintoken,
          myEmail: data.email,
          loginOrEdit: 'edit',
        });
        return fetch(API_SERVER + API_PATH + '?part=login&logintoken=' + data.logintoken + '&email=' + data.email + '&sessiontoken=' + session, {mode: 'no-cors'});
      })
      .catch(error => console.log(error.message));
  }

  function saveDetails () {
    let crossRoad = 0;
    if (addressState.myEmail == '') { crossRoad = 1; }
    if (addressState.firstName == '') { crossRoad = 1; }
    if (addressState.lastName == '') { crossRoad = 1; }
    if (addressState.birthday == '') { crossRoad = 1; }
    if (addressState.dCountry?.label == '') { crossRoad = 1; }
    if (addressState.dAddress1 == '') { crossRoad = 1; }
    if (addressState.dCity == '') { crossRoad = 1; }
    if (addressState.dZip == '') { crossRoad = 1; }
    if (crossRoad == 0) {
      saveUserData ();
      setTimeout(saveAddressData, 1000);
      setAddressState({
        ...addressState,
        textOnSaveButton: 'SAVED',
      })
      setTimeout(() => {
        router.push("/checkout");
      }, 1500);
    }
  }

  function saveUserData () {
    let email = addressState.myEmail;
    let fname = addressState.firstName;
    let lname = addressState.lastName;
    let bday = addressState.birthday;
    let crossRoad;
    crossRoad = 0;
    if (email == '') { crossRoad = 1; }
    if (fname == '') { crossRoad = 1; }
    if (lname == '') { crossRoad = 1; }
    if (bday == '') { crossRoad = 1; }
    if (crossRoad == 0) {
      fetch(API_SERVER + API_PATH + '?part=updateuserdata&email=' + addressState.myEmail + '&firstname=' + addressState.firstName + '&lastname=' + addressState.lastName + '&birthday=' + addressState.birthday  + '&sessiontoken=' + session)
        .then(response => response.json())
        .then(output => {
          let data = output;
          let tmp = data['success'];
        })
        .catch(error => console.log(error.message));
    }
  }

  function saveAddressData () {
    let address1 = addressState.dAddress1;
    let city = addressState.dCity;
    let zip = addressState.dZip;
    let crossRoad;
    crossRoad = 0;
    if (address1 == '') { crossRoad = 1; }
    if (city == '') { crossRoad = 1; }
    if (zip == '') { crossRoad = 1; }
    if (crossRoad == 0) {
      fetch(API_SERVER + API_PATH + '?part=setaddressdata&email=' + addressState.myEmail + '&type=1&mobile=' + addressState.dMobile + '&address1=' + addressState.dAddress1 + '&address2=' + addressState.dAddress2 + '&city=' + addressState.dCity + '&state=' + addressState.dState + '&zip=' + addressState.dZip + '&country=' + addressState?.dCountry.label + '&comment=' + addressState.dComment  + '&sessiontoken=' + session)
        .then(response => response.json())
        .then(output => {
          let data = output;
          let tmp = data['success'];
        })
        .catch(error => console.log(error.message));
    }
  }

  return (
    <Container fluid>
      <Header />
      <Nav />
      <Ping />
      <div className="spacer10px" />
      <div className={addressState.loginOrEdit === 'login' ? 'row' : 'row d-none'}>
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Login to your account')}</strong></h1>
          <p>{t('Please give your email address to continue')}</p>
          <div className="spacer50px" />
          <input
            className="loginEmail"
            type="text"
            value={addressState.inputEmail}
            name="inputEmail"
            onChange={handleInputChange}
            maxLength={128}
            placeholder={t("enter your email here")}
          />
          <div className="spacer50px" />
          <div className="noBorder mediumFont">
            <button
              type="button"
              className="cartButton"
              onClick={createToken}
            >{t('SUBMIT')}</button>
          </div>
        </div>
      </div>

      <div className={addressState.loginOrEdit === 'edit' ? 'row' : 'row d-none'}>
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Your account')}</strong></h1>
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-4">
              <div className="spacer25px" />
              <input
                className="userDetails"
                type="text"
                value={addressState.firstName}
                name="firstName"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* NAME")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={addressState.lastName}
                name="lastName"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* SURNAME")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={addressState.birthday}
                name="birthday"
                onChange={handleInputChange}
                maxLength={10}
                placeholder={t("* DATE OF BIRTH (YYYY-MM-DD)")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={addressState.dMobile}
                name="dMobile"
                onChange={handleInputChange}
                maxLength={32}
                placeholder={t("* MOBILE NUMBER")}
              />
              <div className="spacer10px" />
              <Select
                className="userDetails"
                options={options}
                value={addressState.dCountry}
                onChange={handleSelectChange('dCountry')}
              />
              <div className="spacer10px" />
            </div>
            <div className="col-md-4">
              <div className="spacer25px" />
              <input
                className="userDetails"
                type="text"
                value={addressState.dAddress1}
                name="dAddress1"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* ADDRESS LINE 1")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={addressState.dAddress2}
                name="dAddress2"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("ADDRESS LINE 2")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={addressState.dCity}
                name="dCity"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* CITY")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={addressState.dZip}
                name="dZip"
                onChange={handleInputChange}
                maxLength={64}
                placeholder={t("* POSTAL CODE")}
              />
              <div className="spacer10px" />
              <div className="paddingtop5px">{t('* Country')}: {addressState.dCountry.label}</div>
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
                  onClick={saveDetails}
                >{t(addressState.textOnSaveButton)}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
