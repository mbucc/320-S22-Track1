import React from "react";
import { Grid } from "@mui/material";
import { filterTableData, getLogDetails, getColumnValues, getTableData } from '../fakeDatabase';
import BusinessTable from "../components/BusinessTable";
import BusinessTreeFilters from "../components/BusinessTreeFilters";
import BusinessTableFilters from "./BusinessTableFilters";
//import BPTreeView from '../components/GBTree/core';

//keeping consistent with other views, similar code is here for handling checkboxes
//checkbox and dropdown both need to be here since they're post selection filtering
/**
 * Code reworked from Logview
 */

export const BusinessView = () => {
  // To get token, use the following line:
  const token = sessionStorage.getItem("token");
  const [tableData, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState(false);
  const [needTryAgain, setNeedTryAgain] = React.useState(false);

  const defaultQuery = {
        sev_info: "true", // boolean
        sev_succ: "true", // boolean
        sev_warn: "true", // boolean
        sev_err: "true", // boolean
        priority_low: "true", // boolean
        priority_med: "true", // boolean
        priority_high: "true", // boolean
        status: "true",
        start: "true",
        stop: "true",
        security: "true",
        heartbeat: "true",
    }

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

    /*React.useEffect(() => {

        attemptQuery(defaultQuery);
    }, []);*/

    /*// The try again loop
    React.useEffect(() => {
        if(needTryAgain) {
            setTimeout(() => {
                attemptQuery(defaultQuery)
            }, 500);
        }
    }, [needTryAgain]);*/

    // Handles when table data needs setting
    // Takes in query params and extra filters for filtering the returned data
    /*function handleTableSet(params, todoFilters={}) {
        attemptQuery(params, todoFilters);
    }*/

  React.useEffect(() => {
      const tdata = getTableData(undefined);
      console.log("Got tdata");
      console.log(tdata);
      setTableData(tdata);
      // setLoading(true);
      // getLogDetails(undefined).then((resultData) => {
      //     console.log("Got api data")
      //     setTableData(resultData)
      //     setLoading(false);
      // });
  }, [])

  function handleTableSet(params, todoFilters={}) {

    // setLoading(true);
    // getLogDetails(params).then((resultData) => {
    //     // Since we still need to manually filter some things
    //     const fullyFilteredData = filterTableData(todoFilters, resultData);
    //     // Actually update the table
    //     setTableData(fullyFilteredData);
    //     setLoading(false);
    //     return fullyFilteredData;
    // })
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
      <BusinessTable data={tableData} loading={loading} error={loadError}/>
      {/*<BPTreeView onChange={(id) => {
              setSelectedTransactionID(id);
            }}/>
            
            </div>*/}
      </Grid>
    </Grid>

  );
};
