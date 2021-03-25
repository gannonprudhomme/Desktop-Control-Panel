import { html, TemplateResult } from 'lit-element';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import './VolumeMixer';

import icon from '../../res/levels-adjustment.png';

export default class VolumeMixerModule implements Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant) => TemplateResult;
  index: number;
  active: boolean;

  constructor(data: { index: number }) {
    const { index = -1 } = data;

    this.name = 'Volume Mixer';
    this.icon = icon;
    this.index = index; // We don't assign this
    this.active = true; // This will change
    this.component = (hass: HomeAssistant): TemplateResult => (
      html`
        <volume-mixer .hass=${hass}></volume-mixer>
      `
    );
  }
}
