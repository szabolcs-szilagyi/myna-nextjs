// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getByDataCy', (value) => cy.get(`[data-cy=${value}]`));

Cypress.Commands.add('getInputByName', (value) => cy.get(`input[name=${value}]`));

Cypress.Commands.add('shouldRef', { prevSubject: true }, (subject, action, ref) => {
  cy.get(ref)
    .then(value => {
      cy.wrap(subject).should(action, value);
    })
})

/**
 * @memberof Cypress.cy
 * @method parseFloat
 * @param {RegExp} patternRx - regexp pattern that will be used to cut everything
 * away from the number
 */
Cypress.Commands.add('parseFloat', { prevSubject: true }, (subject, patternRx) => {
  return cy.wrap(subject).invoke('text').then((priceText) => {
    const price = parseFloat(priceText.replace(patternRx, '$1'), 10);
    return cy.wrap(price);
  })
})
