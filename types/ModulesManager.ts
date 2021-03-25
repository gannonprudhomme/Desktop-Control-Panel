import LightControlModule from '../src/modules/LightControl/LightControlModule';
import VolumeMixerModule from '../src/modules/VolumeMixer/VolumeMixerModule';
import Module from './Module';

export default function getModules(modulesIn: string[]): Module[] {
  const vm = new VolumeMixerModule({ index: 0 });
  const lc = new LightControlModule({ index: 0 });

  return [vm, lc];
}
