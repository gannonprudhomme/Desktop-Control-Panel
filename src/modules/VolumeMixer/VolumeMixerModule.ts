import { html, TemplateResult } from 'lit-element';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import './VolumeMixer';

import icon from '../../res/levels-adjustment.png';
import VolumeProcess from '../../../types/VolumeProcess';
import PANEL_NAME from '../../constants';
import DCPConfig from '../../../types/Config';

export default class VolumeMixerModule implements Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant, config: DCPConfig) => TemplateResult;
  index: number;
  active: boolean;

  constructor(data: { index: number }) {
    const { index = -1 } = data;

    this.name = 'Volume Mixer';
    this.icon = icon;
    this.index = index; // We don't assign this
    this.active = true; // This will change
    this.component = (hass: HomeAssistant, config: DCPConfig): TemplateResult => {
      const desktopName: string = config.desktop_name;

      let procs: VolumeProcess[] = null;

      if (desktopName && hass.states[desktopName]) {
        procs = hass.states[desktopName].attributes.processes;
      }

      return html`
        <volume-mixer .hass=${hass} .volumeProcesses=${procs}></volume-mixer>
      `;
    };
  }
}
