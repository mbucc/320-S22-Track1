import React from "react";
import {FormGroup, FormControlLabel, Checkbox, FormLabel, FormControl} from '@mui/material'

//TODO: update color prop when color scheme is finalized

const CheckboxSeverities = (selected, handleSelected) => {
  const status = ["Errors", "Warnings", "Success", "Info"];

  return(
    <FormControl> 
      <FormLabel>Severities</FormLabel>
      <FormGroup>
        {status.map(status =>
          <FormControlLabel 
            key = {status}
            name = {status}
            checked = {selected.has(status)}
            control={<Checkbox size="small" color="success" onChange={handleSelected} defaultChecked />} 
            label = {status} 
          />
        )}
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxSeverities;


//NOTES 4 me and you --- 
//FormControl is the wrapper for the inner Form Components, JSX only allows one outer component
//FormLabel has the label for this section
//FormGroup wraps a group controls (in this file, it's CheckBoxes)
//status has preset labels, since for business view we only have one checkbox section
//---checkbox color is "success" for now, change once color scheme has been finalized
//Tip: for React to recognize these as a component, the first character of whatever you're exporting MUST be uppercase

//TODO: remove NOTES at the end
