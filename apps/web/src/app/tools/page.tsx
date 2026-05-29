import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow, ToolIcon } from '@/components/ui/primitives';
import { SITE_URL, TOOLS } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Learn 40+ AI tools - Claude, Cursor, ChatGPT & more',
  description:
    'Project-based learning paths for every major AI tool. Pick your tool, get a 30-day path, ship something Friday.',
  alternates: { canonical: '/tools' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tools`,
    title: 'Learn 40+ AI tools - LearnKit AI',
    description:
      'Project-based learning paths for Claude, Cursor, ChatGPT, Copilot, Midjourney, Notion AI, Perplexity, Gemini and 32 more.',
  },
};

export default function ToolsIndex() {
  return (
    <main
      className="paper-grain"
      style={{ background: 'var(--paper)', minHeight: '100vh', overflow: 'hidden' }}
    >
      <Nav />
      <section
        className="lk-section-pad lk-section"
        style={{ padding: '72px 56px 32px' }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Eyebrow>Tool library</Eyebrow>
          <h1
            className="serif lk-hero-title"
            style={{
              fontSize: 64,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              margin: '18px 0 18px',
              fontWeight: 400,
            }}
          >
            Pick a tool. Get a{' '}
            <span style={{ fontStyle: 'italic' }}>30-day path</span>.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--ink-soft)',
              lineHeight: 1.55,
              maxWidth: 720,
              marginBottom: 0,
            }}
          >
            Every tool track is project-based, reviewed by the AI Guide, and updated every other
            week with the vendor&apos;s latest features.
          </p>
        </div>
      </section>

      <section className="lk-section-pad lk-section" style={{ padding: '32px 56px 96px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            className="lk-grid-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}
          >
            {TOOLS.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: 14,
                  padding: 22,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform .15s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 10,
                  }}
                >
                  <ToolIcon name={t.name} size={32} />
                  <div
                    className="serif"
                    style={{ fontSize: 22, letterSpacing: '-0.02em', fontWeight: 500 }}
                  >
                    {t.name}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'var(--ink-soft)',
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  {t.tagline}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    fontFamily: 'var(--mono)',
                  }}
                >
                  {t.modules} modules · {t.hours}h · {t.vendor}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
