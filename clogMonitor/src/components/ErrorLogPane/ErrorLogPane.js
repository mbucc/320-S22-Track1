import React from "react";
import ErrorLogBox from "../ErrorLogBox/ErrorLogBox";
import "./ErrorLogPane.css";
import Box from "@mui/material/Box";

function ErrorLogPane({ logEvents }) {
  // console.log(logEvents);
  // setChosenLogEventID(logEvent["GLOBAL_INSTANCE_ID"]
  return (
    <div>
      <div className="ErrorLogPane">
        <h2 className="ErrorLogPane__heading">Recent Error Logs</h2>
        <div className="ErrorLogPane__body">
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