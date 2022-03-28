import React from 'react';
import ReactDOM from 'react-dom';
import CheckboxSeverities from './components/CheckboxSeverities'
import NavTab from './components/NavTab';
import BusinessTree from './components/BusinessTree';
import ApplyButton from './components/ApplyButton';
//import BusinessFilters from './components/BusinessFilters';
  // ========================================

  class BusinessView extends React.Component {
      render() {
          return (
              <div>
                 <NavTab />
                 <BusinessTree />
                 <ApplyButton />
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

For purposes of seeing visually, each component individuall can be placed here
however, filters should be actually be put in their designated group (BusinessFilters) for easier control of layout
*/