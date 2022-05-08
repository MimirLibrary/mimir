FROM unrealsolver/library:base

RUN apk add git

COPY . .

ENV PORT 4200

EXPOSE $PORT

CMD ["npx", "nx", "run", "frontapp:serve-static"]
