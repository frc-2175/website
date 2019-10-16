#!/bin/bash
# Install node
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
# Install caddy
curl https://getcaddy.com | bash -s personal

# Clone website
cd /home/ubuntu
git clone https://github.com/frc-2175/website
cd website
npm install

# Set up services
sudo cp server/caddy.service /lib/systemd/system/
sudo cp server/website.service /lib/systemd/system/
sudo systemctl enable caddy
sudo systemctl enable website
sudo reboot
