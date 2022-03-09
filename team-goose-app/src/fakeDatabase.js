// use the dummy data which is in the json
import data from './sample_log_details.json';

export function getTableData(filters) {
    if(!filters) {
        return data;
    }
    let dataCopy = [...data];
    let resultData = [];
    // Go through each row
    for (let row of dataCopy) {
        // Find if any cols violate the filters
        let includeRow = true;
        for(let col of Object.keys(row)) {
            if(filters[col]) {
                if(!filters[col].has(row[col])) {
                    includeRow = false;
                    break;
                }
            }
        }
        // only include rows that don't violate the filters
        if (includeRow) {
            resultData.push(row);
        }
    }
    return resultData;
}

export function getColumnValues(columnName) {
    if(!columnName) {
        return [""];
    }
    let dataCopy = [...data];
    if(!dataCopy[0][columnName]) {
        console.error("There is no column in the table with name: ", columnName);
    }
    let deDup = new Set();
    dataCopy.forEach(row => deDup.add(row[columnName]));
    return [...deDup];
}