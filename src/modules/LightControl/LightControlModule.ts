import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { mdiLightbulbOn } from '@mdi/js';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import Light from '../../../types/Light';
import './LightControlView';

import DCPConfig from '../../../types/Config';

export default class LightControlModule implements Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant, config: DCPConfig) => TemplateResult;
  active: boolean;

  constructor() {
    this.name = 'Light Control';
    this.icon = mdiLightbulbOn;
    this.active = true; // This will change
    this.component = (hass: HomeAssistant, config: DCPConfig): TemplateResult => {
      const lightsConfig = config.lights ?? [];

      const lightNamesPriorityMap = new Map<string, number>();
      lightsConfig.forEach((conf) => lightNamesPriorityMap.set(conf.name, conf.priority ?? 0));

      const lights: Light[] = lightsConfig.map(
        (lightConfig) => hass.states[lightConfig.name],
      ).filter((light): light is NonNullable<typeof light> => Boolean(light)).map((light) => {
        const {
          brightness, color_temp, friendly_name, min_mireds, max_mireds,
        } = light.attributes;
        const entityId = light.entity_id;

        // Get the sort priority from the configuration
        const priority = lightNamesPriorityMap.get(entityId) ?? 0;

        // TODO: Check supported features here, probably

        return {
          name: typeof friendly_name === 'string' ? friendly_name : entityId,
          mireds: color_temp,
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
