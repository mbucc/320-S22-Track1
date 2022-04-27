import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

/**
 * A wrapper for a MaterialUI Select with form control capability
 * 
 * @author Isaac Gebrewolde
 * 
 * @param {Object} props
 * @param {string} props.label - A label for the dropdown
 * @param {string} props.id - An id for the dropdown
 * @param {string} props.value - The current value for the selected option
 * @param {Array<string>} props.options - A list of option values for the dropdown
 * @param {(event: Event) => any} props.handleSelection - Handler for when an option is selected
 * 
 * @returns {React.ElementType}
 */
const Dropdown = ({ label, id, value, options, handleSelection }) => {
    // The dropdown has an error if value is not defined 
    // or if value is not in options
    // "All" is always valid
    const isError = () => {
        return value !== "All" && (value === undefined || !options.includes(value));
    }

    return (
        <FormControl  className={`dropdown-group ${label}`} error={isError()} margin="normal" style={{ width: "250px" }}>
            <InputLabel className='dropdown-label'>{label}</InputLabel>
            <Select id={id} label={label} value={value} onChange={handleSelection}>
                <MenuItem value={"All"}>All</MenuItem>
                {options.map((option) => (
                    <MenuItem key={option+"_id"} value={option}>{option}</MenuItem>
                ))}
            </Select>
            <FormHelperText 
                sx={{marginRight: 0, marginLeft: 0, marginTop: 0}}
                className='dropdown-errmess'
            >
                {isError() ? "Value is out of range" : ""}
            </FormHelperText>
        </FormControl>
    );
};

export default Dropdown;