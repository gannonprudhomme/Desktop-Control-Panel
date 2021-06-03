/**
 * Includes all of the properties (I care about) from:
 * https://developers.home-assistant.io/docs/core/entity/light/
 *
 * Note that all of these values are in Mireds
 */
export default interface Light {
  name: string; // friendly name for the light
  brightness: number;
  entityId: string; // ID for this entity. Can also be a group?
  isOn: boolean;
  priority: number; // Sort priority
  colorTemp?: number;
  minMireds?: number; // coldest colorTemp possible for this light
  maxMireds?: number; // warmest colorTemp possible for this light
  // hsColor?: number[]; // hue, saturation
};
