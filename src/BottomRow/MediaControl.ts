import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../../types/types';
import Song from '../../types/Song';

import playImage from '../res/play.png';
import pauseImage from '../res/pause.png';
import nextImage from '../res/next-song.png';

export default class MediaControl extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;

  @property({ type: Object }) public song: Song;

  previousClicked(): void {
    this.hass.callService('media_player', 'media_previous_track', {
      entity_id: 'media_player.spotify_gannon_prudhomme',
    }).catch((err) => {
      console.log(err);
    });
  }

  playPauseClicked(): void {
    this.hass.callService('media_player', 'media_play_pause', {
      entity_id: 'media_player.spotify_gannon_prudhomme',
    }).catch((err) => {
      console.log(err);
    });
  }

  nextClicked(): void {
    this.hass.callService('media_player', 'media_next_track');
  }

  protected render(): TemplateResult {
    return html`
      <div id="spotify-playback">
        <div id="playback-container">
          <button
            type="button" 
            class="image-button"
            @click="${this.previousClicked}"
          >
            <img id="previous-song" src=${`/local${nextImage}`} alt="previous-song" />
          </button>
          <button
            type="button" 
            class="image-button"
            @click="${this.playPauseClicked}"
          >
            <img
              id="play-pause"
              src=${`/local${(this.song.isPlaying ? pauseImage : playImage)}`}
              alt="play-pause-song"
            />
          </button>
          <button
            type="button" 
            class="image-button"
            @click="${this.nextClicked}"
          >
            <img id="next-song" src=${`/local${nextImage}`} alt="next-song" />
          </button>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #spotify-playback {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
      }

      #playback-container {
        border: 1px solid #00C8C8 !important;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-content: center !important;
        width: 250px !important;
        margin-top: 10px;
      }

      .image-button {
        border-width: 0px !important;
        background-color: initial;
        outline: none;
        align-items: initial;
        display: initial;
        box-sizing: initial;
      }

      .image-button:active {
        transform: scale(0.8);
        filter: grayscale(0.8);
      }

      #play-pause {
        width: 48px;
        height: 48px;
        margin: 7px auto;
      }

      #previous-song {
        width: 32px;
        height: 32px;
        transform: rotate(180deg);
        margin: 0 auto;
      }

      #previous-song:active {
        transform: rotate(180deg) scale(0.85);
      }

      #next-song {
        width: 32px;
        height: 32px;
        margin: 0 auto;
      }
    `;
  }
}

if (!customElements.get('media-control')) {
  customElements.define('media-control', MediaControl);
}
