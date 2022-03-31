import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid } from '@mui/material';
import isoLogo from './isoLogo.PNG';

export default function NavTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <img src={isoLogo} alt="Logo" width={125} height={62.5} />
      </Grid>
      <Grid item xs={8}>
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
      </Grid>
    </Grid>
  );
}

//temp tab navigation for now, dashboard team is in charge of this (i think?)
//this is just for demos