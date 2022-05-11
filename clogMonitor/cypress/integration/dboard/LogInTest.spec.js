describe("LoginTests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("test to check if the page loads correctly", () => {
        cy.get(".app").should("exist");
    });

    it("test if forgot password is clicked", () => {
        cy.get('p').click().get(".error").should("exist");
    });

    it("test if the error message show up if both the username and password is left empty", () => {
        cy.get(':nth-child(1) > .outlined-input').type('{enter}').get(':nth-child(2) > .outlined-input').type('{enter}').get(".error").should("exist");
    });

    it("test if the error message show up if the username is left empty", () => {
        cy.get(':nth-child(1) > .outlined-input').type('{enter}').get(':nth-child(2) > .outlined-input').type('teamkick{enter}').get(".error").should("exist");
    });

    it("test if the error message show up if the password is left empty", () => {
        cy.get(':nth-child(1) > .outlined-input').type('root{enter}').get(':nth-child(2) > .outlined-input').type('{enter}').get(".error").should("exist");
    });

    it("test the correct credentials", () => {
        cy.get(':nth-child(1) > .outlined-input').type('root{enter}').get(':nth-child(2) > .outlined-input').type('teamkick{enter}').get(".DashboardScreen").should("exist");
    });

});