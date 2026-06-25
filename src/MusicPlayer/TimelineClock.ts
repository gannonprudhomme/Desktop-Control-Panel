export interface TimelineSource {
  track: string;
  isPlaying: boolean;
  duration: number;
  position: number;
  positionUpdatedAt: string;
}

const PLAYING_DRIFT_TOLERANCE = 1.5;
const PAUSED_DRIFT_TOLERANCE = 0.05;
const SEEK_CONFIRMATION_TIMEOUT = 2000;

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function getSourcePosition(source: TimelineSource, now: number): number {
  let position = source.position;

  if (source.isPlaying && source.positionUpdatedAt) {
    const updatedAt = Date.parse(source.positionUpdatedAt);

    if (!Number.isNaN(updatedAt)) {
      position += (now - updatedAt) / 1000;
    }
  }

  return clamp(position, 0, source.duration);
}

export default class TimelineClock {
  private anchor: number | null = null;
  private anchorTime = 0;
  private sourceUpdatedAt = '';
  private track = '';
  private wasPlaying = false;
  private pendingSeekUntil = 0;

  project(source: TimelineSource, now = Date.now()): number {
    if (!source.duration) {
      return 0;
    }

    const sourcePosition = getSourcePosition(source, now);

    if (
      this.anchor === null
      || source.track !== this.track
    ) {
      this.reset(source, sourcePosition, now);
    } else {
      if (source.isPlaying !== this.wasPlaying) {
        if (now < this.pendingSeekUntil) {
          this.anchor = this.projectAnchor(now);
          this.anchorTime = now;
          this.wasPlaying = source.isPlaying;
        } else {
          this.reset(source, sourcePosition, now);
        }
      }

      const sourceDifference = Math.abs(sourcePosition - this.projectAnchor(now));
      const driftTolerance = source.isPlaying
        ? PLAYING_DRIFT_TOLERANCE
        : PAUSED_DRIFT_TOLERANCE;

      if (
        source.positionUpdatedAt !== this.sourceUpdatedAt
        && sourceDifference <= driftTolerance
      ) {
        this.sourceUpdatedAt = source.positionUpdatedAt;
        this.pendingSeekUntil = 0;
      } else if (now >= this.pendingSeekUntil) {
        if (sourceDifference > driftTolerance) {
          this.reset(source, sourcePosition, now);
        }
      }
    }

    return clamp(this.projectAnchor(now), 0, source.duration);
  }

  seek(position: number, source: TimelineSource, now = Date.now()): void {
    this.anchor = clamp(position, 0, source.duration);
    this.anchorTime = now;
    this.sourceUpdatedAt = source.positionUpdatedAt;
    this.track = source.track;
    this.wasPlaying = source.isPlaying;
    this.pendingSeekUntil = now + SEEK_CONFIRMATION_TIMEOUT;
  }

  private projectAnchor(now: number): number {
    return (this.anchor ?? 0)
      + (this.wasPlaying ? (now - this.anchorTime) / 1000 : 0);
  }

  private reset(source: TimelineSource, position: number, now: number): void {
    this.anchor = position;
    this.anchorTime = now;
    this.sourceUpdatedAt = source.positionUpdatedAt;
    this.track = source.track;
    this.wasPlaying = source.isPlaying;
    this.pendingSeekUntil = 0;
  }
}
