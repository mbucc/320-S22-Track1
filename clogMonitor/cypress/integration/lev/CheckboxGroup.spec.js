/// <reference types="cypress" />

describe("CheckboxGroup Tests", () => {
  it("log into application", () => {
    cy.loginForLogEvents();
  });

  beforeEach(() => {
    // Reset filters
    cy.window().then((win) => {
      win.sessionStorage.removeItem("LogEventsFilters");
    });
    cy.reload();
  });

  // Test if there is a checkbox group displayed for each of the Priorities, Severities, and Categories filters
  it("displays all 3 checkbox groups", () => {
    cy.get(".checkbox-group").should("have.length", 3);
    cy.get(".checkbox-group > .checkbox-label")
      .contains("Priorities")
      .should("exist");
    cy.get(".checkbox-group > .checkbox-label")
      .contains("Severities")
      .should("exist");
    cy.get(".checkbox-group > .checkbox-label")
      .contains("Categories")
      .should("exist");
  });

  // Selects/unselects filters and should be able to hit the submit button
  it("test valid submission", () => {
    cy.get(".checkbox").each((checkbox, index) => {
      if (index % 2 == 0) {
        // unchecks every other box
        checkbox.click();
      }
    });
    cy.get(".apply-filters-btn").should("not.be.disabled");
    cy.get(".apply-filters-btn").click();
  });

  //for each group: all boxes unselected --> apply button disabled
  // Priorities
  it("validates if no priorities are checked, the apply button is disabled", () => {
    const prioritiesCheckboxes = cy.get(".Priorities").find(".checkbox");
    prioritiesCheckboxes.each((element) => {
      // "uncheck" all boxes
      element.click();
    });

    cy.get(".apply-filters-btn").should("be.disabled");
  });

  // Severities
  it("validates if no severities are checked, the apply button is disabled", () => {
    const severitiesCheckboxes = cy.get(".Severities").find(".checkbox");
    severitiesCheckboxes.each((element) => {
      // "uncheck" all boxes
      element.click();
    });

    cy.get(".apply-filters-btn").should("be.disabled");
  });

  // Categories
  it("validates if no categories are checked, the apply button is disabled", () => {
    const categoriesCheckboxes = cy.get(".Categories").find(".checkbox");
    categoriesCheckboxes.each((element) => {
      // "uncheck" all boxes
      element.click();
    });

    cy.get(".apply-filters-btn").should("be.disabled");
  });
});
