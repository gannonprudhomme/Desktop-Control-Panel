// TODO: Handle optional for these
export default interface PCStatData {
  gpuTemp: number | null;
  cpuTemp: number | null; // change this to package or whatever
  harddrives?: string; // Should we do this? Guess this is where customization comes in play
  cpuUsage: number | null;
  gpuUsage: number | null;
  memoryUsage: number | null;
}
