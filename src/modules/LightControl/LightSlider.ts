import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Light from '../../../types/Light';
import { HomeAssistant } from '../../../types/types';
import createSlider from '../../Slider';
import icon from '../../res/light-bulb.png';
import createImageButton from '../../ImageButton';

/**
 * Displays a single light, with multiple sliders (one for brigttness, one for color temp or hue)
 * Note that while the slider's value updates on slide, the state changes are only actually sent
 * to the light when you release the slider.
 */
export default class LightSlider extends LitElement {
  @property({ type: Object }) public light: Light;
  @property({ type: Function }) public setLightState: (
    light: string, state: Record<string, unknown>,
  ) => void;
  // Pass in the callService function? Or just some function to call it

  protected render(): TemplateResult {
    // Only updates the 
    const onBrightnessSlide = (value: number) => {
      const shifted = value / 100 * 255;
      this.light = { ...this.light, brightness: shifted };
    };

    const onBrightnessChange = (value: number) => {
      // Ignore duplicates?
      onBrightnessSlide(value);
      this.setLightState(this.light.entityId, {
        brightness_pct: value, entity_id: this.light.entityId,
      });
    };

    const onTempSlide = (value: number) => {
      this.light = { ...this.light, colorTemp: value };
    };

    const onPowerClick = () => {
      console.log('clicked!');
    };

    const tempContainer = html`
      <div>

      </div>
    `;

    const conv = this.light.brightness / 255 * 100;
    console.log(`lightSlider render ${this.light.brightness} ${conv} ${this.light.colorTemp} ${this.light.minTemp} ${this.light.maxTemp}`);

    const brightness = (this.light.brightness / 255) * 100;

    return html`
      <div class="smart-light-slider-container">
        <span class="light-name">
          ${this.light.name}
        </span>
        <div class="light-slider-container">
          <div class="slider-container">
            ${createSlider(onBrightnessSlide, onBrightnessChange, brightness, 0, 100)}

            <div class="slider-info-container">
              <span class="brightness-value">
                ${brightness.toFixed(0)}
                %
              </span>
              ${createImageButton(onPowerClick, icon, 'power-button')}
            </div>
          </div>
          <div class="slider-container">
            ${createSlider(null, onTempSlide, this.light.colorTemp, this.light.minTemp, this.light.maxTemp, 'vertical')}

            <div class="slider-info-container">
              <span class="brightness-value">
                ${this.light.colorTemp}
                K
              </span>
              ${createImageButton(onPowerClick, icon, 'power-button')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // TODO: See if we can get some of these from elsewhere? slider-info-container should be common
  static get styles(): CSSResult {
    return css`
      .smart-light-slider-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        /* TODO: Check this */
        max-width: 15rem;
      }

      .light-name {
        display: inline-block;
        flex-grow: 0;
      }

      .light-slider-container {
        display: flex;
        justify-content: flex-start;
        flex-grow: 5;
      }

      .slider-info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      #power-button {
        width: 32px;
        height: 32px;
      }
    `;
  }
}

if (!customElements.get('light-slider')) {
  customElements.define('light-slider', LightSlider);
}
