import React from "react";
import Link from "@mui/material/Link";
import "./NavigationPane.css";

function NavigationPane() {
  return (
    <div>
      <h1 className="NavigationPane__heading">Navigation</h1>

      <h3>
        <Link href="#" underline="none">
          Home
        </Link>

        <Link href="#" underline="none">
          Business Processes
        </Link>

        <Link href="#" underline="none">
          Log Events
        </Link>
      </h3>
    </div>
  );
}

export default NavigationPane;
