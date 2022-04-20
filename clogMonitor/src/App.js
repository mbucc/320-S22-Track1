import "./App.css";
import React, { Suspense, useEffect } from "react";
import { useState, useRef } from "react";
import LoginScreen from "./screens/LoginScreen.js";
import DashboardScreen from "./screens/DashboardScreen.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loginCheck") !== null
      ? localStorage.getItem("loginCheck")
      : "false"
  );

  // const loginCheck = useRef(false);
  // localStorage.setItem("loginCheck", false);
  // useEffect(() => {
  //   if (localStorage.getItem("loginCheck") === false) {

  //   }
  // }, [loggedIn]);

  // useEffect(() => {
  //   setLoggedIn(
  //     localStorage.getItem("loginCheck") !== null
  //       ? localStorage.getItem("loginCheck")
  //       : false
  //   );
  // }, []);

  // useEffect(() => {
  //   console.log(loggedIn);
  // }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // console.log(searchTerm)
      // Send Axios request here
    }, 3000);

    // Cleanup fn
    return () => clearTimeout(delayDebounceFn);
  }, []);

  return (
    <div className="App">
      {/* {loggedIn ? (
        <DashboardScreen />
      ) : (
        <LoginScreen setLoggedIn={setLoggedIn} /> 
      )} */}
      {/* <LoginScreen /> */}
      {console.log(loggedIn, loggedIn === "true", loggedIn === false)}

      {loggedIn === "true" ? (
        <DashboardScreen setLoggedIn={setLoggedIn} />
      ) : (
        <LoginScreen setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
