import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { mdiLightbulbOn, mdiLightbulbOutline } from '@mdi/js';
import Light from '../../../types/Light';
import createSlider from '../../Slider';
import icon from '../../Icon';
import { borderBoxStyles } from '../../theme';

/**
 * Displays a single light, with multiple sliders (one for brigttness, one for color temp or hue)
 * Note that while the slider's value updates on slide, the state changes are only actually sent
 * to the light when you release the slider.
 */
export default class LightSlider extends LitElement {
  @property({ type: Object }) public light: Light;
  @property({ type: Function }) public toggleLight: (lightID: string) => void;
  @property({ type: Function }) public setLightState: (
    lightID: string, state: Record<string, unknown>,
  ) => void;

  protected render(): TemplateResult {
    /**
     * Convert the value from [0, 100] to [0, 255] and update the value so its rendered on screen
    */
    const onBrightnessSlide = (value: number) => {
      const shifted = (value / 100) * 255;
      this.light = { ...this.light, brightness: shifted };
    };

    /**
     * Update the value (through onBrightnessSlide) and call the according service.
     * Only called once we're done dragging to prevent overloading the light.
     */
    const onBrightnessChange = (value: number) => {
      onBrightnessSlide(value);
      this.setLightState(this.light.entityId, {
        brightness_pct: value, entity_id: this.light.entityId,
      });
    };

    /**
     *  Update the value so it's rendered on the screen
     */
    const onTempSlide = (value: number) => {
      this.light = { ...this.light, mireds: value };
    };

    /**
     *  Update the value of the slider (through onTempSlide) and call the according service
     *  Only called once we're done dragging to prevent overloading the light.
     */
    const onTempChange = (value: number) => {
      onTempSlide(value);
      this.setLightState(this.light.entityId, {
        color_temp: value, entity_id: this.light.entityId,
      });
    };

    const onPowerClick = () => {
      this.toggleLight(this.light.entityId);
    };

    // Normalize brightness from [0, 255] to [0, 100]
    const brightness = (this.light.brightness / 255) * 100;

    const brightnessValue = brightness ? `${brightness.toFixed(0)}%` : 'Off';
    const temperatureValue = this.light.mireds ? `${this.light.mireds}` : 'Off';

    return html`
      <div class="smart-light-slider-container">
        <div class="multi-light-slider-container">
          <div class="light-slider-container">
            ${createSlider(onBrightnessSlide, onBrightnessChange, brightness, 1, 100)}
            <span class="slider-value">${brightnessValue}</span>
          </div>
          <div class="light-slider-container">
            ${createSlider(onTempSlide, onTempChange, this.light.mireds, this.light.minMireds + 1, this.light.maxMireds, 'temperature-slider-container')}
            <span class="slider-value">${temperatureValue}</span>
          </div>
        </div>
        <wa-button
          @click=${onPowerClick}
          variant=${this.light.isOn ? 'brand' : 'neutral'}
          appearance="plain"
          size="m"
          class="power-button"
          aria-label=${this.light.isOn ? `Turn off ${this.light.name}` : `Turn on ${this.light.name}`}
        >
          ${icon(this.light.isOn ? mdiLightbulbOn : mdiLightbulbOutline)}
        </wa-button>
        <div class="light-name">${this.light.name}</div>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      :host {
        display: block;
        flex: 0 0 auto;
        height: 100%;
      }

      .smart-light-slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 190px;
        height: 100%;
        padding: 0 8px;
      }

      .multi-light-slider-container {
        display: flex;
        justify-content: center;
        gap: 12px;
      }

      .light-slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .slider-value {
        min-width: 46px;
        margin-top: 4px;
        color: var(--dcp-text);
        font-size: 14px;
        font-variant-numeric: tabular-nums;
        text-align: center;
      }

      .power-button {
        margin-top: 1px;
      }

      .power-button::part(base) {
        min-width: 38px;
        min-height: 34px;
        padding: 0;
      }

      .control-icon {
        width: 27px;
        height: 27px;
      }

      .light-name {
        overflow: hidden;
        width: 100%;
        margin-top: 1px;
        color: var(--dcp-text);
        font-size: 13px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `];
  }
}

if (!customElements.get('light-slider')) {
  customElements.define('light-slider', LightSlider);
}
