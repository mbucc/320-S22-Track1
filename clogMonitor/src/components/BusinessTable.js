import React, { useState } from 'react';
import { DataGrid, GridFilterModel} from '@mui/x-data-grid';
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
 
/**
 * reworked code to work for business 
 * original author: @klin17 , edited for business purpose by @hiimlo
 */
const columns = [
    { 
        field: 'SEVERITY', 
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
        field: 'CREATION_TIME', 
        type: 'dateTime',
        headerName: 'Create Date', 
        flex: 5,
        valueFormatter: (params) => {
            const val = params.value;
            return val.toLocaleString();
        },
    },
    { field: 'APPLICATION', headerName: 'Application', flex: 4 },
    { field: 'ACTIVITY', headerName: 'Activity', flex: 6 },
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

 * table displays business events
 */
const BusinessTable = ({data, loading}) => {
    const [pageSize, setPageSize] = useState(5)

    console.log("business table data:");
    console.log(data);

    return (
    //   <div>
        <DataGrid
            /*initialState={{
            filter: {
                filterModel: {
                items: [{ columnField: 'CREATION_TIME', operatorValue: '>', value: '2.5' }],
                },
            },
            }}*/
            /*initialState={{
          ...data.initialState,
          filter: {
            filterModel: {
              items: [
                {
                  columnField: 'CREATION_TIME',
                  operatorValue: '>',
                  value: '0',
                },
              ],
            },
          },
        }}*/
            style={{height: "50vh", width:"90%"}}
            rows={data}
            loading={loading}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            onPageSizeChange={(newSize) => setPageSize(newSize)}
            getRowId={(row) => row["GLOBAL_INSTANCE_ID"]}
        />
    );
}
 
export default BusinessTable;