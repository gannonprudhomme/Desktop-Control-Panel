import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Song from '../../types/Song';

// We probably need to get this type from somewhere
export default class TrackDisplay extends LitElement {
  @property({ type: Object }) public song: Song;

  protected render(): TemplateResult {
    if (!this.song) {
      return html`<div id="track">Media unavailable</div>`;
    }

    return html`
      <div id="track">
        <img
          id="album-cover"
          src=${this.song.albumArt}
          alt=""
        ></img>
        <div id="track-info">
          <span id="current-track">
            ${this.song.title}
          </span>
          <span id="current-artist">
            ${this.song.artistName}
          </span>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        min-width: 0;
      }

      #track {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 9px;
        width: 100%;
        height: 100%;
        padding: 9px;
      }

      #album-cover {
        flex: 0 0 52px;
        width: 52px;
        height: 52px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.28);
      }

      #track-info {
        display: flex;
        flex-direction: column;
        min-width: 0;
        justify-content: center;
      }

      #current-track {
        overflow: hidden;
        color: var(--dcp-text);
        font-size: 15px;
        font-weight: 650;
        line-height: 1.2;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #current-artist {
        margin-top: 4px;
        color: var(--dcp-text-muted);
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    `;
  }
}

if (!customElements.get('track-display')) {
  customElements.define('track-display', TrackDisplay);
}
