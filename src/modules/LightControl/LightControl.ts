import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import Light from '../../../types/Light';
import { HomeAssistant } from '../../../types/types';
import './LightSlider';

/*
function setLightState(hass: HomeAssistant, state: Record<string, unknown>): void {
  hass.callService('light', 'turn_on', { ...state });
}
*/

// We probably need to get this type from somewhere
export default class LightControl extends LitElement {
  @property({ type: Object }) public hass: HomeAssistant;
  @property({ type: Array }) public lights: Light[];

  protected render(): TemplateResult {
    const setLightState = (lightID: string, state: Record<string, unknown>) => {
      this.hass.callService('light', 'turn_on', { ...state });
    };

    // console.log(this.hass.states);

    const rows = this.lights.map((light) => {
      const thing = 5;
      return html`
        <light-slider .light=${light} .setLightState=${setLightState}></light-slider>
      `;
    });

    return html`
      <div id="middle-row">
        ${rows}
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
