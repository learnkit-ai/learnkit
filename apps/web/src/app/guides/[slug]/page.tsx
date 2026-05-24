import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow, AmbientArc } from '@/components/ui/primitives';
import { GUIDES } from '@/lib/guides-data';

const SITE_URL = 'https://learnkit-ai.com';

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};

  const title = guide.title;
  const description = guide.intro.slice(0, 155);

  return {
    title,
    description,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/guides/${guide.slug}`,
      title,
      description,
      siteName: 'LearnKit AI',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const related = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3).map((g) => ({
    href: `/guides/${g.slug}`,
    label: g.title,
    sub: `${g.readingMinutes} min read`,
  }));

  return (
    <main className="paper-grain" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section
        className="lk-section-pad lk-section"
        style={{ padding: '72px 56px 56px', position: 'relative', overflow: 'hidden' }}
      >
        <AmbientArc style={{ top: -120, right: -120 }} size={460} color="var(--accent-3)" />
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Eyebrow color="var(--accent-3)">Integration guide</Eyebrow>
          <h1
            className="serif lk-hero-title"
            style={{
              fontSize: 58,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '18px 0 22px',
              fontWeight: 400,
              maxWidth: 860,
            }}
          >
            {guide.title}.
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: 'var(--ink-soft)',
              maxWidth: 720,
              marginBottom: 12,
            }}
          >
            {guide.intro}
          </p>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--muted)',
              marginBottom: 28,
            }}
          >
            {guide.readingMinutes} min read
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/demo" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Try the demo <ArrowR />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Guide sections */}
      <section className="lk-section-pad lk-section" style={{ padding: '8px 56px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {guide.sections.map((section, i) => (
            <div
              key={i}
              style={{
                marginBottom: 56,
                paddingBottom: 56,
                borderBottom: i < guide.sections.length - 1 ? '1px solid var(--rule)' : 'none',
              }}
            >
              <h2
                className="serif"
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  margin: '0 0 16px',
                  color: 'var(--ink)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Step {i + 1}
                </span>
                {section.heading}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
                {section.body}
              </p>
              {section.code && (
                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--rule)',
                    borderRadius: 12,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '8px 16px',
                      background: 'var(--paper-2)',
                      borderBottom: '1px solid var(--rule)',
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--muted)',
                    }}
                  >
                    {section.lang ?? 'code'}
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: '20px',
                      fontFamily: 'var(--mono)',
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: 'var(--ink)',
                      overflowX: 'auto',
                      whiteSpace: 'pre',
                    }}
                  >
                    <code>{section.code}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related guides */}
      {related.length > 0 && (
        <section
          className="lk-section-pad lk-section"
          style={{
            padding: '64px 56px 96px',
            background: 'var(--paper-2)',
            borderTop: '1px solid var(--rule)',
          }}
        >
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <Eyebrow color="var(--accent-3)">More guides</Eyebrow>
            <h2
              className="serif lk-section-title-md"
              style={{ fontSize: 36, letterSpacing: '-0.025em', margin: '12px 0 28px', fontWeight: 400 }}
            >
              Keep building.
            </h2>
            <div
              className="lk-grid-3"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}
            >
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--rule)',
                    borderRadius: 12,
                    padding: 18,
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.015em' }}>
                      {r.label}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 2 }}>
                      {r.sub}
                    </div>
                  </div>
                  <ArrowR size={12} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
