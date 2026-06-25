import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import type {
  CSSResult, PropertyValues, TemplateResult,
} from 'lit';
import DCPConfig from '../../types/Config';
import { HomeAssistant } from '../../types/types';
import { borderBoxStyles } from '../theme';

interface SpotifyArtist {
  name: string;
}

interface SpotifyTrack {
  name: string;
  uri: string;
  image_url?: string;
  artists?: SpotifyArtist[];
  show?: {
    name?: string;
  };
}

interface SpotifyPlusRecentResponse {
  result: {
    items?: Array<{
      track: SpotifyTrack;
    }>;
  };
}

interface SpotifyPlusQueueResponse {
  result: {
    queue?: SpotifyTrack[];
  };
}

interface MediaListItem {
  key: string;
  title: string;
  artist: string;
  artwork: string;
  uri: string;
}

type MediaList = 'recent' | 'queue';

interface ViewTransitionElement extends HTMLElement {
  startViewTransition(options: {
    callback: () => Promise<void>;
  }): ViewTransition;
}

const MEDIA_LIST_REFRESH_INTERVAL = 10000;
const PLAY_ITEM_REFRESH_DELAY = 500;

export default class Recent extends LitElement {
  @property({ type: Object }) public hass?: HomeAssistant;
  @property({ type: Object }) public config?: DCPConfig;
  @property({ attribute: false }) private recentItems: MediaListItem[] = [];
  @property({ attribute: false }) private queueItems: MediaListItem[] = [];
  @property({ type: String, attribute: false }) private selectedList: MediaList = 'queue';
  @property({ type: Boolean, attribute: false }) private isLoading = false;
  @property({ type: Boolean, attribute: false }) private loadFailed = false;

  private loadedEntityId = '';
  private refreshInterval?: number;
  private refreshInFlight = false;
  private hasLoaded = false;
  private loadRequestId = 0;

  disconnectedCallback(): void {
    if (this.refreshInterval !== undefined) {
      window.clearInterval(this.refreshInterval);
      this.refreshInterval = undefined;
    }
    super.disconnectedCallback();
  }

  protected updated(changedProperties: PropertyValues): void {
    if (
      !this.hass
      || !this.config?.spotifyplus_name
    ) {
      return;
    }

    const entityChanged = this.loadedEntityId !== this.config.spotifyplus_name;

    if (
      (changedProperties.has('hass') || changedProperties.has('config'))
      && entityChanged
    ) {
      this.loadedEntityId = this.config.spotifyplus_name;
      queueMicrotask(() => {
        void this.loadMediaLists();
      });
    }

    if (this.refreshInterval === undefined) {
      this.refreshInterval = window.setInterval(() => {
        void this.loadMediaList(this.selectedList);
      }, MEDIA_LIST_REFRESH_INTERVAL);
    }
  }

  private static normalizeTracks(tracks: SpotifyTrack[]): MediaListItem[] {
    const occurrences = new Map<string, number>();

    return tracks.map((track) => {
      const identity = track.uri || `${track.name}\u0000${(track.artists || [])
        .map((artist) => artist.name).join(',')}`;
      const occurrence = occurrences.get(identity) || 0;
      occurrences.set(identity, occurrence + 1);

      return {
        key: `${encodeURIComponent(identity)}::${occurrence}`,
        title: track.name || 'Unknown title',
        artist: (track.artists || []).map((artist) => artist.name).join(', ')
          || (track.show && track.show.name)
          || 'Unknown artist',
        artwork: track.image_url || '',
        uri: track.uri || '',
      };
    });
  }

  private async updateMediaLists(
    recentItems: MediaListItem[],
    queueItems: MediaListItem[],
  ): Promise<void> {
    const update = async (): Promise<void> => {
      this.recentItems = recentItems;
      this.queueItems = queueItems;
      this.hasLoaded = true;
      await this.updateComplete;
    };
    const list = this.renderRoot.querySelector<ViewTransitionElement>('#media-list');

    if (
      !this.hasLoaded
      || !list?.startViewTransition
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      await update();
      return;
    }

    await list.startViewTransition({ callback: update }).updateCallbackDone;
  }

  private async updateMediaList(listName: MediaList, items: MediaListItem[]): Promise<void> {
    const update = async (): Promise<void> => {
      if (listName === 'recent') {
        this.recentItems = items;
      } else {
        this.queueItems = items;
      }
      this.hasLoaded = true;
      await this.updateComplete;
    };
    const list = this.renderRoot.querySelector<ViewTransitionElement>('#media-list');

    if (
      !list?.startViewTransition
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      await update();
      return;
    }

    await list.startViewTransition({ callback: update }).updateCallbackDone;
  }

