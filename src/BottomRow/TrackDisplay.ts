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
        />
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
      }
      #album-cover {
        width: 70px;
        height: 70px;
        padding-top: 10px;
      }

      #track-info {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
      }
      #current-track {
        font-size: 16px;
        margin-bottom: 4px;
      }

      #current-artist {
        font-size: 13px;
      }
    `;
  }
}

if (!customElements.get('track-display')) {
  customElements.define('track-display', TrackDisplay);
}
