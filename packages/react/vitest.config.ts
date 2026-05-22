import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@learnkit-ai/schemas': resolve(__dirname, '../schemas/src/index.ts'),
      '@learnkit-ai/core': resolve(__dirname, '../core/src/index.ts'),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
});
