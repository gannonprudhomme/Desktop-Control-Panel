import { html, TemplateResult } from 'lit-element';
import Module from '../../../types/Module';
import { HomeAssistant } from '../../../types/types';
import './PCStats';

import icon from '../../res/dial.png';
import PCStatData from '../../../types/PCStats';
import DCPConfig, { PCStatsConfig } from '../../../types/Config';

function fahrenheitToCelcius(fahrenheit: number): number {
  return (fahrenheit - 32) / 1.8;
}

/**
 * Attempts to parse the state for a given  into a float only if it exists
 * @param id the id
 * @returns the float of the PC Stat or null
 */
function parseStatsFloat(
  hass: HomeAssistant, statsConfig: PCStatsConfig, id: string,
): number | null {
  const entityId = statsConfig[id];

  const entity = hass.states[entityId];
  if (entity) {
    return parseFloat(entity.state);
  }

  return null;
}

// TODO: Make this able to given any type of stat, not just the categories we provide.
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
    this.component = (hass: HomeAssistant, config: DCPConfig): TemplateResult => {
      let pcData: PCStatData = null;
      const statsConfig = config.pc_stats;

      // Assumes we're in fahrenheit (bad assumption)

      if (statsConfig) {
        pcData = {
          gpuTemp: fahrenheitToCelcius(parseStatsFloat(hass, statsConfig, 'gpu_temp')),
          cpuTemp: fahrenheitToCelcius(parseStatsFloat(hass, statsConfig, 'cpu_temp')),
          cpuUsage: parseStatsFloat(hass, statsConfig, 'cpu_usage'),
          gpuUsage: parseStatsFloat(hass, statsConfig, 'gpu_usage'),
          memoryUsage: parseStatsFloat(hass, statsConfig, 'memory_usage'),
        };
      }

      return html`<pc-stats .stats=${pcData}></pc-stats>`;
    };
  }
}
