import React from "react";
import {Button, FormControl} from "@mui/material";

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