import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../types/types';
import './TopRow/TopRow';
import './MusicPlayer/MusicPlayer';
import './Recent/Recent';
import { BaseConfig } from '../types/Config';
import theme, { borderBoxStyles } from './theme';

export default class App extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Boolean }) public narrow: boolean;
  @property({ type: Object }) public panel: BaseConfig;

  protected render(): TemplateResult {
    const config = this.panel ? this.panel.config : null;

    return html`
      <div class="app-shell">
        <music-player
          .hass=${this.hass}
          .config=${config}
        ></music-player>
        <aside class="side-rail" aria-label="Media overview">
          <top-row .hass=${this.hass} .config=${config}></top-row>
          <recent-media
            .hass=${this.hass}
            .config=${config}
          ></recent-media>
        </aside>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [theme, borderBoxStyles, css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: var(--dcp-background);
      }

      .app-shell {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 320px;
        gap: 16px;
        height: 100%;
        width: 100%;
        padding: 16px;
      }

      music-player {
        min-height: 0;
      }

      .side-rail {
        display: grid;
        grid-template-rows: 44px minmax(0, 1fr);
        gap: 12px;
        min-width: 0;
        min-height: 0;
      }

      top-row {
        min-width: 0;
      }

      @media (max-width: 760px) {
        .app-shell {
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 12px;
          padding: 8px;
        }

        .side-rail {
          grid-template-rows: 44px minmax(0, 1fr);
        }
      }
    `];
  }
}

if (!customElements.get('desktop-control')) {
  customElements.define('desktop-control', App);
}
