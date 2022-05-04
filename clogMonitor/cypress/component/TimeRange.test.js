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


    /*  DST tests TODO *********************************************/

    // Correct error message shows up when time does not exist (March 14th 2:30 am) in starttime and endtime
    // Correct message shows up when time is ambiguous (November 7th, 1:00 am)
    // BEFORE/AFTER select appears on screen when time is ambiguous (November 7th, 1:00 am)
    // BEFORE/AFTER select does not appears on screen when time is unambiguous (November 6th, 1:00 am)
    // BEFORE/AFTER select, when visible, shows options: BEFORE and AFTER
    // BEFORE/AFTER select, when visible, has options that are clickable and fire the correct handlers

});