install_adb_keys() {
  rm -f /root/.android/adbkey /root/.android/adbkey.pub

  mkdir /root/.android

  if [ -s "/run/secrets/adbkey" ]; then
    echo "emulator: Copying private key from secret partition"
    cp /run/secrets/adbkey /root/.android/adbkey
  fi
  chmod 600 /root/.android/adbkey
}

install_adb_keys

node index.js
