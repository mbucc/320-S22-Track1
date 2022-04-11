import React from 'react';
import { Typography, TextField } from '@mui/material';
import './LogDetail.css'
import { useParams } from 'react-router-dom';
import { getRowByID } from '../fakeDatabase';
/**
 * A group of checkboxes for selecting any or all of some options
 * 
 * @author Eugene Mak
 * 
 * @param {Object} props
 * @param {string} props.data - All data from Log Event row
 * 
 * 
 * @returns {React.ElementType}
 */
// "GLOBAL_INSTANCE_ID": "crm_server_000001",
// "BUSINESS_DOMAIN": "CRM",
// "BUSINESS_SUBDOMAIN": "Customer",
// "VERSION": "1.0",
// "LOCAL_INSTANCE_ID": "CRM-Customer-CRM_Adapter-Publish_Customer_Update-1212",
// "EAI_TRANSACTION_ID": "eai_crm_server_111111",
// "EAI_DOMAIN": "EAI_DOMAIN_1",
// "HOSTNAME": "crm_server",
// "APPLICATION": "CRM_Adapter",
// "EVENT_CONTEXT": "Publish_Customer_Update",
// "COMPONENT": "Publish_Customer_Update",
// "SEVERITY": "10",
// "PRIORITY": "10",
// "CREATION_TIME": "01-JAN-22 12.45.03.480000 AM",
// "REASONING_SCOPE": "INTERNAL",
// "PROCESS_ID": "1212",
// "CATEGORY_NAME": "Status",
// "ACTIVITY": "Customer Update Started",
// "MSG": "Recieved a customer update start event",
const group1 = ["BUSINESS_DOMAIN", "BUSINESS_SUBDOMAIN", "VERSION", "SEVERITY", "PRIORITY", "CREATION_TIME"];

const group2 = ["GLOBAL_INSTANCE_ID", "LOCAL_INSTANCE_ID", "EAI_TRANSACTION_ID"];

const group3 = ["EAI_DOMAIN", "HOSTNAME", "APPLICATION", "EVENT_CONTEXT", "COMPONENT", "REASONING_SCOPE", "PROCESS_ID", "CATEGORY_NAME", "ACTIVITY"];

const displayNames = new Map();
displayNames.set('GLOBAL_INSTANCE_ID', 'Global Instance ID')
displayNames.set('BUSINESS_DOMAIN', 'Business Domain')
displayNames.set('BUSINESS_SUBDOMAIN', 'Business SubDomain')
displayNames.set('VERSION', 'Version')
displayNames.set('LOCAL_INSTANCE_ID', 'Local Instance ID')
displayNames.set('EAI_TRANSACTION_ID', 'EAI Transaction ID')
displayNames.set('EAI_DOMAIN', 'EAI Domain')
displayNames.set('HOSTNAME', 'Host Name')
displayNames.set('APPLICATION', 'Application')
displayNames.set('EVENT_CONTEXT', 'Event Context')
displayNames.set('COMPONENT', 'Component')
displayNames.set('SEVERITY', 'Severity')
displayNames.set('PRIORITY', 'Priority')
displayNames.set('CREATION_TIME', 'Creation Time')
displayNames.set('REASONING_SCOPE', 'Reasoning Scope')
displayNames.set('PROCESS_ID', 'Process ID')
displayNames.set('CATEGORY_NAME', 'Category Name')
displayNames.set('ACTIVITY', 'Activity')
displayNames.set('MSG', 'Message')



const LogDetail = () => {
    const { id } = useParams();
    const data = getRowByID(id);
  
    const makeDetailBox = (key, label, value, isFull) => {
        return <TextField
                key={key}
                id="outlined-read-only-input"
                label={label}
                value={value}
                inputProps={{
                    readOnly: true,
                }}

            />
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
            <Typography> 
                Log Message
                <div class="scroll"> {msg} </div>
            </Typography> 
            )
    }
    
    return (
        <div className='log-detail-container'>
            {drawGroup(group1, makeDetailBox)}   
            
            {drawGroup(group2, makeLongBox)}
            
            {drawGroup(group3, makeDetailBox)}
            
            {writeMsg(data["MSG"])}
            {/* 
            Object.keys(data).map(k => {
                let v = data[k];
                let ks = displayNames.get(k)
                if (k === 'MSG') {
                    return (
                        <Typography> 
                            Log Message
                            <div class="scroll"> {v} </div>
                        </Typography> 
                    )
                } else {    
                    return makeDetailBox(k, ks, v)
                }
            })
                
            */} 
        </div>
    );
}

export default LogDetail;
