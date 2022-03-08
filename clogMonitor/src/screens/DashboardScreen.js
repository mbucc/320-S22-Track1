import React from "react";
import NavigationPane from "../components/NavigationPane";
import NameAndLogout from '../components/NameAndLogout';
import "./DashboardScreen.css";

function DashboardScreen() {
    return (
        <div className="wrapper">
            <div className="DashboardScreen__NavigationPane">
                <NavigationPane />
                <NameAndLogout />
            </div>
        </div>
    );
}

export default DashboardScreen;
