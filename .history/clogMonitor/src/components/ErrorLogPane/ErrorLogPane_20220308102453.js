import React from "react";

function ErrorLogPane() {
  let arr = ["hi"];
  return (
    <div>
      <div className="ErrorLogPane">
        <div className="ErrorLogPane__heading">Recent Error Logs</div>
        {/* {arr.map(x => <ErrorLogBox></ErrorLogBox>)} */}
      </div>
    </div>
  );
}

export default ErrorLogPane;
