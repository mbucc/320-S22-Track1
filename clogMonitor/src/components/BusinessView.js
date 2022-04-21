import React from "react";
import CheckboxGroup from "./CheckboxGroup.js";
import Dropdown from "./Dropdown.js";
import { Grid, TextField } from "@mui/material";
import { filterTableData, getLogDetails, getColumnValues } from '../fakeDatabase';
import BusinessTable from "../components/BusinessTable";
import BusinessFilters from "../components/BusinessFilters";
import EnhancedTable from "./deleteTableLater.js";

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

  return (
    <div>
      <BusinessFilters dataSetHandler={handleTableSet} />
      <Grid
        container
        padding={2}
        justifyContent="center"
      >
          {/**<BusinessTable data={tableData} loading={loading}/>*/}
          <EnhancedTable />
      </Grid>
    </div>
  );
};
