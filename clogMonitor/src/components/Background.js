import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const themeLight = createTheme({
    palette: {
      background: {
        default: "#ffffff"
      },
      text: {
        primary: "#000000"
      }
    }
  });
  
  const themeDark = createTheme({
    palette: {
      background: {
        default: "#20303B"
      },
      text: {
        primary: "#ffffff"
      }
    }
  });

  const Background = () => {
    const [light, setLight] = React.useState(true);
    return (
      <ThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button>
      </ThemeProvider>
    );
  };

export default Background;