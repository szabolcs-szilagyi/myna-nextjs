/// <reference types="cypress" />

import ProductPage from '../pages/product-page';
import Header from '../pages/header';
const productPage = new ProductPage();
const header = new Header();

describe('product page', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport('macbook-13')
  });

  describe('has all the details of needed product (Lili Top)', () => {
    beforeEach(() => {
      cy.visit('/lili-top');
    });

    it('should be accessible via direct link', () => {
      productPage.productTitle().invoke('text').should('match', /lili top/i);
    });

    it('has three small clickable images', () => {
      productPage.image(1).invoke('attr', 'src').as('photo1src');

      productPage.image(2).as('photo2')
      cy.get('@photo2').invoke('attr', 'src').as('photo2src')
      cy.get('@photo2src').shouldRef('not.equal', '@photo1src')
      cy.get('@photo2').invoke('attr', 'src').as('photo2src')
      cy.get('@photo2').click();
      productPage.image(1).invoke('attr', 'src').shouldRef('equal', '@photo2src')

      productPage.image(3).as('photo3')
      cy.get('@photo3').invoke('attr', 'src').as('photo3src')
      cy.get('@photo3src').shouldRef('not.equal', '@photo1src')
      cy.get('@photo3').invoke('attr', 'src').as('photo3src')
      cy.get('@photo3').click();
      productPage.image(1).invoke('attr', 'src').shouldRef('equal', '@photo3src')

      productPage.image(4).as('photo4')
      cy.get('@photo4').invoke('attr', 'src').as('photo4src')
      cy.get('@photo4src').shouldRef('not.equal', '@photo1src')
      cy.get('@photo4').invoke('attr', 'src').as('photo4src')
      cy.get('@photo4').click();
      productPage.image(1).invoke('attr', 'src').shouldRef('equal', '@photo4src')
    });

    it('can show main product image in big', () => {
      productPage.image(1).as('mainPhoto');

      cy.get('@mainPhoto').invoke('attr', 'src').as('mainPhotoSrc');
      cy.get('@mainPhoto').click();

      productPage.bigPhotoModal().as('bigPhoto')
      cy.get('@bigPhoto').should('be.visible')
      cy.get('@bigPhoto').invoke('attr', 'src').then((src) => {
        const filename = src.split('/').pop();
        cy.get('@mainPhotoSrc').should('match', new RegExp(filename))
      })
    })

    it('has a good product title', () => {
      productPage.productTitle().invoke('text').should('equal', 'LILI Top | Shadow Sand | €69')
    })

    it('has details tabs with correct content', () => {
      productPage.tabButton('delivery');
      productPage.tabButton('description');
      productPage.tabButton('compositionAndCare');
      productPage.tabButton('size');

      cy.get('@deliveryButton').click();
      cy.get('@deliveryPane').should('be.visible').and('include.text', 'Receive');
      cy.get('@descriptionPane').should('not.be.visible');

      cy.get('@descriptionButton').click();
      cy.get('@descriptionPane')
        .should('be.visible')
        .and('include.text', 'Hand made with care');
      cy.get('@deliveryPane').should('not.be.visible');

      cy.get('@compositionAndCareButton').click();
      cy.get('@compositionAndCarePane')
        .should('be.visible')
        .and('include.text', 'sustainable and do not require dry cleaning');
      cy.get('@descriptionPane').should('not.be.visible');

      cy.get('@sizeButton').click();
      cy.get('@sizePane')
        .should('be.visible')
        .and('include.text', 'XSSMMLL');
      cy.get('@compositionAndCarePane').should('not.be.visible');
    });

    it('will have the product name in the title of the page', () => {
      cy.title().should('match', /lili top/i)
    })
  })

  describe('choose size', () => {
    beforeEach(() => {
      cy.visit('/lili-top');
    });

    it('shows default availability', () => {
      productPage.availablityIndicator().should('have.text', 'Available for pre-order')
    });

    it('shows correct status if a piece is not available', () => {
      productPage.sizeSelector().as('sizeSelector');
      cy.get('@sizeSelector').contains(/choose size/i).should('be.selected')

      cy.intercept(
        { path: '*availabilityexact*' },
        { body: { availability: 0 } },
      ).as('availabilityCheck');

      cy.get('@sizeSelector').select('M');
      cy.wait('@availabilityCheck');

      productPage.availablityIndicator().should('have.text', 'Pre-Order / Contact Us')
    });

    it('shows correct status if a piece is available', () => {
      productPage.sizeSelector().as('sizeSelector');
      cy.get('@sizeSelector').contains(/choose size/i).should('be.selected')

      cy.intercept(
        { path: '*availabilityexact*' },
        { body: { availability: 1 } },
      ).as('availabilityCheck');

      cy.get('@sizeSelector').select('L');
      cy.wait('@availabilityCheck');

      productPage.availablityIndicator().should('have.text', 'Available for pre-order')
    });
  });

  describe('one size products', () => {
    beforeEach(() => {
      cy.visit('/magna-scarf');
    });

    it('has always available stock', () => {
      productPage.availablityIndicator().should('have.text', 'Available for pre-order')
    });

    it('does not show size selection', () => {
      productPage.sizeSelector().should('not.be.visible')
    });
  })

  describe('cart', () => {
    it('should be empty upon initialization', () => {
      cy.visit('/magna-scarf');
      header.cartCounter().should('include.text', '(0)');
    });

    it('updates number of products as we add more and more to it', () => {
      cy.visit('/magna-scarf');
      header.cartCounter().as('cartCounter')
      cy.get('@cartCounter').should('include.text', '(0)');

      productPage.addToCartButton().click()
      cy.intercept({ path: '*getproductsnumberincart*' }).as('cartNumberUpdate');
      cy.wait('@cartNumberUpdate');
      cy.get('@cartCounter').should('include.text', '(1)');
    })
  });
});
