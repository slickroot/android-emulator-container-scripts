import axios from "axios"

export const installAPKFromURL = (url) => {
  return axios.post('http://localhost/api', { url })
}
