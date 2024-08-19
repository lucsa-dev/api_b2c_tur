FROM node:20

RUN npm cache clean --force && rm -rf node_modules package-lock.json
    
RUN npm install

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app