import {
  css, CSSResult, html, LitElement, property, TemplateResult,
} from 'lit-element';

export default class ImageButton extends LitElement {
  @property({ type: Function }) public onClick: () => void;
  @property({ type: String }) public icon: string;
  @property({ type: String }) public altText: string;

  protected render(): TemplateResult {
    return html`
      <button type="button" @click=${this.onClick} class="image-button">
        <img src=${`local${this.icon}`} alt=${this.altText}}></img>
      </button> 
    `;
  }

  static get styles(): CSSResult {
    return css`
      .image-button {
        border-width: 0px !important;
        outline: none;
        background-color: initial;
        align-items: initial;
        display: initial;
        box-sizing: initial;

        width: inherit;
        height: inherit;
      }

      .image-button:active {
        transform: scale(0.8);
        filter: grayscale(0.8);
      }

      .image-button > img {
        width: inherit;
        height: inherit;
      }
    `;
  }
}

if (!customElements.get('image-button')) {
  customElements.define('image-button', ImageButton);
}
