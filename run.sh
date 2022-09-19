#!/bin/sh

npm install
npm run build
HOST=0.0.0.0 PORT=80 node build