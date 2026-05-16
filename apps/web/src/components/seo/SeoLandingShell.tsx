import type { ReactNode } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow, AmbientArc, ToolIcon } from '@/components/ui/primitives';

export function SeoLandingShell({
  eyebrow,
  title,
  intro,
  primaryColor,
  ctaHref = '/demo',
  ctaLabel = 'Build your path',
  children,
  relatedHeading,
  related,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  primaryColor: string;
  ctaHref?: string;
  ctaLabel?: string;
  children?: ReactNode;
  relatedHeading?: string;
  related?: { href: string; label: string; sub?: string; tool?: string }[];
}) {
  return (
    <main
      className="paper-grain"
      style={{ background: 'var(--paper)', minHeight: '100vh', overflow: 'hidden' }}
    >
      <Nav />

      <section
        className="lk-section-pad lk-section"
        style={{ padding: '72px 56px 56px', position: 'relative', overflow: 'hidden' }}
      >
        <AmbientArc style={{ top: -120, right: -120 }} size={460} color={primaryColor} />
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Eyebrow color={primaryColor}>{eyebrow}</Eyebrow>
          <h1
            className="serif lk-hero-title"
            style={{
              fontSize: 68,
              lineHeight: 1,
              letterSpacing: '-0.035em',
              margin: '18px 0 22px',
              fontWeight: 400,
              maxWidth: 920,
            }}
          >
            {title}
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
            {intro}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href={ctaHref} style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                {ctaLabel} <ArrowR />
              </Button>
            </Link>
            <Link href="/developers" style={{ textDecoration: 'none' }}>
              <Button variant="ghost" size="lg">
                For developers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {children}

      {related && related.length > 0 && (
        <section
          className="lk-section-pad lk-section"
          style={{
            padding: '64px 56px 96px',
            background: 'var(--paper-2)',
            borderTop: '1px solid var(--rule)',
          }}
        >
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <Eyebrow>{relatedHeading ?? 'Related tracks'}</Eyebrow>
            <h2
              className="serif lk-section-title-md"
              style={{
                fontSize: 36,
                letterSpacing: '-0.025em',
                margin: '12px 0 28px',
                fontWeight: 400,
              }}
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
                  {r.tool ? <ToolIcon name={r.tool} size={28} /> : null}
                  <div style={{ flex: 1 }}>
                    <div
                      className="serif"
                      style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.015em' }}
                    >
                      {r.label}
                    </div>
                    {r.sub && (
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--muted)',
                          fontFamily: 'var(--mono)',
                          marginTop: 2,
                        }}
                      >
                        {r.sub}
                      </div>
                    )}
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
