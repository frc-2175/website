#!/bin/bash
sudo systemctl stop website
sudo systemctl stop benkins
sudo systemctl stop caddy
cd /home/ubuntu/website
git fetch
git reset --hard origin/master
npm install
node database.js
sudo chown ubuntu:ubuntu database
sudo cp server/caddy.service /lib/systemd/system/
sudo cp server/website.service /lib/systemd/system/
sudo cp server/benkins.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start website
sudo systemctl start benkins
sudo systemctl start caddy
