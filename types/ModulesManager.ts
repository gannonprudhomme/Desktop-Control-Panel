import LightControlModule from '../src/modules/LightControl/LightControlModule';
import PCStatsModule from '../src/modules/PCStats/PCStatsModule';
import RpiBacklightModule from '../src/modules/RpiBacklight/RpiBacklightModule';
import DesktopProcessesModule from '../src/modules/DesktopProcesses/DesktopProcessesModule';
import Module from './Module';

export default function getModules(modulesIn: string[]): Module[] {
  const dp = new DesktopProcessesModule();
  const lc = new LightControlModule();
  const pc = new PCStatsModule();
  const tablet = new RpiBacklightModule();

  const mapped = new Map(Object.entries({
    desktop_processes: dp,
    light_control: lc,
    pc_stats: pc,
    tablet_control: tablet,
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
