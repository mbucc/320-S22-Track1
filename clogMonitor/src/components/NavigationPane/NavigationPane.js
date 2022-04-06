import React from "react";
import Link from "@mui/material/Link";
import Logo from '../Logo/Logo';
import NameAndLogout from "../NameAndLogout/NameAndLogout";
import "./NavigationPane.css";

function NavigationPane() {
  return (
    <div className="topnavbar-container">
      <h1 className="NavigationPane__heading"> CLOG Monitor </h1>
      <div className="NavigationPane__links">
      <Link href="/" underline="none" className="NavigationPane__link" color="#f7f7f7">
          Home
      </Link>
      <Link
        href="business-processes"
        underline="none"
        className="NavigationPane__link"
        color="#f7f7f7"
      >
        Business Processes
      </Link>
      <Link
        href="log-events"
        underline="none"
        className="NavigationPane__link"
        color="#f7f7f7"
      >
        Log Events
      </Link>
      </div>
      <div className="DashboardScreen__NameAndLogout">
          <NameAndLogout />
        </div>
    </div>
  );
}

export default NavigationPane;
