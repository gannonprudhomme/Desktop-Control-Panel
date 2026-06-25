import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Light from '../../../types/Light';
import { HomeAssistant } from '../../../types/types';
import { borderBoxStyles } from '../../theme';
import './LightSlider';

export default class LightControlView extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Array }) public lights: Light[];

  protected render(): TemplateResult {
    const setLightState = (lightID: string, state: Record<string, unknown>) => {
      this.hass.callService('light', 'turn_on', { ...state, entity_id: lightID });
    };

    const toggleLight = (lightID: string) => {
      this.hass.callService('light', 'toggle', { entity_id: lightID });
    };

    const rows = this.lights.map((light) => html`
      <!-- Spread & recreate light so it will always re-render (hopefully) -->
      <light-slider
        .light=${{ ...light }}
        .setLightState=${setLightState}
        .toggleLight=${toggleLight}
        class="light-slider-margin">
      </light-slider>
    `);

    return html`
      <div id="light-control">
        ${rows}
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      #light-control {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 1px;
        scrollbar-width: thin;
        scrollbar-color: var(--dcp-border) transparent;
      }

      .light-slider-margin {
        flex: 0 0 auto;
        border-right: 1px solid var(--dcp-border);
      }

      .light-slider-margin:last-child {
        border-right: none;
      }
    `];
  }
}

if (!customElements.get('light-control')) {
  customElements.define('light-control', LightControlView);
}
