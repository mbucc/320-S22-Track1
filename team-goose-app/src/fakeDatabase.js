// use the dummy data which is in the json
import data from './sample_log_details.json';

const dropdownFilters = ["EAI_DOMAIN", "BUSINESS_DOMAIN", "BUSINESS_SUBDOMAIN", "APPLICATION", "PROCESS_ID"];
const prioritiesMapping = {"High": "70", "Medium": "50", "Low": "10"};

// Takes the raw values of filters (which is just the values of the filters from the UI)
// and transforms it into a filter function, which returns true if the input should pass the filter
function parseFilters(filters) {
    const resultFilters = {}
    for(let columnName in filters) {
        const rawFilter = filters[columnName];
        // Check the columnName
        if(dropdownFilters.includes(columnName)) {
            // rawFilter should be a string
            resultFilters[columnName] = (x) => {
                return rawFilter === "All" || x === rawFilter;
            };
        } else if (columnName === "PRIORITY") {
            // rawFilter should be of type Set("High"|"Medium"|"Low")
            resultFilters[columnName] = (x) => {
                return [...rawFilter].map(p => prioritiesMapping[p]).includes(x);
            }
        } else if (columnName === "SEVERITY") {
            // because severity uses ranges instead of strict values
            // rawFilter should be of type Set("Info"|"Success"|"Warning"|"Error")
            resultFilters[columnName] = (x) => {
                if(x < 20) {
                    return rawFilter.has("Info");
                } else if (x < 30) {
                    return rawFilter.has("Success");
                } else if (x < 50) {
                    return rawFilter.has("Warning");
                } else {
                    return rawFilter.has("Error");
                }
            }
        } else if (columnName === "CATEGORY") {
            // rawFilter should be of type Set("Status"|"Start"|"Stop"|"Security"|"Heartbeat")
            resultFilters[columnName] = (x) => {
                return rawFilter.has(x);
            }
        } else {
            console.warn("Unsupported filter: ", columnName);
            // We do not add unsupported columnNames to the resultFilters
        }
    }
    return resultFilters;
}

// filters are a mapping from column names to state associated with the filter for that column name
// and returns the rows of data that pass those filters
export function getTableData(filters) {
    if(!filters) {
        return data;
    }
    const filterfuncs = parseFilters(filters);
    let dataCopy = [...data];
    let resultData = [];
    // Go through each row
    for (let row of dataCopy) {
        // Find if any cols violate the filters
        let includeRow = true;
        for(let col of Object.keys(row)) {
            if(filterfuncs[col]) {
                const filterfunc = filterfuncs[col];
                if(!(filterfunc(row[col]))) {
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

// returns all the (unique) values that are in data for the give columnName
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