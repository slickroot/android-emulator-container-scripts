import React, { useState, useEffect } from "react"
import { useLoaderData } from "react-router-dom"

import { launchAPK, closeAllApps } from "../installapk/apkInstaller"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Copyright from "../components/Copyright"
import { Emulator } from "android-emulator-webrtc/emulator"
import ExitToApp from "@mui/icons-material/ExitToApp"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import ImageIcon from "@mui/icons-material/Image"
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import InstallAPKComponent from "../installapk/InstallAPKComponent"
import GamesList from "../components/GamesList"
import VolumeControl from "../components/VolumeControl"

interface LoaderData {
  apkPackage: string
}

interface IProps {
  uri: string
}

export default function EmulatorScreen({ uri }: IProps): JSX.Element {
  const [view, setView] = useState("webrtc")
  const [errorSnack, setErrorSnack] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [emuState, setEmuState] = useState("connecting")
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState<number | number[]>(0.0)
  const [hasAudio, setHasAudio] = useState(false)
  const [gps, setGps] = useState({ latitude: 37.4221, longitude: -122.0841 })
  const [loading, setLoading] = useState(false)
  const loaderData = useLoaderData() as LoaderData | undefined

  useEffect(() => {
    console.log("Something changed?")
    if (loaderData != null) {
      console.log(loaderData.apkPackage)
      void launchAPK(loaderData.apkPackage)
    } else {
      void closeAllApps()
    }
  }, [loaderData])

  const onAudioStateChange = (s: boolean): void => {
    console.log("Received an audio state change from the emulator.")
    setHasAudio(s)
  }

  const onError = (err: Error): void => {
    setErrorMessage("Low level gRPC error: " + JSON.stringify(err))
    setErrorSnack(true)
  }

  const updateLocation = (): void => {
    if (navigator.geolocation != null) {
      navigator.geolocation.getCurrentPosition((location) => {
        const loc = location.coords
        setGps({ latitude: loc.latitude, longitude: loc.longitude })
      })
    }
  }

  const handleClose = (): void => {
    setErrorSnack(false)
  }

  return (
    <Box flexGrow={1}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Using emulator view: {view}
          </Typography>
          <div style={{ flexGrow: 1 }}>
            <InstallAPKComponent
              loading={loading}
              setLoading={setLoading}
              setErrorSnack={setErrorSnack}
              setErrorMessage={setErrorMessage}
            />
          </div>

          {hasAudio ? ( // Only display volume control if this emulator supports audio.
            <VolumeControl
              setMuted={setMuted}
              volume={volume}
              setVolume={setVolume}
            />
          ) : (
            // No audio track, so no volume slider.
            <></>
          )}

          <div />
          <div>
            <IconButton
              aria-label="Get current location"
              color="inherit"
              onClick={updateLocation}
              size="large"
            >
              <LocationOnIcon />
            </IconButton>
            <IconButton
              aria-label="Switch to webrtc"
              color="inherit"
              onClick={() => {
                setView("webrtc")
              }}
              size="large"
            >
              <OndemandVideoIcon />
            </IconButton>
            <IconButton
              aria-label="Switch to screenshots"
              color="inherit"
              onClick={() => {
                setView("png")
              }}
              size="large"
            >
              <ImageIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="logout"
              color="inherit"
              size="large"
            >
              <ExitToApp />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column" as "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Container maxWidth="sm">
              <Emulator
                uri={uri}
                view={view}
                onStateChange={setEmuState}
                onAudioStateChange={onAudioStateChange}
                onError={onError}
                muted={muted}
                volume={volume}
                gps={gps}
                width={200}
              />
              <p>State: {emuState} </p>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6}>
            <GamesList refresh={!loading} />
          </Grid>
        </Grid>
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={errorSnack} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
