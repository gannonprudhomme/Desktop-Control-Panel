import '../src/index';
import DCPConfig, { BaseConfig } from '../types/Config';
import { HomeAssistant, ServiceCallResponse } from '../types/types';

interface PreviewElement extends HTMLElement {
  hass?: HomeAssistant;
  narrow?: boolean;
  panel?: BaseConfig;
}

const albumArt = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#00c8c8"/>
        <stop offset="1" stop-color="#3420aa"/>
      </linearGradient>
    </defs>
    <rect width="96" height="96" rx="8" fill="url(#g)"/>
    <circle cx="48" cy="48" r="25" fill="none" stroke="white" stroke-width="4" opacity=".85"/>
    <circle cx="48" cy="48" r="5" fill="white"/>
  </svg>
`)}`;

const mockIcon = (svg: string): string => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const brandIcon = (background: string, foreground: string, path: string): string => mockIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="${background}"/>
    <svg x="10" y="10" width="44" height="44" viewBox="0 0 24 24">
      <path fill="${foreground}" d="${path}"/>
    </svg>
  </svg>
`);

// Brand paths from Simple Icons.
const spotifyIcon = brandIcon(
  '#1ED760',
  '#000000',
  'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
);

const discordIcon = brandIcon(
  '#5865F2',
  '#FFFFFF',
  'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
);

const firefoxIcon = brandIcon(
  '#FF7139',
  '#FFFFFF',
  'M8.824 7.287c.008 0 .004 0 0 0zm-2.8-1.4c.006 0 .003 0 0 0zm16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943.654 1.283 1.033 2.57 1.177 3.53l.002.02c-1.314-3.278-3.544-4.6-5.366-7.477-.091-.147-.184-.292-.273-.446a3.545 3.545 0 01-.13-.24 2.118 2.118 0 01-.172-.46.03.03 0 00-.027-.03.038.038 0 00-.021 0l-.006.001a.037.037 0 00-.01.005L15.624 0c-2.585 1.515-3.657 4.168-3.932 5.856a6.197 6.197 0 00-2.305.587.297.297 0 00-.147.37c.057.162.24.24.396.17a5.622 5.622 0 012.008-.523l.067-.005a5.847 5.847 0 011.957.222l.095.03a5.816 5.816 0 01.616.228c.08.036.16.073.238.112l.107.055a5.835 5.835 0 01.368.211 5.953 5.953 0 012.034 2.104c-.62-.437-1.733-.868-2.803-.681 4.183 2.09 3.06 9.292-2.737 9.02a5.164 5.164 0 01-1.513-.292 4.42 4.42 0 01-.538-.232c-1.42-.735-2.593-2.121-2.74-3.806 0 0 .537-2 3.845-2 .357 0 1.38-.998 1.398-1.287-.005-.095-2.029-.9-2.817-1.677-.422-.416-.622-.616-.8-.767a3.47 3.47 0 00-.301-.227 5.388 5.388 0 01-.032-2.842c-1.195.544-2.124 1.403-2.8 2.163h-.006c-.46-.584-.428-2.51-.402-2.913-.006-.025-.343.176-.389.206-.406.29-.787.616-1.136.974-.397.403-.76.839-1.085 1.303a9.816 9.816 0 00-1.562 3.52c-.003.013-.11.487-.19 1.073-.013.09-.026.181-.037.272a7.8 7.8 0 00-.069.667l-.002.034-.023.387-.001.06C.386 18.795 5.593 24 12.016 24c5.752 0 10.527-4.176 11.463-9.661.02-.149.035-.298.052-.448.232-1.994-.025-4.09-.753-5.844z',
);

const entity = (
  entityId: string,
  state: string,
  attributes: Record<string, unknown>,
): unknown => ({
  entity_id: entityId,
  state,
  attributes,
  last_changed: new Date().toISOString(),
  last_updated: new Date().toISOString(),
  context: { id: `preview-${entityId}`, parent_id: null, user_id: null },
});

const states = {
  'weather.home': entity('weather.home', 'sunny', { temperature: 72 }),
  'media_player.spotify_preview': entity('media_player.spotify_preview', 'playing', {
    media_title: 'Midnight Circuit',
    media_artist: 'Local Preview',
    entity_picture: albumArt,
  }),
  'sensor.desktop_processes': entity('sensor.desktop_processes', 'online', {
    processes: [
      { name: 'Spotify', pid: 101, volume: 68, priority: 3, iconUrl: spotifyIcon },
      { name: 'Discord', pid: 102, volume: 42, priority: 2, iconUrl: discordIcon },
      { name: 'Firefox', pid: 103, volume: 24, priority: 1, iconUrl: firefoxIcon },
    ],
  }),
  'light.desk': entity('light.desk', 'on', {
    friendly_name: 'Desk Lamp',
    brightness: 204,
    color_temp: 300,
    min_mireds: 153,
    max_mireds: 500,
  }),
  'light.corner': entity('light.corner', 'on', {
    friendly_name: 'Corner Lamp',
    brightness: 128,
    color_temp: 370,
    min_mireds: 153,
    max_mireds: 500,
  }),
  'sensor.cpu_temp': entity('sensor.cpu_temp', '140', {}),
  'sensor.gpu_temp': entity('sensor.gpu_temp', '131', {}),
  'sensor.cpu_usage': entity('sensor.cpu_usage', '37', {}),
  'sensor.gpu_usage': entity('sensor.gpu_usage', '62', {}),
  'sensor.memory_usage': entity('sensor.memory_usage', '54', {}),
  'sensor.screen_brightness': entity('sensor.screen_brightness', '78', {}),
  'sensor.screen_power': entity('sensor.screen_power', 'True', {}),
};

const config: DCPConfig = {
  desktop_name: 'sensor.desktop_processes',
  spotify_name: 'media_player.spotify_preview',
  weather_name: 'weather.home',
  pi_brightness_name: 'sensor.screen_brightness',
  pi_power_name: 'sensor.screen_power',
  modules: ['desktop_processes', 'light_control', 'pc_stats', 'rpi_backlight'],
  lights: [
    { name: 'light.desk', priority: 2 },
    { name: 'light.corner', priority: 1 },
  ],
  pc_stats: {
    cpu_temp: 'sensor.cpu_temp',
    gpu_temp: 'sensor.gpu_temp',
    cpu_usage: 'sensor.cpu_usage',
    gpu_usage: 'sensor.gpu_usage',
    memory_usage: 'sensor.memory_usage',
  },
};

let hass: HomeAssistant = {
  states: states as HomeAssistant['states'],
  panels: {},
  dockedSidebar: 'always_hidden',
  localize: (_key: string): string => 'Sunny',
  callService: async (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<ServiceCallResponse> => {
    console.info('[preview service]', domain, service, serviceData);

    if (domain === 'media_player' && service === 'media_play_pause') {
      const mediaPlayer = hass.states[config.spotify_name];
      const nextState = mediaPlayer.state === 'playing' ? 'paused' : 'playing';

      hass = {
        ...hass,
        states: {
          ...hass.states,
          [config.spotify_name]: {
            ...mediaPlayer,
            state: nextState,
          },
        },
      };
      app.hass = hass;
    }

    return { context: { id: `preview-${Date.now()}` } };
  },
  callWS: async <T>(): Promise<T> => Promise.resolve(undefined as T),
};

const panel: BaseConfig = {
  name: 'desktop-control',
  config,
};

const app = document.querySelector<PreviewElement>('desktop-control');

if (!app) {
  throw new Error('desktop-control preview element was not found');
}

app.hass = hass;
app.narrow = false;
app.panel = panel;
