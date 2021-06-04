import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import RaspberryPi from '../../../types/RaspberryPi';
import { HomeAssistant } from '../../../types/types';
import createSlider from '../../Slider';
import themeColor from '../../theme';

// We probably need to get this type from somewhere
export default class TabletControlView extends LitElement {
  @property({ type: Array }) public hass: HomeAssistant;
  @property({ type: Object }) public raspberryPi: RaspberryPi;

  protected render(): TemplateResult {
    const onChange = (brightness: number) => {
      // call a service to change the volume
      this.hass.callService('rpi_backlight', 'set_brightness', { brightness });

      // "remake" the property, which forces a re-render
      this.raspberryPi = { ...this.raspberryPi, brightness };
    };

    const setScreenPower = () => {
      this.hass.callService('rpi_backlight', 'set_power', { power: !this.raspberryPi.power });

      // "remake" the property, which forces a re-render
      // Really only need this so we don't have to wait until we call update on the Pi again
      this.raspberryPi = { ...this.raspberryPi, power: !this.raspberryPi.power };
    };

    const shutdown = () => {
      this.hass.callService('rpi_backlight', 'shutdown', {});
    };

    if (!this.raspberryPi
        || this.raspberryPi.brightness === null
        || this.raspberryPi.power === null
    ) {
      return html`
        <div class="invalid-entry">
          RaspberryPi is not active or is configured incorrectly.
        </div>
      `;
    }

    return html`
      <div id="tablet-control">
        <div class="brightness-slider-container">
          ${createSlider(onChange, null, this.raspberryPi.brightness, 4, 100, null)}
          <span class="slider-label">
            ${this.raspberryPi.brightness}%
          </span>
        </div>

        <div>
          <ha-icon-button @click=${shutdown} icon="mdi:power" class="sleep-button">
          </ha-icon-button>
          <ha-icon-button @click=${setScreenPower} icon="mdi:sleep" class="power-button">
          </ha-icon-button>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    const styles = css`
      #tablet-control {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
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

      .sleep-button, .power-button {
        --mdc-icon-size: 48px;
        --mdc-icon-button-size: 56px;
        color: var(--theme-color);
      }

      .brightness-slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
      }

      /* Override styles from the slider */
      .slider-container {
        padding: -40% 0;
        width: 0;
        margin-left: -25%;
      }
    `;

    return [themeColor, styles];
  }
}

if (!customElements.get('tablet-control')) {
  customElements.define('tablet-control', TabletControlView);
}
