import React from "react";
import Link from "@mui/material/Link";
import "./NavigationPane.css";
import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material";
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
  const linkTextSx = {color: "white", opacity: 1};
  const pages = [
    {
      name: "Home",
      href: "/",
      selected: window.location.pathname === "/",
      icon: HomeIcon,
    },
    {
      name: "Business Process",
      href: "#/business-processes",
      selected: window.location.pathname === "#/business-processes",
      icon: BusinessIcon,
    },
    {
      name: "Log Events",
      href: "#/log-events",
      selected: window.location.pathname === "#/log-events",
      icon: EventIcon,
    },
  ]
  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {
          pages.map(p => {
            const addStyles = {
              backgroundColor: p.selected ? "primary.main" : "inherit",
            }
            return (
              <ListItem button sx={addStyles} key={p.name} className="NavigationPane__li" component={Link} href={p.href}>
                <ListItemIcon><p.icon sx={{color: "white"}}/></ListItemIcon>
                <Typography sx={linkTextSx}>{p.name}</Typography>
              </ListItem>
            )
          })
        }
      </List>
    </Box>
  );
}

export default NavigationPane;
