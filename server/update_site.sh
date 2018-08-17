#!/bin/bash
sudo systemctl stop website
cd /home/ubuntu/website
sudo git reset --hard
sudo git pull
yarn install
sudo systemctl start website
