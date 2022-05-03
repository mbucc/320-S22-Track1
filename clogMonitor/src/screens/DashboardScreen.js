import React from 'react';
import NavigationPane from "../components/NavigationPane/NavigationPane";
import NameAndLogout from "../components/NameAndLogout/NameAndLogout";
import "./DashboardScreen.css";
import Home from "../components/Home/Home";
import LogEvents from "../components/LogEvents";
import LogDetail from "../components/LogDetail";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { getLogDetails } from '../fakeDatabase';
import { BusinessView } from '../components/BusinessView';
import { AppBar, Toolbar, Typography } from '@mui/material';

function DashboardScreen({ setLoggedIn }) {
  const [logEvents, setLogEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const token = sessionStorage.getItem("token");

  const defaultQuery = {
    sev_info: "true", // boolean
    sev_succ: "true", // boolean
    sev_warn: "true", // boolean
    sev_err: "true", // boolean
    priority_low: "true", // boolean
    priority_med: "true", // boolean
    priority_high: "true", // boolean
    status: "true",
    start: "true",
    stop: "true",
    security: "true",
    heartbeat: "true",
  }

  React.useEffect(() => {
    setLoading(true);
    if (token !== undefined) {
      getLogDetails(token, defaultQuery).then((resultData) => {
        setLogEvents(resultData)
        setLoading(false);
      });
    }

  }, [token])

  return (
    <div className="Layout">
      <AppBar>
        <Toolbar sx={{backgroundColor: "primary.dark"}}>
          <Typography variant="h6" noWrap component="div">
            CLOG Monitor
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar> {/* For alignment */}
      <div className="DashboardScreen"> 
        <div className="DashboardScreen__SideNav">
          <div className="DashboardScreen__NavigationPane__Display">
            <NavigationPane/>
          </div>
          <NameAndLogout setLoggedIn={setLoggedIn} />
        </div>
        
        {/* </div> */}
        <div className="DashboardScreen__Center">
          <div className="DashboardScreen__Center__main">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home logEvents={logEvents} loading={loading} />} />
                <Route path="/business-processes" element={<BusinessView/>} />
                <Route path="/log-events" element={<LogEvents/>} />
                <Route path="/log-details/:id" element={<LogDetail/>} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
