import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';

export default class MediaControl extends LitElement {
  protected render(): TemplateResult {
    return html`
    `;
  }

  static get styles(): CSSResult {
    return css`
    `;
  }
}

if (!customElements.get('media-control')) {
  customElements.define('media-control', MediaControl);
}
