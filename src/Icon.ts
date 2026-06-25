import { html } from 'lit';
import type { TemplateResult } from 'lit';

export default function icon(path: string, className = 'control-icon'): TemplateResult {
  return html`
    <svg class=${className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d=${path}></path>
    </svg>
  `;
}
