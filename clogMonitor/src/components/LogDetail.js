import React, { useEffect, useState } from 'react';
import { Typography, TextField, Stack } from '@mui/material';
import './LogDetail.css'
import { useParams } from 'react-router-dom';
import { getLogDetails } from '../fakeDatabase';

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

// TODO: update group definitions to use the above names instead of original column names
const group1 = ["businessDomain", "businessSubdomain", "version", "severity", "priority"];

const group2 = ["creationTime","globalInstanceId", "localInstanceId", "eaiTransactionId", "activity"];

const group3 = ["eaiDomain", "hostname", "application", "eventContext"];
const group4 = ["component", "reasoningScope", "processId", "categoryName"];
// const group5 = ["component", "reasoningScope", "processId", "categoryName", "activity"];

const displayNames = new Map();
displayNames.set('globalInstanceId', 'Global Instance ID')
displayNames.set('businessDomain', 'Business Domain')
displayNames.set('businessSubdomain', 'Business SubDomain')
displayNames.set('version', 'Version')
displayNames.set('localInstanceId', 'Local Instance ID')
displayNames.set('eaiTransactionId', 'EAI Transaction ID')
displayNames.set('eaiDomain', 'EAI Domain')
displayNames.set('hostname', 'Host Name')
displayNames.set('application', 'Application')
displayNames.set('eventContext', 'Event Context')
displayNames.set('component', 'Component')
displayNames.set('severity', 'Severity')
displayNames.set('priority', 'Priority')
displayNames.set('creationTime', 'Creation Time')
displayNames.set('reasoningScope', 'Reasoning Scope')
displayNames.set('processId', 'Process ID')
displayNames.set('categoryName', 'Category Name')
displayNames.set('activity', 'Activity')
displayNames.set('msg', 'Message')

/**
 * A display for log details. This should be routed to with an 'id' parameter.
 * 
 * @author Eugene Mak
 * 
 * @returns {React.ElementType}
 */
const LogDetail = () => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [badID, setBadID] = useState(false);

    useEffect(() => {
        getLogDetails({ global_instance_id: id })
        .then((resultData) => {
            if(resultData.length !== 1) {
                console.error(`There is/are ${resultData.length} row(s) with id: ${id}`);
                setBadID(true);
            } else {
                setData(resultData[0]);
                setBadID(false);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [id]);

    const makeDetailBox = (key, label, value) => {
        return (
        <span className='log-detail-item'> 
            <TextField
                key={key}
                id="filled-read-only-input"
                label={label}
                value={value}
                fullWidth
                inputProps={{
                    readOnly: true,
                }}
                
                />
        </span>
        )
    }
    const makeLongBox = (key, label, value) => {
        return <TextField
                key={key}
                id="filled-read-only-input"
                label={label}
                value={value}
                fullWidth
                inputProps={{
                    readOnly: true,
                }}
            />
    }
    const drawGroup = (group, func) => {
        const boxes = [];
        for (let i = 0; i < group.length; i++) {
            let k = group[i]
            boxes[i] = (func(k, displayNames.get(k), data[k]))
        }

        return boxes;
    }

    const writeMsg = (msg) => {
        return (
            
            <div className='scroll'>
                <h4>Log Message</h4>
                <Typography className='log-detail-message' > 
                    {msg}
                </Typography> 
            </div>
            )
    }
    // console.log(data)
    return (
        <div>
            <div className="DetailGroup-Row">
                {drawGroup(group1, makeDetailBox)}
            </div>
            {/* <div className="DetailGroup-Row">
                {group1.map(columnName => {
                    const label = displayNames.get(columnName);
                    const value = data[columnName];
                    return ( <TextField
                            key={label + "_key"}
                            id="outlined-read-only-input"
                            label={label}
                            value={value}
                            inputProps={{ readOnly: true }}
                    />)
                    })}
            </div> */}
            
            <Stack ml={5} mr={5} spacing={2}>
                {drawGroup(group2, makeLongBox)}
            </Stack>
            
            <div className="DetailGroup-Row">
                {drawGroup(group3, makeDetailBox)}
            </div>

            <div className="DetailGroup-Row">
                {drawGroup(group4, makeDetailBox)}
            </div>
            {/* <div className='log-detail-items-container'>
            {Object.keys(data).map(k => { // change test_data back to data
                let v = data[k];
                let ks = displayNames.get(k)
                if (k !== 'msg') {
                    return makeDetailBox(k, ks, v)
                }
            })}  
            </div> */}
            <div className="log-detail-message">
                {writeMsg(data["msg"])}
            </div>
            
    </div>
    );
}

export default LogDetail;
