import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { MenuItem, Select } from '@mui/material';
import moment from 'moment';

/**
 * Returns true if DST is in effect in user's timezone 
 * 
 * @param {string} time - The string representing the current time, format: YYYY-MM-DDTHH:mm:ss
 * 
 * @returns {boolean} 
 * @see {@link https://stackoverflow.com/questions/11887934/how-to-check-if-dst-daylight-saving-time-is-in-effect-and-if-so-the-offset}
 */
function hasDSTeffect(time) {
    const parsedDate = new Date(time)
    const jan = new Date(parsedDate.getFullYear(), 0, 1); 
    const jul = new Date(parsedDate.getFullYear(), 6, 1); 
    const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()); // Standard time offset
    if(parsedDate.getTimezoneOffset() < stdOffset) {
        return true;
    }
    return false;
}

/**
 * Returns true if chosen date/time has conflict during DST clock changing period
 * 
 * @param {string} time - The string representing the current time, format: YYYY-MM-DDTHH:mm:ss
 * 
 * @returns {boolean} 
 */
export function hasDSTconflict(time) {

    if (!hasDSTeffect(time)) {
        return false;
    }
    const parsedDate = new Date(time)
    let curHour = parsedDate.getHours();
    let curMinute = parsedDate.getMinutes();
    // Check to see if chosen date/time is the end date/time of DST
    const curMidnight = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 0).getTimezoneOffset();
    const cur3AM = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 3).getTimezoneOffset();
    if (curMidnight < cur3AM && curHour === 1 && curMinute >= 0 && curMinute < 60){
            return true;
       }
    return false;
}

/**
 * Returns true if chosen date/time does not exist (e.g. 2021-3-14 2:30AM)
 * 
 * @param {string} time - The string representing the current time, format: YYYY-MM-DDTHH:mm:ss
 * 
 * @returns {boolean}
 */
export function hasDSTerror(time) {
    if (!hasDSTeffect(time)) {
        return false;
    }
    const parsedDate = new Date(time)
    let curHour = parsedDate.getHours();
    if (curHour!==parseInt(time.substring(11,13))) {
        return true;
    }
    return false;
}

/**
 * Returns converted time to UTC in conflicting DST clock change period 
 * 
 * @param {Object} props
 * @param {string} props.datetimeString - The string representing local date/time, format: YYYY-MM-DDTHH:mm:ss
 * @param {boolean} hasDST_conflict - The boolean value representing whether chosen date/time has DST conflict
 * @param {string} choice - The string representing your choice of BEFORE or AFTER
 *
 * @returns {string}
 */

export function convertDSTtoUTC(datetimeString, hasDST_conflict, choice) {
    const dateTime = new Date(datetimeString);
    if(hasDST_conflict) {
        if(choice === "AFTER") {
            return moment(dateTime).add(1, 'hours');
        }
    }
    return dateTime;
}

/**
 * Returns true if end time is before start time
 * 
 * @param {Object} props
 * @param {string} props.startTime - The string representing the start Date, format: YYYY-MM-DDTHH:mm:ss
= * @param {string} props.endTime - The string representing the end Date, format: YYYY-MM-DDTHH:mm:ss
 * @param {string} props.startTimeDST - The string representing BEFORE/AFTER selection for start time in DST
 * @param {string} props.endTimeDST - The string representing BEFORE/AFTER selection for end time in DST
 *
 * @returns {boolean}
 */
export function isRangeError(startTime, endTime, startTimeDST, endTimeDST){
    let dt_start = new Date(startTime);
    let dt_end = new Date(endTime);
    if(hasDSTconflict(dt_start) && hasDSTconflict(dt_end)){
        dt_start = convertDSTtoUTC(dt_start, hasDSTconflict(dt_start), startTimeDST)
        dt_end = convertDSTtoUTC(dt_end, hasDSTconflict(dt_end), endTimeDST)
    }
    return dt_end < dt_start;
}

