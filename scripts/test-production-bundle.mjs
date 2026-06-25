import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, '..');
const harnessDirectory = join(projectRoot, '.context/production-harness');
const harnessPath = join(harnessDirectory, 'index.html');
const chromePath = process.env.CHROME_PATH
  ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const harness = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Production bundle test</title></head>
  <body data-status="running">
    <script type="module">
      const entity = (entityId, state, attributes) => ({
        entity_id: entityId,
        state,
        attributes,
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        context: { id: entityId, parent_id: null, user_id: null },
      });
      const config = {
        spotifyplus_name: 'media_player.test',
        weather_name: 'weather.home',
      };
      const serviceCalls = [];
      const createHass = (title, mediaOverrides = {}) => ({
        states: {
          'media_player.test': entity('media_player.test', 'playing', {
            media_title: title,
            media_artist: 'Bundle Harness',
            media_duration: 120,
            media_position: 15,
            media_position_updated_at: new Date().toISOString(),
            ...mediaOverrides,
          }),
          'weather.home': entity('weather.home', 'sunny', { temperature: 72 }),
        },
        panels: {},
        dockedSidebar: 'always_hidden',
        localize: () => 'Sunny',
        callService: async (domain, service, serviceData, _target, _notifyOnError, returnResponse) => {
          serviceCalls.push({ domain, service, serviceData });
          if (
            domain === 'spotifyplus'
            && service === 'get_player_playback_state'
            && returnResponse
          ) {
            return {
              context: { id: 'bundle-test' },
              response: {
                result: {
                  is_playing: true,
                  progress_ms: 15000,
                  item: {
                    name: title,
                    uri: 'spotify:track:test',
                    duration_ms: 120000,
                    artists: [{ name: 'Bundle Harness' }],
                    album: { images: [] },
                  },
                },
              },
            };
          }
          if (
            domain === 'spotifyplus'
            && service === 'get_player_recent_tracks'
            && returnResponse
          ) {
            const callNumber = serviceCalls.filter((call) => (
              call.domain === 'spotifyplus' && call.service === 'get_player_recent_tracks'
            )).length;
            return {
              context: { id: 'bundle-test' },
              response: {
                result: {
                  items: [{
                    track: {
                      name: \`Recent Harness Track \${callNumber}\`,
                      uri: 'spotify:track:recent',
                      artists: [{ name: 'Bundle Harness' }],
                    },
                  }],
                },
              },
            };
          }
          if (
            domain === 'spotifyplus'
            && service === 'get_player_queue_info'
            && returnResponse
          ) {
            const callNumber = serviceCalls.filter((call) => (
              call.domain === 'spotifyplus' && call.service === 'get_player_queue_info'
            )).length;
            return {
              context: { id: 'bundle-test' },
              response: {
                result: {
                  queue: [{
                    name: \`Queue Harness Track \${callNumber}\`,
                    uri: 'spotify:track:queue',
                    artists: [{ name: 'Bundle Harness' }],
                  }],
                },
              },
            };
          }
          return { context: { id: 'bundle-test' } };
        },
        callWS: async () => undefined,
      });
      const panel = { name: 'desktop-control', config };
      const setStage = (stage) => { document.body.dataset.stage = stage; };

      const verifyRender = async (element, expectedTitle) => {
        setStage(\`verify-\${expectedTitle}-element\`);
        await element.updateComplete;
        const player = element.shadowRoot?.querySelector('music-player');
        setStage(\`verify-\${expectedTitle}-player\`);
        await player?.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));
        await player?.updateComplete;
        const title = player?.shadowRoot?.querySelector('#title')?.textContent;
        if (title !== expectedTitle) {
          throw new Error(\`Expected "\${expectedTitle}", received "\${title}"\`);
        }
      };

      try {
        setStage('import-first');
        await import('/dist/desktop-control-panel.js?first');

        setStage('hass-first');
        const hassFirst = document.createElement('desktop-control');
        document.body.append(hassFirst);
        hassFirst.hass = createHass('Hass First');
        await Promise.resolve();
        hassFirst.panel = panel;
        await verifyRender(hassFirst, 'Hass First');

        setStage('panel-first');
        const panelFirst = document.createElement('desktop-control');
        document.body.append(panelFirst);
        panelFirst.panel = panel;
        await Promise.resolve();
        panelFirst.hass = createHass('Panel First');
        await verifyRender(panelFirst, 'Panel First');

        setStage('updated-hass');
        hassFirst.hass = createHass('Updated Hass');
        await verifyRender(hassFirst, 'Hass First');
        const refreshPlayer = hassFirst.shadowRoot?.querySelector('music-player');
        const refreshButton = refreshPlayer?.shadowRoot?.querySelector('.play-button');
        if (!(refreshButton instanceof HTMLButtonElement)) {
          throw new Error('Music player refresh control was not rendered');
        }
        refreshButton.click();
        await new Promise((resolve) => setTimeout(resolve, 600));
        await verifyRender(hassFirst, 'Updated Hass');

        setStage('media-lists');
        const recentMedia = hassFirst.shadowRoot?.querySelector('recent-media');
        await recentMedia?.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));
        await recentMedia?.updateComplete;
        const recentTab = [...(recentMedia?.shadowRoot?.querySelectorAll('.tab') ?? [])]
          .find((tab) => tab.textContent?.trim() === 'Recents');
        const recentCallsBefore = serviceCalls.filter(({ domain, service }) => (
          domain === 'spotifyplus' && service === 'get_player_recent_tracks'
        )).length;

        if (!(recentTab instanceof HTMLButtonElement)) {
          throw new Error('Recents tab was not rendered');
        }

        recentTab.click();
        await new Promise((resolve) => setTimeout(resolve, 0));
        await recentMedia?.updateComplete;

        const recentCallsAfter = serviceCalls.filter(({ domain, service }) => (
          domain === 'spotifyplus' && service === 'get_player_recent_tracks'
        )).length;
        const recentTitle = recentMedia?.shadowRoot?.querySelector('.track-title')?.textContent;

        if (recentCallsAfter !== recentCallsBefore + 1) {
          throw new Error('Switching to Recents did not refresh the list');
        }
        if (recentTitle !== \`Recent Harness Track \${recentCallsAfter}\`) {
          throw new Error(\`Expected refreshed recent track, received "\${recentTitle}"\`);
        }

        const queueTab = [...(recentMedia?.shadowRoot?.querySelectorAll('.tab') ?? [])]
          .find((tab) => tab.textContent?.trim() === 'Queue');
        if (!(queueTab instanceof HTMLButtonElement)) {
          throw new Error('Queue tab was not rendered');
        }

        const queueCallsBefore = serviceCalls.filter(({ domain, service }) => (
          domain === 'spotifyplus' && service === 'get_player_queue_info'
        )).length;

        queueTab.click();
        await new Promise((resolve) => setTimeout(resolve, 0));
        await recentMedia?.updateComplete;

        const queueCallsAfter = serviceCalls.filter(({ domain, service }) => (
          domain === 'spotifyplus' && service === 'get_player_queue_info'
        )).length;
        const queueTitle = recentMedia?.shadowRoot?.querySelector('.track-title')?.textContent;
        if (queueCallsAfter !== queueCallsBefore + 1) {
          throw new Error('Switching to Queue did not refresh the list');
        }
        if (queueTitle !== \`Queue Harness Track \${queueCallsAfter}\`) {
          throw new Error(\`Expected refreshed queue track, received "\${queueTitle}"\`);
        }

        setStage('timeline');
        const player = hassFirst.shadowRoot?.querySelector('music-player');
        const progress = player?.shadowRoot?.querySelector('#progress');
        const progressControl = player?.shadowRoot?.querySelector('#progress-control');
        const elapsedTime = player?.shadowRoot?.querySelector('#elapsed-time');

        if (!(progress instanceof HTMLInputElement) || !progressControl || !elapsedTime) {
          throw new Error('Music player timeline controls were not rendered');
        }

        progress.value = '60';
        progress.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

        if (progressControl.style.getPropertyValue('--progress') !== '50%') {
          throw new Error('Scrubbing did not update the visual timeline');
        }
        if (elapsedTime.textContent !== '1:00') {
          throw new Error('Scrubbing did not update the elapsed timestamp');
        }

        progress.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        progress.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        await Promise.resolve();

        const seekCalls = serviceCalls.filter(({ domain, service }) => (
          domain === 'media_player' && service === 'media_seek'
        ));
        if (seekCalls.length !== 1 || seekCalls[0].serviceData.seek_position !== 60) {
          throw new Error('Timeline seek did not dispatch exactly one media_seek call');
        }

        hassFirst.hass = createHass('Updated Hass', {
          media_position: 60,
          media_position_updated_at: new Date().toISOString(),
        });
        await verifyRender(hassFirst, 'Updated Hass');

        const updatedPosition = Number(progress.value);
        if (updatedPosition < 60 || updatedPosition > 61) {
          throw new Error(\`Timeline did not resume after seeking: \${updatedPosition}\`);
        }

        setStage('unavailable');
        const unavailable = document.createElement('desktop-control');
        document.body.append(unavailable);
        unavailable.hass = createHass('Unused');
        unavailable.panel = { name: 'desktop-control', config: {} };
        await unavailable.updateComplete;
        const unavailablePlayer = unavailable.shadowRoot?.querySelector('music-player');
        await unavailablePlayer?.updateComplete;
        if (!unavailablePlayer?.shadowRoot?.textContent?.includes('Media player unavailable')) {
          throw new Error('Missing optional configuration did not render an unavailable state');
        }

        setStage('webawesome');
        await window.dcpWebAwesomeReady;
        for (const name of ['wa-button', 'wa-button-group', 'wa-card', 'wa-slider']) {
          if (!customElements.get(name)) {
            throw new Error(\`\${name} was not registered\`);
          }
        }

        setStage('import-second');
        await import('/dist/desktop-control-panel.js?second');

        if (document.head.querySelectorAll('style[data-web-awesome]').length !== 1) {
          throw new Error('Web Awesome styles were injected more than once');
        }

        setStage('complete');
        document.body.dataset.status = 'pass';
      } catch (error) {
        document.body.dataset.status = 'fail';
        document.body.dataset.error = error instanceof Error ? error.message : String(error);
      }
    </script>
  </body>
</html>`;

await mkdir(harnessDirectory, { recursive: true });
await writeFile(harnessPath, harness);

const requests = [];
const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
]);

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  requests.push(url.pathname);

  const relativePath = url.pathname === '/'
    ? '.context/production-harness/index.html'
    : url.pathname.slice(1);
  const filePath = resolve(projectRoot, relativePath);

  if (!filePath.startsWith(projectRoot)) {
    response.writeHead(403).end();
    return;
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes.get(extname(filePath)) ?? 'application/octet-stream',
    });
    response.end(body);
  } catch {
    response.writeHead(404).end();
  }
});

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
const address = server.address();

if (!address || typeof address === 'string') {
  server.close();
  throw new Error('Could not determine production harness port');
}

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--virtual-time-budget=5000',
  '--dump-dom',
  `http://127.0.0.1:${address.port}/`,
]);

let output = '';
let errors = '';
chrome.stdout.setEncoding('utf8');
chrome.stderr.setEncoding('utf8');
chrome.stdout.on('data', (chunk) => { output += chunk; });
chrome.stderr.on('data', (chunk) => { errors += chunk; });

const exitCode = await new Promise((resolveExit) => chrome.on('close', resolveExit));
server.close();

if (exitCode !== 0 || !output.includes('data-status="pass"')) {
  throw new Error(`Production bundle harness failed.\n${output}\n${errors}`);
}

const unexpectedAssets = requests.filter(
  (request) => request.startsWith('/dist/')
    && !request.startsWith('/dist/desktop-control-panel.js'),
);

if (unexpectedAssets.length > 0) {
  throw new Error(`Production bundle requested unexpected assets: ${unexpectedAssets.join(', ')}`);
}

console.log('Production bundle harness passed');
