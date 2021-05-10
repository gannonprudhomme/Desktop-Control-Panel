export interface LightConfig {
  name: string;
  priority?: number;
}

export default interface DCPConfig {
  // eslint-disable-next-line camelcase
  desktop_name: string;
  // eslint-disable-next-line camelcase
  spotify_name: string;
  // eslint-disable-next-line camelcase
  weather_name: string;
  modules: string[];
  lights: LightConfig[];
};

// The configs that are passed to use
export interface BaseConfig {
  // stuff I don't care about
  name: string;
  config: DCPConfig;
}
