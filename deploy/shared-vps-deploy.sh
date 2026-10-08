#!/usr/bin/env bash
# Root-owned blue/green driver. Only the validated image request is deploy-writable.
set -Eeuo pipefail

BASE=/srv/scallar/frostwright
export DOCKER_CONFIG="$BASE/.docker"
mkdir -p "$DOCKER_CONFIG"
chmod 700 "$DOCKER_CONFIG"
exec 9>"$BASE/deploy.lock"
flock -x 9

dc() {
  docker compose --project-name frostwright --profile blue --profile green --env-file "$BASE/env/deploy.env" \
    --project-directory "$BASE/compose" -f "$BASE/compose/docker-compose.shared.yml" "$@"
}

case "${1:-}" in
  login) docker login docker.io -u pateldeepesh --password-stdin ;;
  logout) docker logout docker.io ;;
  status)
    if grep -q '^IMAGE=.' "$BASE/env/deploy.env"; then
      printf 'Active slot: %s\n' "$(cat "$BASE/state/active" 2>/dev/null || echo legacy)"
      docker ps --filter label=com.docker.compose.project=frostwright --format '{{.Names}} {{.Image}} {{.Status}}'
    else
      echo 'Frostwright is configured; awaiting the first Docker Hub image.'
    fi
    ;;
  deploy)
    IMAGE="$(cat "$BASE/inbox/requested-image")"
    [[ "$IMAGE" =~ ^docker\.io/pateldeepesh/acrepair:sha-[0-9a-f]{40}$ ]] || { echo 'Invalid immutable image reference' >&2; exit 1; }
    mkdir -p "$BASE/state"
    ACTIVE="$(cat "$BASE/state/active" 2>/dev/null || echo legacy)"
    case "$ACTIVE" in
      blue) TARGET=green ;;
      green|legacy) TARGET=blue ;;
      *) echo 'Invalid active slot' >&2; exit 1 ;;
    esac
    PREVIOUS="$(sed -n 's/^IMAGE=//p' "$BASE/env/deploy.env")"
    docker image inspect "$IMAGE" > /dev/null 2>&1 || docker pull "$IMAGE"
    cp "$BASE/env/deploy.env" "$BASE/state/env.before"
    cp "$BASE/compose/shared-nginx.conf" "$BASE/state/nginx.before"
    EDGE="$(docker ps -q --filter label=com.docker.compose.project=frostwright --filter label=com.docker.compose.service=edge)"
    rollback() {
      local code=$?
      trap - ERR
      set +e
      cat "$BASE/state/nginx.before" > "$BASE/compose/shared-nginx.conf"
      cp "$BASE/state/env.before" "$BASE/env/deploy.env"
      if [[ -n "$EDGE" ]]; then
        docker exec "$EDGE" nginx -t && docker exec "$EDGE" nginx -s reload
      fi
      dc rm -sf "web-$TARGET"
      if [[ "$IMAGE" != "$PREVIOUS" ]]; then docker image rm "$IMAGE" >/dev/null 2>&1; fi
      echo 'Blue/green deployment failed; the previous slot remains active.' >&2
      exit "$code"
    }
    trap rollback ERR
    BLUE_IMAGE="$(sed -n 's/^BLUE_IMAGE=//p' "$BASE/env/deploy.env")"
    GREEN_IMAGE="$(sed -n 's/^GREEN_IMAGE=//p' "$BASE/env/deploy.env")"
    BLUE_IMAGE="${BLUE_IMAGE:-${PREVIOUS:-$IMAGE}}"
    GREEN_IMAGE="${GREEN_IMAGE:-${PREVIOUS:-$IMAGE}}"
    if [[ "$TARGET" == blue ]]; then BLUE_IMAGE="$IMAGE"; else GREEN_IMAGE="$IMAGE"; fi
    printf 'IMAGE=%s\nBLUE_IMAGE=%s\nGREEN_IMAGE=%s\n' "$IMAGE" "$BLUE_IMAGE" "$GREEN_IMAGE" > "$BASE/env/deploy.env.next"
    chmod 600 "$BASE/env/deploy.env.next"
    mv "$BASE/env/deploy.env.next" "$BASE/env/deploy.env"
    dc up -d --wait --wait-timeout 180 "web-$TARGET"
    # Build the live config from a root-owned template, preserving its bind-mounted inode.
    awk -v slot="$TARGET" '
      $1 == "set" && $2 == "$web_upstream" { print "        set $web_upstream frostwright-" slot ":3000;"; next }
      $1 == "set" && $2 == "$frostwright_slot" { print "        set $frostwright_slot " slot ";"; next }
      { print }
    ' "$BASE/compose/shared-nginx.template.conf" > "$BASE/state/nginx.next"
    if [[ -n "$EDGE" ]]; then
      for path in / /robots.txt /sitemap.xml /services/ac-gas-filling; do
        docker exec "$EDGE" wget -q --spider "http://frostwright-$TARGET:3000$path"
      done
    fi
    cat "$BASE/state/nginx.next" > "$BASE/compose/shared-nginx.conf"
    if [[ -z "$EDGE" ]]; then
      dc up -d --wait --wait-timeout 180 edge
      EDGE="$(dc ps -q edge)"
    else
      docker exec "$EDGE" nginx -t
      docker exec "$EDGE" nginx -s reload
    fi
    # Confirm the new worker serves the target slot through the public TLS route before retiring the old one.
    ready=false
    for attempt in {1..20}; do
      if curl -fsS --max-time 10 --resolve frostwright.in:443:127.0.0.1 \
        -D "$BASE/state/headers" -o /dev/null https://frostwright.in/services/ac-gas-filling \
        && grep -qi "^X-Frostwright-Slot: $TARGET" "$BASE/state/headers"; then
        ready=true
        break
      fi
      sleep 1
    done
    [[ "$ready" == true ]]
    printf '%s\n' "$TARGET" > "$BASE/state/active"
    trap - ERR
    if [[ "$ACTIVE" == blue || "$ACTIVE" == green ]]; then
      dc rm -sf "web-$ACTIVE"
    else
      for legacy in $(docker ps -aq --filter label=com.docker.compose.project=frostwright --filter label=com.docker.compose.service=web); do
        docker rm -f "$legacy"
      done
    fi
    # Remove only this app's obsolete images, after the old containers have stopped. Keep the active image ID.
    CURRENT_ID="$(docker image inspect --format '{{.Id}}' "$IMAGE")"
    while IFS= read -r ref; do
      case "$ref" in
        pateldeepesh/acrepair:*|docker.io/pateldeepesh/acrepair:*)
          if [[ "$(docker image inspect --format '{{.Id}}' "$ref")" != "$CURRENT_ID" ]]; then
            docker image rm "$ref"
          fi
          ;;
      esac
    done < <(docker image ls --format '{{.Repository}}:{{.Tag}}')
    rm -f "$BASE/state/env.before" "$BASE/state/nginx.before" "$BASE/state/nginx.next"
    echo "Blue/green switch complete: $ACTIVE -> $TARGET. Obsolete Frostwright images removed."
    docker ps --filter label=com.docker.compose.project=frostwright --format '{{.Names}} {{.Image}} {{.Status}}'
    ;;
  *) echo 'Expected login, logout, deploy or status' >&2; exit 1 ;;
esac
