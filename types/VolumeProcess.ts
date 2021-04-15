// TODO: Should this be in this folder?
export default interface VolumeProcess {
  pid: number;
  name: string;
  volume: number;
  priority: number;
  dominantColor?: string; // hex value for the dominat color
};
