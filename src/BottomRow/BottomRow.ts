import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import { HomeAssistant } from '../../types/types';
import Song from '../../types/Song';
import './TrackDisplay';
import './MediaControl';
import DCPConfig from '../../types/Config';

function getSpotifyAttributes(hass: HomeAssistant, config: DCPConfig): Song {
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

  protected render(): TemplateResult {
    const song = getSpotifyAttributes(this.hass, this.config);

    return html`
      <div id="bottom-row">
        <track-display .song=${song}></track-display>
        <media-control .hass=${this.hass} .song=${song}></media-control>
        <div>module switcher</div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #bottom-row {
        display: grid;
        grid-template-columns: 32% 36% 32%;
        grid-template-rows: 100%;
        height: 100%;
      }
    `;
  }
}

if (!customElements.get('bottom-row')) {
  customElements.define('bottom-row', BottomRow);
}
