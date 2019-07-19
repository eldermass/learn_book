FROM node:10.16.0-alpine

WORKDIR /app

ADD ./server.js /app/server.js
ADD ./package.json /app/package.json
ADD ./node_modules /app/node_modules

RUN npm install

EXPOSE 3000