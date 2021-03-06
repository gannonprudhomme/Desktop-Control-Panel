import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Song from '../../types/Song';

// We probably need to get this type from somewhere
export default class TrackDisplay extends LitElement {
  @property({ type: Object }) public song: Song;

  protected render(): TemplateResult {
    return html`
      <div id="track">
          <img
            id="album-cover"
            src=${this.song.albumArt} 
            alt="album-cover"
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
      #track {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        width: 100%;
        height: 100%;
      }
      #album-cover-container {
      }
      #album-cover {
        object-fit: contain;
        max-height: 64px;
      }

      #track-info {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        /* 48px is for the image, 5px is for left margin */
        width: calc(100% - 48px - 5px);
      }
      #current-track {
        font-size: 16px;
        margin-bottom: 4px;
      }

      #current-artist {
        font-size: 13px;
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
