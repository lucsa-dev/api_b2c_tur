FROM node:lts-alpine

RUN apk add --no-cache bash
    
RUN npm install

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app