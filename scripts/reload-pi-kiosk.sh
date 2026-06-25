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

chromium_pid="$(
  pgrep -u "$USER" -o -f \
    '/(chromium|chrome)( |$).*--start-(fullscreen|maximized)' \
    || true
)"

if [[ -z "$chromium_pid" ]]; then
  printf 'No Chromium kiosk process was found for %s.\n' "$USER" >&2
  exit 1
fi

chromium_command_line="$(tr '\0' ' ' < "/proc/$chromium_pid/cmdline")"
kiosk_url="${chromium_command_line% }"
kiosk_url="${kiosk_url##* }"

if [[ "$chromium_command_line" == *--start-maximized* ]]; then
  chromium_window_mode=--start-maximized
else
  chromium_window_mode=--start-fullscreen
fi

if command -v chromium-browser >/dev/null 2>&1; then
  chromium_launcher=chromium-browser
elif command -v chromium >/dev/null 2>&1; then
  chromium_launcher=chromium
else
  printf 'No Chromium launcher was found on the Pi.\n' >&2
  exit 1
fi

if [[ -z "$kiosk_url" || "$kiosk_url" == -* ]]; then
  printf 'Could not determine the kiosk URL from Chromium.\n' >&2
  exit 1
fi

kill -TERM "$chromium_pid"
sleep 1

# Stop any remaining Chromium child processes so every cache file is released.
# Deleting open cache files does not evict responses held in memory.
pkill -KILL -u "$USER" -f '/(chromium|chrome)( |$)' 2>/dev/null || true
sleep 0.2

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
      -o -name 'Service Worker' \
    \) \
    -print0 \
    2>/dev/null
)

nohup "$chromium_launcher" "$chromium_window_mode" "$kiosk_url" \
  >"$HOME/.cache/desktop-control-panel-chromium.log" 2>&1 </dev/null &

for _ in {1..300}; do
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

  if [[ -n "$window" ]]; then
    printf 'Restarted Chromium with cleared caches: %s\n' \
      "$(xdotool getwindowname "$window")"
    exit 0
  fi

  sleep 0.1
done

printf 'Chromium restarted, but no visible kiosk window appeared on %s.\n' \
  "$DISPLAY" >&2
printf 'Check %s for launch errors.\n' \
  "$HOME/.cache/desktop-control-panel-chromium.log" >&2
exit 1
REMOTE
