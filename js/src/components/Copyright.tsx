import React from "react"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

export default function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Marouane Elaich
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
