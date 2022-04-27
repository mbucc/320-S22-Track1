import { Button, FormControl, Grid } from "@mui/material";
import React, { useEffect } from "react";
import CheckboxGroup from "./CheckboxGroup";
import { getColumnValues } from "../fakeDatabase";
import MultipleSelectDropdown from "./MultipleSelectDropdown";

/**
 * Contains the filters for the table post selection from the tree
 * 
 * @param {*} dataSetHandler 
 * @returns 
 */

const BusinessTableFilters = (dataSetHandler) => {

    //checkbox set: state, handler
    const allSeverities = ["Error", "Warning", "Success", "Info"];
    const [selectedSeverities, setSelectedSeverities] = React.useState(new Set(allSeverities));

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
    

    //dropdown: state, handler
    const businessDomains = getColumnValues("BUSINESS_SUBDOMAIN")
    const [selectedBusinessDomains, setBusinessDomains] = React.useState([]);

    const handleMultiDropdownChange = (event) => {
        const {
        target: { value },
        } = event;
        if (value[value.length - 1] === "All") {
          setBusinessDomains(selectedBusinessDomains.length === businessDomains.length ? [] : businessDomains);
          return;
        }
        setBusinessDomains(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    //save cached filters for just the checkbox severity level and drop down
    useEffect(() => {
        const value = sessionStorage.getItem("BusinessTableFilters");
        if(value) {
            console.log("Restoring cached log events filters");
            const namesAndSetters = {
                severity: (x) => setSelectedSeverities(new Set(x)),
                businessDomain: setBusinessDomains,
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
        e.preventDefault(); // don't actually submit the form
        console.log("Apply filters was pressed");
        
        // Bundle the filter values for caching
        const allFilters = {
            severity: [...selectedSeverities],
            businessSubdomain: [...selectedBusinessDomains],
        };

        // Set the data based on params
        dataSetHandler(allFilters);

        // Cache the filters in sessionStorage
        sessionStorage.setItem("BusinessTableFilters", JSON.stringify(allFilters));
    };

    const hasError = () => {
        if (selectedSeverities.size < 1) {
            return true;
        }
        // Datetime
        if (selectedBusinessDomains < 1) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <form onSubmit={handleApplyFilters}>
            <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                <Grid item lg={12} xl={12} align="center"> <h2>Business Process Activities</h2> </Grid>
            {
                    <CheckboxGroup
                        key={"Severities"}
                        label={"Severities"} 
                        options={allSeverities}
                        selectedOptions={selectedSeverities}
                        handleSelection={getCheckboxHandler(allSeverities, selectedSeverities, setSelectedSeverities)}
                        direction={'row'}
                    />
                }
                {
                    <MultipleSelectDropdown 
                    options={businessDomains} 
                    selectedOptions={selectedBusinessDomains}  
                    handleSelection={handleMultiDropdownChange}
                    />
                }
                <FormControl>
                    <Button sx={{marginTop: "16px"}} disabled={hasError()} variant="contained" type="submit">
                        Apply
                    </Button>
                </FormControl>
            </Grid>
            </form>
        </div>

    );


}

export default BusinessTableFilters;