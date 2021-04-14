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
      this.volumeProcess = { ...this.volumeProcess, volume: value };
    };

    const rootUrl = 'http://localhost:8123/local/icons';
    const url = `${rootUrl}/${this.volumeProcess.name}.png`;
    return html`
      <div class="slider-container">
        ${createSlider(onChange)}
        <span class="slider-label">
          ${this.volumeProcess.volume}%
        </span>
        <img src=${url} class="slider-icon"></img>
        <span class="process-name-text">
          ${this.volumeProcess.name}
        </span>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #actual-slider {
        background-color: red;
        height: 100%;
        width: 20%;
      }

      .slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* width: 100%; */
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 36px; /* Equal to thumbSize */
        width: 100%;
        height: 100%;
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
      }
    `;
  }
}

if (!customElements.get('volume-slider')) {
  customElements.define('volume-slider', VolumeSlider);
}