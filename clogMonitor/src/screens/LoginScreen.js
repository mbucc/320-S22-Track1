import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardScreen from "./DashboardScreen";
import "./LoginScreen.css";
import App from "../App";
import Home from "../components/Home/Home";
import LockIcon from "@mui/icons-material/Lock";
import { Grid } from "@material-ui/core";
import { validateCredential } from '../fakeDatabase';
import Beach from "../components/Images/Beach.jpg";
import ISOLogo from "../components/Images/ISOLogo.png";

function LoginScreen({ setLoggedIn }) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // User Login info
  const database = [
    {
      username: "Mark",
      password: "12345",
    },
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];
  const errors = {
    uname: "invalid username",
    pass: "invalid password",
    forgot: "Please contact support at xxx-xxx-xxxx or at example@email.com",
  };
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    // Find user login info
    validateCredential(uname.value, pass.value)
      .then(token => {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("loginCheck", "true");
        setTimeout(() => setLoggedIn("true"), 100); // Wait until session storage is set before logging in
      }).catch(error => {
        console.log(error);
        setErrorMessages({ name: "uname", message: errors.uname });
        setErrorMessages({ name: "pass", message: errors.pass });
    });
  }


  function help() {
    alert("Please contact support at xxx-xxx-xxxx or at example@email.com.");
  }

  function success() {
    alert("Successful Login!");
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input className="outlined-input" type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input className="outlined-input" type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
        <br></br>
      <div className="help-button">
        <p onClick={help}> Forgot Password? </p>
      </div>
    </div>
  );
  return (
    <div className="app">
      <div className="login-form">
        <Grid container justify = "center">
          <img src = {ISOLogo} />
        </Grid>
        <div className="title"> CLOG Monitor Sign In</div>
        {isSubmitted ? (
          <div>
            {success()}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </div>
        ) : (
          renderForm
        )}
        <div className="highlight" />
      </div>
    </div>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<div><LoginScreen /></div>, rootElement);
export default LoginScreen;
