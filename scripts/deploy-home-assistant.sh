#!/usr/bin/env bash

set -euo pipefail

HA_HOST="${HA_HOST:-root@homeassistant.local}"
HA_SSH_KEY="${HA_SSH_KEY:-$HOME/.ssh/id_ecdsa_homeassistant}"
HA_REMOTE_BUNDLE="${HA_REMOTE_BUNDLE:-/homeassistant/www/community/Desktop-Control-Panel/desktop-control-panel.js}"
LOCAL_BUNDLE="${LOCAL_BUNDLE:-dist/desktop-control-panel.js}"

if [[ ! -f "$HA_SSH_KEY" ]]; then
  printf 'SSH key not found: %s\n' "$HA_SSH_KEY" >&2
  exit 1
fi

npx tsc --noEmit
npm run build

if [[ ! -f "$LOCAL_BUNDLE" ]]; then
  printf 'Built bundle not found: %s\n' "$LOCAL_BUNDLE" >&2
  exit 1
fi

ssh_options=(
  -i "$HA_SSH_KEY"
  -o IdentitiesOnly=yes
  -o BatchMode=yes
  -o ConnectTimeout=8
)

ssh "${ssh_options[@]}" "$HA_HOST" bash -s -- "$HA_REMOTE_BUNDLE" <<'REMOTE'
set -euo pipefail

remote_bundle="$1"
mkdir -p "$(dirname "$remote_bundle")"

if [[ -f "$remote_bundle" ]]; then
  cp "$remote_bundle" "$remote_bundle.backup"
  printf 'Backed up remote bundle: %s.backup\n' "$remote_bundle"
fi
REMOTE

scp "${ssh_options[@]}" "$LOCAL_BUNDLE" "$HA_HOST:$HA_REMOTE_BUNDLE"

local_hash="$(shasum -a 256 "$LOCAL_BUNDLE" | awk '{print $1}')"
remote_hash="$(
  ssh "${ssh_options[@]}" "$HA_HOST" \
    "sha256sum '$HA_REMOTE_BUNDLE'" \
    | awk '{print $1}'
)"

if [[ "$local_hash" != "$remote_hash" ]]; then
  printf 'Checksum mismatch after deployment.\nLocal:  %s\nRemote: %s\n' \
    "$local_hash" \
    "$remote_hash" >&2
  exit 1
fi

printf 'Deployed Home Assistant bundle: %s\nSHA-256: %s\n' \
  "$HA_REMOTE_BUNDLE" \
  "$local_hash"
