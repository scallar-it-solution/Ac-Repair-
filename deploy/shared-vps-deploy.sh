#!/usr/bin/env bash
# Root-owned, fixed sudo entry point for the shared VPS. Never source deploy-writable files.
set -euo pipefail

BASE=/srv/scallar/frostwright
export DOCKER_CONFIG="$BASE/.docker"
mkdir -p "$DOCKER_CONFIG"
chmod 700 "$DOCKER_CONFIG"
exec 9>"$BASE/deploy.lock"
flock -x 9

dc() {
  docker compose --project-name frostwright --env-file "$BASE/env/deploy.env" \
    --project-directory "$BASE/compose" -f "$BASE/compose/docker-compose.shared.yml" "$@"
}

case "${1:-}" in
  login) docker login docker.io -u pateldeepesh --password-stdin ;;
  logout) docker logout docker.io ;;
  status)
    if grep -q '^IMAGE=.' "$BASE/env/deploy.env"; then
      dc ps
    else
      echo 'Frostwright is configured; awaiting the first Docker Hub image.'
    fi
    ;;
  deploy)
    IMAGE="$(cat "$BASE/inbox/requested-image")"
    [[ "$IMAGE" =~ ^docker\.io/pateldeepesh/acrepair:sha-[0-9a-f]{40}$ ]] || { echo 'Invalid immutable image reference' >&2; exit 1; }
    PREVIOUS="$(sed -n 's/^IMAGE=//p' "$BASE/env/deploy.env")"
    docker image inspect "$IMAGE" > /dev/null 2>&1 || docker pull "$IMAGE"
    printf 'IMAGE=%s\n' "$IMAGE" > "$BASE/env/deploy.env.next"
    chmod 600 "$BASE/env/deploy.env.next"
    mv "$BASE/env/deploy.env.next" "$BASE/env/deploy.env"
    if ! dc up -d --remove-orphans --wait --wait-timeout 180; then
      if [[ -n "$PREVIOUS" ]]; then
        printf 'IMAGE=%s\n' "$PREVIOUS" > "$BASE/env/deploy.env"
        dc up -d --remove-orphans --wait --wait-timeout 180 || true
      fi
      echo 'Frostwright deploy failed its health check' >&2
      exit 1
    fi
    dc ps
    ;;
  *) echo 'Expected login, logout, deploy or status' >&2; exit 1 ;;
esac
