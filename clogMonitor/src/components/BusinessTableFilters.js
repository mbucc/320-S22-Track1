import { Button, FormControl } from "@mui/material";
import React, { useEffect } from "react";
import CheckboxGroup from "./CheckboxGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { getColumnValues } from "../fakeDatabase";
import MultipleSelectDropdown from "./MultipleSelectDropdown";

const BusinessTableFilters = (dataSetHandler) => {

    //chip style things for the drop down
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };
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
    const BUSINESS_SUBDOMAIN_ID = "BUSINESS_SUBDOMAIN_ID"
    const businessDomains = getColumnValues("BUSINESS_SUBDOMAIN")
    const [selectedBusinessDomains, setBusinessDomains] = React.useState(new Set(businessDomains));

    const handleDropdownChange = (event) => {
        const {
          target: { value },
        } = event;
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
                <MultipleSelectDropdown />
                <FormControl>
                    <Button sx={{marginTop: "16px"}} disabled={hasError()} variant="contained" type="submit">
                        Apply
                    </Button>
                </FormControl>
            </form>
        </div>

    );


}

export default BusinessTableFilters;