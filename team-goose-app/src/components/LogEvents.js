import React from 'react';
import LogEventsFilters from './LogEventsFilters';
import LogEventsTable from './LogEventsTable';

import './LogEvents.css'

const LogEvents = () => {

    return (
        <div className='log-events-container'>
            <LogEventsFilters></LogEventsFilters>
            <LogEventsTable></LogEventsTable>
        </div>
    );
}

export default LogEvents;