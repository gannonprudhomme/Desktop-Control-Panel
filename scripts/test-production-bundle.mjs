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
        spotify_name: 'media_player.test',
        weather_name: 'weather.home',
      };
      const createHass = (title) => ({
        states: {
          'media_player.test': entity('media_player.test', 'playing', {
            media_title: title,
            media_artist: 'Bundle Harness',
            media_duration: 120,
            media_position: 15,
            media_position_updated_at: new Date().toISOString(),
          }),
          'weather.home': entity('weather.home', 'sunny', { temperature: 72 }),
        },
        panels: {},
        dockedSidebar: 'always_hidden',
        localize: () => 'Sunny',
        callService: async () => ({ context: { id: 'bundle-test' } }),
        callWS: async () => undefined,
      });
      const panel = { name: 'desktop-control', config };

      const verifyRender = async (element, expectedTitle) => {
        await element.updateComplete;
        const player = element.shadowRoot?.querySelector('music-player');
        await player?.updateComplete;
        const title = player?.shadowRoot?.querySelector('#title')?.textContent;
        if (title !== expectedTitle) {
          throw new Error(\`Expected "\${expectedTitle}", received "\${title}"\`);
        }
      };

      try {
        await import('/dist/desktop-control-panel.js?first');

        const hassFirst = document.createElement('desktop-control');
        document.body.append(hassFirst);
        hassFirst.hass = createHass('Hass First');
        await Promise.resolve();
        hassFirst.panel = panel;
        await verifyRender(hassFirst, 'Hass First');

        const panelFirst = document.createElement('desktop-control');
        document.body.append(panelFirst);
        panelFirst.panel = panel;
        await Promise.resolve();
        panelFirst.hass = createHass('Panel First');
        await verifyRender(panelFirst, 'Panel First');

        hassFirst.hass = createHass('Updated Hass');
        await verifyRender(hassFirst, 'Updated Hass');

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

        await window.dcpWebAwesomeReady;
        for (const name of ['wa-button', 'wa-button-group', 'wa-card', 'wa-slider']) {
          if (!customElements.get(name)) {
            throw new Error(\`\${name} was not registered\`);
          }
        }

        await import('/dist/desktop-control-panel.js?second');

        if (document.head.querySelectorAll('style[data-web-awesome]').length !== 1) {
          throw new Error('Web Awesome styles were injected more than once');
        }

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
