FROM unrealsolver/library:base

RUN apk add git

COPY . .

CMD ["npx", "nx", "build", "frontapp"]
