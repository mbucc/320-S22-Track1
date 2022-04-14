import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';

/* Author: @wilsonnexus, isRangeError() from Team Goose
 * Customizable MUI Date Time Range Picker with Error Handling
 * Still needs some more work, but I think the time values could be
 * sent across files now. Added Refresh Button
 */
export default function CustomDateTimePicker() {
  const [clearedDate, setClearedDate] = React.useState(null);
  var d = new Date(); // get current date
  d.setHours(d.getHours(),d.getMinutes()-30,0,0);
  const [startTime, setStartTime] = React.useState(d);
  const [endTime, setEndTime] = React.useState(new Date());

  const isRangeError = () => {
    // Convert times to actual Date objects to compare
    // Note: we only care about the relative difference, so time zone should not matter
    const dt_start = new Date(startTime);
    const dt_end = new Date(endTime);
    return dt_end < dt_start;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} sx={{ width: 0.9}} sy={{ height: 2}} >
        
        <DateTimePicker 
          showTodayButton
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
          ampm={false}
          label="Start Time"
          onError={console.log}
          maxDate={endTime}
          inputFormat="dd/MM/yyyy HH:mm"
          mask="___/__/__ __:__"
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
        showTodayButton
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
          ampm={false}
          label="End Time"
          onError={console.log}
          minDate={startTime}
          inputFormat="dd/MM/yyyy HH:mm"
          mask="___/__/__ __:__"
          renderInput={(params) => <TextField {...params} />}
        />

         <Button
  onClick={() => {
            var d = new Date(); // get current date
            d.setHours(d.getHours(),d.getMinutes()-30,0,0);
            setStartTime(d);
            setEndTime(new Date());
       
  }}
>
  Refresh
</Button>
        
      </Stack>
    </LocalizationProvider>
  );
}
