import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import './TimeDisplay';

// We probably need to get this type from somewhere
export default class TopRow extends LitElement {
//   @property({type: Object }) public hass: Hass;

  protected render(): TemplateResult {
    return html`
      <div id="top-row">
        <div>PC Controls</div>
        <time-display></time-display>
        <div>Weather</div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #top-row {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        grid-template-rows: 100%;
        justify-content: space-between;
        align-items: center;

        height: 100%;
      }
    `;
  }
}

if (!customElements.get('top-row')) {
  customElements.define('top-row', TopRow);
}
