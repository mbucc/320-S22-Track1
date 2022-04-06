import React from "react";
import NavigationPane from "../components/NavigationPane/NavigationPane";
import NameAndLogout from "../components/NameAndLogout/NameAndLogout";
import Logo from "../components/Logo/Logo";
import "./DashboardScreen.css";
import Home from "../components/Home/Home";
import LogEvents from "../components/LogEvents";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function DashboardScreen() {
  return (
    <div className="DashboardScreen">
      {/* <div className="DashboardScreen__Center"> */}
        {/* <div className="DashboardScreen_Logo">
          <Logo />
        </div> */}
        {/* <div className="DashboardScreen__NameAndLogout">
          <NameAndLogout />
        </div> */}
        <NavigationPane />
        {/* <div className="DashboardScreen__Center__main"> */}
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="business-processes" element={{}} /> */}
              <Route path="/log-events" element={<LogEvents />} />
              {/* <Route path="/log-details?id=" element={<LogDetail data={apicall(id)}/>} /> */}
            </Routes>
          </BrowserRouter>
        </div>
      {/* </div> */}
    </div>
  );
}

export default DashboardScreen;
