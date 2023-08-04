#!/bin/bash

curl -O https://dl.google.com/android/repository/sys-img/google_apis_playstore/x86_64-TiramisuPrivacySandbox_r09.zip
curl -O https://dl.google.com/android/repository/emulator-linux_x64-10511200.zip
. ./configure.sh && emu-docker create emulator-linux_x64-10511200.zip x86_64-TiramisuPrivacySandbox_r09.zip
./create_web_container.sh -a -s
