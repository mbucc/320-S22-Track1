import React from 'react';
import LogEventsFilters from './LogEventsFilters';
import LogEventsTable from './LogEventsTable';
import { getLogDetails } from '../fakeDatabase';
import './LogEvents.css'

/**
 * The body of the Log Events page, includes filters and table for displaying Log Events.
 * 
 * 
 * @returns {React.ElementType}
 */
const LogEvents = () => {
    const [tableData, setTableData] = React.useState([]);

    React.useEffect(() => {
        getLogDetails(undefined).then((resultData) => setTableData(resultData));
    }, [])

    return (
        <div className='log-events-container'>
            <LogEventsFilters tableDataSetter={setTableData}></LogEventsFilters>
            <LogEventsTable data={tableData}></LogEventsTable>
        </div>
    );
}

export default LogEvents;