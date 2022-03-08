import React from "react";
import ErrorLogPane from "../components/ErrorLogPane/ErrorLogPane";
import NavigationPane from "../components/NavigationPane/NavigationPane";
import NameAndLogout from "../components/NameAndLogout/NameAndLogout";
import "./DashboardScreen.css";

function DashboardScreen() {
  return (
    <div className="DashboardScreen">
      <div className="DashboardScreen__NavigationPane">
        <NavigationPane />
      </div>
      <div className="DashboardScreen__rightPane">
        <div className="DashboardScreen__ErrorLogPane">
          <ErrorLogPane />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
