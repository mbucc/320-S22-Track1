import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { MenuItem, Select } from '@mui/material';

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

function hasDSTeffect(time) {
    // check to see if DST is in effect in user's timezone 
    const parsedDate = new Date(time)
    const jan = new Date(parsedDate.getFullYear(), 0, 1); 
    const jul = new Date(parsedDate.getFullYear(), 6, 1); 
    // standard time offset
    const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    if(parsedDate.getTimezoneOffset() < stdOffset) {
        return true;
    }
    return false;
}

export function hasDSTconflict(time) {

    if (!hasDSTeffect(time)) {
        return false;
    }
    // check to see if chosen date/time has DST conflict
    const parsedDate = new Date(time)
    let curHour = parsedDate.getHours();
    let curMinute = parsedDate.getMinutes();
    //check to see if chosen date/time is the start date/time of DST
    const curMidnight = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 0).getTimezoneOffset();
    const cur3AM = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 3).getTimezoneOffset();
    if (curMidnight < cur3AM && curHour === 1 && curMinute >= 0 && curMinute < 60){
            return true;
       }
    return false;
}

export function hasDSTerror(time) {
    // check to see if date/time is not existed (e.g. 2021-3-14 2:30AM)
    // time format: '2021-11-07T01:30:00' 

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


const TimeRange = ({ startTime, startChangeHandler, endTime, endChangeHandler, dst1, dst2, startDstChangeHandler, endDstChangeHandler, direction="column"}) => {

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
            return "Input is missing a necessary value";
        } else if (isRangeError()) {
            return "Start must be before End";
        } else if (hasDSTconflict(time)) {
            //let str = "hasDSTeffect(time)="+hasDSTeffect(time)+" month="+((new Date(time)).getMonth()+1)+" hour="+(new Date(time)).getHours();
            //return str;
            return "Daylight saving time conflict exists! Please choose:";
        } else if (hasDSTerror(time)) {
            return "Chosen date/time does not exist!";
        } else {
            //let str = "hasDSTeffect(time)="+hasDSTeffect(time)+" hour="+(new Date(time)).getHours();
            //return str;
            return " ";
        }
    }

    return (
        <FormControl margin="normal" id="timerangeformcontrol" className="timerange">
            <Stack id="timerangestack" spacing={2} direction={direction}>
                <FormControl id="startformcontrol" error={isInputError(startTime) || isRangeError() || hasDSTerror(startTime)}>
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
                <FormControl className={'DST-startformcontrol'} style={{ display: (hasDSTconflict(startTime)?'':'none')}}>
                    <InputLabel className='DST-start-label'>BEFORE or AFTER clock change</InputLabel>
                    <Select
                        id="dst1"
                        label="BEFORE or AFTER clock change"
                        value={dst1}
                        onChange={startDstChangeHandler}
                        >
                        <MenuItem value={'BEFORE'}>BEFORE</MenuItem>
                        <MenuItem value={'AFTER'}>AFTER</MenuItem>
                    </Select>
                </FormControl>
                {/* DST ********************** end */}

                <FormControl id="endformcontrol" error={isInputError(endTime) || isRangeError() || hasDSTerror(endTime)}>
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
                <FormControl className={'DST-endformcontrol'} style={{ display: (hasDSTconflict(endTime)?'':'none')}}>
                    <InputLabel className='DST-start-label'>BEFORE or AFTER clock change</InputLabel>
                    <Select
                        id="dst2"
                        label="BEFORE or AFTER clock change"
                        value={dst2}
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