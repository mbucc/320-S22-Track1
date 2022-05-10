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
            startDstChangeHandler={selectionchange}
            endDstChangeHandler={selectionchange}
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


    /*  DST tests */
    // Correct error message shows up when time does not exist (March 14th 2:30 am) in starttime and endtime
    it('Shows the correct error message when time does not exist in starttime', () => {
      mount(<TimeRange 
          startTime={"2021-03-14T02:30"} 
          startChangeHandler={selectionchange}
          endTime={"2022-05-01T08:30"} 
          endChangeHandler={selectionchange}
      />);
      cy
        .get('[id="startformcontrol"]')
        .contains('Chosen date/time does not exist!');
    });

    it('Shows the correct error message when time does not exist in endtime', () => {
      mount(<TimeRange 
          startTime={"2020-03-14T03:30"} 
          startChangeHandler={selectionchange}
          endTime={"2021-03-14T02:30"} 
          endChangeHandler={selectionchange}
      />);
      cy
        .get('[id="endformcontrol"]')
        .contains('Chosen date/time does not exist!');
    });
    
    it('Shows the correct error message, DST BEFORE/AFTER buttons, and functionality when starttime is ambiguous ', () => {
      mount(<TimeRange 
          startTime={"2021-11-07T01:30"} 
          startChangeHandler={selectionchange}
          endTime={"2021-11-14T02:30"} 
          endChangeHandler={selectionchange}
          startDstChangeHandler={selectionchange}
          endDstChangeHandler={selectionchange}
      />);
      // Correct message shows up when time is ambiguous (November 7th, 1:00 am)
      cy
        .get('[id="startformcontrol"]')
        .contains('Daylight saving time conflict exists! Please choose:');
      // BEFORE/AFTER select appears on screen when time is ambiguous (November 7th, 1:00 am)
      cy
        .get('[id="startformcontrol"]').should("be.visible")
      // BEFORE/AFTER select, when visible, shows options: BEFORE and AFTER
      let labels = ["BEFORE", "AFTER"]; 
      cy
        .get('[id="startTimeDST"]').click()
        .get('[role="listbox"]').children().each((e, i) => expect(e).to.contain(labels[i]));
      // BEFORE/AFTER select, when visible, has options that are clickable and fire the correct handlers
      cy
        .get('[role="listbox"]').children().contains(labels[0]).click()
        .then(() => expect(calledvalue).to.equal(labels[0]));
    });

    it('Shows the correct error message, DST BEFORE/AFTER buttons, and functionality when endtime is ambiguous', () => {
      mount(<TimeRange 
          startTime={"2021-11-06T01:30"} 
          startChangeHandler={selectionchange}
          endTime={"2021-11-07T01:30"} 
          endChangeHandler={selectionchange}
          startDstChangeHandler={selectionchange}
          endDstChangeHandler={selectionchange}
      />);
      // Correct message shows up when time is ambiguous (November 7th, 1:00 am)
      cy
        .get('[id="endformcontrol"]')
        .contains('Daylight saving time conflict exists! Please choose:');
      // BEFORE/AFTER select appears on screen when time is ambiguous (November 7th, 1:00 am)
      cy
        .get('[id="endformcontrol"]').should("be.visible")
      // BEFORE/AFTER select, when visible, shows options: BEFORE and AFTER
      let labels = ["BEFORE", "AFTER"]; 
      cy
        .get('[id="endTimeDST"]').click()
        .get('[role="listbox"]').children().each((e, i) => expect(e).to.contain(labels[i]));
      // BEFORE/AFTER select, when visible, has options that are clickable and fire the correct handlers
      cy
        .get('[role="listbox"]').children().contains(labels[0]).click()
        .then(() => expect(calledvalue).to.equal(labels[0]));
    });

    // BEFORE/AFTER select does not appears on screen when time is unambiguous (November 6th, 1:00 am)
    it('Does not show the BEFORE/AFTER select when time is unambiguous', () => {
      mount(<TimeRange 
          startTime={"2021-10-06T01:30"} 
          startChangeHandler={selectionchange}
          endTime={"2021-11-08T01:30"} 
          endChangeHandler={selectionchange}
      />);
      cy.get('[id="startTimeDST"]').should("not.be.visible")
      cy.get('[id="endTimeDST"]').should("not.be.visible")
    });
});