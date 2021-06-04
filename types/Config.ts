/* eslint-disable camelcase */
export interface LightConfig {
  name: string;
  priority?: number;
}

export interface PCStatsConfig {
  [key: string]: string;
  cpu_temp?: string;
  gpu_temp?: string;
  cpu_usage?: string;
  gpu_usage?: string;
  memory_usage?: string;
}

export default interface DCPConfig {
  desktop_name: string;
  spotify_name: string;
  weather_name: string;
  pi_brightness_name: string;
  pi_power_name: string;
  modules: string[];
  lights: LightConfig[];
  pc_stats: PCStatsConfig;
};

// The configs that are passed to use
export interface BaseConfig {
  // stuff I don't care about
  name: string;
  config: DCPConfig;
}
