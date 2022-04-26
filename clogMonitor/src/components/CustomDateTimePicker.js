import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";

/* Author: @wilsonnexus
 * Customizable MUI Date Time Range Picker 
 * 
 * 
 */

export default function CustomDateTimePicker({ startTime, startChangeHandler, endTime, endChangeHandler, direction="column" }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} sx={{ width: 0.9}} sy={{ height: 2}} >
        <DateTimePicker 
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
        
      </Stack>
    </LocalizationProvider>
  );
}
