import React from "react";
import "./ErrorLogBox.css";
import Link from "@mui/material/Link";

function ErrorLogBox({ logEvent }) {
  // console.log(logEvent["CREATION_TIME"]);
  return (
    <Link
      href={"/#/log-details/" + logEvent["globalInstanceId"]}
      underline="none"
      className="ErrorLogBox__link">
      <div
        className="ErrorLogBox">
        <div className="ErrorLogBox__header">
          <div className="ErrorLogBox__processId">
            <div>Application: {logEvent['application']}</div>
            <div>Log Event ID: {logEvent['globalInstanceId']} </div>
          </div>
          {/* <div className="ErrorLogBox__date">
            <div>{logEvent['CREATION_TIME']}</div>
          </div> */}
        </div>
        <div className="ErrorLogBox__logMessage">
          <div>Severity:{logEvent['severity']}</div>
        </div>
      </div>
    </Link>

  );
}

export default ErrorLogBox;
