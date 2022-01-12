/// <reference types="cypress" />
const baseUrl = Cypress.config('baseUrl');

import MyAccount from '../pages/my-account';
const myAccount = new MyAccount();

describe('my-account', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport('macbook-13')
    cy.visit(`${baseUrl}/my-account`);
  });

  it('accepts correctly filled user details', () => {
    myAccount.fillAccountDetails({
      name: 'test elek',
      email: 'test@elek.pl',
      mobile: '12345',
      addressLine1: 'asdf',
      addressLine2: 'asdf2',
      city: 'fdsa',
      state: 'state',
      zip: 'PL-1234',
      country: 'poland',
    });

    myAccount.countryConfirmation().invoke('text').should('match', /poland/i);

    myAccount.saveAddressButton().click();
    myAccount.saveAddressButton().invoke('text').should('match', /saved/i);

    cy.wait(100);

    cy.url().should('match', /checkout$/);
  })

  it('will not take partial details', () => {
    myAccount.fillAccountDetails({
      mobile: '12345',
      addressLine1: '',
      addressLine2: 'asdf2',
      city: 'fdsa',
      state: 'state2',
      zip: 'PL-1234',
      country: 'hungary',
    });

    myAccount.countryConfirmation().invoke('text').should('match', /hungary/i);

    myAccount.saveAddressButton().click();
    myAccount.saveAddressButton().invoke('text').should('match', /save & checkout/i);

    cy.wait(100);

    cy.url().should('match', /my-account$/);
  })

  it('loads user data for editing from session', () => {
    myAccount.fillAccountDetails({
      name: 'test elek tra',
      email: 'test@elek.de',
      mobile: '0000000000000',
      addressLine1: 'add1',
      addressLine2: '',
      city: 'fdsa',
      state: 'state',
      zip: 'PL-1234',
      country: 'albania',
    });

    myAccount.countryConfirmation().invoke('text').should('match', /albania/i);

    myAccount.saveAddressButton().click();
    myAccount.saveAddressButton().invoke('text').should('match', /saved/i);

    cy.wait(2000);

    cy.url().should('match', /checkout$/);
    cy.visit('/my-account');

    myAccount.nameInput().invoke('val').should('eq', 'test elek tra');
    myAccount.emailInput().invoke('val').should('eq', 'test@elek.de');
    myAccount.mobileInput().invoke('val').should('eq', '0000000000000');
    myAccount.address1Input().invoke('val').should('eq', 'add1');
    myAccount.address2Input().invoke('val').should('be.empty');
    myAccount.cityInput().invoke('val').should('eq', 'fdsa');
    myAccount.stateInput().invoke('val').should('eq', 'state');
    myAccount.postcodeInput().invoke('val').should('eq', 'PL-1234');
    myAccount.countryConfirmation().invoke('text').should('match', /albania/i);
  });
});
