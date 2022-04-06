import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const errorData = [
    {
        name: '1/1-1/7',
        application_1: 40,
        application_2: 24,
        application_3: 24,
    },
    {
        name: '1/8-1/15',
        application_1: 30,
        application_2: 13,
        application_3: 22,
    },
    {
        name: '1/16-1/23',
        application_1: 20,
        application_2: 98,
        application_3: 22,
    },
    {
        name: '1/24-Today',
        application_1: 27,
        application_2: 39,
        application_3: 20,
    },
];
const warningData = [
    {
        name: '1/1-1/7',
        application_1: 68,
        application_2: 18,
        application_3: 65,
    },
    {
        name: '1/8-1/15',
        application_1: 98,
        application_2: 11,
        application_3: 31,
    },
    {
        name: '1/16-1/23',
        application_1: 75,
        application_2: 25,
        application_3: 38,
    },
    {
        name: '1/24-Today',
        application_1: 48,
        application_2: 44,
        application_3: 55,
    },
];

export default function AppBarChart() {
    return (
        <div>
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    position: "relative",
                    borderRadius: "50%",
                    top: "15%",
                    left: "2%",
                }}
            >
                <div>
                    <BarChart
                        width={500}
                        height={500}
                        data={errorData}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="application_2" stackId="a" fill="#8884d8" />
                        <Bar dataKey="application_3" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="application_1" stackId="a" fill="#ffc658" />

                    </BarChart>
                    <Typography
                        variant="heading1"
                    >The number of error log events per application</Typography>
                </div>
                <div>
                    <BarChart
                        width={500}
                        height={500}
                        data={warningData}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="application_2" stackId="a" fill="#60f542" />
                        <Bar dataKey="application_3" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="application_1" stackId="a" fill="#f5425d" />

                    </BarChart>
                    <Typography
                        variant="heading1"
                    >The number of warning log events per application</Typography>
                </div>
            </Stack>
        </div>
    );
}
