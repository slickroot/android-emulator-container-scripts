#!/bin/sh
aapt dump badging ./games/game.apk | grep "package: " | sed -E "s/^package: name='([^']+)' .*/\1/"
