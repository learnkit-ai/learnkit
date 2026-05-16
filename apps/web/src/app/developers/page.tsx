import type { Metadata } from 'next';
import { DeveloperHero } from '@/components/developers/DeveloperHero';
import { EndpointGrid } from '@/components/developers/EndpointGrid';
import { TutorWidget } from '@/components/developers/TutorWidget';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Developers · LearnKit AI',
  description:
    'Open SDKs and a REST API for embedding adaptive learning paths and the AI Guide into your product.',
};

export default function DevelopersPage() {
  return (
    <main
      style={{
        background: 'var(--paper)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DeveloperHero />
      <EndpointGrid />
      <TutorWidget />
      <Footer />
    </main>
  );
}
