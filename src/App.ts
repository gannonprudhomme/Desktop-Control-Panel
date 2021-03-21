import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import './TopRow/TopRow';
import './MiddleRow/MiddleRow';
import './BottomRow/BottomRow';

// We probably need to get this type from somewhere
interface Hass {
  // callWS: Function;
  something: boolean;
}

// Might as well merge this into index.ts
export default class App extends LitElement {
  @property({ type: Object }) public hass: Hass;

  protected render(): TemplateResult {
    return html`
      <div class="grid-container">
        <top-row></top-row>
        <middle-row></middle-row>
        <bottom-row></bottom-row>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .grid-container {
        display: grid;
        grid-template-rows: 10% 74% 16%;
        height: 100%;
        width: 97%;
        padding-left: 1.5%;
      }
    `;
  }
}
