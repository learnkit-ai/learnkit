import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
  external: ['react', 'react-dom', 'react/jsx-runtime', '@learnkit-ai/schemas', '@learnkit-ai/core'],
  esbuildOptions(opts) {
    opts.jsx = 'automatic';
  },
});
