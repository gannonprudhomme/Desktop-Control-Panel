import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import VolumeProcess from '../../../types/VolumeProcess';
import createSlider from '../../Slider';
// We probably need to get this type from somewhere
export default class VolumeSlider extends LitElement {
  @property({ type: Object }) public volumeProcess: VolumeProcess;
  @property({ type: Function }) public setVolume: (pid: number, value: number) => void;

  protected render(): TemplateResult {
    if (!this.volumeProcess) {
      return html`<div> empty </div>`;
    }

    const onChange = (value: number) => {
      // call a service to change the volume
      this.setVolume(this.volumeProcess.pid, value);

      // "Remake" the volumeProcess property, which forces a re-render
      this.volumeProcess = { ...this.volumeProcess, volume: value };
    };

    const url = `/local/icons/${this.volumeProcess.name}.png`;
    return html`
      <div class="volume-slider-container">
        ${createSlider(onChange, null, this.volumeProcess.volume, 0, 100, 'override')}
        <span class="slider-label">
          ${this.volumeProcess.volume}%
        </span>
        <img src=${url} class="slider-icon"></img>
        <span class="process-name-text">
          ${this.volumeProcess.name}
          <!-- ${this.volumeProcess.name.charAt(0) === 'D' ? 'askldfjghkasjodlhgfghsdaf' : null} -->
        </span>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .volume-slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        margin-left: 16px;
      }

      /* Should probably make this always be stuck at the bottom no matter what, but this will work
        since we're using a fixed screen size
      */
      .slider-info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .slider-icon {
        width: 32px;
        height: 32px;
        position: relative;
      }

      .slider-label {
        padding-left: 5px;
        min-width: 34px; /* So the text doesn't shift when it changes digits */
      }

      .slider-container {
        padding: -40% 0;
        width: 0;
        margin-left: -25%;
      }

      .process-name-text {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 6rem;
      }
    `;
  }
}

if (!customElements.get('volume-slider')) {
  customElements.define('volume-slider', VolumeSlider);
}
