FROM unrealsolver/library:base

ENV PORT 4200

EXPOSE $PORT

CMD ["npx", "nx", "run", "serve-static", "frontapp", "--host", "0.0.0.0"]
