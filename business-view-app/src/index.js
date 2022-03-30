import React from 'react';
import ReactDOM from 'react-dom';
import Background from './components/Background';
import CheckboxSeverities from './components/CheckboxSeverities'
import BusinessDomainDropDown from './components/BusinessDomainDropDown'
import DomainDropDownCheck from './components/DomainDropDownCheck'
import NavTab from './components/NavTab';
import BusinessTree from './components/BusinessTree';
import ApplyButton from './components/ApplyButton';
import RefreshButton from './components/RefreshButton';
import { Grid } from '@mui/material';
import MUIStartTime from './components/MUIStartTime.js';

  // ========================================


  class BusinessView extends React.Component {
      render() {
          return (
              <div>
                <Background />
                <NavTab />
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <MUIStartTime/>
                  </Grid>
                  <Grid item xs={4}>
                    <BusinessDomainDropDown/>
                    <DomainDropDownCheck/>
                  </Grid>
                  <Grid item xs={4}>
                    <RefreshButton />
                  </Grid>
                </Grid>

                <BusinessTree />
                <CheckboxSeverities />
                 <CheckboxSeverities />
                 <BusinessDomainDropDown/>
              </div>
              //put additional components after the tag for checkbox severities, I'll format them later - @hiimlo
          );
      }
  }

  ReactDOM.render(
    <BusinessView />,
    document.getElementById('root')
  );
  
/* 
Consider this BusinessView
removed App.js because it was unnecessary, since we can move what it does to here
Use the class above to put components in to be rendered
if you have questions we can talk about it during team meeting.

For purposes of seeing visually, each individual component can be placed here
however, filters should be actually be put in their designated group (BusinessFilters) for easier control of layout
*/