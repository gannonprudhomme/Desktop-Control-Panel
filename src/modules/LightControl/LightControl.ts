import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';

// We probably need to get this type from somewhere
export default class LightControl extends LitElement {
//   @property({type: Object }) public hass: Hass;

  protected render(): TemplateResult {
    return html`
      <div id="middle-row">
        light control
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #volume-mixer {
        display: flex;
        justify-content: flex-start;
        width: calc(100% - 20px);
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
      }
    `;
  }
}

if (!customElements.get('light-control')) {
  customElements.define('light-control', LightControl);
}