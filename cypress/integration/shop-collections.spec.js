/// <reference types="cypress" />
const baseUrl = Cypress.config('baseUrl');

import ShopCollections from '../pages/shop-collections';
const shopCollections = new ShopCollections();

describe('shop-collections', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
    cy.visit(`${baseUrl}/shop-collections`);
  });

  it('has product images with names and prices when hovered', () => {
    shopCollections.productCards().each(async ($card) => {
      $card.mouseenter();

      const nameFromLink = $card.find('a').attr('href').replace(/\/([a-z]+).*/g, '$1');
      expect($card.find('p').text()).to.match(new RegExp(nameFromLink, 'i'))
      expect($card.find('span').text()).to.match(/€[\d]+/)
    });
  })
});