  private async callSpotifyPlus<T>(
    service: string,
    data: Record<string, unknown> = {},
  ): Promise<T> {
    if (!this.hass || !this.config?.spotifyplus_name) {
      throw new Error('SpotifyPlus is not configured');
    }

    const result = await this.hass.callService<T>(
      'spotifyplus',
      service,
      {
        entity_id: this.config.spotifyplus_name,
        ...data,
      },
      undefined,
      true,
      true,
    );

    if (!result.response) {
      throw new Error(`SpotifyPlus ${service} returned no response`);
    }

    return result.response;
  }

  private async loadMediaLists(): Promise<void> {
    if (this.refreshInFlight) {
      return;
    }

    this.refreshInFlight = true;
    const requestId = ++this.loadRequestId;
    this.isLoading = true;
    this.loadFailed = false;

    try {
      const [recent, queue] = await Promise.all([
        this.callSpotifyPlus<SpotifyPlusRecentResponse>('get_player_recent_tracks', { limit: 50 }),
        this.callSpotifyPlus<SpotifyPlusQueueResponse>('get_player_queue_info'),
      ]);

      if (requestId !== this.loadRequestId) {
        return;
      }

      await this.updateMediaLists(
        Recent.normalizeTracks(
          (recent.result.items || []).map((item) => item.track),
        ),
        Recent.normalizeTracks(queue.result.queue || []),
      );
    } catch (error) {
      if (requestId !== this.loadRequestId) {
        return;
      }

      console.log(error);
      this.loadFailed = true;
    } finally {
      if (requestId === this.loadRequestId) {
        this.isLoading = false;
        this.refreshInFlight = false;
      }
    }
  }

  private async loadMediaList(listName: MediaList): Promise<void> {
    if (this.refreshInFlight) {
      return;
    }

    this.refreshInFlight = true;
    const requestId = ++this.loadRequestId;

    try {
      const items = listName === 'recent'
        ? Recent.normalizeTracks(
          ((
            await this.callSpotifyPlus<SpotifyPlusRecentResponse>(
              'get_player_recent_tracks',
              { limit: 50 },
            )
          ).result.items || []).map((item) => item.track),
        )
        : Recent.normalizeTracks(
          (
            await this.callSpotifyPlus<SpotifyPlusQueueResponse>('get_player_queue_info')
          ).result.queue || [],
        );

      if (requestId === this.loadRequestId) {
        await this.updateMediaList(listName, items);
        this.loadFailed = false;
      }
    } catch (error) {
      if (requestId === this.loadRequestId) {
        console.log(error);
        this.loadFailed = true;
      }
    } finally {
      if (requestId === this.loadRequestId) {
        this.refreshInFlight = false;
      }
    }
  }

  private selectList(list: MediaList): void {
    if (this.selectedList === list) {
      return;
    }

    this.selectedList = list;
    void this.loadMediaList(list);
  }

