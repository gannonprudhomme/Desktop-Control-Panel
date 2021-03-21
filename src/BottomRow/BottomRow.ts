import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';

// We probably need to get this type from somewhere
export default class BottomRow extends LitElement {
//   @property({type: Object }) public hass: Hass;

  protected render(): TemplateResult {
    return html`
      <div id="bottom-row">
        Bottom Row Stuff
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
