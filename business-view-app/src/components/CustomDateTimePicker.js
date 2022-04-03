import * as React from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TextField from '@mui/material/TextField';
import ClockIcon from '@mui/icons-material/AccessTime';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Stack from '@mui/material/Stack';

/* Author: @wilsonnexus, isRangeError() from Team Goose
* Customizable MUI Date Time Range Picker with Error Handling
* Still needs some more work, but I think the time values could be 
* sent across files now. Military Time To Do
*/


export default function CustomDateTimePicker() {
  const [clearedDate, setClearedDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  const isRangeError = () => {
        // Convert times to actual Date objects to compare
        // Note: we only care about the relative difference, so time zone should not matter
        const dt_start = new Date(startTime);
        const dt_end =new Date(endTime);
        return dt_end < dt_start;
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} sx={{ width: 0.9}} sy={{ height: 2}}>
        
        <DateTimePicker
          showTodayButton
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
          label="Start Time"
          onError={console.log}
          maxDate={endTime}
          inputFormat="yyyy/MM/dd hh:mm a"
          mask="___/__/__ __:__ _M"
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
        showTodayButton
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
          label="End Time"
          onError={console.log}
          minDate={startTime}
          inputFormat="yyyy/MM/dd hh:mm a"
          mask="___/__/__ __:__ _M"
          renderInput={(params) => <TextField {...params} />}
        />
        
      </Stack>
    </LocalizationProvider>
  );
}