import React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'severity', headerName: 'Severity', width: 170 },
    { field: 'createDate', headerName: 'Create Date', width: 230 },
    { field: 'businessDomain', headerName: 'Business Domain', width: 230 },
    { field: 'application', headerName: 'Application', width: 230 },
    { field: 'activity', headerName: 'Activity', width: 230 },
];

function makeRow(id, severity, createDate, businessDomain, application, activity) {
    return {
        id: id, 
        severity: severity, 
        createDate: createDate, 
        businessDomain: businessDomain, 
        application: application, 
        activity: activity
    };
}

const rows = [
    makeRow("1", "Info", "3/3/2022 HH:MM:SS", "CRM", "CRM App", "Published Customer Info"),
    makeRow("2", "Warning", "3/3/2022 HH:MM:SS", "CRM", "CRM App", "Published Customer Info"),
    makeRow("3", "Error", "3/3/2022 HH:MM:SS", "Settlement", "Settlement App", "Published Customer Info"),
    makeRow("4", "Info", "3/3/2022 HH:MM:SS", "Settlement", "Settlement App", "Published Customer Info"),
    makeRow("5", "Warning", "3/3/2022 HH:MM:SS", "CRM", "CRM App", "Published Customer Info"),
];

const LogEventsTable = () => {

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
            />
      </div>
    );
}
 
export default LogEventsTable;