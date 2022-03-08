import React from "react";
import ErrorLogBox from "../ErrorLogBox/ErrorLogBox";
import "./ErrorLogPane.css";

function ErrorLogPane() {
  let arr = ["hi", "hi", "hi", "hi", "hi", "hi", "hi"];
  return (
    <div>
      <div className="ErrorLogPane">
        <div className="DashboardScreen__ErrorLogPane">
          <ErrorLogPane />
        </div>
        <h2 className="ErrorLogPane__heading">Recent Error Logs</h2>
        {arr.map((x) => (
          <ErrorLogBox className="ErrorLogPane__box"></ErrorLogBox>
        ))}
      </div>
    </div>
  );
}

export default ErrorLogPane;
