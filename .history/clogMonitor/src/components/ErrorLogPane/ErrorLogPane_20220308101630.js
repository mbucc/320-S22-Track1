import React from "react";

function ErrorLogPane() {
  return (
    <div>
      <div className="ErrorLogPane">
        <div className="ErrorLogPane__heading">Recent Error Logs</div>
        {for (let i = 0; i < 10; i++)(
            console.log()
        )}
      </div>
    </div>
  );
}

export default ErrorLogPane;
