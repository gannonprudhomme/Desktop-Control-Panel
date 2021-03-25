import { html, TemplateResult } from 'lit-element';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import './LightControl';

import icon from '../../res/pause.png';

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
    this.component = (hass: HomeAssistant): TemplateResult => (
      html`
        <light-control .hass=${hass}></light-control>
      `
    );
  }
}
