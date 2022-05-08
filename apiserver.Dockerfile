FROM unrealsolver/library:base

COPY . .

CMD ["npx", "nx", "serve", "apiserver"]
