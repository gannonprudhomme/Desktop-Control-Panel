import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';

// We probably need to get this type from somewhere
export default class MiddleRow extends LitElement {
//   @property({type: Object }) public hass: Hass;

  protected render(): TemplateResult {
    return html`
      <div id="middle-row">
        Middle Row Stuff
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #middle-row {
        width: 100%;
        height: 100%;
        border: 1px solid #00C8C8;
        overflow-y: hidden;
      }
    `;
  }
}

if (!customElements.get('middle-row')) {
  customElements.define('middle-row', MiddleRow);
}
