import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
// Defines the columns for mui DataGrid
// See https://mui.com/components/data-grid/columns/ for possible keys and more details
// Used keys:
/**
 * field: string - Defines the key from which to pull data for this column
 * headerName: string - The string to display in the header for this column
 * flex: number - The flex value for this column's width (search css flexbox for more on flex)
 * valueFormatter: (params) => any - transforms the stored value in data into a new value before any operations
 */
const columns = [
    { 
        field: 'severity', 
        headerName: 'Severity', 
        type: 'number',
        align: 'left',
        headerAlign: 'left',
        flex: 2,
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
        field: 'priority', 
        headerName: 'Priority', 
        type: 'number',
        flex: 2,
        align: 'left',
        headerAlign: 'left',
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
    { field: 'categoryName', headerName: 'Category', flex: 2 },
    { 
        field: 'creationTime', 
        type: 'dateTime',
        headerName: 'Create Date', 
        flex: 5,
        valueFormatter: (params) => {
            const val = params.value;
            return val.toLocaleString();
        },
    },
    { field: 'application', headerName: 'Application', flex: 4 },
    // EVENT_CONTEXT is the key for PROCESS, COMPONENT is the key for SERVICE
    { field: 'eventContext', headerName: 'Process/Service', flex: 5 },
    { field: 'activity', headerName: 'Activity', flex: 6 },
    {
        field: 'actions',
        headerName: 'Log Event',
        type: 'actions',
        getActions: (params) => [
            <Button key="detailkey" href={"/log-details/" + params.id}>Detail</Button>
        ]
    }
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
    const [pageSize, setPageSize] = useState(5)

    return (
        <div className='log-events-table-container'>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                getRowId={(row) => row["globalInstanceId"]}
            />
      </div>
    );
}
 
export default LogEventsTable;