#!/bin/bash
cd /home/youruser/kk-dict
git pull origin main

cd frontend
npm install
npm run build

cd ../backend
npm install
pm2 restart kk-backend
