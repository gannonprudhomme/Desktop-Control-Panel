import { TemplateResult } from 'lit-element';
import { HomeAssistant } from './types';

export default interface Module {
  icon: string;
  name: string;
  component: (hass: HomeAssistant) => TemplateResult;
  index: number; // Determined by the config
  active: boolean; // If it's currently active (and should be shown as an option)
};
