FROM unrealsolver/library:base

COPY . .

CMD ["npx", "nx", "build", "apiserver"]
