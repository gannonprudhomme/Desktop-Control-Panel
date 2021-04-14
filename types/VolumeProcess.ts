// TODO: Should this be in this folder?
export default interface VolumeProcess {
  /** process id */
  pid: number;
  name: string;
  volume: number; // TODO: Need to validate volume [0, 100]
  dominatColor?: string; // hex value for the dominat color
}