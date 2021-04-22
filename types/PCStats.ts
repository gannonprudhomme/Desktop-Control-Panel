// TODO: Handle optional for these
export default interface PCStatData {
  gpuTemp: number;
  cpuTemp: number; // change this to package or whatever
  harddrives?: string; // Should we do this? Guess this is where customization comes in play
  cpuUsage: number;
  gpuUsage: number;
  memoryUsage: number;
}
