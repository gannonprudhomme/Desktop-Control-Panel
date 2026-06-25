import type { TemplateResult } from 'lit';
import DCPConfig from './Config';
import { HomeAssistant } from './types';

export default interface Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant, config: DCPConfig) => TemplateResult;
  active: boolean; // If it's currently active (and should be shown as an option)
}

export const updateCurrentModuleEventName = 'update-current-module';

declare global {
  interface HTMLElementEventMap {
    'update-current-module': CustomEvent<{ module: Module }>;
  }
}
