import { css } from 'lit';
import type { CSSResult } from 'lit';

export const borderBoxStyles: CSSResult = css`
  :host,
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const theme: CSSResult = css`
  :host {
    color-scheme: dark;
    color: var(--dcp-text);
    font-family: var(
      --ha-card-header-font-family,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif
    );

    --dcp-accent: var(--primary-color, #20c7c7);
    --dcp-accent-strong: #4ad7d7;
    --dcp-background: var(--primary-background-color, #0b1218);
    --dcp-surface: var(--card-background-color, #121d26);
    --dcp-surface-raised: #1a2833;
    --dcp-surface-soft: #15242d;
    --dcp-border: rgba(162, 198, 211, 0.18);
    --dcp-text: var(--primary-text-color, #f2f7f8);
    --dcp-text-muted: var(--secondary-text-color, #9db0ba);
    --dcp-radius: 16px;
    --dcp-radius-small: 8px;
    --dcp-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);

    --wa-color-surface-raised: var(--dcp-surface-raised);
    --wa-color-surface-default: var(--dcp-surface);
    --wa-color-surface-lowered: var(--dcp-background);
    --wa-color-surface-border: var(--dcp-border);
    --wa-color-text-normal: var(--dcp-text);
    --wa-color-text-quiet: var(--dcp-text-muted);
    --wa-color-focus: var(--dcp-accent-strong);
    --wa-color-brand-fill-quiet: rgba(32, 199, 199, 0.12);
    --wa-color-brand-fill-normal: rgba(32, 199, 199, 0.2);
    --wa-color-brand-fill-loud: var(--dcp-accent);
    --wa-color-brand-border-quiet: rgba(32, 199, 199, 0.2);
    --wa-color-brand-border-normal: rgba(32, 199, 199, 0.42);
    --wa-color-brand-border-loud: var(--dcp-accent-strong);
    --wa-color-brand-on-quiet: var(--dcp-accent-strong);
    --wa-color-brand-on-normal: #7ee8e8;
    --wa-color-brand-on-loud: #031516;
    --wa-color-neutral-fill-quiet: rgba(255, 255, 255, 0.035);
    --wa-color-neutral-fill-normal: rgba(255, 255, 255, 0.08);
    --wa-color-neutral-fill-loud: #dce7eb;
    --wa-color-neutral-border-quiet: rgba(255, 255, 255, 0.07);
    --wa-color-neutral-border-normal: rgba(255, 255, 255, 0.14);
    --wa-color-neutral-border-loud: rgba(255, 255, 255, 0.28);
    --wa-color-neutral-on-quiet: var(--dcp-text-muted);
    --wa-color-neutral-on-normal: var(--dcp-text);
    --wa-color-neutral-on-loud: #0b1218;
    --wa-form-control-activated-color: var(--dcp-accent);
    --wa-panel-background-color: var(--dcp-surface);
    --wa-panel-border-color: var(--dcp-border);
    --wa-panel-border-radius: var(--dcp-radius);
    --wa-form-control-border-radius: var(--dcp-radius-small);
    --wa-border-radius-s: 8px;
    --wa-border-radius-m: 12px;
    --wa-border-radius-l: var(--dcp-radius);
    --wa-shadow-m: var(--dcp-shadow);
  }

`;

export default theme;
