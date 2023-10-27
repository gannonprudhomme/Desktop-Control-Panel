import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import DCPConfig from '../../types/Config';
import Module from '../../types/Module';
import { HomeAssistant } from '../../types/types';

// We probably need to get this type from somewhere
export default class MiddleRow extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Object }) public config: DCPConfig;
  @property({ type: Object }) public currentModule: Module;

  protected render(): TemplateResult {
    return html`
      <div id="middle-row">
        ${this.currentModule ? this.currentModule.component(this.hass, this.config) : 'No modules enabled'}
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #middle-row {
        width: 100%;
        height: 100%;
        border: 1px solid #00C8C8;
        overflow-y: hidden;
        flex-grow: 1;
      }
    `;
  }
}

if (!customElements.get('middle-row')) {
  customElements.define('middle-row', MiddleRow);
}
