FROM node:16.15.1

RUN apk add git

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]

RUN npm install -g npm@8.11.0

RUN npm install
