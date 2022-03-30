import React from 'react';
import {FormControl, FormHelperText, InputLabel, OutlinedInput, Stack} from '@mui/material';

/**
 * Wrapper on two datetime-local inputs representing a start and end datetime respectively.
 *
 * @author Wilson Neira with credit to Kevin Lin (permission was granted from the team)
 * Will change soon just to see how it works
 * @param {Object} props
 * @param {string} props.startTime - The string representing the start Date, format: YYYY-MM-DDTHH:mm:ss
 * @param {(event: Event) => any} props.startChangeHandler - Handler for start time changes
 * @param {string} props.endTime - The string representing the end Date, format: YYYY-MM-DDTHH:mm:ss
 * @param {(event: Event) => any} props.endChangeHandler - Handler for end time changes
 * @param {"column" | "row"} [props.direction="column"] - Direction to display the inputs
 * 
 * @returns {React.ElementType}
 */
const MUIStartTime = ({ startTime, startChangeHandler, endTime, endChangeHandler, direction="column" }) => {
    // Error checking
    const isRangeError = () => {
        // Convert times to actual Date objects to compare
        // Note: we only care about the relative difference, so time zone should not matter
        const dt_start = new Date(startTime);
        const dt_end = new Date(endTime);
        return dt_end < dt_start;
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
    
    /*const startTimer = () => {

    }*/

    return (
        <FormControl margin="normal" id="muitime" className="muirange">
            <Stack id="muitimestack" spacing={1} direction={direction}>
                <FormControl id="muistartcontrol" error={isInputError(startTime) || isRangeError()}>
                    <InputLabel htmlFor="muitimestartinput" shrink>Start Time</InputLabel>
                    <OutlinedInput
                        value={startTime}
                        onChange={startChangeHandler}
                        label="Start Time"
                        type="datetime-local"
                        id="muitimestartinput"
                        notched
                    />
                    <FormHelperText sx={{marginRight: 0, marginLeft: 0}}>{getErrorMess(startTime)}</FormHelperText>
                </FormControl>

                <FormControl id="muiendcontrol" error={isInputError(endTime) || isRangeError()}>
                    <InputLabel htmlFor="muitimeendinput" shrink>End Time</InputLabel>
                    <OutlinedInput
                        value={endTime}
                        onChange={endChangeHandler}
                        label="End Time"
                        type="datetime-local"
                        id="muitimeendinput"
                        notched
                    />
                    <FormHelperText sx={{marginRight: 0, marginLeft: 0}}>{getErrorMess(endTime)}</FormHelperText>
                </FormControl>
            </Stack>
        </FormControl>
    );
}

export default MUIStartTime;
