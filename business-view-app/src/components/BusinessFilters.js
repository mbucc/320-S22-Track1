import React from "react";
import {Button, FormControl} from "@mui/material";

//TODO:  UPDATE AS MORE FILTERS ARE MADE
//STILL LEFT: dropdowns, tree, dates

const BusinessFilters = () => {
    //Checkbox group states
    const sevList = ["Errors", "Warnings", "Success", "Info"];
    const [selectedSev, setSeverities] = React.useState(new Set(sevList));

    // Handlers
    const checkedHandler = (selections, set) => {
        return (event) => {
            let toSet = new Set([...selections]);
            if (event.target.checked) {
                toSet.add(event.target.name);
            }
            else {
                toSet.delete(event.target.name);
            }
            set(toSet);
        }
    }

    const handleApplyFilters = (e) => {
        e.preventDefault(); // don't actually submit the form
        console.log("Apply filters was pressed");
        // get the filters by column name
        const filters = {
            SEVERITY: selectedSev,
            // EAI_DOMAIN: EAIDomain,
            // BUSINESS_DOMAIN: businessDomain,
            // BUSINESS_SUBDOMAIN: businessSubDomain,
            // APPLICATION: application,
            // EVENT_CONTEXT: process_service,
            // CREATION_TIME: [startTime, endTime]
        };

        // Request table data according to filters (This is where we would do a axios POST)
        const resultData = getTableData(filters);
        // We may need to do some conversion afterwards
        // Set the changes
        tableDataSetter(resultData);
    };

    const hasError = () => {
        // Checkboxes
        return (selectedSev.size < 1)
    }

    // Checkboxes
    const makeCheckboxGroupProps = (label, options, selected, setter) => {
        return {
            label: label,
            options: options,
            selected: selected,
            handler: checkedHandler(selected, setter),
        }
    }
    const checkBoxGroupProps = [
        makeCheckboxGroupProps("Severities", sevList, selectedSev, setSeverities)
    ];


    return (
        <div>
            <form className="business-filters" onSubmit={handleApplyFilters}>
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
                <FormControl>
                    <Button disabled={hasError()} variant="contained" type="submit">
                        Apply
                    </Button>
                </FormControl>
            </form>
        </div>
    );
}
//export default BusinessFilters;