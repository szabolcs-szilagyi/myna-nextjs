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

  it('first expects e-mail to be filled', () => {
    cy.get('p').should('contain.text', 'give your email address');
    myAccount.provideEmailAddress('asdf@asdf.asd');

    myAccount.nameInput().should('have.attr', 'placeholder');
  });

  it('accepts correctly filled user details', () => {
    myAccount.provideEmailAddress('asdf@asdf2.asd');
    myAccount.fillAccountDetails({
      name: 'first name',
      surname: 'last name',
      dob: '1234-12-12',
      mobile: '12345',
      country: 'poland',
      address1: 'asdf',
      address2: 'asdf2',
      city: 'fdsa',
      postcode: 'PL-1234'
    });

    myAccount.countryConfirmation().invoke('text').should('match', /poland/i);

    myAccount.saveAddressButton().click();
    myAccount.saveAddressButton().invoke('text').should('match', /saved/i);

    cy.wait(100);

    cy.url().should('match', /checkout$/);
  })

  it('will not take partial details', () => {
    myAccount.provideEmailAddress('asdf@asdf2.asd');
    myAccount.fillAccountDetails({
      name: 'first lll',
      surname: '',
      dob: '1234-12-12',
      mobile: '12345',
      country: 'hungary',
      address1: '',
      address2: 'asdf2',
      city: 'fdsa',
      postcode: 'PL-1234'
    });

    myAccount.countryConfirmation().invoke('text').should('match', /hungary/i);

    myAccount.saveAddressButton().click();
    myAccount.saveAddressButton().invoke('text').should('match', /save & checkout/i);

    cy.wait(100);

    cy.url().should('match', /my-account$/);
  })
});
