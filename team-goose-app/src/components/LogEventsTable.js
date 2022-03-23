import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// Defines the columns for mui DataGrid
// See https://mui.com/components/data-grid/columns/ for possible keys and more details
const columns = [
    { 
        field: 'SEVERITY', 
        headerName: 'Severity', 
        width: 170, 
        valueFormatter: (params) => {
            // Info < 20, Success >= 20 and < 30, Warning >= 30 and < 50, Error >= 50
            const val = params.value;
            if (val < 20) {
                return "Info";
            }
            if (val < 30) {
                return "Success";
            }
            if (val < 50) {
                return "Warning";
            }
            return "Error"
        },
    },
    { 
        field: 'PRIORITY', 
        headerName: 'Priority', 
        width: 170,
        valueFormatter: (params) => {
            //  Low = 10, Medium = 50, High = 70
            const val = params.value;
            if (val <= 10) {
                return "Low";
            }
            if (val <= 50) {
                return "Medium";
            }
            return "High"
        },
    },
    { field: 'CATEGORY_NAME', headerName: 'Category', width: 170 },
    { field: 'CREATION_TIME', headerName: 'Create Date', width: 230 },
    { field: 'APPLICATION', headerName: 'Application', width: 230 },
    // EVENT_CONTEXT is the key for PROCESS, COMPONENT is the key for SERVICE
    { field: 'EVENT_CONTEXT', headerName: 'Process/Service', width: 230 },
    { field: 'ACTIVITY', headerName: 'Activity', width: 230 },
];

/**
 * A table that displays Log Events
 * 
 * @param {Object} props
 * @param {{ GLOBAL_INSTANCE_ID: Number; [key: string]: any;}[]} props.data 
 * - A list of maps from strings to any, each map represents one row
 * 
 * @returns {React.ElementType}
 */
const LogEventsTable = ({data}) => {

    return (
        <div className='log-events-table-container'>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row["GLOBAL_INSTANCE_ID"]}
            />
      </div>
    );
}
 
export default LogEventsTable;