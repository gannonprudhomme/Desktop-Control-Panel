import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../types/types';
import './TopRow/TopRow';
import './MusicPlayer/MusicPlayer';
import { BaseConfig } from '../types/Config';
import './webawesome';
import theme from './theme';

export default class App extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Boolean }) public narrow: boolean;
  @property({ type: Object }) public panel: BaseConfig;

  protected render(): TemplateResult {
    const config = this.panel ? this.panel.config : null;

    return html`
      <div class="app-shell">
        <top-row .hass=${this.hass} .config=${config}></top-row>
        <music-player
          .hass=${this.hass}
          .config=${config}
        ></music-player>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [theme, css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: var(--dcp-background);
      }

      .app-shell {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        gap: 4px;
        padding: 12px;
      }

      music-player {
        flex: 1 1 auto;
        min-height: 0;
      }

      top-row {
        flex: 0 0 40px;
      }
    `];
  }
}

if (!customElements.get('desktop-control')) {
  customElements.define('desktop-control', App);
}
