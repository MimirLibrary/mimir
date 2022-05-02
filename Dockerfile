FROM node:16-alpine3.14

ENV PORT=4200

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]

RUN npm install

COPY . .

RUN nx build --prod
CMD nx serve apiserver
