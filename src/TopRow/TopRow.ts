import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import DCPConfig from '../../types/Config';
import { HomeAssistant } from '../../types/types';
import { borderBoxStyles } from '../theme';
import './TimeDisplay';
import './WeatherDisplay';

// We probably need to get this type from somewhere
export default class TopRow extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Object }) public config: DCPConfig;

  protected render(): TemplateResult {
    return html`
      <div id="top-row">
        <div></div>
        <time-display></time-display>
        <weather-display .hass=${this.hass} .config=${this.config}></weather-display>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      #top-row {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        height: 100%;
      }
    `];
  }
}

if (!customElements.get('top-row')) {
  customElements.define('top-row', TopRow);
}
