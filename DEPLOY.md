# Deploy instructions

- Install docker
- Install pm2
- Create a non-root user 'app' and add it to docker group. Ensure docker works under that user.

## Get cert from letsencrypt

- docker compose up -d websrv-certbot
- docker compose run certbot
- Select 2 (webroot)
- ...
- For webroot enter: /var/www/certbot
- ...
- docker compose down

## Run docker

- docker compose up -d db websrv

# Local deploy

- nx run deploy frontapp
