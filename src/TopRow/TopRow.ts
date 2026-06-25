import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { CSSResult, TemplateResult } from 'lit';
import DCPConfig from '../../types/Config';
import { HomeAssistant } from '../../types/types';
import { borderBoxStyles } from '../theme';
import './TimeDisplay';
import './WeatherDisplay';

// We probably need to get this type from somewhere
export default class TopRow extends LitElement {
  @property({ type: Object }) public hass?: HomeAssistant;
  @property({ type: Object }) public config?: DCPConfig;

  protected render(): TemplateResult {
    return html`
      <div id="top-row">
        <weather-display .hass=${this.hass} .config=${this.config}></weather-display>
        <time-display></time-display>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      #top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        height: 100%;
      }

      weather-display {
        min-width: 0;
      }

      time-display {
        flex: 0 0 auto;
      }
    `];
  }
}

if (!customElements.get('top-row')) {
  customElements.define('top-row', TopRow);
}
