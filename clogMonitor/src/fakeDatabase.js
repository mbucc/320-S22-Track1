import qs from "qs";
import axios from "axios";

// use the dummy data which is in the json
import data from './sample_log_details.json';

// The types of certain columns. All other columns will be assumed to be strings
const dateColumns = ['CREATION_TIME', 'creationTime'];
const numberColumns = ['SEVERITY', 'PRIORITY', 'severity', 'priority'];

// datetime
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function dataCleaning(data, needConvert = true) {
    // Convert data into correct types
    for (let row of data) {
        for (let colName in row) {
            if (numberColumns.includes(colName)) {
                row[colName] = Number(row[colName]);
            } else if (dateColumns.includes(colName)) {
                // needs processing. NOTE: this conversion will not be necessary in the real database
                // These times are in GMT
                // Format is: 01-JAN-22 12.55.03.680000 AM
                // we want 2020-04-13T00:00:00.000+00:00 for Date init
                let datetimestring = row[colName];
                if (needConvert) {
                    let [date, time, am_pm] = row[colName].split(" ");
                    let [day, mnth, yr] = date.split("-");
                    let [hour, minute, second, ms] = time.split(".")
                    let year = "20" + yr; // assume 2000+
                    let month = String(months.indexOf(mnth.toUpperCase()) + 1).padStart(2, "0");
                    let milliseconds = ms.substring(0, 3); // only 3 digits of precision
                    let hour24 = String((Number(hour) % 12) + (am_pm === "PM" ? 12 : 0)).padStart(2, "0");
                    let datestring = year + "-" + month + "-" + day;
                    let timestring = hour24 + ":" + minute + ":" + second + "." + milliseconds;
                    datetimestring = datestring + "T" + timestring + "+00:00";
                }
                let d = new Date(datetimestring);
                row[colName] = d;
            }
        }
    }
}
dataCleaning(data);


// Helper data for filter parsing (see below)
const dropdownFilters = [
    "EAI_DOMAIN", "BUSINESS_DOMAIN", "BUSINESS_SUBDOMAIN", "APPLICATION", "EVENT_CONTEXT",
    "eaiDomain", "businessDomain", "businessSubdomain", "application", "eventContext",
];
const prioritiesMapping = { "High": 70, "Medium": 50, "Low": 10 };


/**
 * Transforms the raw Log Events filters into a list of filter functions
 * 
 * @deprecated
 * 
 * @param {{[columnName: string]: Set<String> | String | [String, String];}} filters A map from column names to raw filter values
 * @returns {{[columnName: string]: (value: any) => boolean}} A list of filter functions
 */
function parseFilters(filters) {
    const resultFilters = {}
    for (let columnName in filters) {
        const rawFilter = filters[columnName];
        // Check the columnName
        if (dropdownFilters.includes(columnName)) {
            // rawFilter should be a string
            resultFilters[columnName] = (x) => {
                return rawFilter === "All" || x === rawFilter;
            };
        } else if (columnName === "PRIORITY" || columnName === "priority") {
            // rawFilter should be of type Set("High"|"Medium"|"Low")
            resultFilters[columnName] = (x) => {
                return [...rawFilter].map(p => prioritiesMapping[p]).includes(x);
            }
        } else if (columnName === "SEVERITY" || columnName === "severity") {
            // because severity uses ranges instead of strict values
            // rawFilter should be of type Set("Info"|"Success"|"Warning"|"Error")
            resultFilters[columnName] = (x) => {
                if (x < 20) {
                    return rawFilter.includes("Info");
                } else if (x < 30) {
                    return rawFilter.includes("Success");
                } else if (x < 50) {
                    return rawFilter.includes("Warning");
                } else {
                    return rawFilter.includes("Error");
                }
            }
        } else if (columnName === "CATEGORY_NAME" || columnName === "categoryName") {
            // rawFilter should be of type Set("Status"|"Start"|"Stop"|"Security"|"Heartbeat")
            resultFilters[columnName] = (x) => {
                return rawFilter.includes(x);
            }
        } else if (columnName === "CREATION_TIME" || columnName === "creationTime") {
            // rawFilter should be of type [Datetimestring, Datetimestring]
            resultFilters[columnName] = (x) => {
                const startDateObj = new Date(rawFilter[0]);
                const endDateObj = new Date(rawFilter[1]);
                return x >= startDateObj && x <= endDateObj;
            }
        } else {
            console.warn("Unsupported filter: ", columnName);
            // We do not add unsupported columnNames to the resultFilters
        }
    }
    return resultFilters;
}

/**
 * Returns tData filtered with the given filters
 * 
 * @deprecated
 * 
 * @param {{[columnName: string]: Set<String> | String | [String, String];}} filters A map from column names to raw filter values
 * @param {{[columnName: string]: String;}[]} tData The table data to filter
 * @returns {{[columnName: string]: String;}[]} The table data that passes the filters
 */
