FROM node:16-alpine3.16

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

COPY package.json ./

RUN npm install

CMD [ "npm", "start" ]