import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../../types/types';
import Song from '../../types/Song';
import './TrackDisplay';
import './MediaControl';
import './ModuleSwitcher';
import DCPConfig from '../../types/Config';
import Module from '../../types/Module';
import { borderBoxStyles } from '../theme';

export function getSongFromSpotify(hass: HomeAssistant, config: DCPConfig): Song {
  if (!config.spotify_name) {
    console.log('ERROR: No spotify_name passed in as argument');
    return null;
  }

  const spotifyState = hass.states[config.spotify_name];

  if (!spotifyState) {
    // We need to show this to the user somehow
    console.log('ERROR: no state');
    return null;
  }

  const attr = spotifyState.attributes;

  return {
    title: attr.media_title,
    artistName: attr.media_artist,
    albumArt: attr.entity_picture,
    isPlaying: spotifyState.state === 'playing',
  };
}

// We probably need to get this type from somewhere
export default class BottomRow extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Object }) public config: DCPConfig;
  @property({ type: Object }) public currentModule: Module
  @property({ type: Array }) public modules: Module[]

  protected render(): TemplateResult {
    const song = getSongFromSpotify(this.hass, this.config);

    return html`
      <div id="bottom-row">
        <track-display .song=${song}></track-display>
        <media-control
          .hass=${this.hass}
          .song=${song}
          .mediaPlayerId=${this.config.spotify_name}>
        </media-control>
        <module-switcher .modules=${this.modules} .currentModule=${this.currentModule}>
        </module-switcher>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      #bottom-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: stretch;
        gap: 10px;
        height: 100%;
      }

      track-display,
      media-control,
      module-switcher {
        display: block;
        height: 72px;
        min-height: 72px;
      }
    `];
  }
}

if (!customElements.get('bottom-row')) {
  customElements.define('bottom-row', BottomRow);
}
