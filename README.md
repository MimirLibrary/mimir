# Mimir

[![Deploy](https://github.com/iTechLibrary/mimir/actions/workflows/deploy.yml/badge.svg)](https://github.com/iTechLibrary/mimir/actions/workflows/deploy.yml)

This project was generated using [Nx](https://nx.dev).

<p  style="text-align:  center;"><img  src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"  width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## How to run

1. Install dependencies `npm i`
2. Run database: `docker-compose --env-file ./.local.env up -d db`
3. Run migrations `npm run migration:run`
4. Run db seeds `npm run seed:run`
5. Run backend and frontend together: `nx run-many --target serve --projects apiserver,frontapp`

[App](http://localhost:4200/)
[GraphQL Playground](http://localhost:3333/graphql)

## Possible errors

1. **Error:** `docker-compose up -d postgres` throws `open /home/<you>/mimir/..env: no such file or directory`
   **Fix:** write at the end of your `~/.bashrc` file `export NODE_ENV="local"`
2. **Error:** `npm i` can throws `npm ERR! command sh -c node ./bin/init`
   **Fix:** run `npm i -g nx` and run again `npm i`

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)

- `npm install --save-dev @nrwl/react`

- Web (no framework frontends)

- `npm install --save-dev @nrwl/web`

- [Angular](https://angular.io)

- `npm install --save-dev @nrwl/angular`

- [Nest](https://nestjs.com)

- `npm install --save-dev @nrwl/nest`

- [Express](https://expressjs.com)

- `npm install --save-dev @nrwl/express`

- [Node](https://nodejs.org)

- `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@mimir/mylib`.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p  style="text-align:  center;"><img  src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
