import React from "react";
import Link from "@mui/material/Link";
import "./NavigationPane.css";

function NavigationPane() {
  return (
    <div>
      <h1 className="NavigationPane__heading">Navigation</h1>

      <div className="NavigationPane__links">
        <h3>
          <Link href="/" underline="none" className="NavigationPane__link">
            Home
          </Link>
        </h3>
        <h3>
          <Link
            href="/business-processes"
            underline="none"
            className="NavigationPane__link"
          >
            Business Processes
          </Link>
        </h3>
        <h3>
          <Link
            href="/log-events"
            underline="none"
            className="NavigationPane__link"
          >
            Log Events
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default NavigationPane;
