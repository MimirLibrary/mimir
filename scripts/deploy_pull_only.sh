set -xe
cd ~/mimir
git pull
screen -r
PID=$!
sleep 2
kill -INT -$PID
npx nx run-many --target build --projects apisever,frontapp
docker-compose up -d
npx nx serve apiserver
