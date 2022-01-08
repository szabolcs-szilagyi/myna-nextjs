/// <reference types="cypress" />
const baseUrl = Cypress.config('baseUrl');
const apiUrl = Cypress.config('apiUrl');
import Footer from '../pages/footer';
import Header from '../pages/header';
import Slider from '../pages/slider';
const footer = new Footer();
const header = new Header();
const slider = new Slider();

describe('landing page', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
    cy.visit(baseUrl);
  });

  it('shows the navigation menu', () => {
    const navMenu = () => cy.get('#basic-navbar-nav div');
    navMenu().should('have.length', 8)

    navMenu().first().should('have.text', 'Lookbook')
    navMenu().last().should('have.text', 'pl')
  })

  it('newsletter subscription works', () => {
    footer.emailInput().type('asdf@asdf.hu')
    cy.intercept({
      method: 'GET',
      url: `${apiUrl}/legacy?part=setnewslettersubscription&email=asdf%40asdf.hu`,
    }).as('subscriptionRequest');
    cy.get('button.nlsb').click();
    cy.wait('@subscriptionRequest').its('response.statusCode').should('eq', 201);

    footer.emailInput()
      .invoke('attr', 'placeholder')
      .should('eq', 'check your mailbox')
  });

  it('can change language to polish', () => {
    header.languageSwitcher().should('contain.text', 'pl');
    header.shopCollectionsLink().should('have.text', 'Shop')
    header.languageSwitcher().click().should('contain.text', 'en');
    header.shopCollectionsLink().should('have.text', 'Kolekcje')
  })

  it('has working link in the footer', () => {
    footer.navigationLinksContainer().find('a').eq(0).click();
    cy.get('h1').should('contain', 'Our Mission');
    cy.go('back');
    cy.wait(200)

    footer.navigationLinksContainer().find('a').eq(1).click();
    cy.get('h1').should('contain', 'Sustainability');
    cy.go('back');
    cy.wait(200)

    footer.navigationLinksContainer().find('a').eq(2).click();
    cy.get('h1').should('contain', 'Returns and Exchanges');
    cy.go('back');
    cy.wait(200)

    footer.navigationLinksContainer().find('a').eq(3).click();
    cy.get('h1').should('contain', 'Size and Measurements');
    cy.go('back');
    cy.wait(200)

    footer.navigationLinksContainer().find('a').eq(4).click();
    cy.get('h1').should('contain', 'Privacy');
    cy.get('h1').should('contain', 'Contact');
  })

  it('should have working links on all slides', () => {
    slider.linkButtons().eq(0).click({ force: true })
    cy.get('h1').should('contain', 'Our Mission');
    cy.go('back');
    cy.wait(200)

    slider.linkButtons().eq(1).click({ force: true })
    cy.get('h1').should('contain', 'Shop Collections');
    cy.go('back');
    cy.wait(200)

    slider.linkButtons().eq(2).click({ force: true })
    cy.get('h1').should('contain', 'Lookbook');
  });

  it('should have a working link to lookbook in navbar', () => {
    header.lookbookLink().click();
    cy.get('h1').should('contain', 'Lookbook');
  })
})
