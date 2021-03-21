export default interface DCPConfig {
  // eslint-disable-next-line camelcase
  spotify_name: string;
  theme: { primary: string, secondary: string };
  modules: Array<string>;
};

// The configs that are passed to use
export interface BaseConfig {
  // stuff I don't care about
  name: string;
  config: DCPConfig;
}
