import React from 'react';
import { mount } from '@cypress/react';
import CheckboxGroup from '../../src/components/CheckboxGroup';

// label for the checkboxgroup
const testlabel = "TestLabel"
// Arbitrary nonempty array with unique values
const testoptions = ["TestOption1", "TestOption2", "TestOption3"]; 
// This should be all values in testoptions
let selectedOptions = new Set(testoptions); 
// Values to track when selectionChange handler gets called
let calledValues = []
const selectionChange = (x) => {
    calledValues.push(x.target.checked);
}

describe("CheckboxGroup Component Tests", () => {
    beforeEach(() => {
        mount(<CheckboxGroup 
            label={testlabel}
            options={testoptions}
            selectedOptions={selectedOptions}
            handleSelection={selectionChange}
        />);
    });

    afterEach(() => {
        // Reset the handler call tracking
        calledValues = [];
    })

    it('Has expected classes present', () => {
        cy.get('.checkbox-group').should("exist");
        cy.get('.checkbox-label').should("exist");
        cy.get('.checkbox').should("have.length", testoptions.length);
        cy.get('.checkbox-errmess').should("exist");
    });

    it('Has correct label text', () => {
        cy.get('.checkbox-label').should("contain.text", testlabel);
    });

    it('Has correct option labels in correct places', () => {
        // Should display everything in testoptions in the order of testoptions
        cy.get('.checkbox').each((e, i) => expect(e).to.contain(testoptions[i]));
    });

    it('Calls the handler when any label is clicked', () => {
        cy.get('.checkbox')
            .each(($e, i) => cy.wrap($e).click())   // Click all the checkboxes
            .then(() => expect(calledValues.length).to.equal(testoptions.length));
    });

    it('Calls the handler with correct values', () => {
        mount(<CheckboxGroup 
            label={testlabel}
            options={testoptions} 
            selectedOptions={new Set([testoptions[0]])} // Only first is selected
            handleSelection={selectionChange}
        />);

        cy.get('.checkbox')
            .each(($e, i) => cy.wrap($e).click())   // Click all the checkboxes
            .then(() => expect(calledValues.length).to.equal(testoptions.length))
            .then(() => expect(calledValues[0]).to.equal(false))
            .then(() => calledValues.slice(1, -1).forEach(v => expect(v).to.equal(true)));
    });

    it('Has no error message when there are any selections', () => {
        mount(<CheckboxGroup 
            label={testlabel}
            options={testoptions} 
            selectedOptions={new Set([testoptions[0]])} // Only first is selected
            handleSelection={selectionChange}
        />);
        
        cy.get('.checkbox-errmess')
            .invoke('text')                 // Transform into text
            .then(text => text.trim())      // So we can trim
            .should("be.oneOf", ['​', '']);  // Zero width space or empty string
    })

    it('Has an error message when there are no selections', () => {
        mount(<CheckboxGroup 
            label={testlabel}
            options={testoptions} 
            selectedOptions={new Set()}         // empty selections
            handleSelection={selectionChange}
        />);
        
        cy.get('.checkbox-errmess')
            .invoke('text')                     // Transform into text
            .then(text => text.trim())          // So we can trim
            .should("not.be.oneOf", ['​', '']);  // Zero width space or empty string
        cy.get('.checkbox-errmess').should("not.be.empty"); // Another way to check
    });
});