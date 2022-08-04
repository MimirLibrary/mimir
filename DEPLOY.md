# Deploy instructions
- Install docker
- Install pm2
## Get cert from letsencrypt
- docker compose up -d certbot-websrv
- docker compose run certbot
- Select 2 (webroot)
- ...
- Enter /var/www/certbot
- ...
- docker compose down
