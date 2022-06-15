set -xe
cd ~/mimir
git pull # pull main
npx nx affected --target build --projects apisever,frontapp --base=main~1 --head=main # rn build only on affected projects
docker-compose restart
