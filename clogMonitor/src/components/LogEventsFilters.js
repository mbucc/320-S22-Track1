import { Button, FormControl } from "@mui/material";
import React, { useEffect } from "react";
import { getActualMinMaxTime, getColumnValues, getLogEventColumn } from "../fakeDatabase";
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
    const mmtime = getActualMinMaxTime();
    if(mmtime) {
        // mmtime is in utc, we need offset;
        let adjustedDates = mmtime.map((d) => new Date(d.getTime() + (60000 * d.getTimezoneOffset())));
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
 * @param {(params: {[key: string]: string | number}, 
 *  todoFilters?: {[key: string]: any}) => void} props.dataSetHandler - Setter for table that these filters control
 * 
 * @returns {React.ElementType}
 */
const LogEventsFilters = ({ dataSetHandler }) => {
    const token = sessionStorage.getItem("token");
    // Component States
    // Checkbox group states
    const allPriorities = ["High", "Medium", "Low"];
    const [selectedPriorities, setSelectedPriorities] = React.useState(new Set(allPriorities));
    const allSeverities = ["Error", "Warning", "Success", "Info"];
    const [selectedSeverities, setSelectedSeverities] = React.useState(new Set(allSeverities));
    const allCategories = ["Status", "Start", "Stop", "Security", "Heartbeat"];
    const [selectedCategories, setSelectedCategories] = React.useState(new Set(allCategories));

    //Dropdown id's
    const EAI_DOMAIN_ID = "EAI_DOMAIN_ID"
    const BUSINESS_DOMAIN_ID = "BUSINESS_DOMAIN_ID"
    const BUSINESS_SUBDOMAIN_ID = "BUSINESS_SUBDOMAIN_ID"
    const APPLICATION_ID = "APPLICATION_ID"
    const PROCESS_SERVICE_ID = "PROCESS_SERVICE_ID"

    // Dropdown states
    const [EAIDomains, setEAIDomains] = React.useState([]);
    const [EAIDomain, setEAIDomain] = React.useState("All");
    const [businessDomains, setBusinessDomains] = React.useState([]);
    const [businessDomain, setBusinessDomain] = React.useState("All");
    const [businessSubDomains, setBusinessSubDomains] = React.useState([]);
    const [businessSubDomain, setBusinessSubDomain] = React.useState("All");
    const [applications, setApplications] = React.useState([]);
    const [application, setApplication] = React.useState("All");
    const [processServices, setProcessServices] = React.useState([]);
    const [process_service, setProcess_service] = React.useState("All");
    // Datetime states (Dates stored are as local time strings, not UTC time)
    const [startTime, setStartTime] = React.useState(getDefaultDateTimeString(0));
    const [endTime, setEndTime] = React.useState(getDefaultDateTimeString(1));

    // On component load, try to find and load cached filters
    useEffect(() => {
        const value = sessionStorage.getItem("LogEventsFilters");
        if(value) {
            console.log("Restoring cached log events filters");
            const namesAndSetters = {
                priority: (x) => setSelectedPriorities(new Set(x)),
                severity: (x) => setSelectedSeverities(new Set(x)),
                categoryName: (x) => setSelectedCategories(new Set(x)),
                eaiDomain: setEAIDomain,
                businessDomain: setBusinessDomain,
                businessSubDomain: setBusinessSubDomain,
                application: setApplication,
                eventContext: setProcess_service,
                creationTime: (x) => { setStartTime(x[0]); setEndTime(x[1]); },
            }
            const filters = JSON.parse(value);
            for(let key in filters) {
                let func = namesAndSetters[key];
                if (func) {
                    func(filters[key]);
                }
            }
        }
    }, []);

    // load dropdown values
    useEffect(() => {
        const namesToSetters = {
            "eai_domain": setEAIDomains,
            "business_domain": setBusinessDomains,
            "business_subdomain": setBusinessSubDomains,
            "application": setApplications,
            "event_context": setProcessServices,
        }
        for (let name in namesToSetters) {
            getLogEventColumn(token, name).then(values => {
                namesToSetters[name](values);
            }).catch(err => {
                console.error(`Querying for ${name} ran into an error, \nUsing mock database for dropdown values`);
                namesToSetters[name](getColumnValues(name.toUpperCase()));
            })
        }
    }, [token]);

    // Handlers
    const handleApplyFilters = (e) => {
        e.preventDefault(); // don't actually submit the form
        console.log("Apply filters was pressed");
        
        // Bundle the filter values for caching
        const allFilters = {
            priority: [...selectedPriorities],
            severity: [...selectedSeverities],
            categoryName: [...selectedCategories],
            eaiDomain: EAIDomain,
            businessDomain: businessDomain,
            businessSubdomain: businessSubDomain,
            application: application,
            eventContext: process_service,
            creationTime: [startTime, endTime],
        };

        // Filters for filtering on our side
        const todoFilters = {
            categoryName: [...selectedCategories],
        }

        // Ensure that seconds are included in the time params
        const actualStart = startTime.length === 16 ? startTime + ":00" : startTime;
        const actualEnd = endTime.length === 16 ? endTime + ":00" : endTime;
        
        // set the API parameters based on filter values
        const params = {
            // global_instance_id: String
            business_domain: businessDomain === "All" ? undefined : businessDomain, // String
            business_subdomain: businessSubDomain === "All" ? undefined : businessSubDomain, // String
            // version: String
            // local_instance_id: String
            // eai_transaction_id: String
            eai_domain: EAIDomain === "All" ? undefined : EAIDomain, // String
            // hostname: String
            application: application === "All" ? undefined : application, // String
            event_context: process_service === "All" ? undefined : process_service, // String
            // component: String
            // severity_low: Integer
            // severity_high: Integer
            // priority_low: Integer
            // priority_high: Integer
            creation_time_start: actualStart.replace("T", " "), // Timestamp
            creation_time_end: actualEnd.replace("T", " "), // Timestamp
            // reasoning_scope: String
            // process_id: Integer
            // category_name: String
            // activity: String
            // msg: String
            sev_info: selectedSeverities.has("Info") ? "true" : "false", // boolean
            sev_succ: selectedSeverities.has("Success") ? "true" : "false", // boolean
            sev_warn: selectedSeverities.has("Warning") ? "true" : "false", // boolean
            sev_err: selectedSeverities.has("Error") ? "true" : "false", // boolean
            priority_low: selectedPriorities.has("Low") ? "true" : "false", // boolean
            priority_med: selectedPriorities.has("Medium") ? "true" : "false", // boolean
            priority_high: selectedPriorities.has("High") ? "true" : "false", // boolean
        }

        // Set the data based on params
        dataSetHandler(params, todoFilters);

        // Cache the filters in sessionStorage
        sessionStorage.setItem("LogEventsFilters", JSON.stringify(allFilters));
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
        return (event) => setter(event.target.value);
    }

    // Full form error checking
    const hasError = () => {
        // Checkboxes
        const checkboxError = checkBoxGroupProps.some(p => p.selected.size < 1);
        if(checkboxError) {
            return true;
        }
        // Datetime
        if (startTime === "" || endTime === "") {
            return true;
        }
        if ((new Date(endTime) < (new Date(startTime)))) {
            return true;
        }
        // Dropdowns
        const dropdownError = dropdownProps.some(p => {
            return p.value !== "All" && (p.value === undefined || !p.options.includes(p.value));
        })
        if(dropdownError) {
            return true;
        }
        // Default
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
        makeDropdownProps("Process/Service", PROCESS_SERVICE_ID, processServices, process_service, setProcess_service),
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
