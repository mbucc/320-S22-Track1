import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = ({ label, value, options, handleSelection }) => {
  return (
    <FormControl margin="normal" style={{ width: "250px" }}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={handleSelection}>
        <MenuItem value={"All"}>All</MenuItem>
        {options.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
