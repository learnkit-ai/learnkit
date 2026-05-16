import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LearnKit AI',
    short_name: 'LearnKit',
    description:
      'The AI workbench for teams that ship. Learn Claude, Cursor, ChatGPT and 40+ tools by building real things at work.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F0',
    theme_color: '#C8472A',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
