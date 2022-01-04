/// <reference types="cypress" />
export default class MyAccount {
  emailInput() {
    return cy.getInputByName('email');
  }

  nameInput() {
    return cy.getInputByName('name');
  }

  mobileInput() {
    return cy.getInputByName('mobile');
  }

  countryDropdown() {
    return cy.getByDataCy('countrySelector');
  }

  address1Input() {
    return cy.getInputByName('addressLine1');
  }

  address2Input() {
    return cy.getInputByName('addressLine2');
  }

  cityInput() {
    return cy.getInputByName('city');
  }

  stateInput() {
    return cy.getInputByName('state');
  }

  postcodeInput() {
    return cy.getInputByName('zip');
  }

  commentInput() {
    return cy.getInputByName('comment');
  }

  countryConfirmation() {
    return cy.getByDataCy('countryConfirmation');
  }

  saveAddressButton() {
    return cy.getByDataCy('saveAddressButton');
  }

  /**
   * @typedef AccountDetails
   * @type {object}
   * @property {string} name
   * @property {string} email
   * @property {string} mobile
   * @property {string} addressLine1 - street and house number
   * @property {string} addressLine2 - floor and door number
   * @property {string} city
   * @property {string} state
   * @property {string} zip
   * @property {string} country
   * @property {string} comment - extra comment for delivery
   */

  /**
   * @param {AccountDetails} details
   */
  fillAccountDetails(details) {
    [
      [() => this.nameInput()     , 'name'],
      [() => this.emailInput()    , 'email'],
      [() => this.mobileInput()   , 'mobile'],
      [() => this.address1Input() , 'addressLine1'],
      [() => this.address2Input() , 'addressLine2'],
      [() => this.cityInput()     , 'city'],
      [() => this.stateInput()    , 'state'],
      [() => this.postcodeInput() , 'zip'],
      [() => this.commentInput()  , 'comment'],
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
