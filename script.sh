#!/bin/bash

gnome-terminal -- ganache-cli

sleep 5

gnome-terminal -- node monitor.js

sleep 5

gnome-terminal -- node server.js

sleep 5

gnome-terminal -- node client.js
