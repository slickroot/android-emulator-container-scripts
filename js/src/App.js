import React from "react";
import EmulatorScreen from "./components/emulator_screen";
import { ThemeProvider,  makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import "./App.css";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

var EMULATOR_GRPC =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  window.location.port;
if (development) {
  EMULATOR_GRPC = window.location.protocol + "//" +
    window.location.hostname + ":8080";
}


console.log(`Connecting to grpc at ${EMULATOR_GRPC}`);

const useStyles = makeStyles((theme) => ({
  root: {
    // some CSS that accesses the theme
  }
}));

const theme = createTheme({

});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <EmulatorScreen uri={EMULATOR_GRPC} />
    </ThemeProvider>
  );
}
