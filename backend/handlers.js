const { URL } = require('url')
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const { downloadFile } = require('./util/download')

const DOWNLOAD_PATH = './games/game.apk'

const INSTALLED_GAMES = []

const getInstalledAPKs = async (req, res) => {
  res.json(INSTALLED_GAMES)
}

const saveNewAPK = async (req, res, next) => {
  try {
    const { stdout: packageName } = await exec('./scripts/package_name.sh')
    const { stdout: applicationLabel } = await exec('./scripts/application_label.sh')
    INSTALLED_GAMES.push({
      packageName: packageName.trim(), 
      applicationLabel: applicationLabel.trim()
    })
    res.json(INSTALLED_GAMES)
  } catch (error) {
    next(error)
  }
}

const installNewAPK = async (req, res, next) => {
  try {
    const url = new URL(req.body.url)
    if (!url.pathname.endsWith('.apk'))
      return res.status(400).end(error.message)

    await downloadFile(req.body.url, DOWNLOAD_PATH)
    await exec('adb connect emulator:5555; adb install ./games/game.apk')
    next()
  } catch (error) {
    next(error)
  }
}

const launchAPK = async (req, res, next) => {
  const apkPackage = req.body.apkPackage
  try {
    if (apkPackage)
      await exec('./scripts/launch_apk.sh ' + apkPackage)
    else
      return next('package not provided')
    res.end()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  launchAPK,
  saveNewAPK,
  installNewAPK,
  getInstalledAPKs,
}
