import React from "react";
import "./ErrorLogBox.css";

function ErrorLogBox() {
  return (
    <div>
      <div className="ErrorLogBox">
        <div className="ErrorLogBox__header">
          <div className="ErrorLogBox__processId">
            <b>Process ID:</b> 576969
          </div>
          <div className="ErrorLogBox__date">
            <b>Wed, 6:00 PM</b>
          </div>
        </div>
        <div className="ErrorLogBox__logMessage">
          <b>Log Message:</b> Lorem Ipsum bc
        </div>
      </div>
    </div>
  );
}

export default ErrorLogBox;
