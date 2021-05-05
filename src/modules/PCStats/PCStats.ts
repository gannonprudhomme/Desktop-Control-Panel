import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';
import PCStatData from '../../../types/PCStats';

// TODO: In the future, in the spirit of HA, should make this module so we can just pass in any
// { stat-name, value } pair and have it generate some form of display for it

// Could show graphs?

// We probably need to get this type from somewhere
export default class PCStats extends LitElement {
//   @property({type: Object }) public hass: Hass;
  @property({ type: Object }) public stats: PCStatData;

  protected render(): TemplateResult {
    // TODO: Format these depending on what unit we're using
    const conv = new Map<string, string>(Object.entries({
      'CPU Temp': `${this.stats.cpuTemp}°C`,
      'GPU Temp': `${this.stats.gpuTemp}°C`,
      'CPU Usage': `${this.stats.cpuUsage}%`,
      'Memory Usage': `${this.stats.memoryUsage}%`,
    }));

    const rows: TemplateResult[] = [];
    conv.forEach((val, key) => {
      rows.push(html`
        <div>
          <span>${key}:</span>
          <!-- TODO: Check for non-percentage values? -->
          <span>${val}</span>
        </div>
      `);
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

if (!customElements.get('pc-stats')) {
  customElements.define('pc-stats', PCStats);
}