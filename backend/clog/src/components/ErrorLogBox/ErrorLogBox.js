import React from "react";
import "./ErrorLogBox.css";
import Link from "@mui/material/Link";

function ErrorLogBox({ logEvent }) {
  // console.log(logEvent["CREATION_TIME"]);
  return (
    <Link
      href={"/log-details/" + logEvent["GLOBAL_INSTANCE_ID"]}
      underline="none"
      className="NavigationPane__link">
      <div
        className="ErrorLogBox">
        <div className="ErrorLogBox__header">
          <div className="ErrorLogBox__processId">
            <div>Application: {logEvent['APPLICATION']}</div>
            <div>Log Event ID: {logEvent['GLOBAL_INSTANCE_ID']} </div>
          </div>
          {/* <div className="ErrorLogBox__date">
            <div>{logEvent['CREATION_TIME']}</div>
          </div> */}
        </div>
        <div className="ErrorLogBox__logMessage">
          <div>Severity:{logEvent['SEVERITY']}</div>
        </div>
      </div>
    </Link>

  );
}

export default ErrorLogBox;
