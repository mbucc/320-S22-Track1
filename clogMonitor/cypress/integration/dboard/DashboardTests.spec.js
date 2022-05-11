describe("DashboardTests", () => {

  it("log into application", () => {
    cy.loginForLogEvents();
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("test to check if Home featureInfo, chart, and error log pane are loaded", () => {
    cy.get('.Home').should("exist")
      .get(".Home__featureInfo").should("exist")
      .get(".Home__Charts").should("exist")
      .get(".Home___ErrorLogPane").should("exist");
  });

  it("test to check if the page loads correctly", () => {
    cy.get('.DashboardScreen').should("exist");
  });

  it("test to check if the clicking on Business Processes redirects us to the right page", () => {
    cy.get(".DashboardScreen__SideNav")
      .contains("Business Process")
      .click()
      .get(".business-filters")
      .should("exist");
  });

  it("test to check if the clicking on Log Events redirects us to the right page", () => {
    cy.get(".DashboardScreen__SideNav")
      .contains("Log Events")
      .click()
      .get(".log-events-table-container")
      .should("exist");
  });

  it("test to check if the clicking on Home redirects us to the right page", () => {
    cy.get(".DashboardScreen__SideNav")
      .contains("Home")
      .click()
      .get(".Home")
      .should("exist");
  });
});
