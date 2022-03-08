import React from "react";
import ErrorLogBox from "../ErrorLogBox/ErrorLogBox";

function ErrorLogPane() {
  let arr = ["hi"];
  return (
    <div>
      <div className="ErrorLogPane">
        <div className="ErrorLogPane__heading">Recent Error Logs</div>
        {arr.map((x) => (
          <ErrorLogBox></ErrorLogBox>
        ))}
      </div>
    </div>
  );
}

export default ErrorLogPane;
