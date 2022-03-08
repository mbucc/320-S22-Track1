import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1/1-1/7',
        application_1: 4000,
        application_2: 2400,
        application_3: 2400,
    },
    {
        name: '1/8-1/15',
        application_1: 3000,
        application_2: 1398,
        application_3: 2210,
    },
    {
        name: '1/16-1/23',
        application_1: 2000,
        application_2: 9800,
        application_3: 2290,
    },
    {
        name: '1/24-Today',
        application_1: 2780,
        application_2: 3908,
        application_3: 2000,
    },
];

export default function AppBarChart() {
    return (
        <BarChart
            width={600}
            height={600}
            data={data}
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
    );
}
