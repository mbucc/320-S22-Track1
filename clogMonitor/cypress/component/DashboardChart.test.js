import React from 'react';
import { mount } from '@cypress/react';
import AppBarChart from '../../src/components/Charts/AppBarChart';

const logEvents = []
describe("DashboardChartTests", () => {
    beforeEach(() => {
        mount(<AppBarChart
            logEvents={logEvents}
        />);
    });

    it("test to check if the Chart Component includes the time span and the chart", () => {
        cy.get(".rows").should("exist")
            .get(".chart").should("exist");
    });

    it("test to check if the Chart's default state is Last week", () => {
        cy.get(".Last_week_chart").should("exist");
    });
    it("test to check if selects 'Last month' option, the chart will display last month data", () => {
        cy.get(".timeSpan").click().get(".last_month_option").click().get(".Last_month_chart").should("exist");
    });
});
