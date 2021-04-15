import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../../../types/types';
import VolumeProcess from '../../../types/VolumeProcess';
import './VolumeSlider';

// We probably need to get this type from somewhere
export default class VolumeMixer extends LitElement {
  @property({ type: Array }) public hass: HomeAssistant;
  @property({ type: Array }) public volumeProcesses: VolumeProcess[];

  protected render(): TemplateResult {
    const setVolume = (pid: number, volume: number) => {
      this.hass.callService('desktop_processes', 'set_process_volume', { pid, volume });
    };

    const sortedProcs = this.volumeProcesses.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.name.localeCompare(b.name); // ascending (alphabetical)
      }

      return b.priority - a.priority;
    });

    const sliders: TemplateResult[] = sortedProcs.map((proc: VolumeProcess) => {
      const thing = 5;
      return html`
        <volume-slider .volumeProcess=${proc} class="volume-slider" .setVolume=${setVolume} /><volume-slider>
      `;
    });

    return html`
      <div id="volume-mixer">
        ${sliders}
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #volume-mixer {
        display: flex;
        justify-content: flex-start;
        width: calc(100% - 20px);
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
      }
      .volume-slider {
        width: 100%;
        height: 100%;
      }
    `;
  }
}

if (!customElements.get('volume-mixer')) {
  customElements.define('volume-mixer', VolumeMixer);
}
