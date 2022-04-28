import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import LoginScreen from "./screens/LoginScreen.js";
import DashboardScreen from "./screens/DashboardScreen.js";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(82, 152, 68)',
    }
  },
  typography: {
    fontFamily: [
      "'Open Sans'",
      'Segoe UI', 
      'Roboto', 
      'Oxygen',
      'Ubuntu', 
      'Cantarell', 
      'Fira Sans', 
      'Droid Sans', 
      'Helvetica Neue',
      'Arial', 
      'sans-serif',
    ].join(",")
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("loginCheck") !== null
      ? sessionStorage.getItem("loginCheck")
      : "false"
  );

  // const loginCheck = useRef(false);
  // sessionStorage.setItem("loginCheck", false);
  // useEffect(() => {
  //   if (sessionStorage.getItem("loginCheck") === false) {

  //   }
  // }, [loggedIn]);

  // useEffect(() => {
  //   setLoggedIn(
  //     sessionStorage.getItem("loginCheck") !== null
  //       ? sessionStorage.getItem("loginCheck")
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
    <ThemeProvider theme={theme}>
      <div className="App">
        {loggedIn === "true" ? (
          <DashboardScreen setLoggedIn={setLoggedIn} />
        ) : (
          <LoginScreen setLoggedIn={setLoggedIn} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
