FROM unrealsolver/library:base AS builder

COPY . .

FROM nginx:alpine

EXPOSE 80

COPY --from=builder /usr/src/app/dist/packages/frontapp /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
