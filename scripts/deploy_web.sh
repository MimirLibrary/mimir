set -xe
cd ~/mimir
git pull
docker-compose down
docker-compose up --build -d
