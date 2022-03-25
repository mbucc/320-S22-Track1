import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function NavTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value="Dashboard" label="Dashboard" />
        <Tab value="Business" label="Business Processes" />
        <Tab value="Log" label="Log View" />
      </Tabs>
    </Box>
  );
}

//temp tab navigation for now, dashboard team is in charge of this (i think?)
//this is just for demos