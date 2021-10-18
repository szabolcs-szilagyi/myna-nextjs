/// <reference types="cypress" />
export default class ProductPage {
  productTitle() {
    return cy.getByDataCy('productTitle');
  }

  /**
   * @param {(1 | 2 | 3 | 4)} number
   */
  image(number) {
    return cy.get(`#photo${number}`)
  }

  bigPhotoModal() {
    return cy.getByDataCy('bigPhotoModal');
  }

  /**
   * It finds the requested elements (button and pane) and it will give them
   * aliases.
   *
   * @param {('description' | 'compositionAndCare' | 'size' | 'delivery')} tabName
   * @returns void
   */
  tabButton(tabName) {
    cy.getByDataCy(`${tabName}Button`).as(`${tabName}Button`)
    cy.getByDataCy(`${tabName}Pane`).as(`${tabName}Pane`)
  }

  availablityIndicator() {
    return cy.getByDataCy('availablityIndicator');
  }

  sizeSelector() {
    return cy.getByDataCy('sizeSelector');
  }

  addToCartButton() {
    return cy.getByDataCy('addToCartButton');
  }

  /**
   * @param {string} alias - cypress alias of the product's price
   */
  getPriceAs(alias) {
    return this.productTitle().invoke('text').then((title) => {
      const price = title.replace(/.*€(\d+).*/, '$1');
      cy.wrap(parseFloat(price, 10)).as(alias);
    });
  }
}
