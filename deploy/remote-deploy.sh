#!/usr/bin/env bash
# Pulls an image and restarts the stack on the VPS. The CI deploy job pipes this script over SSH; it can also be run
# by hand on the server, e.g. to roll back to an earlier build:
#   cd /opt/frostwright && IMAGE=pateldeepesh/acrepair:sha-<commit> bash remote-deploy.sh
set -euo pipefail

: "${IMAGE:?IMAGE is required (docker.io/pateldeepesh/acrepair:sha-<commit>)}"
DEPLOY_PATH="${DEPLOY_PATH:-/opt/frostwright}"
cd "$DEPLOY_PATH"

# Record the image in .env so later manual `docker compose` commands use the same build.
# Any other settings in .env (such as SITE_DOMAIN) are kept.
touch .env
{ grep -v '^IMAGE=' .env || true; echo "IMAGE=$IMAGE"; } > .env.next
mv .env.next .env

# Tags are per-commit and never change, so an image already on the server (e.g. a rollback) is reused as is.
docker image inspect "$IMAGE" > /dev/null 2>&1 || docker compose pull web
# --wait fails the deploy if the site container does not report healthy.
docker compose up -d --remove-orphans --wait --wait-timeout 180
# Unused images older than 30 days are removed; newer ones stay on disk for instant rollback.
docker image prune -af --filter "until=720h" > /dev/null
docker compose ps
