set -xe
cd ~/mimir
ssh -vT git@github.com
git pull
docker-compose down
docker-compose up --build -d
