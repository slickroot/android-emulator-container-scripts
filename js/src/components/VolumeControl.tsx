import React, { useState } from "react"
import withStyles from "@mui/styles/withStyles"
import Slider from "@mui/material/Slider"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeUp from "@mui/icons-material/VolumeUp"

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

interface IProps {
  setMuted: (muted: boolean) => void
  setVolume: (volume: number | number[]) => void
  volume: number | number[]
}
export default function VolumeControl({ setMuted }: IProps): JSX.Element {
  const [volume, setVolume] = useState<number | number[]>(0.0)

  const handleVolumeChange = (
    _event: Event,
    newVolume: number | number[],
  ): void => {
    const muted = newVolume === 0
    setVolume(newVolume)
    setMuted(muted)
  }

  return (
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
  )
}
