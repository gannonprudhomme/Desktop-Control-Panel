import './HaIconButton';
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
      { name: 'Spotify', pid: 101, volume: 68, priority: 3 },
      { name: 'Discord', pid: 102, volume: 42, priority: 2 },
      { name: 'Firefox', pid: 103, volume: 24, priority: 1 },
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

const hass: HomeAssistant = {
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
