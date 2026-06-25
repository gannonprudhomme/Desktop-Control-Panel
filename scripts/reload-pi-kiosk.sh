#!/usr/bin/env bash

set -euo pipefail

PI_HOST="${PI_HOST:-gannon@raspberrypi.local}"
PI_SSH_KEY="${PI_SSH_KEY:-$HOME/.ssh/id_ed25519_raspberrypi}"
PI_DISPLAY="${PI_DISPLAY:-:0}"
PI_XAUTHORITY="${PI_XAUTHORITY:-/home/gannon/.Xauthority}"

if [[ ! -f "$PI_SSH_KEY" ]]; then
  printf 'SSH key not found: %s\n' "$PI_SSH_KEY" >&2
  exit 1
fi

ssh \
  -i "$PI_SSH_KEY" \
  -o BatchMode=yes \
  -o ConnectTimeout=8 \
  "$PI_HOST" \
  bash -s -- "$PI_DISPLAY" "$PI_XAUTHORITY" <<'REMOTE'
set -euo pipefail

export DISPLAY="$1"
export XAUTHORITY="$2"

if ! command -v xdotool >/dev/null 2>&1; then
  printf 'xdotool is not installed on the Pi.\n' >&2
  exit 1
fi

window="$(
  xdotool search --onlyvisible --name 'Home Assistant.*Chromium' 2>/dev/null \
    | head -n 1 \
    || true
)"

if [[ -z "$window" ]]; then
  window="$(
    xdotool search --onlyvisible --class chromium-browser 2>/dev/null \
      | head -n 1 \
      || true
  )"
fi

if [[ -z "$window" ]]; then
  printf 'No visible Chromium window was found on %s.\n' "$DISPLAY" >&2
  exit 1
fi

while IFS= read -r -d '' cache_dir; do
  find "$cache_dir" -mindepth 1 -delete
done < <(
  find \
    "$HOME/.cache/chromium" \
    "$HOME/.config/chromium" \
    -maxdepth 2 \
    -type d \
    \( \
      -name Cache \
      -o -name 'Code Cache' \
      -o -name GPUCache \
      -o -name DawnCache \
      -o -name GrShaderCache \
    \) \
    -print0 \
    2>/dev/null
)

xdotool windowactivate --sync "$window"
xdotool key --window "$window" ctrl+shift+r

printf 'Cleared Chromium caches and hard-reloaded: %s\n' \
  "$(xdotool getwindowname "$window")"
REMOTE
