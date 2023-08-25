import React, { useState, useCallback } from "react"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import InsatllMobileIcon from "@mui/icons-material/InstallMobile"
import { installAPKFromURL } from "./apkInstaller"

interface IProps {
  loading: boolean
  setLoading: (loading: boolean) => void
  setErrorSnack: (snack: boolean) => void
  setErrorMessage: (message: string) => void
}
function InstallAPKComponent({
  loading,
  setLoading,
  setErrorSnack,
  setErrorMessage,
}: IProps): JSX.Element {
  const [url, setUrl] = useState<string>("")
  const handleInstallAPK = useCallback(() => {
    setLoading(true)
    installAPKFromURL(url)
      .then(() => {
        setUrl("")
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error installing APK", error.response.data)
        setErrorMessage(
          `Error installing APK: ${JSON.stringify(error.response.data)}`,
        )
        setErrorSnack(true)
        setLoading(false)
      })
  }, [url])

  const handleChangeURL = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setUrl(e.currentTarget.value)
  }

  return (
    <div style={{ display: "flex" }}>
      <TextField
        fullWidth
        sx={{
          backgroundColor: "white",
        }}
        label="APK URL"
        value={url}
        onChange={handleChangeURL}
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

export default InstallAPKComponent
