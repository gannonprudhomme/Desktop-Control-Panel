import LightControlModule from '../src/modules/LightControl/LightControlModule';
import PCStatsModule from '../src/modules/PCStats/PCStatsModule';
import VolumeMixerModule from '../src/modules/VolumeMixer/VolumeMixerModule';
import Module from './Module';

export default function getModules(modulesIn: string[]): Module[] {
  const vm = new VolumeMixerModule({ index: 0 });
  const lc = new LightControlModule({ index: 0 });
  const pc = new PCStatsModule({ index: 0 });

  const mapped = new Map(Object.entries({
    volume_mixer: vm,
    light_control: lc,
    pc_stats: pc,
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
