FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]

RUN npm install -g npm@8.9.0

RUN npm install

COPY . .