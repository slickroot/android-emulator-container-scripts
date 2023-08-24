import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import InsatllMobileIcon from "@mui/icons-material/InstallMobile"
import { installAPKFromURL } from "./apkInstaller"

const InstallAPKComponent = ({ loading, setLoading }) => {
  const [url, setUrl] = useState("")
  const handleInstallAPK = useCallback(async () => {
    setLoading(true)
    installAPKFromURL(url).then(() => {
      setUrl("")
      setLoading(false)
    })
  }, [url])

  return (
    <div style={{ display: "flex" }}>
      <TextField
        fullWidth
        sx={{
          backgroundColor: "white",
        }}
        label="APK URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <IconButton
        aria-label="Install APK from Link"
        color="inherit"
        onClick={handleInstallAPK}
        size="large"
        disabled={loading}
      >
        <InsatllMobileIcon />
      </IconButton>
    </div>
  )
}

InstallAPKComponent.propTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
}

export default InstallAPKComponent
