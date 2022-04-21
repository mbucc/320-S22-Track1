import React from "react";
import CheckboxGroup from "./CheckboxGroup.js";
import Dropdown from "./Dropdown.js";
import { Grid, TextField } from "@mui/material";
import { filterTableData, getLogDetails, getColumnValues } from '../fakeDatabase';
import BusinessTable from "../components/BusinessTable";
import BusinessFilters from "../components/BusinessFilters";

//keeping consistent with other views, similar code is here for handling checkboxes
//checkbox and dropdown both need to be here since they're post selection filtering
/**
 * Code reworked from Logview
 */

export const BusinessView = () => {
  const [tableData, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
      setLoading(true);
      getLogDetails(undefined).then((resultData) => {
          setTableData(resultData)
          setLoading(false);
      });
  }, [])

  function handleTableSet(params, todoFilters={}) {
    setLoading(true);
    getLogDetails(params).then((resultData) => {
        // Since we still need to manually filter some things
        const fullyFilteredData = filterTableData(todoFilters, resultData);
        // Actually update the table
        setTableData(fullyFilteredData);
        setLoading(false);
        return fullyFilteredData;
    })
  }

  const allSeverities = ["All", "Error", "Warning", "Success", "Info"];
  const [selectedSeverities, setSelectedSeverities] = React.useState(new Set(allSeverities));

  const getCheckboxHandler = (opts, select, set) => {
    return (e) => {
      if (e.target.name === "All") {
        let newSelections = new Set();
        if (e.target.checked) {
          newSelections = new Set(opts);
        }
        set(newSelections);
      } else {
        let newSelections = new Set([...select]);
        if (e.target.checked) {
          newSelections.add(e.target.name);
          if (newSelections.size === opts.length - 1) {
            newSelections.add("All");
          }
        } else {
          newSelections.delete(e.target.name);
          newSelections.delete("All");
        }
        set(newSelections);
      }
    };
  };

  const BUSINESS_SUBDOMAIN_ID = "BUSINESS_SUBDOMAIN_ID"
  const businessSubDomains = getColumnValues("BUSINESS_SUBDOMAIN")
  const [businessSubDomain, setBusinessSubDomain] = React.useState("All");
  const getDropdownHandler = (setter) => {
    return (event) => setter(event.target.value);
}

  return (
    <div>
      <BusinessFilters dataSetHandler={handleTableSet} />
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
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
            handleSelection={getCheckboxHandler(
              allSeverities,
              selectedSeverities,
              setSelectedSeverities
            )}
            direction={"row"}
          />
        </Grid>
        <Grid item lg={2} xl={2}>
          <Dropdown 
            key={"Business Subdomain"}
            label={"Business Subdomain"}
            id={BUSINESS_SUBDOMAIN_ID}
            options={businessSubDomains}
            value={businessSubDomain}
            handleSelection={getDropdownHandler(setBusinessSubDomain)}
          />
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
          <BusinessTable data={tableData} loading={loading}/>
        </Grid>
      </Grid>
    </div>
  );
};
