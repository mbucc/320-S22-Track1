/// <reference types="cypress" />

describe("Log Events Components are displayed", () => {
  it("log into application", () => {
    cy.loginForLogEvents();
  });

  it("displays the LogEvents component", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are elements that match
    cy.get(".log-events-container").should("exist");
  });

  it("displays the LogEventsFilers component", () => {
    cy.get(".log-events-filters").should("exist");
  });

  it("displays the LogEventsTable component", () => {
    cy.get(".log-events-table-container").should("exist");
  });
});
