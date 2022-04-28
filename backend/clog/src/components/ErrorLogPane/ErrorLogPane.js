import React from "react";
import ErrorLogBox from "../ErrorLogBox/ErrorLogBox";
import "./ErrorLogPane.css";
import Box from "@mui/material/Box";
import ReactDOM from 'react-dom';


const myComponent = {
  width: '400px',
  height: '500px',
  overflowX: 'hidden',
  overflowY: 'scroll'
};

function ErrorLogPane({ logEvents }) {
  // console.log(logEvents);
  // setChosenLogEventID(logEvent["GLOBAL_INSTANCE_ID"]
  return (
    <div style={{ height: '500px' }}>
      <div className="ErrorLogPane">
        <h2 className="ErrorLogPane__heading">Recent Error Logs</h2>
        <div className="ErrorLogPane__body" style={myComponent}>
          {logEvents.map((logEvent) => (
            <ErrorLogBox
              className="ErrorLogPane__box"
              logEvent={logEvent}
            ></ErrorLogBox>
          ))}
        </div>
      </div>
    </div >
  );
}

export default ErrorLogPane;