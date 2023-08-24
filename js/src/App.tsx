import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import EmulatorScreen from "./components/emulator_screen"
import { ThemeProvider, makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles"

import "./App.css"

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"

var EMULATOR_GRPC =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  window.location.port
if (development) {
  EMULATOR_GRPC =
    window.location.protocol + "//" + window.location.hostname + ":8080"
}

console.log(`Connecting to grpc at ${EMULATOR_GRPC}`)

const useStyles = makeStyles((theme) => ({
  root: {
    // some CSS that accesses the theme
  },
}))

const theme = createTheme({})

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmulatorScreen uri={EMULATOR_GRPC} />,
  },
  {
    path: "/launch",
    loader: ({ request }) => {
      const url = new URL(request.url)
      const apkPackage = url.searchParams.get("package")
      return { apkPackage }
    },
    element: <EmulatorScreen uri={EMULATOR_GRPC} />,
  },
])

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
