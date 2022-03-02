import React from 'react';
import LogEventsFilters from './LogEventsFilters';
import LogEventsTable from './LogEventsTable';
  
const LogEvents = () => {

    return (
        <div style={{margin: "10px"}}>
            <LogEventsFilters></LogEventsFilters>
            <LogEventsTable></LogEventsTable>
        </div>
    );
}

export default LogEvents;