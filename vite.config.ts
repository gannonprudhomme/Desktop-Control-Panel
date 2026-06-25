import { readdirSync } from 'fs';
import { resolve } from 'path';
import { defineConfig, Plugin } from 'vite';

const artifactName = 'desktop-control-panel.js';

function assertBuildOutput(outDir: string): Plugin {
  return {
    name: 'assert-build-output',
    apply: 'build',
    writeBundle() {
      const actualFiles = readdirSync(outDir).sort();
      const expectedFiles = [artifactName, `${artifactName}.map`].sort();

      if (actualFiles.join('\n') !== expectedFiles.join('\n')) {
        throw new Error(
          `Unexpected build output in ${outDir}.\n`
          + `Expected: ${expectedFiles.join(', ')}\n`
          + `Received: ${actualFiles.join(', ')}`,
        );
      }
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const projectRoot = __dirname;
  const isPreview = command === 'serve';
  const outDir = resolve(
    projectRoot,
    mode === 'home-assistant'
      ? 'config/www/community/Desktop-Control-Panel'
      : 'dist',
  );

  return {
    root: isPreview ? resolve(projectRoot, 'dev') : projectRoot,
    cacheDir: resolve(projectRoot, '.context/preview-dist/.vite'),
    plugins: isPreview ? [] : [assertBuildOutput(outDir)],
    build: {
      target: 'es2021',
      outDir,
      emptyOutDir: true,
      copyPublicDir: false,
      sourcemap: true,
      lib: {
        entry: resolve(projectRoot, 'src/index.ts'),
        formats: ['es'],
        fileName: () => artifactName,
      },
      rollupOptions: {
        output: {
          codeSplitting: false,
        },
      },
    },
  };
});
