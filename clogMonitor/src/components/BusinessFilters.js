import React, { useEffect } from "react";
import {Button, FormControl} from "@mui/material";
import CustomDateTimePicker from "../components/CustomDateTimePicker"
import { Grid} from '@mui/material';
import { getColumnValues } from "../fakeDatabase";
import Dropdown from "./Dropdown";
import BusinessTree from '../components/BusinessTree';
import CheckboxGroup from "./CheckboxGroup";
import { TextField } from "@mui/material";


/**
 * Note: for this to work the way we want it to, we use a  "form"
 * Components that should be put here (as of 3/31 understanding):
 *   Start/End time
 *   EAI domain drop down
 *   Publishing domain drop down
 *   tree view
 *   Apply button
 * 
 * All components listed are "inputs", as well as apply button (exception: this "submits" the form)
 * Handlers for each component needs to exist so we can keep track of what has been selected. 
 * Keeping track is important so that when we apply(submit form), filters are known
 * 
 * https://www.pluralsight.com/guides/form-submission-in-reactjs <-- resource to understand
 * 
 * - @hiimlo note
 * 
 * there is code here from Team Goose- for sake of consistency it was been modified to fit business process
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

const BusinessFilters = ({ dataSetHandler }) => {

    //textfield state
    const [text, setText] = React.useState("");

    //ids for dropdowns
    const EAI_DOMAIN_ID = "EAI_DOMAIN_ID"
    const PUBLISHING_BUSINESS_DOMAIN_ID = "PUBLISHING_BUSINESS_DOMAIN_ID"

    // Dropdown states
    const EAIDomains = getColumnValues("EAI_DOMAIN");
    const [EAIDomain, setEAIDomain] = React.useState("All");
    const pubBusinessDomains = getColumnValues("BUSINESS_DOMAIN");
    const [pubBusinessDomain, setPubBusinessDomain] = React.useState("All");

    var d = new Date(); // get current date
    d.setHours(d.getHours(),d.getMinutes()-30,0,0);
    const [startTime, setStartTime] = React.useState(d);
    const [endTime, setEndTime] = React.useState(new Date());

    //for dropdowns, handling and setting them up to be called in a map function
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

    const allSeverities = ["Error", "Warning", "Success", "Info"];
    const [selectedSeverities, setSelectedSeverities] = React.useState(new Set(allSeverities));
  
    const getCheckboxHandler = (opts, select, set) => {
      return (e) => {
        if (e.target.name === "All") {
          let newSelections = new Set();
          if (e.target.checked) {
            newSelections = new Set(opts);
          }
          set(newSelections);
        } else {
          let newSelections = new Set([...select]);
          if (e.target.checked) {
            newSelections.add(e.target.name);
            if (newSelections.size === opts.length - 1) {
              newSelections.add("All");
            }
          } else {
            newSelections.delete(e.target.name);
            newSelections.delete("All");
          }
          set(newSelections);
        }
      };
    };
  
    const BUSINESS_SUBDOMAIN_ID = "BUSINESS_SUBDOMAIN_ID"
    const businessSubDomains = getColumnValues("BUSINESS_SUBDOMAIN")
    const [businessSubDomain, setBusinessSubDomain] = React.useState("All");


    //used to load the cached filters if there are any- for business we need to add tree view as well
    useEffect(() => {
        const value = sessionStorage.getItem("BusinessFilters");
        if(value) {
            console.log("Restoring cached log events filters");
            const namesAndSetters = {
                eaiDomain: setEAIDomain,
                businessDomain: setPubBusinessDomain,
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


    const handleApplyFilters = (e) => {
        e.preventDefault(); // prevent submitting the form and turning the screen white
        console.log("Apply filters was pressed");
        
        // Bundle the filter values for caching
        const allFilters = {
            eaiDomain: EAIDomain,
            businessDomain: pubBusinessDomain,
            creationTime: [startTime, endTime],
        };

        // filters that we control
        const todoFilters = {
            creationTime: [startTime, endTime],
        }
        
        // set the API parameters based on filter values
        const params = {
            pub_business_domain: pubBusinessDomain === "All" ? undefined : pubBusinessDomain, // String
            eai_domain: EAIDomain === "All" ? undefined : EAIDomain, // String
        }

        // Set the data based on params
        dataSetHandler(params, todoFilters);

        // Cache the filters in sessionStorage
        sessionStorage.setItem("BusinessFilters", JSON.stringify(allFilters));
        setText(JSON.stringify(allFilters))
    };
    
    const getDatetimeHandler = (setter) => {
        return (event) => setter(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleApplyFilters}>
                <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                    <Grid item lg={2} xl={2.65}>
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
                         <CustomDateTimePicker 
                            startTime={startTime} 
                            setStartTime={setStartTime}
                            endTime={endTime}
                            setEndTime={setEndTime}
                        />
                    </Grid>
                    <Grid item lg={8} xl={8}>
                        <BusinessTree />
                    </Grid>
                    <Grid item xl={10} />
                    <Grid item justify="flex-end">
                        <FormControl>
                            <Button sx={{marginTop: "16px"}} variant="contained" type="submit">
                                Apply
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                <Grid item lg={5} xl={4}>
                    <CheckboxGroup
                        key={"Severities"}
                        label={"Severities"}
                        options={allSeverities}
                        selectedOptions={selectedSeverities}
                        handleSelection={getCheckboxHandler(
                        allSeverities,
                        selectedSeverities,
                        setSelectedSeverities
                        )}
                        direction={"row"}
                    />
                </Grid>
                <Grid item lg={2} xl={2}>
                    <Dropdown 
                        key={"Business Subdomain"}
                        label={"Business Subdomain"}
                        id={BUSINESS_SUBDOMAIN_ID}
                        options={businessSubDomains}
                        value={businessSubDomain}
                        handleSelection={getDropdownHandler(setBusinessSubDomain)}
                    />
                </Grid>
                <Grid item lg={8} xl={8}>
                    <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        defaultValue={text}
                        InputProps={{
                        readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}




export default BusinessFilters;