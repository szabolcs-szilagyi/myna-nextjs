export default class Footer {
  emailInput() {
    return cy.get('input[name=emailNewsletter]');
  }

  navigationLinksContainer() {
    return cy.getByDataCy('navigation-links-container');
  }
}
