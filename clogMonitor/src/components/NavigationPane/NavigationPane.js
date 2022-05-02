import React from "react";
import Link from "@mui/material/Link";
//import "./NavigationPane.css";
import { AppBar, Box, CssBaseline, Drawer, Toolbar, Typography, List, ListItem, ListItemIcon } from "@mui/material";
import NameAndLogout from "../NameAndLogout/NameAndLogout";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';

const navBarwidth = 240;

function NavigationPane() {
  return (
    // <div className="NavigationPane__links">
    //   <h3>
    //     <Link href="/" underline="none" className="NavigationPane__link">
    //       Home
    //     </Link>
    //   </h3>
    //   <h3>
    //     <Link
    //       href="/business-processes"
    //       underline="none"
    //       className="NavigationPane__link"
    //     >
    //       Business Processes
    //     </Link>
    //   </h3>
    //   <h3>
    //     <Link
    //       href="/log-events"
    //       underline="none"
    //       className="NavigationPane__link"
    //     >
    //       Log Events
    //     </Link>
    //   </h3>
    // </div>

    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer +1}}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            CLOG Monitor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: navBarwidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: navBarwidth, boxSizing: 'border-box'},
        }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button key={'Home'}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <Link href="/" underline="none" className="NavigationPane__link"> Home </Link>
              </ListItem>
              <ListItem button key={'Business Process'}>
                <ListItemIcon><BusinessIcon/></ListItemIcon>
                <Link href="/business-processes" underline="none" className="NavigationPane__link"> Business Process </Link>
              </ListItem>
              <ListItem button key={'Log Events'}>
                <ListItemIcon><EventIcon/></ListItemIcon>
                <Link href="/log-events" underline="none" className="NavigationPane__link"> Log Events </Link>
              </ListItem>
            </List>
            <NameAndLogout/>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
        </Box>
    </Box>

  );
}

export default NavigationPane;
