import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../../types/types';
import './TimeDisplay';
import './WeatherDisplay';

// We probably need to get this type from somewhere
export default class TopRow extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;

  protected render(): TemplateResult {
    return html`
      <div id="top-row">
        <div>PC Controls</div>
        <time-display></time-display>
        <weather-display .hass=${this.hass}></weather-display>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #top-row {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        grid-template-rows: 100%;
        justify-content: space-between;
        align-items: center;

        height: 100%;
      }
    `;
  }
}

if (!customElements.get('top-row')) {
  customElements.define('top-row', TopRow);
}
