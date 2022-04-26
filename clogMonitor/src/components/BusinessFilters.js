import React from "react";
import {Button, FormControl} from "@mui/material";
import CustomDateTimePicker from "../components/CustomDateTimePicker"
import { Grid} from '@mui/material';
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
 * Handlers for each component need to exist so we can keep track of what has been selected. 
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


 const getCurrentDateTimeString = () => {
    let now = new Date();
    let offset = now.getTimezoneOffset() * 60000;
    let adjustedDate = new Date(now.getTime() - offset);
    let formattedDate = adjustedDate.toISOString().substring(0, 19);
    return formattedDate;
};

// Requires Database
/*const getDefaultDateTimeString = (i) => {
    // Uses min time for start and max time for end
    // unless there is no data, in which we use current datetime
    const mmtime = getActualMinMaxTime();
    if(mmtime) {
        // mmtime is in utc, we need offset;
        let adjustedDates = mmtime.map((d) => new Date(d.getTime() + (60000 * d.getTimezoneOffset())));
        // use 23 instead of 19 for ms precision
        return adjustedDates[i].toISOString().substring(0, 19);
    } else {
        return getCurrentDateTimeString();
    }
}*/

const BusinessFilters = ({dataSetHandler}) => {
    // Checkbox group states
    const allSeverities = ["Error", "Warning", "Success", "Info"];
    const [selectedSeverities, setSelectedSeverities] = React.useState(new Set(allSeverities));
    // Dropdown ID's
    const EAI_DOMAIN_ID = "EAI_DOMAIN_ID"
    const PUBLISHING_BUSINESS_DOMAIN_ID = "PUBLISHING_BUSINESS_DOMAIN_ID"
    // Dropdown states
    const EAIDomains = ["EAI_DOMAIN_1", "EAI_DOMAIN_2"];
    const [EAIDomain, setEAIDomain] = React.useState("All");
    const pubBusinessDomains = ["OPER", "CRM", "ACCOUNT"];
    const [pubBusinessDomain, setPubBusinessDomain] = React.useState("All");
    // Datetime states (Dates stored are in local time, not UTC)
    var d = new Date(); // get start time based on documents
    d.setHours(d.getHours(),d.getMinutes()-30,0,0);
    const [startTime, setStartTime] = React.useState(d);
    const [endTime, setEndTime] = React.useState(new Date());

    // Handlers
    const handleApplyFilters = (e) => {
        e.preventDefault(); // don't actually submit the form
        console.log("Apply filters was pressed");
        
        // Bundle the filter values for caching
        const allFilters = {
            severity: [...selectedSeverities],
            eaiDomain: EAIDomain,
            pubBusinessDomain: pubBusinessDomain,
            creationTime: [startTime, endTime],
        };

        // Filters for filtering on our side
        const todoFilters = {
            severity: [...selectedSeverities],
            creationTime: [startTime, endTime],
        }
        
        // set the API parameters based on filter values
        const params = {
            pub_business_domain: pubBusinessDomain === "All" ? undefined : pubBusinessDomain, // String
            eai_domain: EAIDomain === "All" ? undefined : EAIDomain, // String
        }

        // Ensure that seconds are included in the time params
        const actualStart = startTime.length === 16 ? startTime + ":00" : startTime;
        const actualEnd = endTime.length === 16 ? endTime + ":00" : endTime;

        // Set the data based on params
        dataSetHandler(params, todoFilters);

        // Cache the filters in sessionStorage
        sessionStorage.setItem("BusinessFilters", JSON.stringify(allFilters));
    };

    // Checkbox group selection handlers
    const getCheckboxHandler = (options, selections, setter) => {
        return (event) => {
            if(event.target.name === 'All'){
                let newSelections = new Set()
                if(event.target.checked){
                    newSelections = new Set(options)
                }
                setter(newSelections)
            } else {
                let newSelections = new Set([...selections]);
                if (event.target.checked) {
                    newSelections.add(event.target.name);
                } else {
                    newSelections.delete(event.target.name);
                }
                setter(newSelections);
            }
        }
    }

    // Dropdown selection handlers
    const getDropdownHandler = (setter) => {
        return (event) => setter(event.target.value);
    }

    // Datetime input handlers
    const getDatetimeHandler = (setter) => {
        return setter
    }

    // Full form error checking
    const hasError = () => {
        // Checkboxes
        if (selectedSeverities.size < 1) {
            return true;
        }
        // Datetime
        if (startTime === "" || endTime === "") {
            return true;
        }
        if ((new Date(endTime) < (new Date(startTime)))) {
            return true;
        }
        return false;
    }

    // Dropdowns
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
                        <CustomDateTimePicker 
                        startTime={startTime} 
                        startChangeHandler={getDatetimeHandler(setStartTime)}
                        endTime={endTime}
                        endChangeHandler={getDatetimeHandler(setEndTime)}
                        />
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
                            <Button sx={{marginTop: "16px"}} disabled={hasError()} variant="contained" type="submit">
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