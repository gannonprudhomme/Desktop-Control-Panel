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

    const onTempChange = (value: number) => {
      onTempSlide(value);
      this.setLightState(this.light.entityId, {
        color_temp: value, entity_id: this.light.entityId,
      });
    };

    const onPowerClick = () => {
      console.log('clicked!');
    };

    const tempContainer = html`
      <div>

      </div>
    `;

    const conv = this.light.brightness / 255 * 100;
    console.log(`lightSlider render ${this.light.brightness} ${conv} ${this.light.colorTemp} ${this.light.minMireds} ${this.light.maxMireds}`);

    const brightness = (this.light.brightness / 255) * 100;

    return html`
      <div class="smart-light-slider-container">
        <span class="light-name">
          ${this.light.name}
        </span>
        <div class="multi-light-slider-container">
          <div class="light-slider-container">
            <div class="slider-container">
              ${createSlider(onBrightnessSlide, onBrightnessChange, brightness, 1, 100)}
            </div>

            <div class="slider-info-container">
              <span class="brightness-value">
                ${brightness.toFixed(0)}
                %
              </span>
              ${createImageButton(onPowerClick, icon, 'power-button')}
            </div>
          </div>
          <div class="light-slider-container">
            <!-- TODO: Note that we do minMireds + 1 - otherwise, it will throw an error for some reason -->
            <div class="slider-container temperature-slider-container">
              ${createSlider(onTempSlide, onTempChange, this.light.colorTemp, this.light.minMireds + 1, this.light.maxMireds, 'vertical')}
            </div>

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
        height: 100%;
      }

      .light-name {
        display: inline-block;
        flex-grow: 0;
      }

      .multi-light-slider-container {
        display: flex;
        justify-content: flex-start;
        height: 100%;
        /* flex-grow: 5; */
      }

      .slider-info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .light-slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        /* height: 100%; */
      }

      .slider-container {
        /* height: 300px; */
        /* height: 100%; */
        padding: -40% 0;
        width: 0;
        margin-left: -25%;
      }

      #power-button {
        width: 32px;
        height: 32px;
      }

      .temperature-slider-container > .slider {
        background-image: -webkit-linear-gradient( right, rgb(255, 160, 0) 0%, white 50%, rgb(166, 209, 255) 100% );
      }
    `;
  }
}

if (!customElements.get('light-slider')) {
  customElements.define('light-slider', LightSlider);
}
