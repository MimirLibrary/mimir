FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]

RUN npm install

COPY . .

CMD ["npx", "nx", "serve", "apiserver"]
