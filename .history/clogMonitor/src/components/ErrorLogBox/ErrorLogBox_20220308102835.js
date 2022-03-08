import React from "react";
import "./ErrorLogBox.css";

function ErrorLogBox() {
  return (
    <div>
      <div className="ErrorLogBox">
        <div className="ErrorLogBox__header">
          <div className="ErrorLogBox__processId">Process ID: 576969</div>
          <div className="ErrorLogBox__date">Wed, 6:00 PM</div>
        </div>
        <div className="ErrorLogBox__logMessage">
          Log Message: Lorem Ipsum bc
        </div>
      </div>
    </div>
  );
}

export default ErrorLogBox;
