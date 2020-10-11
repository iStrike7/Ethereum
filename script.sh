#!/bin/bash

gnome-terminal -- ganache-cli

sleep 5

gnome-terminal -- node ./monitor/monitor.js

sleep 5

gnome-terminal -- node ./server/server.js

sleep 5

gnome-terminal -- node ./client/client.js
