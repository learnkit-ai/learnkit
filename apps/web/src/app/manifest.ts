import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LearnKit AI',
    short_name: 'LearnKit',
    description:
      'Open-source TypeScript engine for embedding personalized, role-aware AI learning paths in any product. Apache-2.0.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F0',
    theme_color: '#C8472A',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
