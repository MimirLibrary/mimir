FROM unrealsolver/library:base

ENV PORT 4200

EXPOSE $PORT

CMD ["npx", "nx", "serve", "frontapp", "--host", "0.0.0.0"]
