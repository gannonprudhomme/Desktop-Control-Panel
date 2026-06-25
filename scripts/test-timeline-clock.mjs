import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const sourcePath = new URL('../src/MusicPlayer/TimelineClock.ts', import.meta.url);
const outputPath = new URL('../.context/test-dist/TimelineClock.mjs', import.meta.url);
const sourceText = await readFile(sourcePath, 'utf8');
const compiled = ts.transpileModule(sourceText, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2021,
  },
});

await mkdir(new URL('.', outputPath), { recursive: true });
await writeFile(outputPath, compiled.outputText);

const { default: TimelineClock } = await import(
  `${pathToFileURL(outputPath.pathname).href}?${Date.now()}`
);
const start = Date.parse('2026-06-25T09:00:00.000Z');

function source(overrides = {}) {
  return {
    track: 'track-a',
    isPlaying: true,
    duration: 240,
    position: 30,
    positionUpdatedAt: new Date(start).toISOString(),
    ...overrides,
  };
}

test('advances continuously from the Home Assistant position timestamp', () => {
  const clock = new TimelineClock();

  assert.equal(clock.project(source(), start), 30);
  assert.equal(clock.project(source(), start + 750), 30.75);
});

test('does not jump for routine source refreshes within drift tolerance', () => {
  const clock = new TimelineClock();
  const refreshed = source({
    position: 31,
    positionUpdatedAt: new Date(start + 1000).toISOString(),
  });

  clock.project(source(), start);

  assert.equal(clock.project(refreshed, start + 1000), 31);
  assert.equal(clock.project(refreshed, start + 1500), 31.5);
});

test('snaps to a genuine external seek', () => {
  const clock = new TimelineClock();

  clock.project(source(), start);

  assert.equal(clock.project(source({
    position: 120,
    positionUpdatedAt: new Date(start + 1000).toISOString(),
  }), start + 1000), 120);
});

test('detects an external position change when the timestamp is unchanged', () => {
  const clock = new TimelineClock();

  clock.project(source(), start);

  assert.equal(clock.project(source({
    isPlaying: false,
    position: 120,
  }), start + 1000), 120);
});

test('applies a small external seek while paused', () => {
  const clock = new TimelineClock();
  const paused = source({
    isPlaying: false,
    position: 30,
  });

  clock.project(paused, start);

  assert.equal(clock.project({
    ...paused,
    position: 31,
    positionUpdatedAt: new Date(start + 1000).toISOString(),
  }, start + 1000), 31);
});

test('does not bounce back to stale state immediately after a local seek', () => {
  const clock = new TimelineClock();
  const initial = source();

  clock.project(initial, start);
  clock.seek(90, initial, start + 500);

  assert.equal(clock.project(source({
    position: 31,
    positionUpdatedAt: new Date(start + 600).toISOString(),
  }), start + 600), 90.1);
});

test('reconciles to source state when a local seek is never acknowledged', () => {
  const clock = new TimelineClock();
  const initial = source();

  clock.project(initial, start);
  clock.seek(90, initial, start + 500);

  assert.equal(clock.project(initial, start + 2600), 32.6);
});

test('preserves a pending local seek across a stale pause update', () => {
  const clock = new TimelineClock();
  const initial = source();

  clock.project(initial, start);
  clock.seek(90, initial, start + 500);

  assert.equal(clock.project(source({
    isPlaying: false,
    position: 31,
    positionUpdatedAt: new Date(start + 600).toISOString(),
  }), start + 600), 90.1);
});

test('accepts the Home Assistant confirmation of a local seek', () => {
  const clock = new TimelineClock();
  const initial = source();
  const confirmed = source({
    position: 90,
    positionUpdatedAt: new Date(start + 600).toISOString(),
  });

  clock.project(initial, start);
  clock.seek(90, initial, start + 500);

  assert.equal(clock.project(confirmed, start + 600), 90.1);
  assert.equal(clock.project(confirmed, start + 1600), 91.1);
});

test('resets immediately when the track changes', () => {
  const clock = new TimelineClock();

  clock.project(source(), start);

  assert.equal(clock.project(source({
    track: 'track-b',
    duration: 180,
    position: 0,
    positionUpdatedAt: new Date(start + 1000).toISOString(),
  }), start + 1000), 0);
});

test('stays fixed while paused and resumes from the pause position', () => {
  const clock = new TimelineClock();
  const paused = source({
    isPlaying: false,
    position: 31,
    positionUpdatedAt: new Date(start + 1000).toISOString(),
  });

  clock.project(source(), start);

  assert.equal(clock.project(paused, start + 1000), 31);
  assert.equal(clock.project(paused, start + 5000), 31);
  assert.equal(clock.project(source({
    position: 31,
    positionUpdatedAt: new Date(start + 5000).toISOString(),
  }), start + 5000), 31);
});
