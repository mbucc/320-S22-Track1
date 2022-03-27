import React, { useState } from "react";
import NavigationPane from "../components/NavigationPane/NavigationPane";
import NameAndLogout from "../components/NameAndLogout/NameAndLogout";
import Logo from "../components/Logo/Logo";
import "./DashboardScreen.css";
import Home from "../components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function DashboardScreen() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div className="DashboardScreen">
      <div
        className={
          navbar
            ? "DashboardScreen__Navigation__Button_On"
            : "DashboardScreen__Navigation__Button_Off"
        }
        onClick={() => {
          setNavbar(!navbar);
          console.log("change");
        }}
      >
        {!navbar ? <MenuIcon /> : <CloseIcon />}
      </div>
      {/* <div className="DashboardScreen__NavigationPane"> */}
      <div
        className={
          navbar
            ? "DashboardScreen__NavigationPane__Display"
            : "DashboardScreen__NavigationPane__No__Display"
        }
      >
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
              <Route path="/" element={<Home />} />
              {/* <Route path="business-processes" element={{}} />
            <Route path="log-events" element={{}} /> */}
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
