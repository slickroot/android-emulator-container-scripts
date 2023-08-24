import axios from "axios"

export const installAPKFromURL = (url: string) => {
  if (process.env.NODE_ENV === 'development')
    return axios.post('http://localhost:3000/api', { url })
  else
    return axios.post('/api', { url })
}

export const launchAPK = (apkPackage: string) => {
  if (process.env.NODE_ENV === 'development')
    return axios.post('http://localhost:3000/api/launch', { apkPackage })
  else
    return axios.post('/api/launch', { apkPackage })
}
