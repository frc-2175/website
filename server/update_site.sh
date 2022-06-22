#!/bin/bash

sudo systemctl stop website

cd /home/ubuntu/website
git fetch
git reset --hard origin/master
npm install

sudo cp server/benkins.service /lib/systemd/system/
sudo cp server/caddy.service /lib/systemd/system/
sudo cp server/website.service /lib/systemd/system/
sudo cp server/notion-graphviz.service /lib/systemd/system/
sudo systemctl daemon-reload

sudo systemctl start website
sudo systemctl restart notion-graphviz
sudo systemctl restart benkins
sudo systemctl restart caddy
