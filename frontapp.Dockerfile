FROM unrealsolver/library:base

RUN apk add git

ENV PORT 4200

EXPOSE $PORT

CMD ["npx", "nx", "run", "frontapp:serve-static", "--host", "0.0.0.0"]
