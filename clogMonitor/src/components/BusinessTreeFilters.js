import React, {useEffect, useState} from "react";
import {Button, FormControl} from "@mui/material";
import CustomDateTimePicker from "./CustomDateTimePicker"
import { Grid} from '@mui/material';
import Dropdown from "./Dropdown";
import {RichObjectTreeView, useStateValue } from './GBBusinessTree';
import { getTableData } from '../fakeDatabase';


/**
 * AS OF 4/25
 * Time and dropdowns affect the TREE, not the table
 * APPLY BUTTON DOES NOT NEED TO BE HERE
 * Added Refresh Button
 * Selection from tree populates the table
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
    // Data
    const token = sessionStorage.getItem("token");
    const [tableData, setTableData] = React.useState([]);
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

    // Datetime states (UTC)
    var d = new Date(); // get start time based on documents
    d.setHours(d.getHours(),d.getMinutes()-30,0,0);
    const [startTime, setStartTime] = React.useState(d);
    const [endTime, setEndTime] = React.useState(new Date());
    const [startTimeError, setStartTimeError] = useState(null);
    const [endTimeError, setEndTimeError] = useState(null);
    const [startValue, setStartValue] = useState(startTime);
    const [endValue, setEndValue] = useState(endTime);

    React.useEffect(() => {
      const tdata = getTableData(undefined);
      setTableData(tdata);
      // setLoading(true);
      // getLogDetails(undefined).then((resultData) => {
      //     console.log("Got api data")
      //     setTableData(resultData)
      //     setLoading(false);
      // });
  }, [])

    // Track the common date picker error.
  useEffect(() => {
    if (startTime && startTime > new Date()) {
      setStartTimeError('Start time must be in the past.');
    } else {
      setStartTimeError(null);
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      setEndTimeError(null);
    }
  }, [endTime]);
  const onApplyClick = () => {
    if (startTime && endTime && startTime > endTime) {
      setEndTimeError('End date must be later than start date.');
      return;
    }

    if (startTime && startTime > new Date()) {
      setStartTimeError('Start date must be in the past.');
      return;
    }
    }
    /*onChange({
      'startTime': startTime,
      'endTime': endTime,
      //'eaiDomain': EAIDomain.join(','),
      //'publishingBusinessDomain': pubBusinessDomains.join(','),
    });*/
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

    //Filter Change
  //const [{ theme }, dispatch] = useStateValue();

  /*const initialState = {
    theme: { primary: 'green' }
  };
  //Filter Change
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeTheme':
        return {
          ...state,
          theme: action.newTheme
        };
        
      default:
        return state;
    }
  };*/

    return (
        <div>
            <form className="business-filters" onSubmit={handleApplyFilters}>
                <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                    <Grid item lg={12} xl={12} align="center">
                        <h1>Business Processes</h1>
                    </Grid>
                    <Grid item lg={2.75} xl={2.5} justifyContent="center" align="center">
                    {/*Date Time Picker to Filter Business Tree Data*/}
                        <CustomDateTimePicker 
                        id={'bp-tree-filter-start-date-picker'}
                        label = {"Start Time"}
                        onChange = {setStartTime}
                        Time={startTime} 
                        value = {startValue}
                        setValue = {setStartValue}
                        minValue = {new Date('December 1, 1900 00:00:00')}
                        maxValue = {endValue}
                        />
                        <CustomDateTimePicker 
                        id={'bp-tree-filter-end-date-picker'}
                        label = {"End Time"}
                        onChange={setEndTime}
                        Time={endTime} 
                        value = {endValue}
                        setValue = {setEndValue}
                        minValue = {startValue}
                        maxValue = {new Date}
                        />
                        
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
                    <Grid item container spacing={1} lg={4} xl={8} justifyContent="center">
                        <RichObjectTreeView 
                         //initialState={initialState} 
                         //reducer={reducer}
                         startTime = {startValue}
                         endTime = {endValue}
                         data2={tableData} //loading={loading} error={loadError}
                        />
                    </Grid>
                    <Grid item lg={1} xl={4}>
                        <FormControl>
                            <Button
                                //primaryColor={theme.primary}
                                //type="submit"
                                onClick={() => {
                                
                                var d = new Date(); // get current date
                                d.setHours(d.getHours(),d.getMinutes()-30,0,0);
                                setStartValue(d);
                                setEndValue(new Date());
                                //onApplyClick()

                                }
                                }>
                                Refresh
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}




export default BusinessFilters;