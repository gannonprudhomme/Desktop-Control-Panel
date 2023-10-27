import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import {
  mdiSkipPrevious, mdiPauseCircleOutline, mdiPlayCircleOutline, mdiSkipNext
} from '@mdi/js';
import { HomeAssistant } from '../../types/types';
import Song from '../../types/Song';

import themeColor from '../theme';

/**
 * Calls the according Spotify service using hass.callService
 * @param hass HomeAssistant instance
 * @param mediaPlayerId The entity ID , e.g. media_player.spotify_first_last
 * @param type Either media_previous_track, media_play_pause, or media_next_track
 */
export function callSpotifyService(hass: HomeAssistant, mediaPlayerId: string, type: string): void {
  hass.callService('media_player', type, { entity_id: mediaPlayerId }).catch((err) => {
    console.log(err);
  });
}

export default class MediaControl extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Object }) public song: Song;
  @property({ type: String }) public mediaPlayerId: string;

  previousClicked(): void {
    callSpotifyService(this.hass, this.mediaPlayerId, 'media_previous_track');
  }

  playPauseClicked(): void {
    callSpotifyService(this.hass, this.mediaPlayerId, 'media_play_pause');
  }

  nextClicked(): void {
    callSpotifyService(this.hass, this.mediaPlayerId, 'media_next_track');
  }

  protected render(): TemplateResult {
    const playPauseIcon = this.song.isPlaying
      ? mdiPauseCircleOutline : mdiPlayCircleOutline;

    return html`
      <div id="spotify-playback">
        <div id="playback-container">
          <ha-icon-button
            @click=${this.previousClicked}
            .path=${mdiSkipPrevious}
            class="icon-button skip-button"
          >
          </ha-icon-button>
          <ha-icon-button
            @click=${this.playPauseClicked}
            .path=${playPauseIcon}
            class="icon-button"
          >
          </ha-icon-button>
          <ha-icon-button
            @click=${this.nextClicked}
            .path=${mdiSkipNext}
            class="icon-button skip-button"
          >
          </ha-icon-button>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    const styles = css`
      #spotify-playback {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
      }

      #playback-container {
        border: 1px solid var(--theme-color) !important;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 250px;
        height: 100%;
      }

      .icon-button {
        --mdc-icon-size: 56px;
        --mdc-icon-button-size: 60px;
        /* 8 is mostly arbitrary - but it's 56 - 48 px */
        color: var(--theme-color);
      }

      /* Skip buttons have more empty space than pause, so reduce their size to match the
         icon size */
      .skip-button {
        --mdc-icon-button-size: 56px;
      }
    `;

    return [themeColor, styles];
  }
}

if (!customElements.get('media-control')) {
  customElements.define('media-control', MediaControl);
}
