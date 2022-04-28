import React from 'react';
import NavigationPane from "../components/NavigationPane/NavigationPane";
import NameAndLogout from "../components/NameAndLogout/NameAndLogout";
import Logo from "../components/Logo/Logo";
import "./DashboardScreen.css";
import Home from "../components/Home/Home";
import LogEvents from "../components/LogEvents";
import LogDetail from "../components/LogDetail";
import { HashRouter , Routes, Route } from "react-router-dom";
import { getLogDetails } from '../fakeDatabase';
import { BusinessView } from '../components/BusinessView';

function DashboardScreen({ setLoggedIn }) {

  const [logEvents, setLogEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const token = sessionStorage.getItem("token");

  React.useEffect(() => {
    setLoading(true);
    if (token !== undefined) {
      getLogDetails(token).then((resultData) => {
        setLogEvents(resultData)
        setLoading(false);
      });
    }

  }, [token])

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
          <HashRouter >
            <Routes>
              <Route
                path="/"
                element={<Home
                  logEvents={logEvents} loading={loading} />} />
              <Route path="business-processes" element={<BusinessView/>} />
              <Route path="/log-events" element={<LogEvents/>} />
              <Route path="/log-details/:id" element={<LogDetail/>} />
            </Routes>
          </HashRouter >
        </div>
        <div className="DashboardScreen__NameAndLogout">
          <NameAndLogout setLoggedIn={setLoggedIn} />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
