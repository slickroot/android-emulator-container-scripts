import { useState, useEffect } from "react"
import withStyles from "@mui/styles/withStyles"
import { useLoaderData } from "react-router-dom"

import { launchAPK } from "../installapk/apkInstaller"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Copyright from "./copyright"
import { Emulator } from "android-emulator-webrtc/emulator"
import ExitToApp from "@mui/icons-material/ExitToApp"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import ImageIcon from "@mui/icons-material/Image"
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
import Slider from "@mui/material/Slider"
import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeUp from "@mui/icons-material/VolumeUp"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import React from "react"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import InstallAPKComponent from "../installapk/InstallAPKComponent"
import GamesList from "./games_list"

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nofocusborder: {
    outline: "none !important;",
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
})

const WhiteSlider = withStyles({
  thumb: {
    color: "white",
  },
  track: {
    color: "white",
  },
  rail: {
    color: "white",
  },
})(Slider)

type LoaderData = {
  apkPackage: string
}

function EmulatorScreen({ classes, uri }) {
  const [view, setView] = useState("webrtc")
  const [error_snack, setError_Snack] = useState(false)
  const [error_msg] = useState("")
  const [emuState, setEmuState] = useState("connecting")
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState<number | number[]>(0.0)
  const [hasAudio, setHasAudio] = useState(false)
  const [gps, setGps] = useState({ latitude: 37.4221, longitude: -122.0841 })
  const [loading, setLoading] = useState(false)
  const loaderData = useLoaderData() as LoaderData

  useEffect(() => {
    console.log("Something changed?")
    if (loaderData) {
      console.log(loaderData.apkPackage)
      launchAPK(loaderData.apkPackage)
    }
  }, [loaderData])

  const onAudioStateChange = (s: boolean) => {
    console.log("Received an audio state change from the emulator.")
    setHasAudio(s)
  }

  const onError = () => {
    // TODO: Fix this!!!!!
    // setError_Msg("Low level gRPC error: " + JSON.stringify(err))
    // setError_Snack(true)
  }

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        const loc = location.coords
        setGps({ latitude: loc.latitude, longitude: loc.longitude })
      })
    }
  }

  const handleClose = () => {
    setError_Snack(false)
  }

  const handleVolumeChange = (_event: Event, newVolume: number | number[]) => {
    const muted = newVolume === 0
    setVolume(newVolume)
    setMuted(muted)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Using emulator view: {view}
          </Typography>
          <div style={{ flexGrow: 1 }}>
            <InstallAPKComponent loading={loading} setLoading={setLoading} />
          </div>

          {hasAudio ? ( // Only display volume control if this emulator supports audio.
            <Box width={200} paddingTop={1}>
              <Grid container spacing={2}>
                <Grid item>
                  <VolumeDown />
                </Grid>
                <Grid item xs>
                  <WhiteSlider
                    value={volume}
                    onChange={handleVolumeChange}
                    min={0.0}
                    max={1.0}
                    step={0.01}
                    aria-labelledby="continuous-slider"
                  />
                </Grid>
                <Grid item>
                  <VolumeUp />
                </Grid>
              </Grid>
            </Box>
          ) : (
            // No audio track, so no volume slider.
            <div />
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
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
              onClick={() => setView("webrtc")}
              size="large"
            >
              <OndemandVideoIcon />
            </IconButton>
            <IconButton
              aria-label="Switch to screenshots"
              color="inherit"
              onClick={() => setView("png")}
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

      <div className={classes.paper}>
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={error_snack} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="error">
          {error_msg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default withStyles(styles)(EmulatorScreen)
