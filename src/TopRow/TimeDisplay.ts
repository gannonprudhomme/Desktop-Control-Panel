import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';

function formatTime(now: Date): string {
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour 0 should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
}

// We probably need to get this type from somewhere
export default class TimeDisplay extends LitElement {
  //   @property({type: Object }) public hass: Hass;
  @property({ type: Date }) public date: Date;

  constructor() {
    super();

    this.date = new Date();
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  protected render(): TemplateResult {
    return html`
      <div id="time-container">
        <div id="time">
          ${formatTime(this.date)}
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      #time-container {
        display: flex;
        justify-content: center;
      }

      #time {
        display: flex;
        justify-content: center;
        color: var(--dcp-text);
        font-size: 30px;
        font-variant-numeric: tabular-nums;
        font-weight: 650;
        letter-spacing: -0.03em;
        line-height: 1;
      }
    `;
  }
}

if (!customElements.get('time-display')) {
  customElements.define('time-display', TimeDisplay);
}
