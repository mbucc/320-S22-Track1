/// <reference types="cypress" />
import {getLogEventColumn} from '../../../src/fakeDatabase'
import {getColumnValues} from '../../../src/fakeDatabase'

describe('Dropdown works correctly', () => {
  
  it ("logs into application", () => {
    cy.loginForLogEvents();
  });
  
  beforeEach(() => {
    // Reset filters
    cy.window().then((win) => {
      win.sessionStorage.removeItem("LogEventsFilters");
    })
    cy.reload();
  });

  it('displays the Dropdown component', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are elements that match
    cy.get('.dropdown-group').should('exist');
  });

  it('displays all Dropdown groups', () => {
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

  // Dropdown states
  const EAIDomains = [];
  const businessDomains = [];
  const businessSubDomains = [];
  const applications = [];
  const processIds = [];

  const namesToLists = {
    "eai_domain": EAIDomains,
    "business_domain": businessDomains,
    "business_subdomain": businessSubDomains,
    "application": applications,
    "event_context": processIds,
  }
  
  const token = sessionStorage.getItem("token");
  for (let name in namesToLists) {
    getLogEventColumn(token, name).then(values => {
      namesToLists[name] = values;
    }).catch(err => {
        console.error(`Querying for ${name} ran into an error, \nUsing mock database for dropdown values`);
        namesToLists[name] = getColumnValues(name.toUpperCase());
    })
  }

  it('displays all options', () => {
    // We use the `click()` command to click a DOM element

    // EAI Domain
    cy.get('[id="EAI_DOMAIN_ID"]').click();
    for (let i = 0; i < EAIDomains.length; i++){
      cy.get('[role="listbox"]').children().contains(EAIDomains[i]);
    }
    // unclick our selections
    cy.get('body').click(0, 0);

    // Business Domain
    cy.get('[id="BUSINESS_DOMAIN_ID"]').click();
    for (let i = 0; i < businessDomains.length; i++){
      cy.get('[role="listbox"]').children().contains(businessDomains[i]);
    }
    cy.get('body').click(0, 0);

    // Business Subdomain
    cy.get('[id="BUSINESS_SUBDOMAIN_ID"]').click();
    for (let i = 0; i < businessSubDomains.length; i++){
      cy.get('[role="listbox"]').children().contains(businessSubDomains[i]);
    }
    cy.get('body').click(0, 0);

    // Application
    cy.get('[id="APPLICATION_ID"]').click();
    for (let i = 0; i < applications.length; i++){
      cy.get('[role="listbox"]').children().contains(applications[i]);
    }
    cy.get('body').click(0, 0);

    // PROCESS_SERVICE
    cy.get('[id="PROCESS_SERVICE_ID"]').click(); 
    for (let i = 0; i < processIds.length; i++){
      cy.get('[role="listbox"]').children().contains(processIds[i]);
    }
    cy.get('body').click(0, 0);
  });

  it('selects an option by clicking', () => {

    // EAI Domain
    for (let i = 0; i < EAIDomains.length; i++){
      cy.get('[id="EAI_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains(EAIDomains[i]).click();
      cy.get('[id="EAI_DOMAIN_ID"]').contains(EAIDomains[i]);
      cy.get('body').click(0, 0);      
    }

    // Business Domain
    for (let i = 0; i < businessDomains.length; i++){
      cy.get('[id="BUSINESS_DOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains(businessDomains[i]).click();
      cy.get('[id="BUSINESS_DOMAIN_ID"]').contains(businessDomains[i]);
      cy.get('body').click(0, 0);      
    }

    // Business Subdomain
    for (let i = 0; i < businessSubDomains.length; i++){
      cy.get('[id="BUSINESS_SUBDOMAIN_ID"]').click();
      cy.get('[role="listbox"]').children().contains(businessSubDomains[i]).click();
      cy.get('[id="BUSINESS_SUBDOMAIN_ID"]').contains(businessSubDomains[i]);
      cy.get('body').click(0, 0);      
    }

    // Application
    for (let i = 0; i < applications.length; i++){
      cy.get('[id="APPLICATION_ID"]').click();
      cy.get('[role="listbox"]').children().contains(applications[i]).click();
      cy.get('[id="APPLICATION_ID"]').contains(applications[i]);
      cy.get('body').click(0, 0);      
    }

    // PROCESS_SERVICE
    for (let i = 0; i < processIds.length; i++){
      cy.get('[id="PROCESS_SERVICE_ID"]').click();
      cy.get('[role="listbox"]').children().contains(processIds[i]).click();
      cy.get('[id="PROCESS_SERVICE_ID"]').contains(processIds[i]);
      cy.get('body').click(0, 0);      
    }
  });
});