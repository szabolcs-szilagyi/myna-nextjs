/// <reference types="cypress" />
import Checkout from '../pages/checkout';
import ProductPage from '../pages/product-page';
import MyAccount from '../pages/my-account';
const checkout = new Checkout();
const productPage = new ProductPage();
const myAccount = new MyAccount();

describe('checkout', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport('macbook-13')
  });

  describe('basic functionality', () => {
    it('gives link to shop-collections if cart is empty', () => {
      cy.visit('/checkout');
      checkout.emptyCartMessagePane().as('emptyCartMessagePane');
      cy.get('@emptyCartMessagePane').should('be.visible');
      cy.get('@emptyCartMessagePane').should('contain.text', 'START SHOPPING HERE');
      cy.get('@emptyCartMessagePane').should('contain.text', 'cart is empty');
    });

    it('can remove products from the cart and update price accordingly', () => {
      cy.visit('/checkout');
      checkout.emptyCartMessagePane().should('contain.text', 'START SHOPPING HERE');

      cy.visit('/lili-top');
      cy.intercept({ path: '*more-accurate-availability*' }).as('availablityCall');
      productPage.sizeSelector().select('M');
      cy.wait('@availablityCall');
      productPage.addToCartButton().click();
      productPage.getPriceAs('liliTopPrice');
      cy.go('back');

      checkout.totalPrice().parseFloat(/.*€(\d+).*/).shouldRef('equal', '@liliTopPrice');

      checkout.deleteButton().eq(0).click();

      checkout.cartItems().should('be.empty');
      checkout.totalPrice().parseFloat(/.*€(\d+).*/).should('equal', 0);
    });
  });

  describe('correctly sums up prices', () => {
    it('will correctly sums up one product price', () => {
      cy.visit('/checkout');
      checkout.emptyCartMessagePane().should('contain.text', 'START SHOPPING HERE');

      cy.visit('/lili-top');
      productPage.sizeSelector().select('M');
      productPage.addToCartButton().click();
      productPage.getPriceAs('liliTopPrice');
      cy.go('back');

      checkout.totalPrice().parseFloat(/.*€(\d+).*/).shouldRef('equal', '@liliTopPrice');
    });

    it('will correctly sum up for multiple prudcts as well', () => {
      cy.visit('/checkout');
      checkout.emptyCartMessagePane().should('contain.text', 'START SHOPPING HERE');

      cy.visit('/lili-top');
      productPage.sizeSelector().select('M');
      productPage.addToCartButton().click();
      productPage.getPriceAs('liliTopPrice');
      cy.go('back');

      cy.visit('/magna-scarf');
      productPage.addToCartButton().click();
      productPage.getPriceAs('magnaScarfPrice');
      cy.go('back');

      cy.visit('/alyss-dress');
      productPage.sizeSelector().select('ML');
      productPage.addToCartButton().click();
      productPage.getPriceAs('alyssDressPrice');
      cy.go('back');

      const total = { sum: 0 };
      cy.get('@liliTopPrice').then(p => { total.sum += p; });
      cy.get('@magnaScarfPrice').then(p => { total.sum += p; });
      cy.get('@alyssDressPrice').then(p => { total.sum += p; });
      cy.wrap(total).its('sum').as('totalPrice');

      cy.reload(); // TODO: we shouldn't need to reload the page to see all products

      checkout.totalPrice().parseFloat(/.*€(\d+).*/).shouldRef('equal', '@totalPrice');
    });
  });

  describe('coupon functionality', () => {
    it('is able to apply valid coupon code', () => {
      cy.visit('/checkout');

      cy.visit('/lili-top');
      productPage.sizeSelector().select('M');
      productPage.addToCartButton().click();
      productPage.getPriceAs('liliTopPrice');
      cy.go('back');

      checkout.totalPrice().parseFloat(/.*€(\d+).*/).shouldRef('equal', '@liliTopPrice');

      checkout.couponInput().type('mynafriend10');
      cy.wait(50);

      cy.get('@liliTopPrice').then((liliPrice) => {
        const newPrice = Math.floor(liliPrice * 0.90);
        checkout.totalPrice().parseFloat(/.*€(\d+).*/).should('equal', newPrice);
      });
    });

    it('will ignore non-valid coupon code', () => {
      cy.visit('/checkout');

      cy.visit('/lili-top');
      productPage.sizeSelector().select('M');
      productPage.addToCartButton().click();
      productPage.getPriceAs('liliTopPrice');
      cy.go('back');

      checkout.totalPrice().parseFloat(/.*€(\d+).*/).shouldRef('equal', '@liliTopPrice');

      checkout.couponInput().type('SOME RANDOM TEXT');
      cy.wait(50);

      checkout.totalPrice().parseFloat(/.*€(\d+).*/).shouldRef('equal', '@liliTopPrice');
    });
  });

  describe('shipping fee', () => {
    it('warns user about the extra shipping fee', () => {
      cy.visit('/checkout');
      checkout.shippingPriceInfo().invoke('text').should('match', /plus shipping fee/i);
    });

    it('for europe will charge 10€', () => {
      cy.visit('/checkout')
      cy.visit('/my-account');

      myAccount.provideEmailAddress('fromEU@test.eu');
      myAccount.fillAccountDetails({
        name: 'from',
        surname: 'eu',
        dob: '1234-12-12',
        mobile: '1234',
        address1: 'asdf street',
        city: 'das town',
        postcode: 'DE-1234',
        country: 'Germany',
      });
      myAccount.saveAddressButton().click();

      cy.visit('/checkout');
      checkout.shippingPriceInfo().invoke('text').should('match', /incl. €10/i);
    });

    it('for outside of eu will charge 25€', () => {
      cy.visit('/checkout')
      cy.visit('/my-account');

      myAccount.provideEmailAddress('fromUSA@test.com');
      myAccount.fillAccountDetails({
        name: 'from',
        surname: 'usa',
        dob: '1234-12-12',
        mobile: '1234',
        address1: 'yankee street',
        city: 'cowboy town',
        postcode: 'USA-1234',
        country: 'united states',
      });
      myAccount.saveAddressButton().click();

      cy.visit('/checkout');
      checkout.shippingPriceInfo().invoke('text').should('match', /incl. €25/i);
    });

    it('for poland will be free', () => {
      cy.visit('/checkout')
      cy.visit('/my-account');

      myAccount.provideEmailAddress('fromPoland@test.pl');
      myAccount.fillAccountDetails({
        name: 'from',
        surname: 'poland',
        dob: '1234-12-12',
        mobile: '1234',
        address1: 'pope street',
        city: 'mushroom town',
        postcode: 'PL-1234',
        country: 'poland',
      });
      myAccount.saveAddressButton().click();

      cy.visit('/checkout');
      checkout.shippingPriceInfo().invoke('text').should('match', /free shipping/i);
    });
  });

  describe('checkout button', () => {
    it('will redirect to my-account on first load/visit', () => {
      cy.visit('/checkout');
      checkout.payPalHolder().should('not.be.visible');
      checkout.checkoutButton().click();
      cy.url().should('include', 'my-account');
    });

    it('will show paypal button if user already logged in', () => {
      cy.visit('/checkout')
      cy.visit('/my-account');

      myAccount.provideEmailAddress('fromhungary@test.hu');
      myAccount.fillAccountDetails({
        name: 'from',
        surname: 'hungary',
        dob: '1234-12-12',
        mobile: '1234',
        address1: 'dope street',
        city: 't town',
        postcode: 'HU-1234',
        country: 'hungary',
      });
      myAccount.saveAddressButton().click();

      cy.visit('/checkout');
      checkout.checkoutButton().click();
      checkout.payPalHolder().should('be.visible');
    })
  });
});
