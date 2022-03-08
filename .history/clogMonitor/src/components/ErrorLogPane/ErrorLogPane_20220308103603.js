import React from "react";
import ErrorLogBox from "../ErrorLogBox/ErrorLogBox";

function ErrorLogPane() {
  let arr = ["hi", "hi", "hi", "hi", "hi"];
  return (
    <div>
      <div className="ErrorLogPane">
        <h2 className="ErrorLogPane__heading">Recent Error Logs</h2>
        {arr.map((x) => (
          <ErrorLogBox></ErrorLogBox>
        ))}
      </div>
    </div>
  );
}

export default ErrorLogPane;
