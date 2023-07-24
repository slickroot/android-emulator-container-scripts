#!/bin/sh
adb connect emulator:5555
adb shell monkey -p $1 -c android.intent.category.LAUNCHER 1
