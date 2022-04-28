import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid } from '@mui/material';
import isoLogo from './isoLogo.PNG';
import NameAndLogout from '../NameAndLogout/NameAndLogout';

/**
 * A navigation bar on the top of the screen
 * 
 * @author @hiimlo
 * 
 * Contains: 
 *    isoLogo.PNG
 *    Tabs (switch between views *hypothetically*)
 * 
 * @returns {React.ElementType}
 *
*/

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTop() {
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={4} xl={4}>
        <img src={isoLogo} alt="Logo" width={125} height={62.5} />
      </Grid>
      <Grid item lg={6} xl={7}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <LinkTab label="Dashboard" href="#/" />
          <LinkTab label="Business Processes" href="#/business-processes" />
          <LinkTab label="Log View" href="#/log-events" />
        </Tabs>
      </Grid>
      <Grid item lg={2} xl={1}>
        <NameAndLogout/>
      </Grid>
    </Grid>
  );
}