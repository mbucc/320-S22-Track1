import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, Stack } from '@mui/material';

/**
 * Wrapper on two datetime-local inputs representing a start and end datetime respectively.
 *
 * @author Kevin Lin
 * 
 * @param {Object} props
 * @param {string} props.startTime - The string representing the start Date, format: YYYY-MM-DDTHH:mm:ss
 * @param {(event: Event) => any} props.startChangeHandler - Handler for start time changes
 * @param {string} props.endTime - The string representing the end Date, format: YYYY-MM-DDTHH:mm:ss
 * @param {(event: Event) => any} props.endChangeHandler - Handler for end time changes
 * @param {"column" | "row"} [props.direction="column"] - Direction to display the inputs
 * 
 * @returns {React.ElementType}
 */
const TimeRange = ({ startTime, startChangeHandler, endTime, endChangeHandler, direction="column" }) => {
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

    return (
        <FormControl margin="normal" id="timerangeformcontrol">
            <Stack id="timerangestack" spacing={2} direction={direction}>
                <FormControl id="startformcontrol" error={isInputError(startTime) || isRangeError()}>
                    <InputLabel htmlFor="startimeinput" shrink>Start Time</InputLabel>
                    <OutlinedInput
                        value={startTime}
                        onChange={startChangeHandler}
                        label="Start Time"
                        type="datetime-local"
                        id="startimeinput"
                    />
                    <FormHelperText sx={{marginRight: 0, marginLeft: 0}}>{getErrorMess(startTime)}</FormHelperText>
                </FormControl>

                <FormControl id="endformcontrol" error={isInputError(endTime) || isRangeError()}>
                    <InputLabel htmlFor="endtimeinput" shrink>End Time</InputLabel>
                    <OutlinedInput
                        value={endTime}
                        onChange={endChangeHandler}
                        label="End Time"
                        type="datetime-local"
                        id="endtimeinput"
                    />
                    <FormHelperText sx={{marginRight: 0, marginLeft: 0}}>{getErrorMess(endTime)}</FormHelperText>
                </FormControl>
            </Stack>
        </FormControl>
    );
}

export default TimeRange;

