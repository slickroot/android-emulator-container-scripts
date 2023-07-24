const fs = require('fs');
const http = require('http');
const https = require('https');

function downloadFile(url, destinationPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, response => {
      const fileStream = fs.createWriteStream(destinationPath);

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(null); // Download successful
      });
    })
      .on('error', err => {
        reject(err); // Error occurred during download
      });
  })
}

module.exports = { downloadFile } 

