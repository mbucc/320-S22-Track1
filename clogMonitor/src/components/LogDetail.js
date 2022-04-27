import React, { useEffect, useState } from 'react';
import { Typography, TextField } from '@mui/material';
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
const group1 = ["BUSINESS_DOMAIN", "BUSINESS_SUBDOMAIN", "VERSION", "SEVERITY", "PRIORITY", "CREATION_TIME"];

const group2 = ["GLOBAL_INSTANCE_ID", "LOCAL_INSTANCE_ID", "EAI_TRANSACTION_ID"];

const group3 = ["EAI_DOMAIN", "HOSTNAME", "APPLICATION", "EVENT_CONTEXT", "COMPONENT", "REASONING_SCOPE", "PROCESS_ID", "CATEGORY_NAME", "ACTIVITY"];

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
const LogDetail = (context) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [badID, setBadID] = useState(false);

    useEffect(() => {
        getLogDetails(context.context.token, { global_instance_id: id })
            .then((resultData) => {
                if (resultData.length !== 1) {
                    console.error(`There is/are ${resultData.length} row(s) with id: ${id}`);
                    setBadID(true);
                } else {
                    setData(resultData[0]);
                    setBadID(false);
                }
            })
    }, [id]);

    const makeDetailBox = (key, label, value, isFull) => {
        return (
            <span className='log-detail-item'>
                <TextField
                    key={key}
                    id="outlined-read-only-input"
                    label={label}
                    value={value}
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
            id="outlined-read-only-input"
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
            <Typography className='log-detail-message' >
                <h4>Log Message</h4>
                <div className="scroll"> {msg} </div>
            </Typography>
        )
    }

    return (
        <div className='log-detail-container'>
            {/* {drawGroup(group1, makeDetailBox)}   
            
            {drawGroup(group2, makeLongBox)}
            
            {drawGroup(group3, makeDetailBox)}
            
            {writeMsg(data["MSG"])} */}
            <div className='log-detail-items-container'>
                {Object.keys(data).map(k => { // change test_data back to data
                    let v = data[k];
                    let ks = displayNames.get(k)
                    if (k !== 'msg') {
                        return makeDetailBox(k, ks, v)
                    }
                })}
            </div>
            <div className='log-detail-message-container'>
                {writeMsg(data["msg"])}
            </div>
        </div>
    );
}

export default LogDetail;
