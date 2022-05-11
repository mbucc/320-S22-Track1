/// <reference types="cypress" />

describe("Business Process Components are displayed", () => {
    it("log into application", () => {
      cy.loginForBusinessProcesses();
    });
  
    it("displays the BusinessProcess component", () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are elements that match
      cy.get(".business-process-container").should("exist");
    });
  
    it("displays the BusinessFilers component", () => {
      cy.get(".business-process-filters").should("exist");
    });
  
    it("displays the BusinessTable component", () => {
      cy.get(".business-process-table-container").should("exist");
    });
  });
  