import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow, AmbientArc, ToolIcon } from '@/components/ui/primitives';
import { COMPARISONS, SITE_URL } from '@/lib/compare-data';

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const page = COMPARISONS.find((c) => c.slug === slug);
  if (!page) return {};

  const title = page.tagline;
  const description = page.intro.slice(0, 155);

  return {
    title,
    description,
    keywords: page.keywords,
    alternates: { canonical: `/compare/${page.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/compare/${page.slug}`,
      title,
      description,
      siteName: 'LearnKit AI',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = COMPARISONS.find((c) => c.slug === slug);
  if (!page) notFound();

  const related = COMPARISONS.filter((c) => c.slug !== page.slug).slice(0, 3).map((c) => ({
    href: `/compare/${c.slug}`,
    label: c.tagline,
    sub: c.role,
  }));

  return (
    <main className="paper-grain" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section
        className="lk-section-pad lk-section"
        style={{ padding: '72px 56px 56px', position: 'relative', overflow: 'hidden' }}
      >
        <AmbientArc style={{ top: -120, right: -120 }} size={460} color="var(--accent-2)" />
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Eyebrow color="var(--accent-2)">Head to head</Eyebrow>
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
            {page.toolA}{' '}
            <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>vs</span>{' '}
            {page.toolB}
            <br />
            <span style={{ color: 'var(--accent-2)', fontStyle: 'italic' }}>
              for {page.role}s
            </span>
            .
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: 'var(--ink-soft)',
              maxWidth: 720,
              marginBottom: 28,
            }}
          >
            {page.intro}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/demo" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Build your path <ArrowR />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tool badges */}
      <section
        className="lk-section-pad lk-section"
        style={{ padding: '0 56px 48px' }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--surface)',
              border: '1px solid var(--rule)',
              borderRadius: 12,
              padding: '14px 20px',
            }}
          >
            <ToolIcon name={page.toolA} size={32} />
            <span
              className="serif"
              style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}
            >
              {page.toolA}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            vs
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--surface)',
              border: '1px solid var(--rule)',
              borderRadius: 12,
              padding: '14px 20px',
            }}
          >
            <ToolIcon name={page.toolB} size={32} />
            <span
              className="serif"
              style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}
            >
              {page.toolB}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginLeft: 'auto',
            }}
          >
            For {page.role}s
          </span>
        </div>
      </section>

      {/* Comparison table */}
      <section
        className="lk-section-pad lk-section"
        style={{ padding: '8px 56px 64px' }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Eyebrow>Dimension by dimension</Eyebrow>
          <h2
            className="serif lk-section-title-md"
            style={{ fontSize: 36, letterSpacing: '-0.025em', margin: '12px 0 28px', fontWeight: 400 }}
          >
            Where each tool wins.
          </h2>

          {/* Header row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 1,
              background: 'var(--rule)',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'var(--paper-2)',
                padding: '12px 20px',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
              }}
            >
              Dimension
            </div>
            <div
              style={{
                background: 'var(--paper-2)',
                padding: '12px 20px',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <ToolIcon name={page.toolA} size={16} /> {page.toolA}
            </div>
            <div
              style={{
                background: 'var(--paper-2)',
                padding: '12px 20px',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <ToolIcon name={page.toolB} size={16} /> {page.toolB}
            </div>
          </div>

          {page.points.map((point, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 1,
                background: 'var(--rule)',
                borderRadius: i === page.points.length - 1 ? '0 0 12px 12px' : 0,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: 'var(--surface)',
                  padding: '16px 20px',
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--ink)',
                }}
              >
                {point.dimension}
              </div>
              <div style={{ background: 'var(--surface)', padding: '16px 20px', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
                {point.a}
              </div>
              <div style={{ background: 'var(--surface)', padding: '16px 20px', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
                {point.b}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verdict */}
      <section
        className="lk-section-pad lk-section"
        style={{
          padding: '64px 56px',
          background: 'var(--paper-2)',
          borderTop: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Eyebrow color="var(--accent-2)">Verdict</Eyebrow>
          <p
            className="serif"
            style={{
              fontSize: 22,
              lineHeight: 1.55,
              letterSpacing: '-0.015em',
              margin: '16px 0 0',
              color: 'var(--ink)',
            }}
          >
            {page.verdict}
          </p>
        </div>
      </section>

      {/* Related comparisons */}
      {related.length > 0 && (
        <section
          className="lk-section-pad lk-section"
          style={{ padding: '64px 56px 96px' }}
        >
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <Eyebrow>More comparisons</Eyebrow>
            <h2
              className="serif lk-section-title-md"
              style={{ fontSize: 36, letterSpacing: '-0.025em', margin: '12px 0 28px', fontWeight: 400 }}
            >
              Keep exploring.
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
