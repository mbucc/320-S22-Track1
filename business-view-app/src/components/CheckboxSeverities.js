import React from 'react';
import { FormLabel, FormControl, Grid, FormControlLabel, Checkbox } from '@mui/material';

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

//@hiimlo file
//this is for the checkboxs for filtering through log events by severity levels.

//previous code (keep this, this will be revisted later for using to filter)
/*
<FormControlLabel 
            key = {sevs}
            name = {sevs}
            checked = {selected.has(status)} <-- removed line, need to put back
            control={<Checkbox size="small" color="success" onChange={handleSelected} defaultChecked />}  <-- handle selected was removed, need to put back
            label = {sevs} 
          />
*/