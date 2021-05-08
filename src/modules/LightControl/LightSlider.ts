import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Light from '../../../types/Light';
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
    lightID: string, state: Record<string, unknown>,
  ) => void;
  @property({ type: Function }) public toggleLight: (lightID: string) => void;

  protected render(): TemplateResult {
    /** 
     * Convert the value from [0, 100] to [0, 255] and update the value so its rendered on screen
    */
    const onBrightnessSlide = (value: number) => {
      const shifted = value / 100 * 255;
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
      this.light = { ...this.light, colorTemp: value };
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
    const temperatureValue = this.light.colorTemp ? `${this.light.colorTemp}K` : 'Off';

    return html`
      <div class="smart-light-slider-container">
        <div class="multi-light-slider-container">
          <div class="light-slider-container">
            ${createSlider(onBrightnessSlide, onBrightnessChange, brightness, 1, 100)}

            <div class="slider-info-container">
              <span class="brightness-value">
                ${brightnessValue}
              </span>
            </div>
          </div>
          <div class="light-slider-container">
            <!-- TODO: Note that we do minMireds + 1 - otherwise, it will throw an error for some reason -->
            ${createSlider(onTempSlide, onTempChange, this.light.colorTemp, this.light.minMireds + 1, this.light.maxMireds, 'temperature-slider-container')}

            <div class="slider-info-container">
              <span class="brightness-value">
                ${temperatureValue}
              </span>
            </div>
          </div>
        </div>
        <div class="power-button-container">
          ${createImageButton(onPowerClick, icon, 'power-button')}
        </div>
        <div class="light-name-container">
          <span class="light-name">
            ${this.light.name}
          </span>
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
        margin-left: 16px;
      }

      .multi-light-slider-container {
        display: flex;
        justify-content: flex-start;
        height: 100%;
      }

      .slider-info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 6px;
      }

      .brightness-value {
        min-width: 34px; /* So the text doesn't shift when it goes to 1 digit */
        text-align: right;
      }

      .light-slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      }

      .slider-container {
        width: 0;
        margin-left: -25%;
      }

      .power-button-container {
        display: flex;
        justify-content: center;
      }

      .light-name-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .light-name {
        display: inline-block;
        flex-grow: 0;
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
