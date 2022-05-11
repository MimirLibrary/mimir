FROM unrealsolver/library:base AS builder

COPY . .

CMD ["npx", "nx", "build", "frontapp"]

FROM nginx:alpine

EXPOSE 80

COPY --from=builder /usr/src/app/dist/packages/frontapp /usr/share/nginx/html
