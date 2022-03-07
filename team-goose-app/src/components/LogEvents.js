import React from 'react';
import LogEventsFilters from './LogEventsFilters';
import LogEventsTable from './LogEventsTable';
import { getTableData } from '../fakeDatabase';
import './LogEvents.css'

const LogEvents = () => {
    const [tableData, setTableData] = React.useState([]);

    React.useEffect(() => {
        setTableData(getTableData(undefined));
    }, [])

    return (
        <div className='log-events-container'>
            <LogEventsFilters tableDataSetter={setTableData}></LogEventsFilters>
            <LogEventsTable data={tableData}></LogEventsTable>
        </div>
    );
}

export default LogEvents;