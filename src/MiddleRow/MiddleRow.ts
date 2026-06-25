import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { CSSResult, TemplateResult } from 'lit';
import DCPConfig from '../../types/Config';
import Module from '../../types/Module';
import { HomeAssistant } from '../../types/types';
import { borderBoxStyles } from '../theme';

// We probably need to get this type from somewhere
export default class MiddleRow extends LitElement {
  @property({ type: Object }) public hass!: HomeAssistant;
  @property({ type: Object }) public config!: DCPConfig;
  @property({ type: Object }) public currentModule!: Module;

  protected render(): TemplateResult {
    return html`
      <wa-card id="module-card" appearance="filled-outlined">
        <div id="middle-row">
          ${this.currentModule ? this.currentModule.component(this.hass, this.config) : 'No modules enabled'}
        </div>
      </wa-card>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      :host,
      #module-card,
      #middle-row {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 0;
      }

      #module-card {
        --spacing: 0;
        box-shadow: var(--dcp-shadow);
      }

      #module-card::part(body) {
        height: 100%;
        padding: 10px;
      }

      #middle-row {
        overflow: hidden;
      }
    `];
  }
}

if (!customElements.get('middle-row')) {
  customElements.define('middle-row', MiddleRow);
}
