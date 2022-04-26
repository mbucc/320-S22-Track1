import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

/* Author: @wilsonnexus
 * Customizable MUI Date Time Range Picker with Error Handling
 * Still needs some more work, but I think the time values could be
 * sent across files now. Added Refresh Button
 */

export default function CustomDateTimePicker({ startTime, startChangeHandler, endTime, endChangeHandler, direction="column" }) {
  const [clearedDate, setClearedDate] = React.useState(null);
  var d = new Date(); // get current date
  d.setHours(d.getHours(),d.getMinutes()-30,0,0);


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} sx={{ width: 0.9}} sy={{ height: 2}} >
        <DateTimePicker 
          showTodayButton
          value={startTime}
          onChange={startChangeHandler}
          type="datetime-local"
          ampm={false}
          label="Start Time"
          onError={console.log}
          maxDate={endTime}
          inputFormat="MM/dd/yyyy HH:mm"
          mask="___/__/__ __:__"
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
        showTodayButton
          value={endTime}
          onChange={endChangeHandler}
          type="datetime-local"
          ampm={false}
          label="End Time"
          onError={console.log}
          minDate={startTime}
          inputFormat="MM/dd/yyyy HH:mm"
          mask="___/__/__ __:__"
          renderInput={(params) => <TextField {...params} />}
        />

         <Button
            onClick={() => {
            var d = new Date(); // get current date
            d.setHours(d.getHours(),d.getMinutes()-30,0,0);
            startChangeHandler=(d);
            endChangeHandler(new Date());}}>
            Refresh
            </Button>
        
      </Stack>
    </LocalizationProvider>
  );
}
