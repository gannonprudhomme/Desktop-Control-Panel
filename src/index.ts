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

export default class App extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Boolean }) public narrow: boolean;
  @property({ type: Object }) public panel: BaseConfig;

  @property({ type: Array }) public modules: Module[];
  @property({ type: Object }) public currentModule: Module = null;

  constructor() {
    super();
    this.addEventListener('update-current-module', this.handleUpdateCurrentModule);
  }

  private handleUpdateCurrentModule(event: CustomEvent): void {
    const { detail } = event;

    if (!detail.module) {
      throw Error('did not receive module in current-module CustomEvent');
    }

    this.currentModule = detail.module;
  }

  protected render(): TemplateResult {
    if (!this.modules) {
      this.modules = getModules(this.panel.config.modules);
      [this.currentModule = null] = this.modules;
    }

    return html`
      <div class="grid-container">
        <top-row .hass=${this.hass} .config=${this.panel.config}></top-row>
        <middle-row
          .hass=${this.hass}
          .currentModule=${this.currentModule}
          .config=${this.panel.config}
          id="middle-row">
        </middle-row>
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
        display: flex;
        flex-direction: column;
        height: 100%;
        width: calc(100% - 1.5% * 2);
        padding-left: 1.5%;
        justify-content: space-around;
      }

      #middle-row {
        flex-grow: 1;
      }
    `;
  }
}

if (!customElements.get('desktop-control')) {
  customElements.define('desktop-control', App);
}
