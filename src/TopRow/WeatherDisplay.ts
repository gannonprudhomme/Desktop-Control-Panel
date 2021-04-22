import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../../types/types';

function getWeatherText(hass: HomeAssistant, weatherState: string): string {
  const localizeUrl = `component.weather.state._.${weatherState}`;
  return hass.localize(localizeUrl) ?? 'unknown';
}

// We probably need to get this type from somewhere
export default class WeatherDisplay extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;

  protected render(): TemplateResult {
    const { state, attributes } = this.hass.states['weather.home'];
    const weatherType = getWeatherText(this.hass, state);
    const temperature: number = attributes.temperature ?? -1;
    const icon = '';

    return html`
      <div class="weather-container">
        <div class="temperature-weather-container">
          <span id="temperature">
            ${temperature.toFixed(0)}°C
          </span>
          <span>
            ${weatherType}
          </span>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .weather-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #00C8C8;
        height: 100%;
        padding: 0px 5px 5px 5px;
      }
      .weather-container > div {
        margin: 0px 5px;
      }

      .weather-icon {
        font-size: 40px;
      }

      .temperature-weather-container {
        display: flex;
        flex-direction: column;
        text-align: right;
      }
      #temperature {
        font-size: 28px;
      }
    `;
  }
}

if (!customElements.get('weather-display')) {
  customElements.define('weather-display', WeatherDisplay);
}