export function filterTableData(filters, tData) {
    if (!filters) {
        return tData;
    }
    const filterfuncs = parseFilters(filters);
    let dataCopy = [...tData];
    let resultData = [];
    // Go through each row
    for (let row of dataCopy) {
        // Find if any cols violate the filters
        let includeRow = true;
        for (let col of Object.keys(row)) {
            if (filterfuncs[col]) {
                const filterfunc = filterfuncs[col];
                if (!(filterfunc(row[col]))) {
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

/**
 * Returns the fake table data that matches the given filters
 * 
 * @deprecated Please create and use an API querying function rather than using this
 * 
 * @param {{[columnName: string]: Set<String> | String | [String, String];}} filters A map from column names to raw filter values
 * @returns {{[columnName: string]: String;}[]} The row data that passes the filters
 */
export function getTableData(filters) {
    return filterTableData(filters, data);
}

/**
 * Returns all the (unique) values that are in data for the given columnName
 * 
 * @deprecated
 * 
 * @param {String} columnName The name of the column to get the values for
 * @returns {String[]} The values of the column, [""] if no such column exists
 */
export function getColumnValues(columnName) {
    if (!columnName) {
        return [""];
    }
    if (!data[0][columnName]) {
        console.error("There is no column in the table with name: ", columnName);
    }
    let deDup = new Set();
    [...data].forEach(row => deDup.add(row[columnName]));
    return [...deDup];
}

/**
 * Returns the minimum and maximum Date objects in the data, undefined if no data exists
 * 
 * @returns {[Date, Date] | undefined} The minimum and maximum Date objects in the data
 */
function minmaxtime(data, column) {
    if (!data) {
        return undefined;
    }
    let mintime = new Date();   // current time
    let maxtime = new Date(0);  // epoch time
    for (let row of data) {
        const d = row[column];
        if (d < mintime) {
            mintime = d;
        }
        if (d > maxtime) {
            maxtime = d;
        }
    }
    return [mintime, maxtime];
}


// Actual database connection stuff

// Sample data from the API
/*
activity: "Customer Update Persisted"
application: "OPER_Adapter"
businessDomain: "OPER"
businessSubdomain: "Customer"
categoryName: "ReportSituation"
component: "Customer_Update"
creationTime: "2022-01-01T06:55:03.788+00:00"
eaiDomain: "EAI_DOMAIN_1"
eaiTransactionId: "eai_crm_server_111113"
eventContext: "Customer_Update"
globalInstanceId: "operations_server_000006"
hostname: "oper_server"
localInstanceId: "OPER-Customer-OPER_Adapter-Customer_Update-2325"
msg: "Successfully persisted customer update"
priority: 10
processId: 2325
reasoningScope: "INTERNAL"
severity: 10
version: "1.0"
*/

// Use .env file to set the backend URL
const storedBackendURL = process.env.REACT_APP_BACKEND_URI;
export const backendBaseURL = storedBackendURL ? storedBackendURL : "http://localhost:8080";

// This is the base URL for the api, which is different from login auth
export const apiBaseURL = backendBaseURL + "/api";

let logDetails = [];
/**
 * @param {string} token The token for this session
 * @param {{[key: string]: string | number}} params The params for the query
 * 
 * @returns {Promise<{[columnName: string]: String;}[]>} A promise for row data returned by the query
 */
export function getLogDetails(token, params) {
    const base = apiBaseURL + "/log_detail";
    const headers = { Authorization: token }
    return new Promise(function (resolve, reject) {
        axios.get(base, { params: params, headers: headers })
        .then(function (response) {
            const resultData = response.data;
            dataCleaning(resultData, false);
            logDetails = resultData;
            resolve(resultData);
        })
        .catch(reject);
    });
}

/**
 * 
 * @returns {[Date, Date]} The start and end times in the data, hardcoded values if no data loaded
 */
export function getActualMinMaxTime() {
    if (logDetails.length > 0) {
        return minmaxtime(logDetails, "creationTime");
    } else {
        const start = new Date("2022-04-19T22:05:29Z");
        const end = new Date("2022-04-21T22:05:33Z");
        return [start, end];
    }
}
/**
 * 
 * @returns {Promise<string>} A promise for the token if username and password are valid
 */
export function validateCredential(username, password) {
    var data = qs.stringify({
        'user': username,
        'password': password
    });

    var config = {
        method: 'post',
        url: backendBaseURL + '/user',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    return new Promise(function (resolve, reject) {
        axios(config)
            .then(function (response) {
                if (!response.data.error) {
                    const token = response.data.token;
                    resolve(token);
                }
                reject("Bad login");
            })
            .catch(reject);
    });
}

/**
 * @param {string} token The token for this session
 * @param {string} columnName The columnName for queries (eg. eai_domain)
 * 
 * @returns {Promise<string[]>} A promise for unique values in the database under the given columnName
 */
export function getLogEventColumn(token, columnName) {
    const base = apiBaseURL + "/log_detail_unique";
    return new Promise(function(resolve, reject) {
        const headers = {
            Authorization: token
        }
        axios.get(base, {params: {columnName: columnName}, headers: headers})
        .then(function (response) {
            const resultData = response.data;
            resolve(resultData);
        })
        .catch(reject);
    });
}