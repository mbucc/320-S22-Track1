import React from "react";
import Link from "@mui/material/Link";
import "./NavigationPane.css";
import { Box, List, ListItem, ListItemIcon } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';


/**
 * Despite the name, this component only defines the links section of the side navigation
 * Definition of the entire side navigation is in DashboardScreen.js
 * 
 * @returns {React.ElementType} 
 */
function NavigationPane() {
  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem button key={'Home'} className="NavigationPane__li" component={Link} href="/">
          <ListItemIcon><HomeIcon sx={{color: "white"}}/></ListItemIcon>
          Home
        </ListItem>
        <ListItem button key={'Business Process'} className="NavigationPane__li" component={Link} href="/business-processes">
          <ListItemIcon><BusinessIcon sx={{color: "white"}}/></ListItemIcon>
          Business Process
        </ListItem>
        <ListItem button key={'Log Events'} className="NavigationPane__li" component={Link} href="/log-events">
          <ListItemIcon><EventIcon sx={{color: "white"}}/></ListItemIcon>
          Log Events
        </ListItem>
      </List>
    </Box>
  );
}

export default NavigationPane;
