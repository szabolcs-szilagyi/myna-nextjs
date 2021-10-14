export default class ShopCollections {
  productCards() {
    return cy.getByDataCy('product-card');
  }
}
