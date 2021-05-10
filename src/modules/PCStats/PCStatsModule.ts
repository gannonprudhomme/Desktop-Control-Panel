import { html, TemplateResult } from 'lit-element';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import './PCStats';

import icon from '../../res/dial.png';
import PCStatData from '../../../types/PCStats';
import DCPConfig from '../../../types/Config';

// No clue where to derive these from really
const CPU_TEMP_STATE = 'sensor.gannon_sff_amd_ryzen_9_5900x_temperatures_cpu_ccd_average';
const GPU_TEMP_STATE = 'sensor.gannon_sff_nvidia_geforce_rtx_2070_super_temperatures_gpu_core';
const CPU_USAGE_STATE = 'sensor.gannon_sff_amd_ryzen_9_5900x_load_cpu_total';
const GPU_USAGE_STATE = 'sensor.gannon_sff_nvidia_geforce_rtx_2070_super_load_gpu_core';
const MEMORY_USAGE_STATE = 'sensor.gannon_sff_generic_memory_load_memory';

// TODO: Should probably generalize this to MediaPlayerModule???
// but fuck it I only care about Spotify
export default class PCStatsModule implements Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant, config: DCPConfig) => TemplateResult;
  index: number;
  active: boolean;

  constructor(data: { index: number }) {
    const { index = -1 } = data;

    this.name = 'Spotify';
    this.icon = icon;
    this.index = index; // We don't assign this
    this.active = true; // This will change
    this.component = (hass: HomeAssistant): TemplateResult => {
      const pcData: PCStatData = {
        gpuTemp: parseFloat(hass.states[GPU_TEMP_STATE].state),
        cpuTemp: parseFloat(hass.states[CPU_TEMP_STATE].state),
        cpuUsage: parseFloat(hass.states[CPU_USAGE_STATE].state),
        gpuUsage: parseFloat(hass.states[GPU_USAGE_STATE].state),
        memoryUsage: parseFloat(hass.states[MEMORY_USAGE_STATE].state),
      };

      return html`<pc-stats .stats=${pcData}></pc-stats>`;
    };
  }
}
