describe('Log Events Components are displayed', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      // We set the "baseUrl" in cypress.json so we can use '/' to refer to the baseUrl
      cy.visit('/');
    });
  
    it('displays the LogEvents component', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are elements that match
      cy.get('.log-events-container').should('exist');
    });

    it('displays the LogEventsFilers component', () => {
        cy.get('.log-events-filters').should('exist');
    });

    it('displays the LogEventsTable component', () => {
        cy.get('.log-events-table-container').should('exist');
    });
})
