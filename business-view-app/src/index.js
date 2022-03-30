import React from 'react';
import ReactDOM from 'react-dom';
import CheckboxSeverities from './components/CheckboxSeverities'
import BusinessDomainDropDown from './components/BusinessDomainDropDown'
import DomainDropDownCheck from './components/DomainDropDownCheck'
import NavTab from './components/NavTab';
import BusinessTree from './components/BusinessTree';
//import {StartTime, EndTime, StartPicker, EndPicker, StartTimePicker, EndTimePicker, RefreshTime} from './components/StartTime';
import CustomDateTimePicker from './components/MUIStartTime';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
//import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
//import LuxonUtils from '@date-io/luxon';

  // ========================================



  /*<StartTime/>
                 <StartPicker/>
                 <StartTimePicker/>
                 <EndTime/>
                 <EndPicker/>
                 <EndTimePicker/>
                 <RefreshTime/>*/
  class BusinessView extends React.Component {
      render() {
          return (
              <div>
                 <NavTab />
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <CustomDateTimePicker/>
                 </MuiPickersUtilsProvider>
                 <BusinessTree />
                 <BusinessDomainDropDown/>
                 <DomainDropDownCheck/>
                 <CheckboxSeverities />
              </div>
          );
      }
  }

  ReactDOM.render(
    <BusinessView />,
    document.getElementById('root')
  );
  
/* @hiimlo file
Consider this BusinessView
removed App.js because it was unnecessary, since we can move what it does to here
Use the class above to put components in to be rendered
if you have questions we can talk about it during team meeting.

For purposes of seeing visually, each individual component can be placed here
however, filters should be actually be put in their designated group (BusinessFilters) for easier control of layout
*/