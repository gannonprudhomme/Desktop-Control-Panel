import LightControlModule from '../src/modules/LightControl/LightControlModule';
import PCStatsModule from '../src/modules/PCStats/PCStatsModule';
import TabletControlModule from '../src/modules/TabletControl/TabletControlModule';
import VolumeMixerModule from '../src/modules/VolumeMixer/VolumeMixerModule';
import Module from './Module';

export default function getModules(modulesIn: string[]): Module[] {
  const vm = new VolumeMixerModule();
  const lc = new LightControlModule();
  const pc = new PCStatsModule();
  const tablet = new TabletControlModule();

  const mapped = new Map(Object.entries({
    volume_mixer: vm,
    light_control: lc,
    pc_stats: pc,
    tablet,
  }));

  // TODO: Add filtering of modules we don't want
  const modules = modulesIn.map((moduleStr) => {
    const module = mapped.get(moduleStr);

    if (!module) {
      console.error(`${moduleStr} not in module map!`);
      return null;
    }

    return module;
  }).filter((val) => val); // Filter out falsy values (null)

  return modules;
}
