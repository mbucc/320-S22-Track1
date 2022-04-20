import "./App.css";
import React, { Suspense, useEffect } from "react";
import { useState, useRef } from "react";
import LoginScreen from "./screens/LoginScreen.js";
import DashboardScreen from "./screens/DashboardScreen.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loginCheck") !== null
      ? localStorage.getItem("loginCheck")
      : false
  );

  // const loginCheck = useRef(false);
  // localStorage.setItem("loginCheck", false);
  // useEffect(() => {
  //   if (localStorage.getItem("loginCheck") === false) {

  //   }
  // }, [loggedIn]);

  useEffect(() => {
    setLoggedIn(
      localStorage.getItem("loginCheck") !== null
        ? localStorage.getItem("loginCheck")
        : false
    );
  }, []);

  return (
    <div className="App">
      {/* {loggedIn ? (
        <DashboardScreen />
      ) : (
        <LoginScreen setLoggedIn={setLoggedIn} /> 
      )} */}
      {/* <LoginScreen /> */}
      {console.log(loggedIn)}
      {loggedIn ? (
        <DashboardScreen setLoggedIn={setLoggedIn} />
      ) : (
        <LoginScreen setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
