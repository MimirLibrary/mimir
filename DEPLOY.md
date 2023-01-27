# Deploy instructions

- Install docker
- Install pm2
- Create a non-root user 'app' and add it to docker group. Ensure docker works under that user.

# Important facts about prod setup

- All services are placed in `/srv`
- All services are running under `app:app` user:group
- `pm2` is used to run `apiserver` and `metadata`
- `nginx` is used to serce `frontapp`
- `rsync` is used to copy files from any machine to prod

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

## Requirements

- Be sure you have a production `.env`
- `.local.env` or any other env files that may have higher priorities must be temporary disabled/moved

## Frontapp

Clear nx cache (with following command or delete manually):

```
rm -rf ./node_modules/.cache/nx
```

Check .env is up to date

Delete .local.env

To deploy the code, run:

```
nx run frontapp:deploy:production
```

## Apiserver

To deploy the code, run:

```
nx run apiserver:deploy:production
```

Run migrations:
First of all, ssh to prod. Then log into the non-root user:

```
su - app
```

Go to application directory

```
cd ~/mimir
```

Make sure that code version matches one you deployed before:

```
git fetch
git checkout SOME_RELEASE_TAG
```

Make sure that there is a prod `.env` and run this:

```
npm run migration:run
```

Install dependencies:

```
cd /srv/apiserver
npm install
```

Update /home/app/mimir/.env if necessary and restart using command:

```
env-cmd pm2 restart apiserver --update-env
```

If don't need to update .env, restart `pm2` service:

```
pm2 restart apiserver
```

Check status with `pm2 status`

## Metadata service

The steps are basically the same as for `apiserver`, but migration command is different:

```
cd /srv/metadata
npx prisma migration push
```

Also, you'll have to change path to `prisma` config before running the migrate command

## Email service

To deploy the code, run:

```
nx run email-service:deploy:production
```

Install dependencies:

```
cd /srv/email-service
npm install
```

Update /home/app/mimir/.env if necessary and restart using command:

```
env-cmd pm2 restart email --update-env
```

If don't need to update .env, restart `pm2` service:

```
pm2 restart email
```
