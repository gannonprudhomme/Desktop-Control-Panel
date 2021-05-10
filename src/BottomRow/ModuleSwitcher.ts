import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Module, { updateCurrentModuleEventName } from '../../types/Module';
import createImageButton from '../ImageButton';

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
    const moduleButtons = this.modules.map((mod) => createImageButton(
      () => {
        // TODO: send an event to App so it changes MiddleRow
        this.updateCurrentModule(mod);
      }, mod.icon, 'toggle-button',
    ));

    return html`
      <div id="module-swapper">
        <div id="control-container">
          ${moduleButtons}
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #module-swapper {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 100%;
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
      
      #toggle-button {
        width: 32px;
        height: 32px;
        margin: 16px 0;
      }
    `;
  }
}

if (!customElements.get('module-switcher')) {
  customElements.define('module-switcher', ModuleSwitcher);
}
