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

// Add testing-library commands
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("loginForLogEvents", () => {
  // Ensures user is logged out
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  cy.reload();

  cy.visit("/#/log-events");
  cy.get(".username-input").type("Mark");
  cy.get(".password-input").type("12345678");
  cy.get(".login-btn").click();
  cy.get(".DashboardScreen").should("exist"); // Waits for dashboard to load
});