  private playItem(item: MediaListItem): void {
    if (!item.uri || !this.hass || !this.config?.spotifyplus_name) {
      return;
    }

    this.hass.callService('media_player', 'play_media', {
      entity_id: this.config.spotifyplus_name,
      media_content_type: item.uri.startsWith('spotify:episode:') ? 'episode' : 'track',
      media_content_id: item.uri,
    })
      .then(() => {
        window.setTimeout(() => {
          void this.loadMediaLists();
        }, PLAY_ITEM_REFRESH_DELAY);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private renderContent(): TemplateResult {
    if (!this.config || !this.config.spotifyplus_name) {
      return html`<p class="status">SpotifyPlus is not configured</p>`;
    }

    if (this.isLoading && !this.hasLoaded) {
      return html`<p class="status">Loading Spotify…</p>`;
    }

    if (this.loadFailed && !this.hasLoaded) {
      return html`
        <div class="status-block">
          <p class="status">Spotify lists unavailable</p>
          <button class="retry-button" type="button" @click=${this.loadMediaLists}>
            Retry
          </button>
        </div>
      `;
    }

    const items = this.selectedList === 'recent' ? this.recentItems : this.queueItems;
    if (!items.length) {
      return html`<p class="status">No ${this.selectedList === 'recent' ? 'recent tracks' : 'queued tracks'}</p>`;
    }

    return html`
      <div id="media-list">
        ${repeat(items, (item) => item.key, (item) => html`
          <button
            class="media-item"
            data-item-key=${item.key}
            type="button"
            aria-label=${`Play ${item.title}${item.artist ? ` by ${item.artist}` : ''}`}
            @click=${(): void => this.playItem(item)}
          >
            <span class="artwork" aria-hidden="true">
              ${item.artwork
    ? html`<img src=${item.artwork} alt="" />`
    : html`<span class="artwork-placeholder"></span>`}
            </span>
            <span class="track-details">
              <span class="track-title">${item.title}</span>
              <span class="track-artist">${item.artist}</span>
            </span>
          </button>
        `)}
      </div>
    `;
  }

  protected render(): TemplateResult {
    return html`
      <section id="recent" aria-label="Spotify">
        <div class="tabs" role="tablist" aria-label="Spotify lists">
          <button
            class=${this.selectedList === 'queue' ? 'tab selected' : 'tab'}
            type="button"
            role="tab"
            aria-selected=${this.selectedList === 'queue' ? 'true' : 'false'}
            @click=${(): void => this.selectList('queue')}
          >
            Queue
          </button>
          <button
            class=${this.selectedList === 'recent' ? 'tab selected' : 'tab'}
            type="button"
            role="tab"
            aria-selected=${this.selectedList === 'recent' ? 'true' : 'false'}
            @click=${(): void => this.selectList('recent')}
          >
            Recents
          </button>
        </div>
        ${this.renderContent()}
      </section>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      :host {
        display: block;
        min-height: 0;
      }

      #recent {
        --media-list-edge-offset: 20px;

        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        gap: 12px;
        height: 100%;
        min-height: 0;
        padding: 20px;
        overflow: hidden;
        border: 1px solid var(--dcp-border);
        border-radius: var(--dcp-radius);
        background:
          linear-gradient(145deg, rgba(255, 255, 255, 0.025), transparent 55%),
          var(--dcp-media-surface);
        box-shadow: var(--dcp-shadow);
      }

      .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        overflow: hidden;
        border: 1px solid var(--dcp-border);
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.32);
      }

      .tab {
        padding: 8px;
        border: 0;
        color: rgba(242, 247, 248, 0.58);
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        background: transparent;
      }

      .tab:first-child {
        border-radius: 11px 0 0 11px;
      }

      .tab:last-child {
        border-radius: 0 11px 11px 0;
      }

      .tab.selected {
        color: var(--dcp-text);
        background: rgba(255, 255, 255, 0.16);
        box-shadow:
          inset 0 0 0 1px rgba(255, 255, 255, 0.08),
          0 4px 12px rgba(0, 0, 0, 0.24);
      }

      .tab:focus-visible,
      .media-item:focus-visible {
        outline: 2px solid var(--dcp-accent-strong);
        outline-offset: 2px;
      }

      #media-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 0;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        margin-right: calc(-1 * var(--media-list-edge-offset));
        padding-right: calc(var(--media-list-edge-offset) - 4px);
        scrollbar-gutter: stable;
        -webkit-overflow-scrolling: touch;
      }

      #media-list::-webkit-scrollbar {
        width: 8px;
      }

      #media-list::-webkit-scrollbar-thumb {
        border: 2px solid transparent;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.24);
        background-clip: padding-box;
      }

      #media-list::-webkit-scrollbar-track {
        background: transparent;
      }

      .media-item {
        view-transition-name: match-element;
        view-transition-class: media-item;
        display: grid;
        flex: 0 0 72px;
        grid-template-columns: 72px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        min-width: 0;
        min-height: 72px;
        padding: 0;
        border: 0;
        border-radius: 12px;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
        background: transparent;
        -webkit-tap-highlight-color: transparent;
      }

      .media-item:active {
        transform: scale(0.98);
      }

      ::view-transition-group(*.media-item) {
        animation-duration: 320ms;
        animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      ::view-transition-old(*.media-item):only-child {
        animation: 220ms ease-in both pop-from-queue;
      }

      @keyframes pop-from-queue {
        to {
          opacity: 0;
          transform: translateY(-12px) scale(0.94);
        }
      }

      .artwork {
        display: block;
        width: 72px;
        height: 72px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background: var(--dcp-surface-raised);
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
      }

      .artwork img,
      .artwork-placeholder {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .artwork-placeholder {
        background:
          linear-gradient(145deg, rgba(74, 215, 215, 0.22), transparent),
          var(--dcp-surface-raised);
      }

      .track-details {
        display: grid;
        gap: 4px;
        min-width: 0;
      }

      .track-title,
      .track-artist {
        display: block;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .track-title {
        color: var(--dcp-text);
        font-size: 16px;
        font-weight: 560;
        line-height: 1.2;
      }

      .track-artist {
        color: var(--dcp-text-muted);
        font-size: 14px;
        line-height: 1.2;
      }

      .status-block {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 12px;
      }

      .status {
        margin: 0;
        color: var(--dcp-text-muted);
        font-size: 13px;
      }

      .retry-button {
        min-width: 72px;
        min-height: 44px;
        padding: 0 16px;
        border: 1px solid var(--dcp-border);
        border-radius: 8px;
        color: var(--dcp-text);
        font: inherit;
        cursor: pointer;
        background: var(--dcp-surface-raised);
      }

      @media (max-width: 760px) {
        #recent {
          --media-list-edge-offset: 16px;

          padding: 16px;
        }

        .media-item {
          gap: 8px;
        }
      }
    `];
  }
}

if (!customElements.get('recent-media')) {
  customElements.define('recent-media', Recent);
}
