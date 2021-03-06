import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import DCPConfig from '../../types/Config';
import { HomeAssistant } from '../../types/types';
import getWeatherStateSVG, { weatherSVGStyles } from '../external/weatherIcons';

function getWeatherText(hass: HomeAssistant, weatherState: string): string {
  const localizeUrl = `component.weather.state._.${weatherState}`;
  return hass.localize(localizeUrl) ?? 'unknown';
}

// We probably need to get this type from somewhere
export default class WeatherDisplay extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Object }) public config: DCPConfig;

  protected render(): TemplateResult {
    if (!this.config.weather_name || !this.hass.states[this.config.weather_name]) {
      return html`
        <div class="unavailable-text">
          Unavailable
        </div>
      `;
    }

    const { state, attributes } = this.hass.states[this.config.weather_name];
    const weatherType = getWeatherText(this.hass, state);
    const temperature: number = attributes.temperature ?? -1;

    return html`
      <div class="weather-container">
        <div class="weather-icon">
            ${getWeatherStateSVG(state)}
        </div>
        <div class="temperature-weather-container">
          <span id="temperature">
            ${temperature.toFixed(0)}°F
          </span>
          <span>
            ${weatherType}
          </span>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [
      weatherSVGStyles,
      css`
      .weather-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #00C8C8;
        height: 100%;
        padding: 0px 5px 5px 5px;
      }

      .weather-icon {
        font-size: 40px;
        display: flex;
        align-items: flex-end;
        min-width: 48px;
      }

      .weather-icon > * {
        flex: 0 0 48px;
      }

      .temperature-weather-container {
        display: flex;
        flex-direction: column;
        text-align: right;
      }

      #temperature {
        font-size: 28px;
      }

      .unavailable-text {
        display: flex;
        justify-content: flex-end;
      }
    `];
  }
}

if (!customElements.get('weather-display')) {
  customElements.define('weather-display', WeatherDisplay);
}
