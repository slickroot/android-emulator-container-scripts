#!/bin/bash
adb shell "pm list packages -3" | sed -e "s/package://" | while read -r package; do adb shell am force-stop $package; done
