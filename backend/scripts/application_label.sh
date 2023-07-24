#!/bin/sh
aapt dump badging ./games/game.apk | grep application-label: | sed -E "s/application-label:'([^']+)'/\1/"
