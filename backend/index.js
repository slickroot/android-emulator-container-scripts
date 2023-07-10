const express = require('express')
const http = require('http');
const https = require('https');
const { exec } = require('child_process')
const fs = require('fs');
const { URL } = require('url')
const app = express()
const port = 3000

function downloadFile(url, destinationPath, callback) {
  const protocol = url.startsWith('https') ? https : http;

  protocol.get(url, response => {
    const fileStream = fs.createWriteStream(destinationPath);

    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      callback(null); // Download successful
    });
  })
  .on('error', err => {
    callback(err); // Error occurred during download
  });
}

app.use(express.json())

app.post('/api', async (req, res) => {
  try {
    const url = new URL(req.body.url)
    console.log('Received: ', req.body)
    if (!url.pathname.endsWith('.apk'))
      throw Error('Not an APK')
  } catch (error) {
    return res.status(400).end(error.message)
  }
  const destinationPath = './games/game.apk'
  downloadFile(req.body.url, destinationPath, (err) => {
    if (!err) {
      exec('adb connect emulator:5555; adb install ./games/game.apk', (error, stdout) => {
        if (error) {
          console.error(`Error starting process ${error.message}`)
          return;
        }
        console.log('Process started successfully')
        console.log('stdout:', stdout)
        res.end()
      })
    }
    else 
      res.status(500).json(err)
  })
})

app.listen(port, () => {
  console.log('Listening on ' + port)
})
