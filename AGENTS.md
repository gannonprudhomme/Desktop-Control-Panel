# AGENTS.md

## Project overview

Desktop Control Panel is a Home Assistant custom panel written in TypeScript with LitElement. It is
designed for an 800 × 480 tablet display and provides media, volume, lighting, PC-stat, and
Raspberry Pi controls.

## Development commands

- Install dependencies: `npm ci`
- Run the standalone mock preview: `npm run preview`
- Type-check: `npx tsc --noEmit`
- Build the Home Assistant bundle: `npm run build`
- Watch and emit into a local Home Assistant config: `npm run dev`
- Run the legacy lint configuration: `npm run lint`

Conductor's Run action starts the mock preview on `$CONDUCTOR_PORT`. Preview build artifacts belong
under `.context/preview-dist` and must not be committed.

## Repository layout

- `src/`: panel components and modules.
- `types/`: project and Home Assistant interface definitions.
- `dev/`: standalone preview shell, mocked entities, and Home Assistant element shims.
- `dist/`: tracked production bundle consumed by HACS.
- `config/`: gitignored local Home Assistant configuration and watcher output.
- `.conductor/settings.toml`: shared Conductor setup and run configuration.

## Implementation guidance

- Preserve compatibility with TypeScript 4.2, LitElement 2, and Parcel 1 unless a task explicitly
  includes toolchain modernization.
- Keep panel components compatible with Home Assistant property injection (`hass`, `panel`, and
  `narrow`).
- Add preview entities and service behavior to `dev/preview.ts` when new UI depends on Home
  Assistant state.
- Keep the preview self-contained. Do not require a Home Assistant installation for ordinary UI
  development.
- Use the workspace-specific Conductor port for servers; do not introduce a fixed port into the
  Conductor run command.
- Do not commit `.DS_Store`, `node_modules`, `.cache`, `.context` output, `config`, or local
  environment files.

## UI design principles

- Apply these rules only to the active redesign and new UI; leave legacy modules unchanged unless
  explicitly requested.
- Use multiples of `4px` for layout spacing, including padding, margins, gaps, and offsets.
- Reuse established spacing, corner radii, icon sizes, and control dimensions instead of introducing
  near-duplicate values.
- Keep related content visually grouped: internal spacing should be smaller than spacing between
  separate groups.
- Make interactive targets at least `44px` in both dimensions.
- Design and verify the active layout at 800 × 480, ensuring essential controls remain visible
  without accidental overflow.

## Generated files

`dist/desktop-control-panel.js` and `dist/desktop-control-panel.js.map` are tracked release
artifacts. After changing runtime source, run `npm run build` and include both generated files. Do
not edit them manually.

## Validation

For normal source changes, run:

```sh
npx tsc --noEmit
npm run build
```

For preview changes, also start `npm run preview` and verify the page responds successfully. The
legacy ESLint setup currently reports pre-existing rule conflicts and console warnings; distinguish
those baseline failures from errors introduced by the current change.

## Git and workspace notes

- The repository's default branch is `master`; there is no `main` branch.
- The primary checkout may be on `conductor-root` so this Conductor workspace can own `master`.
- Preserve unrelated user changes and do not commit or push unless explicitly requested.
