import axios, { type AxiosResponse } from "axios"

export const installAPKFromURL = async (
  url: string,
): Promise<AxiosResponse> => {
  if (process.env.NODE_ENV === "development")
    return await axios.post("http://localhost:3000/api", { url })
  else return await axios.post("/api", { url })
}

export const closeAllApps = async (): Promise<AxiosResponse> => {
  if (process.env.NODE_ENV === "development")
    return await axios.delete("http://localhost:3000/api/launch")
  else return await axios.delete("/api/launch")
}

export const launchAPK = async (apkPackage: string): Promise<AxiosResponse> => {
  if (process.env.NODE_ENV === "development")
    return await axios.post("http://localhost:3000/api/launch", { apkPackage })
  else return await axios.post("/api/launch", { apkPackage })
}
