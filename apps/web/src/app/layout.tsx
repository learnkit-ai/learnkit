import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LearnKit AI - Learn Claude, Cursor, ChatGPT by building real things',
    template: '%s · LearnKit AI',
  },
  description:
    'The open-source AI workbench for teams that ship. Adaptive 30-day learning paths for Claude, Cursor, ChatGPT, Copilot, Midjourney and 40+ tools. Reviewed by the AI Guide.',
  metadataBase: new URL('https://learnkit-ai.com'),
  applicationName: 'LearnKit AI',
  keywords: [
    'AI training',
    'Claude tutorial',
    'Cursor tutorial',
    'ChatGPT for teams',
    'AI workbench',
    'AI learning platform',
    'AI for product managers',
    'AI for engineers',
    'enterprise AI training',
    'open source AI tutor',
  ],
  authors: [{ name: 'LearnKit AI' }],
  creator: 'LearnKit AI',
  publisher: 'LearnKit AI',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://learnkit-ai.com/',
    siteName: 'LearnKit AI',
    title: 'LearnKit AI - Learn Claude, Cursor, ChatGPT by building real things',
    description:
      'Adaptive 30-day learning paths for Claude, Cursor, ChatGPT and 40+ tools. Open source. Apache-2.0.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnKit AI - The AI workbench for teams that ship',
    description:
      'Adaptive 30-day learning paths for Claude, Cursor, ChatGPT and 40+ tools. Open source.',
    creator: '@learnkit_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
