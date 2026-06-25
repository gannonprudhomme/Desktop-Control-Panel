# Local Home Assistant deployment over SSH

Use this workflow only for temporary testing against a local Home Assistant installation. HACS is
the official installation and update path.

## Connection

Set the SSH connection details for a Home Assistant OS SSH add-on:

```sh
export HA_HOST=root@homeassistant.local
export HA_SSH_KEY=~/.ssh/id_homeassistant
```

The Home Assistant host and the Raspberry Pi kiosk display may be separate machines. Deploy the
bundle to the Home Assistant host.

## Build

```sh
npx tsc --noEmit
npm run build
```

## Back up and copy

```sh
ssh -i "$HA_SSH_KEY" "$HA_HOST" \
  'cp /homeassistant/www/community/Desktop-Control-Panel/desktop-control-panel.js \
      /homeassistant/www/community/Desktop-Control-Panel/desktop-control-panel.js.backup'

scp -i "$HA_SSH_KEY" \
  dist/desktop-control-panel.js \
  "$HA_HOST":/homeassistant/www/community/Desktop-Control-Panel/desktop-control-panel.js
```

## Verify

Confirm that the local and remote checksums match:

```sh
shasum -a 256 dist/desktop-control-panel.js
ssh -i "$HA_SSH_KEY" "$HA_HOST" \
  'sha256sum /homeassistant/www/community/Desktop-Control-Panel/desktop-control-panel.js'
```

The panel entry in `/homeassistant/configuration.yaml` should use:

```yaml
module_url: /hacsfiles/Desktop-Control-Panel/desktop-control-panel.js
```

If the filename or `module_url` changed, validate and restart Home Assistant:

```sh
ssh -i "$HA_SSH_KEY" "$HA_HOST" 'ha core check && ha core restart'
```

For a same-path bundle replacement, a restart is normally unnecessary. Reload with browser caching
disabled. If Home Assistant still serves a stale module, deploy under a new filename and update
`module_url`; changing the panel page's query string does not reliably invalidate the imported
script.

## Rollback

```sh
ssh -i "$HA_SSH_KEY" "$HA_HOST" \
  'cp /homeassistant/www/community/Desktop-Control-Panel/desktop-control-panel.js.backup \
      /homeassistant/www/community/Desktop-Control-Panel/desktop-control-panel.js'
```

Installing or updating through HACS overwrites an SSH-deployed development bundle and restores
HACS's recorded version.
