import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';

interface WeatherProps {
  temperature: number;
  weatherType: string;
  icon: string; // link to the icon to use
}

// We probably need to get this type from somewhere
export default class WeatherDisplay extends LitElement {
  @property({ type: Number }) public temperature: number;

  @property({ type: String }) public weatherType: string;

  protected render(): TemplateResult {
    return html`
      <div class="weather-container">
        <div class="temperature-weather-container">
          <span id="temperature">
            ${this.temperature}°F
          </span>
          <span>
            ${this.weatherType}
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
