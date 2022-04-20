import React from "react";
import {Button, FormControl} from "@mui/material";
import CustomDateTimePicker from "../components/CustomDateTimePicker"
import { Grid} from '@mui/material';
import { getColumnValues, getTableData, minmaxtime } from "../fakeDatabase";
import Dropdown from "./Dropdown";
import BusinessTree from '../components/BusinessTree';


/**
 * Note: for this to work the way we want it to, we use a  "form"
 * Components that should be put here (as of 3/31 understanding):
 *   Start/End time
 *   EAI domain drop down
 *   Publishing domain drop down
 *   tree view
 *   Apply button
 * 
 * --> Refresh button does not need to be here since it simply updates the times
 * Essentially how this will be built is within some sort of Form tag (<FormControl />)
 * these components should be added
 * All components listed are "inputs", as well as apply button (exception: this "submits" the form)
 * Handlers for each component needs to exist so we can keep track of what has been selected. 
 * Keeping track is important so that when we apply(submit form), filters are known
 * 
 * https://www.pluralsight.com/guides/form-submission-in-reactjs <-- resource to understand
 * 
 * - @hiimlo note
 * 
 * 
 * 
 * @returns {React.ElementType}
 */

/**
 * Returns the current datetime as a valid string for datetime-local inputs
 * 
 * @returns {string} 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#local_date_and_time_strings}
 */
 const getCurrentDateTimeString = () => {
    let now = new Date();
    let offset = now.getTimezoneOffset() * 60000;
    let adjustedDate = new Date(now.getTime() - offset);
    let formattedDate = adjustedDate.toISOString().substring(0, 19);
    return formattedDate;
};

/**
 * Returns the default start datetime or end datetime depending on if i is 0 or 1, in local time
 * 
 * @param {0 | 1} i 0 if requesting default start, 1 if requesting default end
 * @returns {string} The default local datetime string formatted for datetime-local inputs
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#local_date_and_time_strings}
 */
 const getDefaultDateTimeString = (i) => {
    // Uses min time for start and max time for end
    // unless there is no data, in which we use current datetime
    // const mmtime = minmaxtime();
    // if(mmtime) {
    //     // mmtime is in utc, we need offset;
    //     let adjustedDates = mmtime.map((d) => new Date(d.getTime() - (60000 * d.getTimezoneOffset())));
    //     // use 23 instead of 19 for ms precision
    //     return adjustedDates[i].toISOString().substring(0, 19);
    // } else {
    //     return getCurrentDateTimeString();
    // }
    return getCurrentDateTimeString();
}

const BusinessFilters = () => {

    const EAI_DOMAIN_ID = "EAI_DOMAIN_ID"
    const PUBLISHING_BUSINESS_DOMAIN_ID = "PUBLISHING_BUSINESS_DOMAIN_ID"

    // Dropdown states
    const EAIDomains = ["EAI_DOMAIN_1", "EAI_DOMAIN_2"];
    const [EAIDomain, setEAIDomain] = React.useState("All");
    const pubBusinessDomains = ["OPER", "CRM", "ACCOUNT"];
    const [pubBusinessDomain, setPubBusinessDomain] = React.useState("All");
    const [startTime, setStartTime] = React.useState(getDefaultDateTimeString(0));
    const [endTime, setEndTime] = React.useState(getDefaultDateTimeString(1));

    // Handlers
    const handleApplyFilters = (e) => {
        e.preventDefault(); // don't actually submit the form
        console.log("Apply filters was pressed");
        // get the filters by column name
        const filters = {
            EAI_DOMAIN: EAIDomain,
            PUBLISHING_BUSINESS_DOMAIN: pubBusinessDomain,
            CREATION_TIME: [startTime, endTime],
        };

        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            'user': 'root',
            'password': 'teamkick' 
        });
        var config = {
            method: 'post',
            url: 'http://localhost:8080/user',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

        // Request table data according to filters (This is where we would do a axios POST)
        //const resultData = getTableData(filters);
        // We may need to do some conversion afterwards
        // Set the changes
        //tableDataSetter(resultData);
        // Cache the filters in sessionStorage
        //sessionStorage.setItem("LogEventsFilters", JSON.stringify(filters));
    };

    const getDropdownHandler = (setter) => {
        return (event) => setter(event.target.value);
    }
    const makeDropdownProps = (label, id, options, value, setter) => {
        return {
            label: label,
            id: id,
            options: options,
            value: value,
            handler: getDropdownHandler(setter),
        }
    }
    const dropdownProps = [
        makeDropdownProps("EAI Domain", EAI_DOMAIN_ID, EAIDomains, EAIDomain, setEAIDomain),
        makeDropdownProps("Publishing Business Domain", PUBLISHING_BUSINESS_DOMAIN_ID, pubBusinessDomains, pubBusinessDomain, setPubBusinessDomain)
    ]
    return (
        <div>
            <form className="business-filters" onSubmit={handleApplyFilters}>
                <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                    <Grid item lg={2} xl={1.25}>
                        <h1>Business Processes</h1>
                    </Grid>
                    <Grid item lg={2.75} xl={2}>
                        <CustomDateTimePicker />
                    </Grid>
                    <Grid item lg={2.75} xl={2}>
                        {
                            dropdownProps.map(dprops => {
                                return (
                                    <Dropdown
                                    key={dprops.label}
                                    label={dprops.label}
                                    id={dprops.id}
                                    options={dprops.options}
                                    value={dprops.value}
                                    handleSelection={dprops.handler}
                                    />
                            );
                        })
                    }
                    </Grid>
                    <Grid item lg={1} xl={1.5}>
                    </Grid>
                    <Grid item lg={9} xl={6.75}>
                        <BusinessTree />
                    </Grid>
                    <Grid item lg={8} xl={8} />
                    <Grid item lg={1} xl={4}>
                        <FormControl>
                            <Button sx={{marginTop: "16px"}} variant="contained" type="submit">
                                Apply
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
export default BusinessFilters;