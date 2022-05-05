import React from "react";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
//import { identity } from "cypress/types/lodash";

/**
 * A wrapper for a MaterialUI Select with form control capability
 * 
 * @author Isaac Gebrewolde
 * 
 * @param {Object} props
 * @param {string} props.label - A label for the dropdown
 * @param {string} props.id - An id for the dropdown
 * @param {string} props.value - The current value for the selected option
 * @param {Array<string}} props.options - A list of option values for the dropdown
 * @param {(event: Event) => any} props.handleSelection - Handler for when an option is selected
 * 
 * @returns {React.ElementType}
 */
const Dropdown = ({ label, id, value, options, handleSelection }) => {
    return (
        <FormControl  className={`dropdown-group ${label}`} margin="normal" style={{ width: "250px" }}>
            <FormLabel className='dropdown-label'>{label}</FormLabel>
            <Select id={id} label={label} value={value} onChange={handleSelection}>
                <MenuItem value={"All"}>All</MenuItem>
                {options.map((option) => (
                    <MenuItem key={option+"_id"} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
