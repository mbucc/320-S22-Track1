import React from "react";
import Link from "@mui/material/Link";

function NavigationPane() {
  return (
    <div>
      <h1>Navigation</h1>

      <h3>
        <Link>Home</Link>
      </h3>
      <h3>
        <Link>Business Processes</Link>
      </h3>
      <h3>
        <Link>Log Events</Link>
      </h3>
    </div>
  );
}

export default NavigationPane;
