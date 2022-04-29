import React from 'react';
import { mount } from '@cypress/react';
import TimeRange from '../../src/components/TimeRange';

// start time
const testStartTime = "2017-06-01T08:30";
// end time
const testEndTime = "2017-06-01T08:31";

// Value to track when selectionChange handler gets called
let calledvalue = "";
const selectionchange = (x) => {
    calledvalue = x.target.value;
}

describe("TimeRange Component Tests", () => {
    beforeEach(() => {
        mount(<TimeRange 
            startTime={testStartTime} 
            startChangeHandler={selectionchange}
            endTime={testEndTime}
            endChangeHandler={selectionchange}
        />);
    });

    afterEach(() => {
        // Reset the handler call tracking
        calledvalue = "";
    })

    it('Has expected classes present', () => {
        cy.get('.timerange').should("exist");
    });

    it('Displays time correctly', () => {
        cy
          .get('[id="startformcontrol"]')
          .get("#startimeinput")
          .should('have.value', '2017-06-01T08:30');
        cy
          .get('[id="endformcontrol"]')
          .get("#endtimeinput")
          .should('have.value', '2017-06-01T08:31');
    });

    it('Calls the handler when new information entered', () => {
        cy.get('[id="startformcontrol"]').click()
          .type('2016-06-01T08:30')
          .then(() => expect(calledvalue).to.equal('2016-06-01T08:30'));
        cy.get('[id="endformcontrol"]').click()
          .type('2018-06-01T08:30')
          .then(() => expect(calledvalue).to.equal('2018-06-01T08:30'));
    });

    it('Has an error message when end time entered is before start time', () => {
        mount(<TimeRange 
            startTime={testStartTime} 
            startChangeHandler={selectionchange}
            endTime={"2016-06-01T08:30"}
            endChangeHandler={selectionchange}
        />);
        
        cy
          .get('[id="startformcontrol"]')
          .contains('Start must be before End');
        cy
          .get('[id="endformcontrol"]').click()
          .contains('Start must be before End');
    });
    

    it('Has an error message when start time is after end time', () => {
        mount(<TimeRange 
            startTime={"2018-06-01T08:30"} 
            startChangeHandler={selectionchange}
            endTime={testEndTime}
            endChangeHandler={selectionchange}
        />);
        cy
          .get('[id="startformcontrol"]')
          .contains('Start must be before End');
        cy
          .get('[id="endformcontrol"]')
          .contains('Start must be before End');
    });

    
   

});