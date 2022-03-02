import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Input, InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import React from 'react';


const getCurrentDateTimeString = () => {
    let now = new Date();
    let offset = now.getTimezoneOffset() * 60000;
    let adjustedDate = new Date(now.getTime() - offset);
    let formattedDate = adjustedDate.toISOString().substring(0,19);
    return formattedDate;
}

const LogEventsFilters = () => {
    const allPriorities = ["High", "Medium", "Low"];
    const [selectedPriorities, setSelectedPriorities] = React.useState(new Set(['High', 'Medium', 'Low']));
    const [EAIDomain, setEAIDomain] = React.useState("All");
    const [startTime, setStartTime] = React.useState(getCurrentDateTimeString());
    const [endTime, setEndTime] = React.useState(getCurrentDateTimeString());

    const handleApplyFilters = (e) => {
        e.preventDefault();
        console.log("Apply filters was pressed");
    }

    const handlePriorityCheck = (e) => {
        // console.log(e);
        let newPriorities = new Set([...selectedPriorities]);
        if(e.target.checked) {
            newPriorities.add(e.target.name);
        } else {
            newPriorities.delete(e.target.name);
        }
        setSelectedPriorities(newPriorities);
    }

    const handleEAIDomainChange = (e) => {
        // console.log(e);
        setEAIDomain(e.target.value);
    }

    return (
        <div>
            <form className='log-events-filters' onSubmit={handleApplyFilters}>
                <FormControl>
                    <FormLabel>Priority</FormLabel>
                    <FormGroup>
                        {allPriorities.map(priority => 
                            <FormControlLabel
                                key={priority}
                                name={priority}
                                checked={selectedPriorities.has(priority)}
                                control={<Checkbox onChange={handlePriorityCheck}/>}
                                label={priority}
                            />
                        )}
                    </FormGroup>
                </FormControl>
                
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