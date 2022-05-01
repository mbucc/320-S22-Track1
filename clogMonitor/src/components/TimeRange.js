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


const TimeRange = ({ startTime, startChangeHandler, endTime, endChangeHandler, direction="column" }) => {

    //DST ********************** begin
    const hasDSTeffect = time => {
        // check to see if DST is in effect in user's timezone 
        const parsedDate = new Date(time)
        const jan = new Date(parsedDate.getFullYear(), 0, 1); 
        const jul = new Date(parsedDate.getFullYear(), 6, 1); 
        // standard time offset
        const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        //check to see if DST is in effect in user's country
        if(parsedDate.getTimezoneOffset() !== stdOffset) {
            return true;
        }
        return false;
    }
    
    const hasDSTconflict = time => {
        // check to see if chosen date/time has DST conflict
        const parsedDate = new Date(time)
        let curHour = parsedDate.getHours();
        let curMinute = parsedDate.getMinutes();
        //check to see if chosen date/time is the start date/time of DST
        const curMidnight = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 0).getTimezoneOffset();
        const cur3AM = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), 3).getTimezoneOffset();
        if (curMidnight !== cur3AM && curHour === 1 && curMinute >= 0 && curMinute < 60){
                return true;
           }
        return false;
    }
    
    const [dst1, setDst1] = React.useState('');
    const [openDst1, setOpenDst1] = React.useState(false);
    
    const handleDst1Change = (event) => {
        setDst1(event.target.value);
    };
    const handleDst1Close = () => {
        setOpenDst1(false);
    };
    const handleDst1Open = () => {
        setOpenDst1(true);
    };

    const [dst2, setDst2] = React.useState('');
    const [openDst2, setOpenDst2] = React.useState(false);
    
    const handleDst2Change = (event) => {
        setDst2(event.target.value);
    };
    const handleDst2Close = () => {
        setOpenDst2(false);
    };
    const handleDst2Open = () => {
        setOpenDst2(true);
    };

    const isDST = time => {
        if (hasDSTeffect(time) && hasDSTconflict(time)) {
            return true;
        }        
        return false;    
    }
    //DST ********************** end

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
        } else if (isDST(time)) {
            //alert
            return "Daylight saving time conflict!";
        } else {
            return " ";
        }
    }

    return (
        <FormControl margin="normal" id="timerangeformcontrol" className="timerange">
            <Stack id="timerangestack" spacing={2} direction={direction}>
                <FormControl id="startformcontrol" error={isInputError(startTime) || isRangeError() || isDST(startTime)}>
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
                <FormControl className={'DST-startformcontrol'} style={{ display: (isDST(startTime)?'':'none')}}>
                    <InputLabel className='DST-start-label'>BEFORE or AFTER clock change</InputLabel>
                    <Select
                        id="dst1"
                        label="BEFORE or AFTER clock change"
                        open={openDst1}
                        onClose={handleDst1Close}
                        onOpen={handleDst1Open}
                        value={dst1}
                        onChange={handleDst1Change}
                        >
                        <MenuItem value={0}>Before</MenuItem>
                        <MenuItem value={1}>After</MenuItem>
                    </Select>
                </FormControl>
                {/* DST ********************** end */}

                <FormControl id="endformcontrol" error={isInputError(endTime) || isRangeError() || isDST(endTime)}>
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
                <FormControl className={'DST-endformcontrol'} style={{ display: (isDST(endTime)?'':'none')}}>
                    <InputLabel className='DST-start-label'>BEFORE or AFTER clock change</InputLabel>
                    <Select
                        id="dst2"
                        label="BEFORE or AFTER clock change"
                        open={openDst2}
                        onClose={handleDst2Close}
                        onOpen={handleDst2Open}
                        value={dst2}
                        onChange={handleDst2Change}
                        >
                        <MenuItem value={0}>Default</MenuItem>
                        <MenuItem value={1}>Before</MenuItem>
                        <MenuItem value={2}>After</MenuItem>
                    </Select>
                </FormControl>
                {/* DST ********************** end */}

            </Stack>
        </FormControl>
    );
}

export default TimeRange;
