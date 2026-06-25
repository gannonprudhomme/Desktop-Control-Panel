import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import {
  mdiSkipPrevious, mdiPause, mdiPlay, mdiSkipNext,
} from '@mdi/js';
import { HomeAssistant } from '../../types/types';
import Song from '../../types/Song';
import icon from '../Icon';
import { borderBoxStyles } from '../theme';

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
    if (!this.song) {
      return html`<div id="spotify-playback">Media unavailable</div>`;
    }

    const playPauseIcon = this.song.isPlaying
      ? mdiPause : mdiPlay;

    return html`
      <div id="spotify-playback">
        <div id="playback-container">
          <wa-button
            @click=${this.previousClicked}
            appearance="plain"
            size="m"
            class="icon-button skip-button"
            aria-label="Previous track"
          >
            ${icon(mdiSkipPrevious)}
          </wa-button>
          <wa-button
            @click=${this.playPauseClicked}
            variant="brand"
            appearance="filled"
            size="l"
            pill
            class="icon-button play-button ${this.song.isPlaying ? 'is-playing' : 'is-paused'}"
            aria-label=${this.song.isPlaying ? 'Pause' : 'Play'}
          >
            ${icon(playPauseIcon)}
          </wa-button>
          <wa-button
            @click=${this.nextClicked}
            appearance="plain"
            size="m"
            class="icon-button skip-button"
            aria-label="Next track"
          >
            ${icon(mdiSkipNext)}
          </wa-button>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      :host {
        display: block;
        height: 100%;
      }

      #spotify-playback {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      #playback-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
      }

      wa-button::part(base) {
        min-width: 46px;
        min-height: 46px;
        padding: 0;
      }

      wa-button::part(label) {
        display: grid;
        width: 100%;
        height: 100%;
        place-items: center;
      }

      .play-button::part(base) {
        min-width: 50px;
        min-height: 50px;
      }

      .control-icon {
        display: block;
        width: 27px;
        height: 27px;
      }

      .play-button .control-icon {
        width: 31px;
        height: 31px;
      }

      .play-button.is-paused .control-icon {
        transform: translateX(1px);
      }
    `];
  }
}

if (!customElements.get('media-control')) {
  customElements.define('media-control', MediaControl);
}
