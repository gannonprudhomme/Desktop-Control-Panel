import { mdiTuneVertical } from '@mdi/js';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import './DesktopProcessesView';

import VolumeProcess from '../../../types/VolumeProcess';
import DCPConfig from '../../../types/Config';

export default class DesktopProcessesModule implements Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant, config: DCPConfig) => TemplateResult;
  active: boolean;

  constructor() {
    this.name = 'Volume Mixer';
    this.icon = mdiTuneVertical;
    this.active = true; // This will change
    this.component = (hass: HomeAssistant, config: DCPConfig): TemplateResult => {
      const { desktop_name: desktopName } = config;

      let procs: VolumeProcess[] | null = null;

      if (desktopName && hass.states[desktopName]) {
        procs = hass.states[desktopName].attributes.processes;
      }

      return html`
        <desktop-processes .hass=${hass} .volumeProcesses=${procs}>
        </desktop-processes>
      `;
    };
  }
}
