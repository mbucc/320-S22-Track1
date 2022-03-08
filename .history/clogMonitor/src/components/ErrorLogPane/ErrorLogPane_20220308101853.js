import React from "react";

function ErrorLogPane() {
  let arr = [];
  return (
    <div>
      <div className="ErrorLogPane">
        <div className="ErrorLogPane__heading">Recent Error Logs</div>
        {arr.map()}
      </div>
    </div>
  );
}

export default ErrorLogPane;
