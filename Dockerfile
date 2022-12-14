FROM node:18-alpine3.15
WORKDIR /home/node/app
COPY . .
RUN npm install && npm run build
EXPOSE 80
CMD ["./run.sh"]
