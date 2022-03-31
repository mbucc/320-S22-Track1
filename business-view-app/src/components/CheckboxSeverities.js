import React from 'react';
import { FormLabel, FormControl, Grid, FormControlLabel, Checkbox } from '@mui/material';

/**
* Checkboxes to filter by severity
*
* @author @hiimlo
*
* Using a passed in array, maps array values to create checkboxes.
* Current implementation hard codes it- this needs to be changed when creating functionality
* Checkboxes are contained in a Grid container to align them horizontally, as customer did in mock up
*
* @returns {React.ElementType}
*
*/




export default function CheckboxSeverities() {
  const sevs = ["Errors", "Warnings", "Success", "Info"];

  return (
    <FormControl>
      <FormLabel>Severities</FormLabel>
      <Grid container direction="row">
        {sevs.map(sevs =>
            <FormControlLabel 
              key = {sevs}
              name = {sevs}
              control={<Checkbox size="small" color="success" defaultChecked />} 
              label = {sevs} 
            />
        )}
      </Grid>
    </FormControl>
  );
}


/** previous code (keep this, this will be revisted later for using to filter)

<FormControlLabel 
            key = {sevs}
            name = {sevs}
            checked = {selected.has(status)} <-- removed line, need to put back
            control={<Checkbox size="small" color="success" onChange={handleSelected} defaultChecked />}  <-- handle selected was removed, need to put back
            label = {sevs} 
          />
*/