import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../types/types';
import './TopRow/TopRow';
import './MiddleRow/MiddleRow';
import './BottomRow/BottomRow';
import { BaseConfig } from '../types/Config';

// Might as well merge this into index.ts
export default class App extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;

  @property({ type: Boolean }) public narrow: boolean;

  @property({ type: Object }) public panel: BaseConfig;

  protected render(): TemplateResult {
    console.log(this.hass);
    console.log(this.hass.states);
    console.log(this.panel);

    return html`
      <div class="grid-container">
        <top-row></top-row>
        <middle-row></middle-row>
        <bottom-row .hass=${this.hass} .config=${this.panel.config}></bottom-row>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .grid-container {
        display: grid;
        grid-template-rows: 10% 74% 16%;
        height: 100%;
        width: 97%;
        padding-left: 1.5%;
      }
    `;
  }
}

if (!customElements.get('desktop-control')) {
  customElements.define('desktop-control', App);
}
