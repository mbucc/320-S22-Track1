import { Button, FormControl } from "@mui/material";
import React, { useEffect } from "react";
import { getColumnValues, getTableData, minmaxtime } from "../fakeDatabase";
import CheckboxGroup from "./CheckboxGroup";
import Dropdown from "./Dropdown";
import TimeRange from "./TimeRange";
import './LogEvents.css'

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
    const mmtime = minmaxtime();
    if(mmtime) {
        // mmtime is in utc, we need offset;
        let adjustedDates = mmtime.map((d) => new Date(d.getTime() - (60000 * d.getTimezoneOffset())));
        // use 23 instead of 19 for ms precision
        return adjustedDates[i].toISOString().substring(0, 19);
    } else {
        return getCurrentDateTimeString();
    }
}

/**
 * The filters for the Log Events Table.
 * 
 * @param {Object} props
 * @param {(event: Event) => any} props.tableDataSetter - Setter for table that these filters control
 * 
 * @returns {React.ElementType}
 */
const LogEventsFilters = ({ tableDataSetter }) => {
    // Component States
    // Checkbox group states
    const allPriorities = ["All","High", "Medium", "Low"];
    const [selectedPriorities, setSelectedPriorities] = React.useState(new Set(allPriorities));
    const allSeverities = ["All","Error", "Warning", "Success", "Info"];
    const [selectedSeverities, setSelectedSeverities] = React.useState(new Set(allSeverities));
    const allCategories = ["All","Status", "Start", "Stop", "Security", "Heartbeat"];
    const [selectedCategories, setSelectedCategories] = React.useState(new Set(allCategories));

    //Dropdown id's
    const EAI_DOMAIN_ID = "EAI_DOMAIN_ID"
    const BUSINESS_DOMAIN_ID = "BUSINESS_DOMAIN_ID"
    const BUSINESS_SUBDOMAIN_ID = "BUSINESS_SUBDOMAIN_ID"
    const APPLICATION_ID = "APPLICATION_ID"
    const PROCESS_SERVICE_ID = "PROCESS_SERVICE_ID"

    // Dropdown states
    const EAIDomains = getColumnValues("EAI_DOMAIN");
    const [EAIDomain, setEAIDomain] = React.useState("All");
    const businessDomains = getColumnValues("BUSINESS_DOMAIN");
    const [businessDomain, setBusinessDomain] = React.useState("All");
    const businessSubDomains = getColumnValues("BUSINESS_SUBDOMAIN")
    const [businessSubDomain, setBusinessSubDomain] = React.useState("All");
    const applications = getColumnValues("APPLICATION");
    const [application, setApplication] = React.useState("All");
    const processIds = getColumnValues("EVENT_CONTEXT");
    const [process_service, setProcess_service] = React.useState("All");
    // Datetime states (Dates stored are in local time, not UTC)
    const [startTime, setStartTime] = React.useState(getDefaultDateTimeString(0));
    const [endTime, setEndTime] = React.useState(getDefaultDateTimeString(1));

    // On component load, try to find and load cached filters
    useEffect(() => {
        const value = sessionStorage.getItem("LogEventsFilters");
        if(value) {
            const filters = JSON.parse(value);
            setSelectedPriorities(new Set(filters["PRIORITY"]));
            setSelectedSeverities(new Set(filters["SEVERITY"]));
            setSelectedCategories(new Set(filters["CATEGORY_NAME"]));
            setEAIDomain(filters["EAI_DOMAIN"]);
            setBusinessDomain(filters["BUSINESS_DOMAIN"]);
            setBusinessSubDomain(filters["BUSINESS_SUBDOMAIN"]);
            setApplication(filters["APPLICATION"]);
            setProcess_service(filters["EVENT_CONTEXT"]);
            let times = filters["CREATION_TIME"];
            setStartTime(times[0]);
            setEndTime(times[1]);
        }
    }, []);

    // Handlers
    const handleApplyFilters = (e) => {
        e.preventDefault(); // don't actually submit the form
        console.log("Apply filters was pressed");
        // get the filters by column name
        const filters = {
            PRIORITY: [...selectedPriorities],
            SEVERITY: [...selectedSeverities],
            CATEGORY_NAME: [...selectedCategories],
            EAI_DOMAIN: EAIDomain,
            BUSINESS_DOMAIN: businessDomain,
            BUSINESS_SUBDOMAIN: businessSubDomain,
            APPLICATION: application,
            EVENT_CONTEXT: process_service,
            CREATION_TIME: [startTime, endTime],
        };

        // Request table data according to filters (This is where we would do a axios POST)
        const resultData = getTableData(filters);
        // We may need to do some conversion afterwards
        // Set the changes
        tableDataSetter(resultData);
        // Cache the filters in sessionStorage
        sessionStorage.setItem("LogEventsFilters", JSON.stringify(filters));
    };

    // Checkbox group selection handlers
    const getCheckboxHandler = (options, selections, setter) => {
        return (event) => {

            if(event.target.name === "All"){
                let newSelections = new Set()
                if(event.target.checked) {
                    newSelections = new Set(options)
                } 
                setter(newSelections)
            } else {

                let newSelections = new Set([...selections]);
                if (event.target.checked) {
                    newSelections.add(event.target.name);
                    if(newSelections.size === options.length - 1){
                        newSelections.add("All")
                    }
                } else {
                    newSelections.delete(event.target.name);
                    newSelections.delete("All")
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
        return (event) => setter(event.target.value);
    }

    // Full form error checking
    const hasError = () => {
        // Checkboxes
        if (selectedCategories.size < 1) {
            return true;
        }
        if (selectedPriorities.size < 1) {
            return true;
        }
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

    // Organize state into lists of props for sub components

    // Checkboxes
    const makeCheckboxGroupProps = (label, options, selected, setter) => {
        return {
            label: label,
            options: options,
            selected: selected,
            handler: getCheckboxHandler(options, selected, setter),
        }
    }
    const checkBoxGroupProps = [
        makeCheckboxGroupProps("Severities", allSeverities, selectedSeverities, setSelectedSeverities),
        makeCheckboxGroupProps("Priorities", allPriorities, selectedPriorities, setSelectedPriorities),
        makeCheckboxGroupProps("Categories", allCategories, selectedCategories, setSelectedCategories),
    ];
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
        makeDropdownProps("Business Domain", BUSINESS_DOMAIN_ID, businessDomains, businessDomain, setBusinessDomain),
        makeDropdownProps("Business SubDomain", BUSINESS_SUBDOMAIN_ID, businessSubDomains, businessSubDomain, setBusinessSubDomain),
        makeDropdownProps("Application", APPLICATION_ID, applications, application, setApplication),
        makeDropdownProps("Process/Service", PROCESS_SERVICE_ID, processIds, process_service, setProcess_service),
    ]

    return (
        <div>
            <form className="log-events-filters" onSubmit={handleApplyFilters}>
                {
                    checkBoxGroupProps.map(cbprops => {
                        return (
                            <CheckboxGroup
                                key={cbprops.label}
                                label={cbprops.label}
                                options={cbprops.options}
                                selectedOptions={cbprops.selected}
                                handleSelection={cbprops.handler}
                            />
                        );
                    })
                }

                <TimeRange 
                    startTime={startTime} 
                    startChangeHandler={getDatetimeHandler(setStartTime)}
                    endTime={endTime}
                    endChangeHandler={getDatetimeHandler(setEndTime)}
                />

                <div className="dropdown-group">
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
                </div>

                <FormControl>
                    <Button sx={{marginTop: "16px"}} disabled={hasError()} variant="contained" type="submit">
                        Apply
                    </Button>
                </FormControl>
            </form>
        </div>
    );
};

export default LogEventsFilters;
