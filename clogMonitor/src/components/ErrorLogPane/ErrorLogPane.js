import React from "react";
import ErrorLogBox from "../ErrorLogBox/ErrorLogBox";
import "./ErrorLogPane.css";
import Box from "@mui/material/Box";

function ErrorLogPane() {
  let arr = ["hi", "hi", "hi", "hi"];
  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          top: "48%",
          right: "1%",
          boxShadow: "0px 0px 12px -1px #000000",
          display: 'flex', 
          border: "1",
          borderRadius: "20px",
          bgcolor: 'background.paper',                                      
        }}
      >
        <div className="ErrorLogPane">
          <h2 className="ErrorLogPane__heading">Recent Error Logs</h2>
          <div className="ErrorLogPane__body">
        {arr.map((x) => (
        <ErrorLogBox className="ErrorLogPane__box"></ErrorLogBox>
        ))}
        </div>
      </div>
      </Box>
    </div>
  );
}

export default ErrorLogPane;