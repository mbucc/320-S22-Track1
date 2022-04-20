import React from 'react';
import CheckboxGroup from './CheckboxGroup.js';
import Dropdown from './Dropdown.js';
import { Grid, TextField } from '@mui/material';
// import BusinessTable from '../components/BusinessTable'
import BusinessFilters from '../components/BusinessFilters'

//keeping consistent with other views, similar code is here for handling checkboxes
//checkbox and dropdown both need to be here since they're post selection filtering



export const BusinessView = () => {
  const allSeverities = ["All", "Error", "Warning", "Success", "Info"];
  const [selectedSeverities, setSelectedSeverities] = React.useState(new Set(allSeverities));

  const getCheckboxHandler = (opts, select, set) => {
    return (e) => {

      if (e.target.name === "All") {
        let newSelections = new Set()
        if (e.target.checked) {
          newSelections = new Set(opts)
        }
        set(newSelections)
      } else {

        let newSelections = new Set([...select]);
        if (e.target.checked) {
          newSelections.add(e.target.name);
          if (newSelections.size === opts.length - 1) {
            newSelections.add("All")
          }
        } else {
          newSelections.delete(e.target.name);
          newSelections.delete("All")
        }
        set(newSelections);
      }
    }
  }

  return (
    <div>
      <BusinessFilters />
      <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
        <Grid item lg={3.5} xl={3}>
          <h2>Business Process Activities</h2>
        </Grid>
        <Grid item lg={9} xl={10} />
        <Grid item lg={5} xl={3.5}>
          <CheckboxGroup
            key={"Severities"}
            label={"Severities"}
            options={allSeverities}
            selectedOptions={selectedSeverities}
            handleSelection={getCheckboxHandler(allSeverities, selectedSeverities, setSelectedSeverities)}
            direction={'row'}
          />
        </Grid>
        <Grid item lg={2} xl={2}>
        </Grid>
        <Grid item lg={8} xl={8}>
          <TextField
            fullWidth
            id="outlined-read-only-input"
            defaultValue="TODO: Functionality! EAI and Publishing domains, Business Process, and BP Create Date would show up here."
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item lg={9} xl={10}>
          {/* <BusinessTable /> */}
        </Grid>
      </Grid>
    </div>
  );
}
