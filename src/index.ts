import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { CSSResult, PropertyValues, TemplateResult } from 'lit';
import { mdiEyeOutline } from '@mdi/js';
import { HomeAssistant } from '../types/types';
import icon from './Icon';
import './TopRow/TopRow';
import './MusicPlayer/MusicPlayer';
import './Recent/Recent';
import './webawesome';
import type DCPConfig from '../types/Config';
import type { BaseConfig } from '../types/Config';
import theme, { borderBoxStyles } from './theme';

type SidebarMode = HomeAssistant['dockedSidebar'];

export default class App extends LitElement {
  @property({ type: Object }) public hass?: HomeAssistant;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public panel?: BaseConfig;

  @property({ type: Boolean, attribute: false }) private sidebarHidden = false;

  private managedSidebar = false;
  private previousSidebarMode?: SidebarMode;

  protected updated(changedProperties: PropertyValues): void {
    if (
      !this.managedSidebar
      && this.hass
      && this.panel
      && (changedProperties.has('hass') || changedProperties.has('panel'))
    ) {
      this.previousSidebarMode = this.hass.dockedSidebar;
      this.managedSidebar = true;
      this.sidebarHidden = true;
      this.setSidebarMode('always_hidden');
      return;
    }

    if (this.managedSidebar && this.hass && changedProperties.has('hass')) {
      this.sidebarHidden = this.hass.dockedSidebar === 'always_hidden';
    }
  }

  disconnectedCallback(): void {
    if (this.managedSidebar && this.previousSidebarMode) {
      this.setSidebarMode(this.previousSidebarMode);
    }

    this.managedSidebar = false;
    super.disconnectedCallback();
  }

  private setSidebarMode(mode: SidebarMode): void {
    const eventTarget = document.querySelector('home-assistant') || this;

    eventTarget.dispatchEvent(new CustomEvent('hass-dock-sidebar', {
      bubbles: true,
      composed: true,
      detail: { dock: mode },
    }));
  }

  private toggleSidebar(): void {
    if (!this.sidebarHidden) {
      this.sidebarHidden = true;
      this.setSidebarMode('always_hidden');
      return;
    }

    const mode = this.previousSidebarMode === 'always_hidden'
      ? 'docked'
      : this.previousSidebarMode || 'docked';

    this.sidebarHidden = false;
    this.setSidebarMode(mode);
  }

  private getAlbumArt(config: DCPConfig): string {
    if (!config.spotifyplus_name) {
      return '';
    }

    const mediaPlayer = this.hass?.states[config.spotifyplus_name];

    return mediaPlayer?.attributes.entity_picture
      || mediaPlayer?.attributes.sp_nowplaying_image_url
      || '';
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.panel) {
      return html``;
    }

    const { config } = this.panel;
    const albumArt = this.getAlbumArt(config);

    return html`
      ${albumArt
    ? html`
          <div class="album-backdrop" aria-hidden="true">
            <img src=${albumArt} alt="" />
          </div>
        `
    : ''}
      <div class="app-shell">
        <top-row .hass=${this.hass} .config=${config}></top-row>
        <music-player
          .hass=${this.hass}
          .config=${config}
        ></music-player>
        <recent-media
          .hass=${this.hass}
          .config=${config}
        ></recent-media>
      </div>
      <button
        class="sidebar-toggle"
        type="button"
        aria-label=${this.sidebarHidden
    ? 'Show Home Assistant sidebar'
    : 'Hide Home Assistant sidebar'}
        title=${this.sidebarHidden
    ? 'Show Home Assistant sidebar'
    : 'Hide Home Assistant sidebar'}
        @click=${this.toggleSidebar}
      >
        ${icon(mdiEyeOutline, 'sidebar-toggle-icon')}
      </button>
    `;
  }

  static get styles(): CSSResult[] {
    return [theme, borderBoxStyles, css`
      :host {
        position: relative;
        isolation: isolate;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: var(--dcp-background);
      }

      .album-backdrop {
        position: absolute;
        z-index: 0;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        background: var(--dcp-background);
      }

      .album-backdrop::after {
        position: absolute;
        z-index: 1;
        content: "";
        inset: 0;
        background: linear-gradient(
          90deg,
          rgba(4, 9, 13, 0.4),
          rgba(4, 9, 13, 0.64)
        );
      }

      .album-backdrop img {
        position: absolute;
        width: 120%;
        height: 120%;
        top: -10%;
        left: -10%;
        object-fit: cover;
        filter: blur(56px) saturate(1.65) brightness(0.82);
        transform: scale(1.08);
      }

      .app-shell {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 320px;
        grid-template-rows: 44px minmax(0, 1fr);
        grid-template-areas:
          "top-row recents"
          "player recents";
        gap: 16px;
        height: 100%;
        width: 100%;
        padding: 16px;
      }

      top-row {
        grid-area: top-row;
        min-width: 0;
      }

      music-player {
        grid-area: player;
        min-height: 0;
        padding-inline: 8px;
      }

      recent-media {
        grid-area: recents;
        min-width: 0;
        min-height: 0;
      }

      .sidebar-toggle {
        position: absolute;
        z-index: 3;
        left: 8px;
        bottom: 8px;
        display: grid;
        width: 44px;
        height: 44px;
        padding: 0;
        place-items: center;
        border: 0;
        background: transparent;
        color: var(--dcp-text-muted);
        cursor: pointer;
        opacity: 0.28;
      }

      .sidebar-toggle:hover {
        color: var(--dcp-text);
        opacity: 0.62;
      }

      .sidebar-toggle:focus-visible {
        opacity: 1;
        outline: 2px solid var(--dcp-accent-strong);
        outline-offset: 2px;
      }

      .sidebar-toggle-icon {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }

      @media (max-width: 760px) {
        .app-shell {
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 12px;
          padding: 8px;
        }
      }
    `];
  }
}

if (!customElements.get('desktop-control')) {
  customElements.define('desktop-control', App);
}
