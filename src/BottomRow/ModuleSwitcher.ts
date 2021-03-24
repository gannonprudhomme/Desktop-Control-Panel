import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Module from '../../types/Module';

// We probably need to get this type from somewhere
export default class ModuleSwitcher extends LitElement {
  @property({ type: Array }) public modules: Module[];
  @property({ type: Object }) public currentModule: Module;

  protected render(): TemplateResult {
    const modulesHTML = this.modules.map((mod) => {
      const onClick = () => {
        this.currentModule = mod;
      };

      return html`
      <button
        type="button"
        @click=${onClick}
        class="image-button"
      >
        <img src=${`/local${mod.icon}`} class="toggle-button" alt=${mod.name}/>
      </button>
    `;
    });

    return html`
      <div id="view-swapper">
        <div id="control-container">
          ${modulesHTML}
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #view-swapper {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 100%;
        height: 100%;
      }
      #control-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #00C8C8;
        border-radius: 20px;
        width: 85%;
        height: 75%;
      }
      .toggle-button {
        width: 32px;
        height: 32px;
      }
    `;
  }
}

if (!customElements.get('module-switcher')) {
  customElements.define('module-switcher', ModuleSwitcher);
}
