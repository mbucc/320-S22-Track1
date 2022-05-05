describe('Dropdown works correctly', () => {

    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      // We set the "baseUrl" in cypress.json so we can use '/' to refer to the baseUrl
      cy.visit('/');
    });

    it('displays the Dropdown component', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are elements that match
      cy.get('.dropdown-group').should('exist');
    });

    it('diaplays all Dropdown groups', () => {
      // to check if the dropdown is visible
      cy.get('.dropdown-group').should('be.visible');

      // to check if all five dropdown groups are contained
      cy.get('.dropdown-group > .dropdown-label').should("have.length", 5)
      cy.get('.dropdown-group > .dropdown-label').contains("EAI Domain").should("exist");
      cy.get('.dropdown-group > .dropdown-label').contains("Business Domain").should("exist");
      cy.get('.dropdown-group > .dropdown-label').contains("Business SubDomain").should("exist");
      cy.get('.dropdown-group > .dropdown-label').contains("Application").should("exist");
      cy.get('.dropdown-group > .dropdown-label').contains("Process/Service").should("exist");
    });

    it('displays all options', () => {
      // We use the `click()` command to click a DOM element

      // EAI Domain
      cy.get('[id="EAI_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All");
      cy.get('[role="listbox"]').children().contains("EAI_DOMAIN_1");
      // unclick our selections
      cy.get('body').click(0, 0);

      // Business Domain
      cy.get('[id="BUSINESS_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All");
      cy.get('[role="listbox"]').children().contains("CRM");
      cy.get('[role="listbox"]').children().contains("OPER");
      cy.get('[role="listbox"]').children().contains("ACCOUNT");
      cy.get('body').click(0, 0);

      // Business Subdomain
      cy.get('[id="BUSINESS_SUBDOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All");
      cy.get('[role="listbox"]').children().contains("Customer");
      cy.get('body').click(0, 0);

      // Application
      cy.get('[id="APPLICATION_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All");
      cy.get('[role="listbox"]').children().contains("CRM_Adapter");
      cy.get('[role="listbox"]').children().contains("OPER_Adapter");
      cy.get('[role="listbox"]').children().contains("ACCOUNT_Adapter");
      cy.get('body').click(0, 0);

      // PROCESS_SERVICE
      cy.get('[id="PROCESS_SERVICE_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All");
      cy.get('[role="listbox"]').children().contains("Publish_Customer_Update");
      cy.get('[role="listbox"]').children().contains("Customer_Update");
      cy.get('body').click(0, 0);
    });

    it('selects an option by clicking', () => {

      // EAI Domain
      cy.get('[id="EAI_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All").click();
      cy.get('[id="EAI_DOMAIN_ID"]').contains("All");
      cy.get('body').click(0, 0);

      cy.get('[id="EAI_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("EAI_DOMAIN_1").click();
      cy.get('[id="EAI_DOMAIN_ID"]').contains("EAI_DOMAIN_1");
      cy.get('body').click(0, 0);

      // Business Domain
      cy.get('[id="BUSINESS_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All").click();
      cy.get('[id="BUSINESS_DOMAIN_ID"]').contains("All");
      cy.get('body').click(0, 0);

      cy.get('[id="BUSINESS_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("CRM").click({force: true});
      cy.get('[id="BUSINESS_DOMAIN_ID"]').contains("CRM");
      cy.get('body').click(0, 0);
      
      cy.get('[id="BUSINESS_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("OPER").click({force: true});
      cy.get('[id="BUSINESS_DOMAIN_ID"]').contains("OPER");
      cy.get('[role="listbox"]').children().contains("OPER").click({force: true});
      cy.get('body').click(0, 0);

      cy.get('[id="BUSINESS_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("ACCOUNT").click({force: true});
      cy.get('[id="BUSINESS_DOMAIN_ID"]').contains("ACCOUNT");
      cy.get('[role="listbox"]').children().contains("ACCOUNT").click({force: true});
      cy.get('body').click(0, 0);

      // Business Subdomain
      cy.get('[id="BUSINESS_SUBDOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All").click();
      cy.get('[id="BUSINESS_SUBDOMAIN_ID"]').contains("All");
      cy.get('body').click(0, 0);

      cy.get('[id="BUSINESS_SUBDOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains("Customer").click();
      cy.get('[id="BUSINESS_SUBDOMAIN_ID"]').contains("Customer");
      cy.get('body').click(0, 0);

      // Application
      cy.get('[id="APPLICATION_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All").click();
      cy.get('[id="APPLICATION_ID"]').contains("All");
      cy.get('body').click(0, 0);

      cy.get('[id="APPLICATION_ID"]').click();
      cy.get('[role="listbox"]').children().contains("CRM_Adapter").click();
      cy.get('[id="APPLICATION_ID"]').contains("CRM_Adapter");
      cy.get('body').click(0, 0);

      cy.get('[id="APPLICATION_ID"]').click();
      cy.get('[role="listbox"]').children().contains("OPER_Adapter").click();
      cy.get('[id="APPLICATION_ID"]').contains("OPER_Adapter");
      cy.get('body').click(0, 0);

      cy.get('[id="APPLICATION_ID"]').click();
      cy.get('[role="listbox"]').children().contains("ACCOUNT_Adapter").click();
      cy.get('[id="APPLICATION_ID"]').contains("ACCOUNT_Adapter");
      cy.get('body').click(0, 0);

      // PROCESS_SERVICE
      cy.get('[id="PROCESS_SERVICE_ID"]').click();
      cy.get('[role="listbox"]').children().contains("All").click();
      cy.get('[id="PROCESS_SERVICE_ID"]').contains("All");
      cy.get('body').click(0, 0);

      cy.get('[id="PROCESS_SERVICE_ID"]').click();
      cy.get('[role="listbox"]').children().contains("Publish_Customer_Update").click();
      cy.get('[id="PROCESS_SERVICE_ID"]').contains("Publish_Customer_Update");
      cy.get('body').click(0, 0);

      cy.get('[id="PROCESS_SERVICE_ID"]').click();
      cy.get('[role="listbox"]').children().contains("Customer_Update").click();
      cy.get('[id="PROCESS_SERVICE_ID"]').contains("Customer_Update");
      cy.get('body').click(0, 0);
    });
});