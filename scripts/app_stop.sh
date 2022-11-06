#!/bin/bash
echo 'Stopping apache server...'
sudo systemctl stop apache2.service
sudo chown -R ubuntu mv-unisolve-fe
