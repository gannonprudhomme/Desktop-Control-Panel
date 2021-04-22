import { html, TemplateResult } from 'lit-element';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import Light from '../../../types/Light';
import './LightControl';

import icon from '../../res/light-bulb.png';

function miredToKelvin(mired: number): number {
  return Math.floor(1000000 / mired);
}

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
      // TODO: Need to pass in lights
      const LIGHT_NAMES = ['light.end_lamp'];
      const lights: Light[] = LIGHT_NAMES.map((name) => hass.states[name]).map((light) => {
        const {
          // eslint-disable-next-line camelcase
          brightness, color_temp, friendly_name, min_mireds, max_mireds,
        } = light.attributes;
        const entityId = light.entity_id;

        // TODO: Check supported features here, probably

        return {
          name: friendly_name,
          colorTemp: miredToKelvin(color_temp),
          isOn: light.state === 'on',
          maxTemp: miredToKelvin(min_mireds),
          minTemp: miredToKelvin(max_mireds),
          brightness,
          entityId,
        };
      });

      return html`
        <light-control .hass=${hass} .lights=${lights}></light-control>
      `;
    };
  }
}
