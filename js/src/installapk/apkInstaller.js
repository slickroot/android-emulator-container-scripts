import axios from "axios"

export const installAPKFromURL = (url) => {
  return axios.post('http://192.241.153.27/api', { url })
}
