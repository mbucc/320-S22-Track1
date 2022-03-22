import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/**
 * A wrapper for a MaterialUI Select with form control capability
 * 
 * @author Isaac Gebrewolde
 * 
 * @param {Object} props
 * @param {string} props.label - A label for the dropdown
 * @param {string} props.value - The current value for the selected option
 * @param {Array<string}} props.options - A list of option values for the dropdown
 * @param {(event: Event) => any} props.handleSelection - Handler for when an option is selected
 * 
 * @returns {React.ElementType}
 */
const Dropdown = ({ label, value, options, handleSelection }) => {
    return (
        <FormControl margin="normal" style={{ width: "250px" }}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} value={value} onChange={handleSelection}>
                <MenuItem value={"All"}>All</MenuItem>
                {options.map((option) => (
                    <MenuItem key={option+"_id"} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
