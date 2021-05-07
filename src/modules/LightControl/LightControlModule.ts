import { html, TemplateResult } from 'lit-element';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import Light, { LightConfig } from '../../../types/Light';
import './LightControl';

import icon from '../../res/light-bulb.png';
import PANEL_NAME from '../../constants';

export default class LightControlModule implements Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant) => TemplateResult;
  index: number;
  active: boolean;

  constructor(data: { index: number }) {
    const { index = -1 } = data;

    this.name = 'Light Control';
    this.icon = icon;
    this.index = index; // We don't assign this
    this.active = true; // This will change
    this.component = (hass: HomeAssistant): TemplateResult => {
      const lightsConfig: LightConfig[] = hass.panels[PANEL_NAME].config.lights;

      const lightNamesPriorityMap = new Map<string, number>();
      lightsConfig.forEach((config) => lightNamesPriorityMap.set(config.name, config.priority));

      const lights: Light[] = lightsConfig.map(
        (lightConfig) => hass.states[lightConfig.name],
      ).map((light) => {
        const {
          // eslint-disable-next-line camelcase
          brightness, color_temp, friendly_name, min_mireds, max_mireds,
        } = light.attributes;
        const entityId = light.entity_id;

        // Get the sort priority from the configuration
        const priority = lightNamesPriorityMap.get(entityId) ?? 0;

        // TODO: Check supported features here, probably

        return {
          name: friendly_name,
          colorTemp: color_temp,
          isOn: light.state === 'on',
          minMireds: min_mireds,
          maxMireds: max_mireds,
          brightness,
          entityId,
          priority,
        };
      });

      // Sort the lights based on priority, descending
      lights.sort((a, b) => b.priority - a.priority);

      return html`
        <light-control .hass=${hass} .lights=${lights}></light-control>
      `;
    };
  }
}
