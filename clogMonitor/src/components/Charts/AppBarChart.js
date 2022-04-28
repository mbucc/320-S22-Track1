import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "./AppBarChart.css";
import { CSS_COLOR_NAMES } from './colors.js'

export default function AppBarChart({ logEvents }) {
  const [chart, setChart] = useState("Last week");
  let dateToLogsCount = new Map();
  let applicationSet = new Set();
  logEvents.forEach(event => {
    let date = event['creationTime'].toDateString();
    let application = event['application'];
    applicationSet.add(application);
    if (dateToLogsCount.get(date) === undefined) {
      dateToLogsCount.set(date, new Map());
      dateToLogsCount.get(date).set(application, 1);
    } else {
      let applicationsToCount = dateToLogsCount.get(date);
      if (applicationsToCount.get(application) === undefined) {
        applicationsToCount.set(application, 1);
      } else {
        applicationsToCount.set(application, applicationsToCount.get(application) + 1);
      }
    }
  });


  let dates = Array.from(dateToLogsCount.keys());
  let sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  let lastWeek = dates.filter(date => {
    let dateObject = new Date(date);
    return dateObject.getTime() > sevenDaysAgo.getTime()
  });
  let thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  let lastMonth = dates.filter(date => {
    let dateObject = new Date(date);
    return dateObject.getTime() > thirtyDaysAgo.getTime()
  });
  const sortDates = (dates) => dates.sort(function (a, b) {
    let dateA = new Date(a);
    let dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });
  const processDate = (dates, data) => {
    dates.forEach(date => {
      let value = dateToLogsCount.get(date);
      let applicationsCount = { name: date };
      applicationSet.forEach(application => {
        if (value.get(application) === undefined) {
          applicationsCount[application] = 0;
        } else {
          applicationsCount[application] = value.get(application);
        }
      })
      data.push(applicationsCount);
    })
  }

  sortDates(lastWeek);
  sortDates(lastMonth);
  let lastWeekData = [];
  let lastMonthData = [];
  processDate(lastWeek, lastWeekData);
  processDate(lastMonth, lastMonthData);
  console.log(lastWeekData)
  let data = chart === "Last week" ? lastWeekData : lastMonthData;
  let ticks = chart === "Last week" ? [lastWeek[0], lastWeek[lastWeek.length - 1]] : [lastMonth[0], lastMonth[lastMonth.length - 1]];
  return (
    <div className='rows'>
      <Typography component='div'>
        <Box sx={{
          textAlign: 'left',
          m: 3,
          fontWeight: 'bold',
          fontSize: 'h4.fontSize',
        }}
        > Error Log Chart
        </Box>
      </Typography>
      <div className='timeSpan' >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Time span</InputLabel>
          <Select label="Time span">
            <MenuItem value="Last week" onClick={() => setChart("Last week")}> Last week </MenuItem>
            <MenuItem value="Last month" onClick={() => setChart("Last month")}> Last Month </MenuItem>
          </Select>
        </FormControl>
      </div >
      <div className='row'>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'background.paper',
            border: '1',
            margin: '24px',
            borderRadius: '15px',
            boxShadow: "0px 0px 12px -1px #000000"
          }}
        >

          {<LineChart
            width={800}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" ticks={ticks} />
            <YAxis />
            <Tooltip />
            <Legend />
            {Array.from(applicationSet).map((application, index) => {
              return <Line type="monotone" dataKey={application} stroke={CSS_COLOR_NAMES[index]} />;
            })}
          </LineChart>}

        </Stack>
      </div>
    </div >

  );
}
