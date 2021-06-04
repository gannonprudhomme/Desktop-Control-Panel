import { html, TemplateResult } from 'lit-element';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import './TabletControlView';

import icon from '../../res/settings.png';
import DCPConfig from '../../../types/Config';
import RaspberryPi from '../../../types/RaspberryPi';

export default class TabletControlModule implements Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant, config: DCPConfig) => TemplateResult;
  active: boolean;

  constructor() {
    this.name = 'Volume Mixer';
    this.icon = icon;
    this.active = true; // This will change
    this.component = (hass: HomeAssistant, config: DCPConfig): TemplateResult => {
      const piBrightnessName = config.pi_brightness_name;
      const piPowerName = config.pi_power_name;

      const pi: RaspberryPi = { power: null, brightness: null };

      if (piBrightnessName) {
        const brightnessState = hass.states[piBrightnessName];
        if (typeof brightnessState !== 'undefined' && brightnessState.state !== 'unavailable') {
          pi.brightness = parseInt(brightnessState.state, 10);
        }
      }

      if (piPowerName) {
        const powerState = hass.states[piPowerName];
        if (typeof powerState !== 'undefined' && powerState.state !== 'unavailable') {
          pi.power = powerState.state === 'True';
        }
      }

      return html`
        <tablet-control .hass=${hass} .raspberryPi=${pi}>
        </tablet-control>
      `;
    };
  }
}
