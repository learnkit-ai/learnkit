import Link from 'next/link';
import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';

interface Distribution {
  name: string;
  desc: string;
  bullets: string[];
  cta: string;
  ctaHref: string;
  command?: string;
  featured?: boolean;
}

const DISTRIBUTIONS: Distribution[] = [
  {
    name: 'Install',
    desc: 'Use the components in any React app.',
    command: 'pnpm add @learnkit-ai/react',
    bullets: [
      'Apache-2.0 — commercial use allowed',
      '<LearningPath />, <AIGuide />, useLearnKit()',
      'No Tailwind dependency · CSS variables only',
      'Three built-in themes · drop into any host',
    ],
    cta: 'View on npm',
    ctaHref: 'https://www.npmjs.com/package/@learnkit-ai/react',
  },
  {
    name: 'Self-host',
    desc: 'Clone, fork, deploy to your own infrastructure.',
    command: 'git clone github.com/learnkit-ai/learnkit',
    featured: true,
    bullets: [
      'Full source: schemas, core, react, marketing site',
      'Next.js 15 App Router · deploys anywhere Node runs',
      'pnpm workspaces + Turborepo',
      'No tracking, no telemetry, no phone-home',
    ],
    cta: 'Star on GitHub',
    ctaHref: 'https://github.com/learnkit-ai/learnkit',
  },
  {
    name: 'Embed',
    desc: 'Drop the AI Guide into your existing product.',
    command: '<AIGuide message="..." />',
    bullets: [
      'Three lines of JSX, no build configuration',
      'White-label the avatar, tone, and lesson library',
      'Works in any framework via the published packages',
      'Fork the eval rubrics for your own use case',
    ],
    cta: 'Read the docs',
    ctaHref: '/developers',
  },
];

export function UseItYourWay() {
  return (
    <section id="install" className="lk-section-pad lk-section" style={{ padding: '88px 56px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <Eyebrow>Three ways to use it</Eyebrow>
          <h2
            className="serif lk-section-title"
            style={{
              fontSize: 44,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '12px 0 10px',
              fontWeight: 400,
            }}
          >
            Open source.{' '}
            <span style={{ fontStyle: 'italic' }}>All of it</span>.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--ink-soft)',
              lineHeight: 1.55,
              maxWidth: 580,
              margin: '12px auto 0',
            }}
          >
            No paid tier. No usage fee. Apache-2.0 from end to end — install it, fork it, embed
            it, deploy it. We do not gate features behind a credit card.
          </p>
        </div>

        <div
          className="lk-pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
            maxWidth: 1080,
            margin: '0 auto',
          }}
        >
          {DISTRIBUTIONS.map((d) => (
            <div
              key={d.name}
              style={{
                background: d.featured ? 'var(--ink)' : 'var(--surface)',
                color: d.featured ? 'var(--paper)' : 'var(--ink)',
                borderRadius: 16,
                padding: 30,
                border: '1px solid var(--rule)',
                boxShadow: d.featured ? 'var(--shadow-3)' : 'var(--shadow-1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {d.featured && (
                <span
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent)',
                    color: '#FFF',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 11,
                    fontFamily: 'var(--mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Recommended
                </span>
              )}
              <div
                className="serif"
                style={{ fontSize: 24, letterSpacing: '-0.02em', marginBottom: 6, fontWeight: 500 }}
              >
                {d.name}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: d.featured ? 'rgba(244,239,227,0.7)' : 'var(--ink-soft)',
                  marginBottom: 20,
                }}
              >
                {d.desc}
              </div>
              {d.command && (
                <pre
                  style={{
                    margin: '0 0 22px',
                    padding: '12px 14px',
                    background: d.featured ? 'rgba(0,0,0,0.3)' : 'var(--paper-2)',
                    borderRadius: 10,
                    fontFamily: 'var(--mono)',
                    fontSize: 12.5,
                    color: d.featured ? 'var(--accent-2)' : 'var(--ink)',
                    border: d.featured ? 'none' : '1px solid var(--rule)',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  <span style={{ opacity: 0.5 }}>$ </span>
                  {d.command}
                </pre>
              )}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 9,
                }}
              >
                {d.bullets.map((f) => (
                  <li
                    key={f}
                    style={{ display: 'flex', gap: 10, fontSize: 13.5, alignItems: 'flex-start' }}
                  >
                    <span style={{ color: d.featured ? 'var(--accent-2)' : 'var(--accent)' }}>
                      ✓
                    </span>
                    <span
                      style={{
                        color: d.featured ? 'rgba(244,239,227,0.85)' : 'var(--ink-soft)',
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto' }}>
                {d.ctaHref.startsWith('http') ? (
                  <a
                    href={d.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      variant={d.featured ? 'accent' : 'ghost'}
                      size="md"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {d.cta} <ArrowR size={12} />
                    </Button>
                  </a>
                ) : (
                  <Link href={d.ctaHref} style={{ textDecoration: 'none' }}>
                    <Button
                      variant={d.featured ? 'accent' : 'ghost'}
                      size="md"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {d.cta} <ArrowR size={12} />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 36,
            textAlign: 'center',
            fontSize: 13,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
          }}
        >
          Apache-2.0 · No credit card · No tracking · No phone-home
        </div>
      </div>
    </section>
  );
}
