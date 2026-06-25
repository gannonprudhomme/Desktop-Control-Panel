import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import {
  mdiApplication, mdiFirefox, mdiMessage, mdiSpotify,
} from '@mdi/js';
import VolumeProcess from '../../../types/VolumeProcess';
import createSlider from '../../Slider';
import icon from '../../Icon';
import { borderBoxStyles } from '../../theme';
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

    const url = this.volumeProcess.iconUrl ?? `/local/icons/${this.volumeProcess.name}.png`;
    const hideBrokenIcon = (event: Event) => {
      (event.target as HTMLImageElement).style.display = 'none';
    };
    const fallbackIcons = new Map<string, string>([
      ['spotify', mdiSpotify],
      ['discord', mdiMessage],
      ['firefox', mdiFirefox],
    ]);
    const fallbackIcon = fallbackIcons.get(this.volumeProcess.name.toLowerCase()) ?? mdiApplication;

    return html`
      <div class="volume-slider-container">
        ${createSlider(onChange, null, this.volumeProcess.volume, 0, 100, 'volume-level')}
        <span class="slider-label">
          ${this.volumeProcess.volume}%
        </span>
        <div class="process-icon">
          ${icon(fallbackIcon, 'process-icon-svg')}
          <img src=${url} class="slider-icon" alt="" @error=${hideBrokenIcon}></img>
        </div>
        <span class="process-name-text">
          ${this.volumeProcess.name}
        </span>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      :host {
        display: block;
        height: 100%;
      }

      .volume-slider-container {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        width: 92px;
        height: 100%;
        padding: 4px 4px 2px;
      }

      .slider-container.volume-level {
        height: 184px;
        padding-bottom: 0;
      }

      .slider.volume-level {
        height: 174px;
      }

      .slider.volume-level::part(track) {
        height: 164px;
      }

      .process-icon {
        position: relative;
        display: grid;
        width: 32px;
        height: 32px;
        place-items: center;
        overflow: hidden;
        border: 1px solid var(--dcp-border);
        border-radius: 9px;
        background: rgba(32, 199, 199, 0.13);
        color: var(--dcp-accent-strong);
        margin-top: 3px;
      }

      .process-icon-svg {
        width: 21px;
        height: 21px;
      }

      .slider-icon {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .slider-label {
        min-width: 42px;
        margin-top: 1px;
        color: var(--dcp-text);
        font-size: 14px;
        font-variant-numeric: tabular-nums;
        font-weight: 650;
        text-align: center;
      }

      .process-name-text {
        width: 92px;
        margin-top: 2px;
        color: var(--dcp-text-muted);
        font-size: 11px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    `];
  }
}

if (!customElements.get('volume-slider')) {
  customElements.define('volume-slider', VolumeSlider);
}