/**
 * Wrapper on two datetime-local inputs representing a start and end datetime respectively.
 *
 * @author Kevin Lin
 * @author Junzhu Li
 * 
 * @param {Object} props
 * @param {string} props.startTime - The string representing the start Date, format: YYYY-MM-DDTHH:mm:ss
 * @param {(event: Event) => any} props.startChangeHandler - Handler for start time changes
 * @param {string} props.endTime - The string representing the end Date, format: YYYY-MM-DDTHH:mm:ss
 * @param {(event: Event) => any} props.endChangeHandler - Handler for end time changes
 * @param {string} props.startTimeDST - The string representing BEFORE/AFTER selection for start time in DST
 * @param {(event: Event) => any} props.startDstChangeHandler - Handler for DST start time changes
 * @param {string} props.endTimeDST - The string representing BEFORE/AFTER selection for end time in DST
 * @param {(event: Event) => any} props.endDstChangeHandler - Handler for DST end time changes 
 * @param {"column" | "row"} [props.direction="column"] - Direction to display the inputs
*
 * @returns {React.ElementType}
 */
const TimeRange = ({ startTime, startChangeHandler, endTime, endChangeHandler, startTimeDST, startDstChangeHandler, endTimeDST, endDstChangeHandler, direction="column"}) => {

    // Error checking

    const isInputError = (time) => time === "";

    const getErrorMess = (time) => {
        if (isInputError(time)) {
            return "Input is missing a necessary value";
        } else if (isRangeError(startTime, endTime, startTimeDST, endTimeDST)) {
            return "Start must be before End";
        } else if (hasDSTconflict(time)) {
            return "Daylight saving time conflict exists! Please choose:";
        } else if (hasDSTerror(time)) {
            return "Chosen date/time does not exist!";
        } else {
            return " ";
        }
    }

    return (
        <FormControl margin="normal" id="timerangeformcontrol" className="timerange">
            <Stack id="timerangestack" spacing={2} direction={direction}>
                <FormControl id="startformcontrol" error={isInputError(startTime) || isRangeError(startTime, endTime, startTimeDST, endTimeDST) || hasDSTerror(startTime)}>
                    <InputLabel htmlFor="startimeinput" shrink>Start Time</InputLabel>
                    <OutlinedInput
                        value={startTime}
                        onChange={startChangeHandler}
                        label="Start Time"
                        type="datetime-local"
                        id="startimeinput"
                        notched
                        inputProps={{step: 1}}
                    />
                    <FormHelperText sx={{marginRight: 0, marginLeft: 0}}>{getErrorMess(startTime)}</FormHelperText>
                </FormControl>
                
                {/* DST ********************** begin */}
                <FormControl className={'DST-formcontrol'} style={{ display: (hasDSTconflict(startTime)?'':'none')}}>
                    <InputLabel className='DST-start-label'>BEFORE or AFTER clock change</InputLabel>
                    <Select
                        id="startTimeDST"
                        label="BEFORE or AFTER clock change"
                        value={startTimeDST}
                        onChange={startDstChangeHandler}
                        >
                        <MenuItem value={'BEFORE'}>BEFORE</MenuItem>
                        <MenuItem value={'AFTER'}>AFTER</MenuItem>
                    </Select>
                </FormControl>
                {/* DST ********************** end */}

                <FormControl id="endformcontrol" error={isInputError(endTime) || isRangeError(startTime, endTime, startTimeDST, endTimeDST) || hasDSTerror(endTime)}>
                    <InputLabel htmlFor="endtimeinput" shrink>End Time</InputLabel>
                    <OutlinedInput
                        value={endTime}
                        onChange={endChangeHandler}
                        label="End Time"
                        type="datetime-local"
                        id="endtimeinput"
                        notched
                        inputProps={{step: 1}}
                    />
                    <FormHelperText sx={{marginRight: 0, marginLeft: 0}}>{getErrorMess(endTime)}</FormHelperText>
                </FormControl>

                {/* DST ********************** begin */}
                <FormControl className={'DST-formcontrol'} style={{ display: (hasDSTconflict(endTime)?'':'none')}}>
                    <InputLabel className='DST-start-label'>BEFORE or AFTER clock change</InputLabel>
                    <Select
                        id="endTimeDST"
                        label="BEFORE or AFTER clock change"
                        value={endTimeDST}
                        onChange={endDstChangeHandler}
                        >
                        <MenuItem value={'BEFORE'}>BEFORE</MenuItem>
                        <MenuItem value={'AFTER'}>AFTER</MenuItem>
                    </Select>
                </FormControl>
                {/* DST ********************** end */}
            
            </Stack>
        </FormControl>
    );
}

export default TimeRange;