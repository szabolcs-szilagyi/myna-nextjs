export default class Header {
  languageSwitcher() {
    return cy.getByDataCy('language-switcher');
  }

  shopCollectionsLink() {
    return cy.getByDataCy('shop-collections-link');
  }

  lookbookLink() {
    return cy.getByDataCy('lookbook-link');
  }
}
