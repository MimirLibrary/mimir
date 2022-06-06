FROM unrealsolver/library:base AS builder

COPY . .

RUN npm i env-cmd

RUN npx env-cmd -f .staging.env npx nx build frontapp

FROM nginx:alpine

EXPOSE 80

COPY --from=builder /usr/src/app/dist/packages/frontapp /usr/share/nginx/html
