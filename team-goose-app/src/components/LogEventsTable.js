import React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'severity', headerName: 'Severity', width: 170 },
    { field: 'createDate', headerName: 'Create Date', width: 230 },
    { field: 'businessDomain', headerName: 'Business Domain', width: 230 },
    { field: 'application', headerName: 'Application', width: 230 },
    { field: 'activity', headerName: 'Activity', width: 230 },
];

function makeRow(id, severity, priority, category, createDate, application, processService, activity) {
    return {
        id: id, 
        severity: severity, 
        priority: priority,
        category: category,
        createDate: createDate, 
        application: application, 
        processService: processService, 
        activity: activity
    };
}

const rows = [
    makeRow("1", "Info", "High", "Start", "3/3/2022 HH:MM:SS", "Update Customer", "Published Customer Info"),
    makeRow("2", "Warning", "Medium", "Status", "3/3/2022 HH:MM:SS", "Update Customer", "Published Customer Info"),
    makeRow("3", "Error", "Low", "Heartbeat", "3/3/2022 HH:MM:SS", "Update Customer", "Published Customer Info"),
    makeRow("4", "Info", "High", "Security", "3/3/2022 HH:MM:SS", "Update Customer", "Published Customer Info"),
    makeRow("5", "Info", "Medium", "Stop", "3/3/2022 HH:MM:SS", "Update Customer", "Published Customer Info"),
    makeRow("6", "Info", "Low", "Start", "3/3/2022 HH:MM:SS", "Update Customer", "Published Customer Info"),
    makeRow("7", "Info", "High", "Start", "3/3/2022 HH:MM:SS", "Update Customer", "Published Customer Info"),
];

const LogEventsTable = () => {

    return (
        <div style={{ height: 500, width: '100%' }}>
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