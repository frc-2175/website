#!/bin/bash
# Install node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
# Install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
# Install caddy
curl https://getcaddy.com | bash -s personal

# Clone website
cd /home/ubuntu
git clone https://github.com/frc-2175/website
cd website
yarn install

# Set up services
sudo cp server/caddy.service /lib/systemd/system/
sudo cp server/website.service /lib/systemd/system/
sudo systemctl enable caddy
sudo systemctl enable website
sudo reboot
