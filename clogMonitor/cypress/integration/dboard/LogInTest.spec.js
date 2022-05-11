describe("LoginTests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("test to check if the page loads correctly", () => {
        cy.get(".app").should("exist");
    });

    it("test the correct credentials", () => {
        cy.get(':nth-child(1) > .outlined-input').type('root{enter}').get(':nth-child(2) > .outlined-input').type('teamkick{enter}').get(".DashboardScreen").should("exist");
    });

});