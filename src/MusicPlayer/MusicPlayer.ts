import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { CSSResult, TemplateResult } from 'lit';
import {
  mdiPause, mdiPlay, mdiSkipNext, mdiSkipPrevious,
} from '@mdi/js';
import DCPConfig from '../../types/Config';
import { HomeAssistant } from '../../types/types';
import icon from '../Icon';
import { borderBoxStyles } from '../theme';
import TimelineClock, { TimelineSource } from './TimelineClock';

interface PlaybackDetails {
  title: string;
  artist: string;
  albumArt: string;
  contentId: string;
  isPlaying: boolean;
  duration: number;
  position: number;
  positionUpdatedAt: string;
}

function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;

  return `${minutes}:${remainder.toString().padStart(2, '0')}`;
}

export default class MusicPlayer extends LitElement {
  @property({ type: Object }) public hass?: HomeAssistant;
  @property({ type: Object }) public config?: DCPConfig;

  private progressAnimation?: number;
  private isScrubbing = false;
  private scrubPosition = 0;
  private timelineClock = new TimelineClock();
  private isHoldingProgress = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.scheduleProgressAnimation();
  }

  disconnectedCallback(): void {
    if (this.progressAnimation !== undefined) {
      window.cancelAnimationFrame(this.progressAnimation);
      this.progressAnimation = undefined;
    }
    super.disconnectedCallback();
  }

  protected updated(): void {
    this.syncTimeline();
    this.scheduleProgressAnimation();
  }

  private getPlaybackDetails(): PlaybackDetails | null {
    const mediaPlayer = this.hass && this.config?.spotifyplus_name
      ? this.hass.states[this.config.spotifyplus_name]
      : null;

    if (!mediaPlayer?.attributes.media_title) {
      return null;
    }

    const { attributes } = mediaPlayer;
    const duration = Number(attributes.media_duration) || 0;
    const reportedPosition = Number(attributes.media_position);
    const remaining = Number(attributes.sp_play_time_remaining_est);
    const position = Number.isFinite(reportedPosition)
      ? reportedPosition
      : Math.max(0, duration - (Number.isFinite(remaining) ? remaining : duration));

    const playback = {
      title: attributes.media_title || 'Nothing playing',
      artist: attributes.media_artist || '',
      albumArt: attributes.entity_picture || attributes.sp_nowplaying_image_url || '',
      contentId: attributes.media_content_id || '',
      isPlaying: mediaPlayer.state === 'playing',
      duration,
      position,
      positionUpdatedAt: attributes.media_position_updated_at || mediaPlayer.last_updated || '',
    };

    return playback;
  }

  private getTimelineSource(playback: PlaybackDetails): TimelineSource {
    return {
      track: [
        playback.contentId,
        playback.title,
        playback.artist,
        playback.duration,
      ].join('\n'),
      isPlaying: playback.isPlaying,
      duration: playback.duration,
      position: playback.position,
      positionUpdatedAt: playback.positionUpdatedAt,
    };
  }

  private getProjectedPosition(playback: PlaybackDetails): number {
    return this.timelineClock.project(this.getTimelineSource(playback));
  }

  private syncTimeline(): PlaybackDetails | null {
    const playback = this.getPlaybackDetails();

    if (!playback || this.isScrubbing) {
      return playback;
    }

    const displayedPosition = this.getProjectedPosition(playback);
    this.updateTimelineDisplay(displayedPosition, playback.duration);

    return playback;
  }

  private updateTimelineDisplay(displayedPosition: number, duration: number): void {
    const progress = duration
      ? (displayedPosition / duration) * 100
      : 0;
    const progressControl = this.shadowRoot?.querySelector<HTMLElement>('#progress-control');
    const progressInput = this.shadowRoot?.querySelector<HTMLInputElement>('#progress');
    const elapsedTime = this.shadowRoot?.querySelector<HTMLElement>('#elapsed-time');

    progressControl?.style.setProperty('--progress', `${progress}%`);

    if (progressInput) {
      progressInput.value = String(displayedPosition);
    }

    if (elapsedTime) {
      const formattedPosition = formatTime(displayedPosition);

      if (elapsedTime.textContent !== formattedPosition) {
        elapsedTime.textContent = formattedPosition;
      }
    }
  }

  private scheduleProgressAnimation(): void {
    if (this.progressAnimation !== undefined || this.isScrubbing) {
      return;
    }

    const playback = this.getPlaybackDetails();

    if (!playback?.isPlaying || this.getProjectedPosition(playback) >= playback.duration) {
      return;
    }

    this.progressAnimation = window.requestAnimationFrame(() => {
      this.progressAnimation = undefined;
      this.syncTimeline();
      this.scheduleProgressAnimation();
    });
  }

  private callMediaService(service: string, serviceData = {}): void {
    if (!this.hass || !this.config?.spotifyplus_name) {
      return;
    }

    this.hass.callService('media_player', service, {
      entity_id: this.config.spotifyplus_name,
      ...serviceData,
    })
      .catch((error) => {
        console.log(error);
      });
  }

  private previousClicked(): void {
    this.callMediaService('media_previous_track');
  }

  private playPauseClicked(): void {
    this.callMediaService('media_play_pause');
  }

  private nextClicked(): void {
    this.callMediaService('media_next_track');
  }

  private scrubbed(event: Event): void {
    this.isScrubbing = true;
    this.scrubPosition = Number((event.target as HTMLInputElement).value);
    const playback = this.getPlaybackDetails();

    if (playback) {
      this.updateTimelineDisplay(this.scrubPosition, playback.duration);
    }
  }

  private progressHeld(event: PointerEvent): void {
    const playback = this.getPlaybackDetails();
    const progressInput = event.currentTarget as HTMLInputElement;

    this.isHoldingProgress = true;
    this.isScrubbing = true;
    progressInput.setPointerCapture(event.pointerId);
    this.shadowRoot?.querySelector('#progress-control')?.classList.add('is-held');

    if (playback) {
      this.scrubPosition = this.getProjectedPosition(playback);
    }
  }

  private progressReleased(event: Event): void {
    this.isHoldingProgress = false;
    this.seeked(event);
  }

  private progressCanceled(): void {
    this.isHoldingProgress = false;
    this.isScrubbing = false;
    this.shadowRoot?.querySelector('#progress-control')?.classList.remove('is-held');
    this.syncTimeline();
    this.scheduleProgressAnimation();
  }

  private seeked(event: Event): void {
    if (!this.isScrubbing) {
      return;
    }

    const seekPosition = Number((event.target as HTMLInputElement).value);
    const playback = this.getPlaybackDetails();

    this.isScrubbing = false;
    this.isHoldingProgress = false;
    this.shadowRoot?.querySelector('#progress-control')?.classList.remove('is-held');

    if (!playback) {
      return;
    }

    this.timelineClock.seek(seekPosition, this.getTimelineSource(playback));
    this.callMediaService('media_seek', { seek_position: seekPosition });
    this.syncTimeline();
    this.scheduleProgressAnimation();
  }

  protected render(): TemplateResult {
    const playback = this.getPlaybackDetails();

    if (!playback) {
      return html`
        <section id="music-player" class="unavailable">
          <p>Media player unavailable</p>
        </section>
      `;
    }

    const projectedPosition = this.getProjectedPosition(playback);
    const displayedPosition = this.isScrubbing ? this.scrubPosition : projectedPosition;
    const progress = playback.duration
      ? (displayedPosition / playback.duration) * 100
      : 0;

    return html`
      <section id="music-player" aria-label="Now playing">
        <div id="track">
          <div id="artwork-frame">
            ${playback.albumArt
    ? html`<img id="album-cover" src=${playback.albumArt} alt="" />`
    : html`<div id="album-placeholder" aria-hidden="true"></div>`}
          </div>

          <div id="track-info">
            <h1 id="title">${playback.title}</h1>
            <p id="artist">${playback.artist}</p>
          </div>
        </div>

        <div id="timeline">
          <div id="timestamps">
            <span id="elapsed-time"></span>
            <span>${formatTime(playback.duration)}</span>
          </div>
          <div
            id="progress-control"
            class=${[
    playback.isPlaying && !this.isScrubbing ? 'is-playing' : '',
    this.isHoldingProgress ? 'is-held' : '',
  ].filter(Boolean).join(' ')}
            style=${`--progress: ${progress}%`}
          >
            <div id="progress-track" aria-hidden="true">
              <div id="progress-fill"></div>
              <div id="progress-thumb"></div>
            </div>
            <input
              id="progress"
              type="range"
              min="0"
              max=${playback.duration || 1}
              step="1"
              .value=${String(displayedPosition)}
              aria-label="Track position"
              ?disabled=${!playback.duration}
              @pointerdown=${this.progressHeld}
              @pointerup=${this.progressReleased}
              @pointercancel=${this.progressCanceled}
              @lostpointercapture=${this.progressCanceled}
              @input=${this.scrubbed}
              @change=${this.seeked}
            />
          </div>
        </div>

        <div id="controls">
          <button
            class="transport-button skip-button"
            type="button"
            aria-label="Previous track"
            @click=${this.previousClicked}
          >
            ${icon(mdiSkipPrevious)}
          </button>
          <button
            class="transport-button play-button"
            type="button"
            aria-label=${playback.isPlaying ? 'Pause' : 'Play'}
            @click=${this.playPauseClicked}
          >
            ${icon(playback.isPlaying ? mdiPause : mdiPlay)}
          </button>
          <button
            class="transport-button skip-button"
            type="button"
            aria-label="Next track"
            @click=${this.nextClicked}
          >
            ${icon(mdiSkipNext)}
          </button>
        </div>
      </section>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 0;
      }

      #music-player {
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto auto;
        gap: 12px;
        width: min(100%, 640px);
        height: 100%;
        margin: 0 auto;
        // padding: 8px 16px;
      }

      #music-player.unavailable {
        place-items: center;
        color: var(--dcp-text-muted);
      }

      #track {
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto;
        gap: 12px;
        min-height: 0;
      }

      #artwork-frame {
        width: auto;
        height: 100%;
        max-width: 100%;
        min-height: 0;
        aspect-ratio: 1;
        justify-self: center;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: var(--dcp-radius);
        background: var(--dcp-surface);
        box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32);
      }

      #album-cover,
      #album-placeholder {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: var(--dcp-radius);
        object-fit: contain;
      }

      #album-placeholder {
        background: var(--dcp-surface-raised);
      }

      #track-info {
        min-width: 0;
        width: 100%;
        text-align: center;
      }

      #title,
      #artist {
        display: -webkit-box;
        overflow: hidden;
        overflow-wrap: anywhere;
        text-overflow: ellipsis;
        white-space: normal;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      #title {
        margin: 0;
        color: var(--dcp-text);
        font-size: 32px;
        font-weight: 520;
        line-height: 1.08;
        letter-spacing: -0.025em;
      }

      #artist {
        margin: 4px 0 0;
        color: var(--dcp-text-muted);
        font-size: 18px;
        line-height: 1.25;
      }

      #timeline {
        width: 100%;
      }

      #timestamps {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
        color: var(--dcp-text-muted);
        font-size: 20px;
        font-variant-numeric: tabular-nums;
      }

      #progress-control {
        position: relative;
        width: 100%;
        height: 24px;
      }

      #progress-track {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        height: 3px;
        overflow: visible;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.28);
        transform: translateY(-50%);
      }

      #progress-fill {
        width: var(--progress);
        height: 100%;
        border-radius: inherit;
        background: #f2f2f2;
      }

      #progress-thumb {
        position: absolute;
        top: 50%;
        left: var(--progress);
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #f2f2f2;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.38);
        transform: translate(-50%, -50%);
        transition:
          width 120ms ease,
          height 120ms ease,
          box-shadow 120ms ease;
      }

      #progress-control.is-held #progress-thumb {
        width: 20px;
        height: 20px;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.48);
      }

      #progress {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: 0;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
      }

      #progress:disabled {
        cursor: default;
        opacity: 0.45;
      }

      #controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 32px;
        min-height: 80px;
      }

      .transport-button {
        display: grid;
        flex: 0 0 auto;
        padding: 0;
        place-items: center;
        border: 0;
        color: var(--dcp-text);
        cursor: pointer;
        background: transparent;
        -webkit-tap-highlight-color: transparent;
      }

      .transport-button:focus-visible {
        outline: 2px solid var(--dcp-accent-strong);
        outline-offset: 5px;
      }

      .transport-button:active {
        transform: scale(0.94);
      }

      .skip-button {
        width: 56px;
        height: 56px;
      }

      .skip-button .control-icon {
        width: 44px;
        height: 44px;
      }

      .play-button {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        color: rgba(24, 24, 24, 0.92);
        background: rgba(242, 247, 248, 0.92);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
      }

      .play-button .control-icon {
        width: 40px;
        height: 40px;
      }

      @media (max-width: 560px) {
        #music-player {
          padding-inline: 8px;
        }

        #track {
          gap: 8px;
        }

        #controls {
          gap: 24px;
        }
      }
    `];
  }
}

if (!customElements.get('music-player')) {
  customElements.define('music-player', MusicPlayer);
}
