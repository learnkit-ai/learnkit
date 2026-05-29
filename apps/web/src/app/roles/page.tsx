import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow } from '@/components/ui/primitives';
import { ROLES, SITE_URL } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'AI training by role - PMs, engineers, designers and more',
  description:
    'Role-mapped AI curricula for Product Managers, Software Engineers, Designers, Data Analysts and more. 30 days. Project-based. Reviewed by the AI Guide.',
  alternates: { canonical: '/roles' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/roles`,
    title: 'AI training by role - LearnKit AI',
    description:
      'Role-mapped AI curricula for every team. PMs, engineers, designers, analysts, marketers, founders, ops, researchers.',
  },
};

export default function RolesIndex() {
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
          <Eyebrow>By role</Eyebrow>
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
            AI training built for{' '}
            <span style={{ fontStyle: 'italic' }}>your job</span>.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--ink-soft)',
              lineHeight: 1.55,
              maxWidth: 720,
            }}
          >
            Role-mapped curricula that take you from prompts you can copy-paste to AI workflows
            you can ship to production.
          </p>
        </div>
      </section>

      <section className="lk-section-pad lk-section" style={{ padding: '32px 56px 96px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            className="lk-grid-2"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}
          >
            {ROLES.map((r) => (
              <Link
                key={r.slug}
                href={`/roles/${r.slug}`}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: 14,
                  padding: 24,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <h2
                  className="serif"
                  style={{
                    fontSize: 24,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    fontWeight: 500,
                    margin: '0 0 8px',
                  }}
                >
                  {r.tagline}
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--ink-soft)',
                    lineHeight: 1.55,
                    margin: '0 0 12px',
                  }}
                >
                  {r.blurb}
                </p>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    fontFamily: 'var(--mono)',
                  }}
                >
                  Stack: {r.tools.join(' · ')}
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
