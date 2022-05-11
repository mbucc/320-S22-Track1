import { Button, Collapse, FormControl } from "@mui/material";
import React, { useEffect } from "react";
import { getActualMinMaxTime, getColumnValues, getLogEventColumn } from "../fakeDatabase";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckboxGroup from "./CheckboxGroup";
import Dropdown from "./Dropdown";
import './LogEvents.css'
import TimeRange, { hasDSTerror, hasDSTconflict, convertDSTtoUTC, isRangeError } from "./TimeRange";

/**
 * Returns the current datetime minus a given offset as a valid string for datetime-local inputs
 * 
 * @param {Number} offset - integer number of ms before current time to return
 * 
 * @returns {string} (Now - offset) as a datetime-local valid string
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#local_date_and_time_strings}
 */
const dateTimeStringFromNow = (offset=0) => {
    let now = new Date();
    let tzOffset = now.getTimezoneOffset() * 60000;
    let adjustedDate = new Date(now.getTime() - tzOffset - offset);
    let formattedDate = adjustedDate.toISOString().substring(0, 19);
    return formattedDate;
};


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
    const defaultOffset = 24 * 60 * 60 * 1000; // 24 hour * 60 min/hr * 60 sec/min * 1000 ms/sec
    const [startTime, setStartTime] = React.useState(dateTimeStringFromNow(defaultOffset));
    const [endTime, setEndTime] = React.useState(dateTimeStringFromNow(0));
    
    // DST states
    const [startTimeDST, setStartTimeDST] = React.useState('BEFORE');
    const [endTimeDST, setEndTimeDST] = React.useState('BEFORE');
    
    // DST selection handlers
    const getDstDatetimeHandler = (setter) => {
        return (event) => setter(event.target.value); // 'BEFORE' or 'AFTER'
    }
    

    // Collapsing
    const [collapsed, setCollapsed] = React.useState(false);

    // On component load, try to find and load cached filters
    useEffect(() => {
        const value = sessionStorage.getItem("BusinessTreeFilters");
        if(value) {
            console.log("Restoring cached business tree filters");
            const namesAndSetters = {
                eaiDomain: setEAIDomain,
                businessDomain: setBusinessDomain,
                creationTime: (x) => { setStartTime(x[0]); setEndTime(x[1]); },
                startTimeDST: setStartTimeDST,
                endTimeDST: setEndTimeDST
            }
            const filters = JSON.parse(value);
            for(let key in filters) {
                let func = namesAndSetters[key];
                if (func) {
                    func(filters[key]);
                }
            }
        } else {
            // Store the default filters
            handleApplyFilters();
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
        if(e) {
            e.preventDefault(); // don't actually submit the form
        }
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
            startTimeDST: startTimeDST,
            endTimeDST: endTimeDST,            
        };

        // Ensure that seconds are included in the time params
        const actualStartString = startTime.length === 16 ? startTime + ":00" : startTime;
        const actualEndString = endTime.length === 16 ? endTime + ":00" : endTime;
        // Convert to UTC
        let localDates = [new Date(actualStartString), new Date(actualEndString)]

        // If DST, convert date/time after choosing "BEFORE/AFTER" to UTC
        localDates[0] = convertDSTtoUTC(localDates[0], hasDSTconflict(startTime), startTimeDST);
        localDates[1] = convertDSTtoUTC(localDates[1], hasDSTconflict(endTime), endTimeDST);
        
        const [actualStart, actualEnd] = localDates.map(d => d.toISOString().substring(0, 19));
        
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
            status: selectedCategories.has("Status") ? "true" : "false",
            start: selectedCategories.has("Start") ? "true" : "false",
            stop: selectedCategories.has("Stop") ? "true" : "false",
            security: selectedCategories.has("Security") ? "true" : "false",
            heartbeat: selectedCategories.has("Heartbeat") ? "true" : "false",
        }

        // Set the data based on params
        dataSetHandler(params, {});

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

        let end = new Date(endTime);
        let start = new Date(startTime)
        if(isRangeError(start, end, startTimeDST, endTimeDST)){
            return true
        }
        
        if (hasDSTerror(startTime) || hasDSTerror(endTime)) {
            return true
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

    // Collapsing
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    }

    // Apply indicator
    const filtersChanged = () => {
        // TODO: compare the current filters with those that are in sessionStorage
        const filters = JSON.parse(sessionStorage.getItem("LogEventsFilters"));
        
        if (filters){

            let st = filters['creationTime'][0];
            let et = filters['creationTime'][1];
            if(st !== startTime || et !== endTime) return true;

            const namesAndData = {
                'application':application,
                'businessDomain':businessDomain,
                'businessSubdomain':businessSubDomain,
                'eaiDomain':EAIDomain,
                'eventContext':process_service,
                'categoryName':selectedCategories,
                'priority':selectedPriorities,
                'severity':selectedSeverities,
            }

            const diff = ['categoryName','priority','severity']
            
            let areSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
            for (let name in namesAndData){
                if (diff.includes(name)){
                    if (!areSetsEqual(new Set(filters[name]), namesAndData[name])) return true;
                } else {
                    if (filters[name] !== namesAndData[name]) return true;
                }
            }
        }
        return false;

    }
    const getBorderColor = () => {
        const filtersChangedColor = "rgb(245, 238, 44)"; // TODO: choose good colors for this
        const filtersAppliedColor = "rgb(82, 152, 68)"; // This is the color the whole app will have soon
        return filtersChanged() ? filtersChangedColor : filtersAppliedColor;
    }

    return (
        <form className="log-events-filters-outline" style={{borderColor: getBorderColor()}} onSubmit={handleApplyFilters}>
            <Collapse className="log-events-filters" in={!collapsed}>
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
                    startTimeDST={startTimeDST} // startTimeDST
                    startDstChangeHandler={getDstDatetimeHandler(setStartTimeDST)} // startTimeDST handle
                    endTimeDST={endTimeDST} // endTimeDST
                    endDstChangeHandler={getDstDatetimeHandler(setEndTimeDST)} // endTimeDST handle
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
            </Collapse>

            <FormControl sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Collapse in={!collapsed}>
                    <Button className="apply-filters-btn" sx={{marginTop: "16px", width: "88px"}} disabled={hasError()} variant="contained" type="submit">
                        {filtersChanged() ? "Apply" : "Applied"}
                    </Button>
                </Collapse>

                <Button variant="outlined" onClick={handleCollapse}>
                    {collapsed ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                </Button>
            </FormControl>
        </form>
    );
};

export default LogEventsFilters;