import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { CSSResult, TemplateResult } from 'lit';
import PCStatData from '../../../types/PCStats';
import { borderBoxStyles } from '../../theme';

// TODO: In the future, in the spirit of HA, should make this module so we can just pass in any
// { stat-name, value } pair and have it generate some form of display for it

// Could show graphs?

export default class PCStatsView extends LitElement {
//   @property({type: Object }) public hass: Hass;
  @property({ type: Object }) public stats: PCStatData | null = null;

  protected render(): TemplateResult {
    if (!this.stats) {
      return html`
        <div class="unavailable-text">
          PC Stat data not provided.
        </div>
      `;
    }

    const format = (num: number | null) => {
      if (num !== null && Number.isFinite(num)) {
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
        <wa-card class="stat-card" appearance="filled">
          <div class="stat-row">
            <span class="stat-label">${key}</span>
            <span class="stat-value">${val}</span>
          </div>
        </wa-card>
      `);
    });

    return html`
      <div id="pc-stats">
        ${rows}
      </div>
    `;
  }

  static get styles(): CSSResult[] {
    return [borderBoxStyles, css`
      #pc-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
        gap: 10px;
        width: 100%;
        height: 100%;
      }

      .stat-card {
        display: block;
        height: 100%;
        --spacing: 0;
      }

      .stat-card::part(body) {
        height: 100%;
        padding: 12px 16px;
      }

      .stat-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
      }

      .stat-label {
        color: var(--dcp-text-muted);
        font-size: 12px;
        font-weight: 600;
      }

      .stat-value {
        margin-top: 5px;
        color: var(--dcp-text);
        font-size: 31px;
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        letter-spacing: -0.04em;
      }

      .unavailable-text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 20px;
      }
    `];
  }
}

if (!customElements.get('pc-stats')) {
  customElements.define('pc-stats', PCStatsView);
}
