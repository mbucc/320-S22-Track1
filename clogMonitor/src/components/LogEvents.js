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
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        getLogDetails(undefined).then((resultData) => {
            setTableData(resultData)
            setLoading(false);
        });
    }, [])

    // Handles when table data needs setting
    // Takes in query params and extra filters for filtering the returned data
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
        <div className='log-events-container'>
            <LogEventsFilters dataSetHandler={handleTableSet}></LogEventsFilters>
            <LogEventsTable data={tableData} loading={loading}></LogEventsTable>
        </div>
    );
}

export default LogEvents;