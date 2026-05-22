import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: false,
  outDir: 'dist',
  external: ['@learnkit-ai/core', '@learnkit-ai/schemas'],
  // Inject the Node.js shebang into the ESM entry so `npx` can execute it
  banner: { js: '#!/usr/bin/env node' },
});
