import React from 'react';
import { mount } from '@cypress/react';
import ErrorLogPane from '../../src/components/ErrorLogPane/ErrorLogPane';


describe("ErrorLogPaneTests", () => {
    beforeEach(() => {
        mount(<ErrorLogPane
            logEvents={[{ application: 'test_app', globalInstanceId: 'id', severity: 10, creationTime: new Date(Date.now()).toLocaleString() }]}
        />);
    });

    it("test to check if the error log pane is displayed", () => {
        cy.get(".ErrorLogPane").should("exist")
    });


    it("test to check if the clicking on a error log redirects us to log detail", () => {
        cy.get(".ErrorLogBox")
            .click();
    });
});
