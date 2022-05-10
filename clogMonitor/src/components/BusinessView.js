import React from "react";
import { filterTableData, getLogDetails } from '../fakeDatabase';
import BusinessTable from "../components/BusinessTable";
import BusinessTreeFilters from "../components/BusinessTreeFilters";
import BusinessTableFilters from "./BusinessTableFilters";
import { Grid } from "@mui/material"

//keeping consistent with other views, similar code is here for handling checkboxes
//checkbox and dropdown both need to be here since they're post selection filtering
/**
 * Code reworked from Logview
 */

export const BusinessView = () => {
    const [tableData, setTableData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loadError, setLoadError] = React.useState(false);
    const [needTryAgain, setNeedTryAgain] = React.useState(false);
    const token = sessionStorage.getItem("token");

    const attemptQuery = (params, filters={}) => {
        setLoading(true);
        setNeedTryAgain(false);
        getLogDetails(token, params).then((resultData) => {
            // Since we still need to manually filter some things
            const fullyFilteredData = filterTableData(filters, resultData);
            // Actually update the table
            setTableData(fullyFilteredData);
            setLoading(false);
            setLoadError(false);
        }).catch(err => {
            console.error(err);
            setLoadError(true);
            setNeedTryAgain(true);
        });
    }

    React.useEffect(() => {
      attemptQuery(undefined);
  }, []);

    React.useEffect(() => {
      if(needTryAgain) {
          setTimeout(() => {
              attemptQuery(undefined)
          }, 500);
      }
  }, [needTryAgain]);

    function handleTableSet(params, todoFilters={}) {
      attemptQuery(params, todoFilters);
    }

  return (
    <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
      <Grid item>
        <BusinessTreeFilters dataSetHandler={handleTableSet} />
      </Grid>
      <Grid item lg={12} xl={12} align="center">
      <BusinessTableFilters dataSetHandler={handleTableSet} />
      </Grid>
      <Grid item lg={12} xl={12} align="center">
      <BusinessTable data={tableData} loading={loading}/>
      </Grid>
    </Grid>
  );
};
