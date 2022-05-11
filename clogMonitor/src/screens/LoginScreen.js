import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./LoginScreen.css";
import Home from "../components/Home/Home";
import { Grid } from "@material-ui/core";
import { validateCredential } from '../fakeDatabase';
import ISOLogo from "../components/Images/ISOLogo.png";

function LoginScreen({ setLoggedIn }) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // User Login info
  const errors = {
    uname: "invalid username",
    pass: "invalid username and/or password",
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
        setErrorMessages({ name: "pass", message: errors.pass });
      });
  }

  // Bypass login screen for log details in new tab
  useEffect(() => {
    if (window.location.href.indexOf('log-details') !== -1) {
      setLoggedIn("true")
    }
  }, []);


  function help() {
    alert("Please contact support at xxx-xxx-xxxx or at example@email.com.");
  }

  function success() {
    alert("Successful Login!");
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
  (
    <div className="error">{errorMessages.message}</div>
  );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input className="outlined-input username-input" type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input className="outlined-input password-input" type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input className="login-btn" type="submit" />
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
        <Grid container justify="center">
          <img src={ISOLogo} alt="sunset on a beach" />
        </Grid>
        <div className="title"> CLOG Monitor Sign In</div>
        {isSubmitted ? (
          <div>
            {success()}
            <HashRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </HashRouter>
          </div>
        ) : (
          renderForm
        )}
        <div className="highlight" />
      </div>
    </div>
  )
}

export default LoginScreen;
