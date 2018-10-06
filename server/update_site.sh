#!/bin/bash
sudo systemctl stop website
sudo systemctl stop caddy
cd /home/ubuntu/website
sudo git reset --hard
sudo git pull
yarn install
sudo cp server/caddy.service /lib/systemd/system/
sudo cp server/website.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start website
sudo systemctl start caddy
