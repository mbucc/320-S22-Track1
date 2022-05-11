import React from 'react';
import { mount } from '@cypress/react';
import Dropdown from '../../src/components/Dropdown';

// label for the dropdown
const testlabel = "TestLabel"
// ID for the dropdown
const testid = 'TEST_ID'
// Value for the dropdown
const testvalue = "testValue"
// Arbitrary nonempty array with unique values
const testoptions = ["TestOption1", "TestOption2", "TestOption3"]; 
// Value to track when selectionchange handler gets called
let calledvalue = "";
const selectionchange = (x) => {
    calledvalue = x.target.value;
}

describe("Dropdown Component Tests", () => {
    beforeEach(() => {
        mount(<Dropdown 
            label={testlabel}
            id={testid}
            value={testvalue}
            options={testoptions}
            handleSelection={selectionchange}
        />);
    });

    afterEach(() => {
        // Reset the handler call tracking
        calledvalue = "";
    })

    it('All of the expected class exists', () => {
        cy.get('.dropdown-group').should("exist");
        cy.get('.dropdown-label').should("exist");
        cy.get('[id="TEST_ID"]').click()
          .get('[role="listbox"]').children().should("have.length", testoptions.length + 1);
    });

    it('All of the label have the expected text', () => {
        cy.get('.dropdown-label').should("contain.text", testlabel);
    });

    it('Orders are correct', () => {
        // Should display everything in testoptions in the order of testoptions
        let labels = ["All", ...testoptions]; // Adding the "All" label
        cy.get('[id="TEST_ID"]').click()
          .get('[role="listbox"]').children().each((e, i) => expect(e).to.contain(labels[i]));
    });

    it('Calls the handler when the option is clicked', () => {
        cy.get('[id="TEST_ID"]').click()
          .get('[role="listbox"]').children().contains(testoptions[0]).click()
          .then(() => expect(calledvalue).to.equal(testoptions[0]));
    });

});