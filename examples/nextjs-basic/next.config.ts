import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@learnkit-ai/core', '@learnkit-ai/react', '@learnkit-ai/schemas'],
  outputFileTracingRoot: path.join(__dirname, '../..'),
};

export default nextConfig;
