import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@learnkit-ai/schemas', '@learnkit-ai/core', '@learnkit-ai/react'],
  outputFileTracingRoot: path.join(__dirname, '../..'),
  webpack(config) {
    // Prefer the "source" condition so workspace packages resolve to their
    // TypeScript source in both dev and CI, without requiring a pre-build.
    config.resolve.conditionNames = [
      'source',
      ...(config.resolve.conditionNames ?? ['import', 'module', 'webpack', 'browser', 'require', 'default']),
    ];
    return config;
  },
};

export default nextConfig;
