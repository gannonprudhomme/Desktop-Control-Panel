import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Module, { updateCurrentModuleEventName } from '../../types/Module';
import themeColor from '../theme';

export default class ModuleSwitcher extends LitElement {
  @property({ type: Array }) public modules: Module[];
  @property({ type: Object }) public currentModule: Module;

  private updateCurrentModule(module: Module): void {
    const event = new CustomEvent(updateCurrentModuleEventName, {
      // Make the event pass through shadow DOM boundaries
      detail: { module },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  protected render(): TemplateResult {
    const moduleButtons = this.modules.map((mod) => {
      const action = () => this.updateCurrentModule(mod);

      return html`
        <div class="button-container">
          <ha-icon-button @click=${action} .path=${mod.icon} class="icon-button">
          </ha-icon-button>
        </div> 
      `;
    });

    return html`
      <div id="module-swapper">
        <div id="control-container">
          ${moduleButtons}
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    const styles = css`
      #module-swapper {
        display: flex;
        justify-content: flex-end;
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
        min-width: 200px;
        height: 100%;
      }

      /* Add greater gaps between buttons to force container to grow */
      .button-container {
        padding: 0 4px;
      }

      .icon-button {
        --mdc-icon-size: 36px;
        --mdc-icon-button-size: 40px;
        color: var(--theme-color);
      }
    `;

    return [themeColor, styles];
  }
}

if (!customElements.get('module-switcher')) {
  customElements.define('module-switcher', ModuleSwitcher);
}
