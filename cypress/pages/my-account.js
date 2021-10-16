export default class MyAccount {
  emailSubmitButton() {
    return cy.getByDataCy('emailSubmitButton');
  }

  emailInput() {
    return cy.getInputByName('inputEmail');
  }

  nameInput() {
    return cy.getInputByName('firstName');
  }

  surnameInput() {
    return cy.getInputByName('lastName');
  }

  dobInput() {
    return cy.getInputByName('birthday');
  }

  mobileInput() {
    return cy.getInputByName('dMobile');
  }

  countryDropdown() {
    return cy.getByDataCy('countrySelector');
  }

  address1Input() {
    return cy.getInputByName('dAddress1');
  }

  address2Input() {
    return cy.getInputByName('dAddress2');
  }

  cityInput() {
    return cy.getInputByName('dCity');
  }

  postcodeInput() {
    return cy.getInputByName('dZip');
  }

  countryConfirmation() {
    return cy.getByDataCy('countryConfirmation');
  }

  saveAddressButton() {
    return cy.getByDataCy('saveAddressButton');
  }

  provideEmailAddress(email) {
    this.emailInput().type(email);

    this.emailSubmitButton().click();
  }

  /**
   * @typedef AccountDetails
   * @type {object}
   * @property {string} name
   * @property {string} surname
   * @property {string} dob - date of birth in the format: YYYY-MM-DD
   * @property {string} mobile
   * @property {string} country
   * @property {string} address1 - street and house number
   * @property {string} address2 - floor and door number
   * @property {string} city
   * @property {string} postcode
   */

  /**
   * @param {AccountDetails} details
   */
  fillAccountDetails(details) {
    [
      [() => this.nameInput()     , 'name'],
      [() => this.surnameInput()  , 'surname'],
      [() => this.dobInput()      , 'dob'],
      [() => this.mobileInput()   , 'mobile'],
      [() => this.address1Input() , 'address1'],
      [() => this.address2Input() , 'address2'],
      [() => this.cityInput()     , 'city'],
      [() => this.postcodeInput() , 'postcode'],
    ].forEach(([getInput, properyName]) => {
      const value = details[properyName];
      if (value) {
        getInput().type(details[properyName]);
      }
    });

    this.countryDropdown().click();
    this.countryDropdown()
      .find('div')
      .contains(details.country, { matchCase: false })
      .click({ force: true });
  }
}
