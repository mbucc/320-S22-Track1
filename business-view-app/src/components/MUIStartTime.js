import React from 'react';
import {FormControl, FormHelperText, InputLabel, OutlinedInput, Stack} from '@mui/material';
import { withStyles } from '@mui/styles';

/**
 * Wrapper on two datetime-local inputs representing a start and end datetime respectively.
 * Will change more soon
 * @author @wilsonnexus with credit to Kevin Lin (permission was granted from the team)
 * I am still trying to figure out how the box can change color when the error of end time is less than start time.
 * 
 */
const starter = new Date()
const ender = new Date()
const MUIStartTime = ({ starter, startChangeHandler, ender, endChangeHandler, direction="column" }) => {
    // Error checking
    const isRangeError = () => {
        // Convert times to actual Date objects to compare
        // Note: we only care about the relative difference, so time zone should not matter
        const dt_start = new Date(starter);
        const dt_end = new Date(ender);
        return ender < starter;
    }

    const isInputError = (time) => time === "";

    const getErrorMess = (time) => {
        if (isInputError(time)) {
            return "Input is missing a value";
        } else if (isRangeError()) {
            return "Start must be before End";
        } else {
            return " ";
        }
    }
    
    const startTimer = (muiController, timeHandler, Timer, timeLabel, outlineLabel, timeinputID) => {
    return(
                <FormControl id= {muiController} error={isRangeError() } >
                    {timeLabel()}
                    <OutlinedInput
                        value={Timer}
                        onChange={starter = timeHandler}
                        label={outlineLabel}
                        type="datetime-local"
                        id={timeinputID}    
                    />
                    <FormHelperText sx={{marginRight: 0, marginLeft: 0}}>{getErrorMess(Timer)}</FormHelperText>
                </FormControl>
        );
    }

    return (
    <FormControl margin="" id="muitime" className="muirange">
            <Stack id="muitimestack" spacing={0} direction={direction}>
        {startTimer("muistartcontrol", startChangeHandler, starter, ()=> {return <InputLabel htmlFor="muitimestartinput" shrink>Start Time</InputLabel>}, "Start Time", "muitimestartinput")}
        {startTimer("muiendcontrol", endChangeHandler, ender, ()=> {return <InputLabel htmlFor="muitimeendinput" shrink>End Time</InputLabel>}, "End Time", "muitimeendinput")}
          </Stack>
        </FormControl>
    );
}

export default MUIStartTime;
