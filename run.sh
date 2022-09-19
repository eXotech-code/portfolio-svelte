#!/bin/sh

npm install
npm run build
HOST=127.0.0.1 PORT=80 node build