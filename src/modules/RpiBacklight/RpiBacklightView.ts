import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { CSSResult, TemplateResult } from 'lit';
import { mdiPower, mdiSleep } from '@mdi/js';
import RaspberryPi from '../../../types/RaspberryPi';
import { HomeAssistant } from '../../../types/types';
import createSlider from '../../Slider';
import icon from '../../Icon';
import { borderBoxStyles } from '../../theme';

// We probably need to get this type from somewhere
export default class RpiBacklightView extends LitElement {
  @property({ type: Object }) public hass!: HomeAssistant;
  @property({ type: Object }) public raspberryPi: RaspberryPi | null = null;

  protected render(): TemplateResult {
    const raspberryPi = this.raspberryPi;

    if (!raspberryPi) {
      return html`
        <div class="invalid-entry">
          RaspberryPi is not active or is configured incorrectly.
        </div>
      `;
    }

    const { brightness, power } = raspberryPi;

    if (brightness === null || power === null) {
      return html`
        <div class="invalid-entry">
          RaspberryPi is not active or is configured incorrectly.
        </div>
      `;
    }

    const onChange = (brightness: number) => {
      // call a service to change the volume
      this.hass.callService('rpi_backlight', 'set_brightness', { brightness });

      // "remake" the property, which forces a re-render
      this.raspberryPi = { ...raspberryPi, brightness };
    };

    const setScreenPower = () => {
      this.hass.callService('rpi_backlight', 'set_power', { power: !power });

      // "remake" the property, which forces a re-render
      // Really only need this so we don't have to wait until we call update on the Pi again
      this.raspberryPi = { ...raspberryPi, power: !power };
    };

    const shutdown = () => {
      this.hass.callService('rpi_backlight', 'shutdown', {});
    };

    return html`
      <div id="tablet-control">
        <div class="brightness-slider-container">
          ${createSlider(onChange, null, brightness, 4, 100, null)}
          <span class="slider-label">
            ${brightness}%
          </span>
          <span class="slider-caption">Brightness</span>
        </div>

        <div class="tablet-actions">
          <wa-button
            @click=${setScreenPower}
            variant=${power ? 'brand' : 'neutral'}
            appearance=${power ? 'filled' : 'outlined'}
            size="l"
            class="tablet-button"
          >
            <span class="button-content">
              ${icon(mdiSleep)}
              <span>Display ${power ? 'on' : 'off'}</span>
            </span>
          </wa-button>
          <wa-button
            @click=${shutdown}
            variant="neutral"
            appearance="filled"
            size="l"
            class="tablet-button"
          >
            <span class="button-content">
              ${icon(mdiPower)}
              <span>Shut down</span>
            </span>
          </wa-button>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      #tablet-control {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 54px;
        width: 100%;
        height: 100%;
      }

      .invalid-entry {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        height: 100%;
      }

      .brightness-slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .slider-label {
        margin-top: 5px;
        color: var(--dcp-text);
        font-size: 16px;
        font-variant-numeric: tabular-nums;
        font-weight: 650;
      }

      .slider-caption {
        margin-top: 2px;
        color: var(--dcp-text-muted);
        font-size: 10px;
      }

      .tablet-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 190px;
      }

      .tablet-button::part(base) {
        min-height: 58px;
        padding-inline: 18px;
      }

      .tablet-button::part(label) {
        display: block;
        width: 100%;
      }

      .button-content {
        display: grid;
        grid-template-columns: 28px 1fr;
        align-items: center;
        width: 100%;
        column-gap: 10px;
        text-align: left;
      }

      .control-icon {
        display: block;
        width: 25px;
        height: 25px;
        justify-self: center;
      }
    `];
  }
}

if (!customElements.get('rpi-backlight')) {
  customElements.define('rpi-backlight', RpiBacklightView);
}
