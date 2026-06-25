# Local Home Assistant deployment over SSH

Use this workflow only for temporary testing against a local Home Assistant installation. HACS is
the official installation and update path.

## Connection

The deployment command defaults to:

```sh
export HA_HOST=root@homeassistant.local
export HA_SSH_KEY=~/.ssh/id_ecdsa_homeassistant
```

Override `HA_REMOTE_BUNDLE` if the Home Assistant installation uses a different destination.
The Home Assistant host and the Raspberry Pi kiosk display may be separate machines. Deploy the
bundle to the Home Assistant host.

## Deploy

```sh
npm run deploy:ha
```

This type-checks and builds the project, backs up the current remote bundle to
`desktop-control-panel.js.backup`, copies the new bundle, and verifies that the local and remote
SHA-256 checksums match.

```sh
npm run reload:pi
```

The reload command stops the Raspberry Pi Chromium kiosk, clears its HTTP, code, GPU, and service
worker caches, then restarts the same Chromium command. Chromium must be stopped because deleting
cache files while it is running does not evict responses held in memory or open files.

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
