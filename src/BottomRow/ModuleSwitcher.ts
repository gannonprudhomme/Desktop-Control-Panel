import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Module, { updateCurrentModuleEventName } from '../../types/Module';
import icon from '../Icon';

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
        <wa-button
          @click=${action}
          variant=${mod === this.currentModule ? 'brand' : 'neutral'}
          appearance=${mod === this.currentModule ? 'filled' : 'plain'}
          size="m"
          class="module-button"
          aria-label=${mod.name}
          title=${mod.name}
        >
          ${icon(mod.icon)}
        </wa-button>
      `;
    });

    return html`
      <div id="module-swapper">
        <wa-button-group id="control-container" label="Panel modules">
          ${moduleButtons}
        </wa-button-group>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        height: 100%;
      }

      #module-swapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      #control-container {
        box-sizing: border-box;
        height: 100%;
        border: 1px solid var(--dcp-border);
        border-radius: var(--dcp-radius);
        background: var(--dcp-surface-soft);
        padding: 8px;
      }

      .module-button::part(base) {
        min-width: 54px;
        min-height: 54px;
        padding: 0;
      }

      .control-icon {
        width: 24px;
        height: 24px;
      }
    `;
  }
}

if (!customElements.get('module-switcher')) {
  customElements.define('module-switcher', ModuleSwitcher);
}
