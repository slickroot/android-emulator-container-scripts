import React from "react"
import { render } from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import "./index.css"

render(<App />, document.getElementById("root"))

serviceWorker.unregister()
