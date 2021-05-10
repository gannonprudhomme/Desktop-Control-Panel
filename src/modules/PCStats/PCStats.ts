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
    if (!this.stats) {
      return html`
        <div class="unavailable-text">
          PC Stat data not provided.
        </div>
      `;
    }

    const format = (num: number) => {
      if (num) {
        return num.toFixed(0);
      }

      return -1;
    };

    // TODO: Format these depending on what unit we're using
    const conv = new Map<string, string>(Object.entries({
      'CPU Temp': `${format(this.stats.cpuTemp)}°C`,
      'GPU Temp': `${format(this.stats.gpuTemp)}°C`,
      'CPU Usage': `${format(this.stats.cpuUsage)}%`,
      'Memory Usage': `${format(this.stats.memoryUsage)}%`,
    }));

    const rows: TemplateResult[] = [];
    conv.forEach((val, key) => {
      rows.push(html`
        <div class="stat-row">
          <span>${key}:</span>
          <!-- TODO: Check for non-percentage values? -->
          <span>${val}</span>
        </div>
      `);
    });

    return html`
      <div id="pc-stats">
        ${rows}
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #pc-stats {
        display: flex;
        flex-direction: column;
        padding: 8px 8px;
      }

      .stat-row {
        font-size: 24px;
        padding-bottom: 8px;
      }

      .unavailable-text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 20px;
      }
    `;
  }
}

if (!customElements.get('pc-stats')) {
  customElements.define('pc-stats', PCStats);
}
