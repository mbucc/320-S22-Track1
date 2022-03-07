import { Button, FormControl,  InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import React from 'react';
import { getTableData } from '../fakeDatabase';
import CheckboxGroup from './CheckboxGroup';

const getCurrentDateTimeString = () => {
    let now = new Date();
    let offset = now.getTimezoneOffset() * 60000;
    let adjustedDate = new Date(now.getTime() - offset);
    let formattedDate = adjustedDate.toISOString().substring(0,19);
    return formattedDate;
}

const LogEventsFilters = ({tableDataSetter}) => {
    const allPriorities = ["High", "Medium", "Low"];
    const prioritiesMapping = ["70", "50", "10"];
    const [selectedPriorities, setSelectedPriorities] = React.useState(new Set(allPriorities));
    
    const allSeverities = ["Error", "Warning", "Info"];
    const [selectedSeverities, setSelectedSeverities] = React.useState(new Set(allSeverities));
    const [EAIDomain, setEAIDomain] = React.useState("All");
    const [startTime, setStartTime] = React.useState(getCurrentDateTimeString());
    const [endTime, setEndTime] = React.useState(getCurrentDateTimeString());

    const handleApplyFilters = (e) => {
        e.preventDefault();
        console.log("Apply filters was pressed");
        // parse the filters
        const filters = {
            "PRIORITY": new Set([...selectedPriorities].map(p => prioritiesMapping[allPriorities.indexOf(p)]))
        }

        // Request table data according to filters (This is where we would do a axios POST)
        const resultData = getTableData(filters);
        // We may need to do some conversion afterwards
        // Set the changes
        tableDataSetter(resultData);
    }

    const handleCheckboxSelection = (event, selections, setter) => {
        let newSelections = new Set([...selections]);
        if(event.target.checked) {
            newSelections.add(event.target.name);
        } else {
            newSelections.delete(event.target.name);
        }
        setter(newSelections)
    }

    const handlePriorityCheck = (event) => handleCheckboxSelection(event, selectedPriorities, setSelectedPriorities);
    const handleSeverityCheck = (event) => handleCheckboxSelection(event, selectedSeverities, setSelectedSeverities);

    const handleEAIDomainChange = (e) => {
        // console.log(e);
        setEAIDomain(e.target.value);
    }

    return (
        <div>
            <form className='log-events-filters' onSubmit={handleApplyFilters}>
                <CheckboxGroup 
                    label={"Priorities"}
                    options={allPriorities} 
                    selectedOptions={selectedPriorities} 
                    handleSelection={handlePriorityCheck}
                ></CheckboxGroup>
                <CheckboxGroup 
                    label={"Severities"}
                    options={allSeverities} 
                    selectedOptions={selectedSeverities} 
                    handleSelection={handleSeverityCheck}
                ></CheckboxGroup>
                

                
                <FormControl style={{width: "294px"}}>
                <InputLabel>EAI Domain</InputLabel>
                    <Select label="EAI Domain" value={EAIDomain} onChange={handleEAIDomainChange}>
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Domain1"}>Domain 1</MenuItem>
                        <MenuItem value={"Domain2"}>Domain 2</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <Stack spacing={2}>
                        <FormControl>
                            <InputLabel htmlFor='starttime' shrink>Start Time</InputLabel>
                            <OutlinedInput 
                                defaultValue={getCurrentDateTimeString()} 
                                // value={startTime}
                                label="Start Time" 
                                type="datetime-local"
                                id="starttime"/>
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor='endtime'>End Time</InputLabel>
                            <OutlinedInput 
                                defaultValue={getCurrentDateTimeString()} 
                                label="End Time" 
                                type="datetime-local"
                                id="endtime"/>
                        </FormControl>
                    </Stack>
                </FormControl>

                <FormControl>
                    <Button variant="contained" type="submit">Apply</Button>
                </FormControl>
            </form>
        </div>
    );
}
 
export default LogEventsFilters;