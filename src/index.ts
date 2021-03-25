import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../types/types';
import './TopRow/TopRow';
import './MiddleRow/MiddleRow';
import './BottomRow/BottomRow';
import { BaseConfig } from '../types/Config';
import Module from '../types/Module';
import getModules from '../types/ModulesManager';

// Might as well merge this into index.ts
export default class App extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Boolean }) public narrow: boolean;
  @property({ type: Object }) public panel: BaseConfig;

  @property({ type: Array }) public modules: Module[];
  @property({ type: Object }) public currentModule: Module = null;

  protected render(): TemplateResult {
    if (!this.modules) {
      this.modules = getModules(this.panel.config.modules);
      [this.currentModule = null] = this.modules;
    }

    return html`
      <div class="grid-container">
        <top-row></top-row>
        <middle-row .hass=${this.hass} .currentModule=${this.currentModule}></middle-row>
        <bottom-row
          .hass=${this.hass}
          .config=${this.panel.config}
          .modules=${this.modules}
          .currentModule=${this.currentModule}
        >
        </bottom-row>
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
