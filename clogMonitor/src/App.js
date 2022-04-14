import "./App.css";
// import LoginScreen from "./screens/LoginScreen.js";
import DashboardScreen from "./screens/DashboardScreen";
import { useState } from "react";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      {/* {loggedIn ? (
        <DashboardScreen />
      ) : (
        <LoginScreen setLoggedIn={setLoggedIn} />
      )} */}
      <DashboardScreen />
    </div>
  );
}

export default App;
