import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { CSSResult, TemplateResult } from 'lit';
import DCPConfig from '../../types/Config';
import { HomeAssistant } from '../../types/types';
import getWeatherStateSVG, { weatherSVGStyles } from '../external/weatherIcons';
import { borderBoxStyles } from '../theme';

function getWeatherText(
  hass: HomeAssistant,
  weather: HomeAssistant['states'][string],
): string {
  const formattedState = hass.formatEntityState?.(weather);

  if (formattedState) {
    return formattedState;
  }

  return weather.state
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// We probably need to get this type from somewhere
export default class WeatherDisplay extends LitElement {
  @property({ type: Object }) public hass?: HomeAssistant;
  @property({ type: Object }) public config?: DCPConfig;

  protected render(): TemplateResult {
    if (
      !this.hass
      || !this.config
      || !this.config.weather_name
      || !this.hass.states[this.config.weather_name]
    ) {
      return html`
        <div class="unavailable-text">
          Unavailable
        </div>
      `;
    }

    const weather = this.hass.states[this.config.weather_name];
    const { state, attributes } = weather;
    const weatherType = getWeatherText(this.hass, weather);
    const temperature: number = attributes.temperature ?? -1;

    return html`
      <div class="weather-container">
        <div class="temperature-weather-container">
          <span id="temperature">
            ${temperature.toFixed(0)}°F
          </span>
          <span>
            ${weatherType}
          </span>
        </div>
        <div class="weather-icon">
          ${getWeatherStateSVG(state)}
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [
      borderBoxStyles,
      weatherSVGStyles,
      css`
      .weather-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
        color: var(--dcp-text);
        height: 100%;
        padding-right: 4px;
      }

      .weather-icon {
        font-size: 28px;
        display: flex;
        align-items: center;
        min-width: 32px;
        color: var(--dcp-accent-strong);
      }

      .weather-icon > * {
        flex: 0 0 32px;
      }

      .temperature-weather-container {
        display: flex;
        flex-direction: column;
        text-align: right;
        color: var(--dcp-text-muted);
        font-size: 15px;
        line-height: 1.15;
      }

      #temperature {
        color: var(--dcp-text);
        font-size: 24px;
        font-weight: 500;
        letter-spacing: -0.02em;
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
