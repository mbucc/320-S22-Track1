import React from 'react';
import LogEventsFilters from './LogEventsFilters';
import LogEventsTable from './LogEventsTable';
import { filterTableData, getLogDetails } from '../fakeDatabase';
import './LogEvents.css'

/**
 * The body of the Log Events page, includes filters and table for displaying Log Events.
 * 
 * 
 * @returns {React.ElementType}
 */
const LogEvents = () => {
    const [tableData, setTableData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [loadError, setLoadError] = React.useState(false);
    const [needTryAgain, setNeedTryAgain] = React.useState(false);
    const token = sessionStorage.getItem("token");

    const now = new Date();
    const offset = 24 * 60 * 60 * 1000; // 24 hour * 60 min/hr * 60 sec/min * 1000 ms/sec
    const before = new Date(now.getTime() - offset);
    const defaultStart = before.toISOString().substring(0, 19).replace("T", " ");
    const defaultEnd = now.toISOString().substring(0, 19).replace("T", " ");

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
        creation_time_start: defaultStart, // Timestamp
        creation_time_end: defaultEnd, // Timestamp
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

    // Initial query on component load
    React.useEffect(() => {
        attemptQuery(defaultQuery);
    }, []);

    // The try again loop
    React.useEffect(() => {
        if(needTryAgain) {
            setTimeout(() => {
                attemptQuery(defaultQuery)
            }, 500);
        }
    }, [needTryAgain]);

    // Handles when table data needs setting
    // Takes in query params and extra filters for filtering the returned data
    function handleTableSet(params, todoFilters={}) {
        attemptQuery(params, todoFilters);
    }

    return (
        <div className='log-events-container'>
            <LogEventsFilters dataSetHandler={handleTableSet}></LogEventsFilters>
            <LogEventsTable data={tableData} loading={loading} error={loadError}></LogEventsTable>
        </div>
    );
}

export default LogEvents;