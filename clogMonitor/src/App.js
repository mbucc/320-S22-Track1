import "./App.css";
import React from "react";
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

  return (
    <ThemeProvider theme={theme}>
      {loggedIn === "true" ? (
        <DashboardScreen setLoggedIn={setLoggedIn} />
      ) : (
        <LoginScreen setLoggedIn={setLoggedIn} />
      )}
    </ThemeProvider>
  );
}

export default App;
