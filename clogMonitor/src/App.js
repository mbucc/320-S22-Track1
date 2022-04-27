import "./App.css";
import React from "react";
import { useState } from "react";
import LoginScreen from "./screens/LoginScreen.js";
import DashboardScreen from "./screens/DashboardScreen.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("loginCheck") !== null
      ? sessionStorage.getItem("loginCheck")
      : "false"
  );

  return (
    <div className="App">
      {loggedIn === "true" ? (
        <DashboardScreen setLoggedIn={setLoggedIn} />
      ) : (
        <LoginScreen setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
