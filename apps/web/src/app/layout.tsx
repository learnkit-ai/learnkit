import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LearnKit AI — The AI workbench for teams that ship',
  description:
    'LearnKit turns Claude, Cursor, ChatGPT and 40 other tools into a curriculum your people learn by building real things at work — reviewed by the AI Guide.',
  metadataBase: new URL('https://learnkit-ai.com'),
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
