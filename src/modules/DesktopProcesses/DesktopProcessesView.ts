import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../../../types/types';
import VolumeProcess from '../../../types/VolumeProcess';
import './VolumeSlider';

// We probably need to get this type from somewhere
export default class DesktopProcessesView extends LitElement {
  @property({ type: Array }) public hass: HomeAssistant;
  @property({ type: Array }) public volumeProcesses: VolumeProcess[];

  protected render(): TemplateResult {
    const setVolume = (pid: number, volume: number) => {
      this.hass.callService('desktop_processes', 'set_process_volume', { pid, volume });
    };

    if (!this.volumeProcesses) {
      return html`
        <div class="invalid-entry">
          desktop_name was either not passed or is invalid.
        </div>
      `;
    }

    const sortedProcs = this.volumeProcesses.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.name.localeCompare(b.name); // ascending (alphabetical)
      }

      return b.priority - a.priority;
    });

    const sliders: TemplateResult[] = sortedProcs.map((proc: VolumeProcess) => html`
      <volume-slider .volumeProcess=${proc} class="volume-slider" .setVolume=${setVolume} />
      <volume-slider>
    `);

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
        height: calc(100% - 4px);
        overflow-x: auto;
        overflow-y: hidden;
        margin-bottom: 2px;
      }

      .invalid-entry {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        height: 100%;
      }
    `;
  }
}

if (!customElements.get('desktop-processes')) {
  customElements.define('desktop-processes', DesktopProcessesView);
}
