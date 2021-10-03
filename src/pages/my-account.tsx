import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import countryList from "react-select-country-list";
import Container from "react-bootstrap/Container";
import useTranslation from "next-translate/useTranslation";

import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import usePing from "../lib/use-ping";
import {
  getLoggedinEmail,
  loginWithEmail,
  saveAddressData,
  saveUserData
} from "../services";

export default function MyAccount() {
  const router = useRouter();
  const { t } = useTranslation("my-account");
  const [session] = usePing();

  const options = countryList().getData();

  const [addressState, setAddressState] = useState({
    value: null,
    myEmail: "",
    loginOrEdit: "login",
    inputEmail: "",
    loginEmail: "",
    loginToken: "",
    textOnSaveButton: "SAVE & CHECKOUT",
    firstName: "",
    lastName: "",
    birthday: "",
    dName: "",
    dAddress1: "",
    dAddress2: "",
    dCity: "",
    dState: "",
    dZip: "",
    dCountry: "" as any,
    dComment: "",
    dMobile: ""
  });

  useEffect(() => {
    amILoggedIn();
  }, []);

  const handleSelectChange = name => value => {
    setAddressState({
      ...addressState,
      [name]: value
    });
  };

  function handleInputChange({ target: { value, name } }) {
    setAddressState({
      ...addressState,
      [name]: value
    });
  }

  async function amILoggedIn() {
    try {
      const loggedInEmail = await getLoggedinEmail(session);

      if (loggedInEmail !== null) {
        setAddressState({
          ...addressState,
          myEmail: loggedInEmail,
          loginOrEdit: "edit"
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createToken() {
    try {
      const loginData = await loginWithEmail(addressState.inputEmail, session);
      setAddressState({
        ...addressState,
        loginEmail: loginData.email,
        loginToken: loginData.loginToken,
        myEmail: loginData.email,
        loginOrEdit: "edit"
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function saveDetails() {
    try {
      await saveUserData(
        {
          email: addressState.myEmail,
          firstName: addressState.firstName,
          lastName: addressState.lastName,
          birthday: addressState.birthday
        },
        session
      );

      await saveAddressData(
        {
          email: addressState.myEmail,
          mobile: addressState.dMobile,
          address1: addressState.dAddress1,
          address2: addressState.dAddress2,
          city: addressState.dCity,
          state: addressState.dState,
          zip: addressState.dZip,
          country: addressState.dCountry,
          comment: addressState.dComment
        },
        session
      )

      setAddressState({
        ...addressState,
        textOnSaveButton: "SAVED"
      });

      setTimeout(() => {
        router.push("/checkout");
      }, 1500);
    } catch (error) {
      console.log(error.message, error.data);
    }
  }

  return (
    <Container fluid>
      <Header />
      <Nav />
      <div className="spacer10px" />
      <div
        className={addressState.loginOrEdit === "login" ? "row" : "row d-none"}
      >
        <div className="col-md-12 ce capitalLetters">
          <h1>
            <strong>{t("Login to your account")}</strong>
          </h1>
          <p>{t("Please give your email address to continue")}</p>
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
            <button type="button" className="cartButton" onClick={createToken}>
              {t("SUBMIT")}
            </button>
          </div>
        </div>
      </div>

      <div
        className={addressState.loginOrEdit === "edit" ? "row" : "row d-none"}
      >
        <div className="col-md-12 ce capitalLetters">
          <h1>
            <strong>{t("Your account")}</strong>
          </h1>
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
                onChange={handleSelectChange("dCountry")}
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
              <div className="paddingtop5px">
                {t("* Country")}: {addressState.dCountry.label}
              </div>
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
                  className="cartButton col-md-2"
                  onClick={saveDetails}
                >
                  {t(addressState.textOnSaveButton)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
