FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]

RUN npm install

COPY . .

ENV PORT 4200

EXPOSE $PORT

CMD ["npx", "nx", "serve", "frontapp", "--host", "0.0.0.0"]
