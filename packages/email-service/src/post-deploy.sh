#!/bin/sh
set -x
set -e
. ~/.nvm/nvm.sh
cd /srv/email-service
nvm use 16
npm ci
