/// <reference types="cypress" />

export default class Checkout {
  emptyCartMessagePane() {
    return cy.getByDataCy('emptyCartMessagePane');
  }

  totalPrice() {
    return cy.getByDataCy('totalPrice');
  }

  shippingPriceInfo() {
    return cy.getByDataCy('shippingPriceInfo');
  }

  deleteButton() {
    return cy.getByDataCy('deleteButton');
  }

  cartItems() {
    return cy.getByDataCy('cartItems');
  }

  couponInput() {
    return cy.getByDataCy('couponInput');
  }

  payPalHolder() {
    return cy.getByDataCy('payPalHolder');
  }

  checkoutButton() {
    return cy.getByDataCy('checkoutButton');
  }
}
