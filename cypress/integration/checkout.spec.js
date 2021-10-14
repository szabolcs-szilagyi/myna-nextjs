/// <reference types="cypress" />

describe('checkout', () => {
  it('gives link to shop-collections if cart is empty')
  it('correctly sums up the product prices')
  it('can remove products from the cart and update price accordingly')
  it('is able to apply valid coupon code')
  it('will ignore non-valid coupon code')
  describe('shipping fee', () => {
    it('warns user about the extra shipping fee')
    it('for europe will charge 10€')
    it('for outside of eu will charge 25€')
    it('for poland will be free')
  });
  describe('checkout button', () => {
    it('will redirect to my-account on first load/visit')
    it('will show paypal button if user already logged in')
  });
});
