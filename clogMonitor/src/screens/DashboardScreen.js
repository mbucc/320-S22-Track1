import React from 'react';
import NavigationPane from "../components/NavigationPane/NavigationPane";
import NameAndLogout from "../components/NameAndLogout/NameAndLogout";
import Logo from "../components/Logo/Logo";
import "./DashboardScreen.css";
import Home from "../components/Home/Home";
import LogEvents from "../components/LogEvents";
import LogDetail from "../components/LogDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getTableData } from '../fakeDatabase';
function DashboardScreen() {

  const [logEvents, setLogEvents] = React.useState([]);

  React.useEffect(() => {
    setLogEvents(getTableData(undefined));
  }, [])
  return (
    <div className="DashboardScreen">
      {/* <div className="DashboardScreen__NavigationPane"> */}
      <div className="DashboardScreen__NavigationPane__Display">
        <NavigationPane />
      </div>
      {/* </div> */}
      <div className="DashboardScreen__Center">
        <div className="DashboardScreen_Logo">
          <Logo />
        </div>
        <div className="DashboardScreen__Center__main">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Home
                  logEvents={logEvents} />} />
              {/* <Route path="business-processes" element={{}} /> */}
              <Route path="/log-events" element={<LogEvents />} />
              {/* <Route
                path={"/log-details/"}
                element={<LogEvents />} /> */}
              {logEvents.map((logEvent) => {
                console.log("/log-details/" + logEvent["GLOBAL_INSTANCE_ID"]);
                return (<Route
                  key={logEvent["GLOBAL_INSTANCE_ID"]}
                  path={"/log-details/" + logEvent["GLOBAL_INSTANCE_ID"]}
                  element={<LogDetail
                    data={logEvent} />} />);

              })}
            </Routes>
          </BrowserRouter>
        </div>
        <div className="DashboardScreen__NameAndLogout">
          <NameAndLogout />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
