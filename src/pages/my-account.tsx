import 'reflect-metadata';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import countryList from "react-select-country-list";
import Container from "react-bootstrap/Container";
import useTranslation from "next-translate/useTranslation";

import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getUserData, saveUserData } from "../services/user-data";

export default function MyAccount() {
  const router = useRouter();
  const { t } = useTranslation("my-account");

  const options = countryList().getData();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: null as any,
    comment: ""
  });

  const [saveButtonText, setSaveButtonText] = useState("SAVE & CHECKOUT");

  useEffect(() => {
    getUserData().then(retrievedUserData => {
      setUserData({
        ...retrievedUserData,
        country: { label: retrievedUserData.country }
      } as any);
    });
  }, []);

  const handleSelectChange = (name: string) => (value: any) => {
    setUserData({
      ...userData,
      [name]: value
    });
  };

  function handleInputChange({ target: { value, name } }) {
    setUserData({
      ...userData,
      [name]: value
    });
  }

  async function saveDetails() {
    try {
      await saveUserData({
        ...userData,
        country: userData?.country?.label
      });

      setSaveButtonText("SAVED");

      setTimeout(() => {
        router.push("/checkout");
      }, 1500);
    } catch (error) {
      console.log(error.message, error.errors);
    }
  }

  return (
    <Container fluid>
      <Header />
      <Nav />
      <div className="spacer10px" />
      <div className="row">
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
                value={userData.name}
                name="name"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* NAME")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={userData.email}
                name="email"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* EMAIL")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={userData.mobile}
                name="mobile"
                onChange={handleInputChange}
                maxLength={32}
                placeholder={t("* MOBILE NUMBER")}
              />
              <div className="spacer10px" />
              <div data-cy="countrySelector">
                <Select
                  className="userDetails"
                  options={options}
                  value={userData.country}
                  onChange={handleSelectChange("country")}
                />
              </div>
              <div className="spacer10px" />
              <div className="paddingtop5px" data-cy="countryConfirmation">
                {t("* Country")}: {userData.country?.label}
              </div>
              <div className="spacer10px" />
            </div>
            <div className="col-md-4">
              <div className="spacer25px" />
              <input
                className="userDetails"
                type="text"
                value={userData.addressLine1}
                name="addressLine1"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* ADDRESS LINE 1")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={userData.addressLine2}
                name="addressLine2"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("ADDRESS LINE 2")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={userData.state}
                name="state"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* STATE")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={userData.city}
                name="city"
                onChange={handleInputChange}
                maxLength={128}
                placeholder={t("* CITY")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={userData.zip}
                name="zip"
                onChange={handleInputChange}
                maxLength={64}
                placeholder={t("* POSTAL CODE")}
              />
              <div className="spacer10px" />
              <input
                className="userDetails"
                type="text"
                value={userData.comment}
                name="comment"
                onChange={handleInputChange}
                maxLength={64}
                placeholder={t("COMMENT")}
              />
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
                  data-cy="saveAddressButton"
                >
                  {t(saveButtonText)}
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
