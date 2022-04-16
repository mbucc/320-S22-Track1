import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, MenuItem } from "@mui/material";

const errorData = [
  {
    name: "1/1-1/7",
    application_1: 40,
    application_2: 24,
    application_3: 24,
  },
  {
    name: "1/8-1/15",
    application_1: 30,
    application_2: 13,
    application_3: 22,
  },
  {
    name: "1/16-1/23",
    application_1: 20,
    application_2: 98,
    application_3: 22,
  },
  {
    name: "1/24-Today",
    application_1: 27,
    application_2: 39,
    application_3: 20,
  },
];
const warningData = [
  {
    name: "1/1-1/7",
    application_1: 68,
    application_2: 18,
    application_3: 65,
  },
  {
    name: "1/8-1/15",
    application_1: 98,
    application_2: 11,
    application_3: 31,
  },
  {
    name: "1/16-1/23",
    application_1: 75,
    application_2: 25,
    application_3: 38,
  },
  {
    name: "1/24-Today",
    application_1: 48,
    application_2: 44,
    application_3: 55,
  },
];

export default function AppBarChart() {
  const [chart, setChart] = useState("Warning");
  return (
    <div>
      <Typography component="div">
        <Box
          sx={{
            textAlign: "left",
            m: 3,
            fontWeight: "bold",
            fontFamily: "Monospace",
            fontSize: "h4.fontSize",
          }}
        >
          {" "}
          Bar Chart
          <Select>
            <MenuItem value="Error Log" onClick={() => setChart("Error Log")}>
              {" "}
              Error Log Events{" "}
            </MenuItem>
            <MenuItem value="Warning Log" onClick={() => setChart("Warning")}>
              {" "}
              Warning Log Events{" "}
            </MenuItem>
          </Select>
        </Box>
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          position: "relative",
          top: "10%",
          left: "2%",
          border: "1",
          borderRadius: "15px",
          boxShadow: "0px 0px 12px -1px #000000",
        }}
      >
        {chart === "Error Log" ? (
          <div>
            <BarChart width={470} height={470} data={errorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="application_2" stackId="a" fill="#8884D8" />
              <Bar dataKey="application_3" stackId="a" fill="#82CA9D" />
              <Bar dataKey="application_1" stackId="a" fill="#FFC658" />
            </BarChart>
            <Typography variant="heading1">
              The number of error log events per application
            </Typography>
          </div>
        ) : (
          <></>
        )}
        {chart === "Warning" ? (
          <div>
            <BarChart width={470} height={470} data={warningData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="application_2" stackId="a" fill="#60F542" />
              <Bar dataKey="application_3" stackId="a" fill="#82CA9D" />
              <Bar dataKey="application_1" stackId="a" fill="#F5425D" />
            </BarChart>
            <Typography variant="heading1">
              The number of warning log events per application
            </Typography>
          </div>
        ) : (
          <></>
        )}
      </Stack>
    </div>
  );
}
