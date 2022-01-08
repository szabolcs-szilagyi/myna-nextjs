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

  it('loads user data for editing from session');
});
