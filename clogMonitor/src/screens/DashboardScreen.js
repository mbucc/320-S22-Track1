import React from "react";
import ErrorLogPane from "../components/ErrorLogPane/ErrorLogPane";
import WelcomeTynography from "../components/WelcomeTynography/WelcomeTynography";
import NavigationPane from "../components/NavigationPane/NavigationPane";
import NameAndLogout from "../components/NameAndLogout/NameAndLogout";
import AppBarChart from "../components/Charts/AppBarChart";
import Logo from "../components/Logo/Logo";
import "./DashboardScreen.css";

function DashboardScreen() {
  return (
    <div className="DashboardScreen">
      <div className="DashboardScreen__NavigationPane">
        <NavigationPane />
      </div>
      <div className="DashboardScreen__Center">
        <div className="DashboardScreen_Logo">
          <Logo />
        </div>
        <div className="DashboardScreen_WelcomeTynography">
          <WelcomeTynography />
        </div>
        <div className="DashboardScreen_Charts">
          <AppBarChart />
        </div>
      </div>
      <div className="DashboardScreen__rightPane">
        <div className="DashboardScreen__NameAndLogout">
          <NameAndLogout />
        </div>
        <div className="DashboardScreen__ErrorLogPane">
          <ErrorLogPane />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
