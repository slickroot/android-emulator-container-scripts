const { installNewAPK, saveNewAPK, getInstalledAPKs, launchAPK } = require('./handlers')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
if (process.env.NODE_ENV !== 'production')
  app.use(cors())

app.post('/api', installNewAPK, saveNewAPK)
app.get('/api', getInstalledAPKs)

app.post('/api/launch', launchAPK)

app.use((err, req, res, next) => {
  res.status(500).json(err)
})

app.listen(port, () => {
  console.log('Listening on ' + port)
})
