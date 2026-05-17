import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';

interface Audience {
  tag: string;
  title: string;
  copy: string;
  bullets: string[];
  cta: string;
  href: string;
  tone: string;
}

const AUDIENCES: Audience[] = [
  {
    tag: 'For individuals',
    title: 'Get good at the AI tools your team already uses.',
    copy: 'Pick a role, pick your stack, ship something Friday. Adaptive curriculum, real projects, reviewed by the AI Guide.',
    bullets: ['40+ tool tracks', 'Project-based lessons', 'Practitioner portfolio'],
    cta: 'Run the demo',
    href: '/demo',
    tone: 'var(--accent)',
  },
  {
    tag: 'For teams',
    title: 'Self-host the whole platform on your own infrastructure.',
    copy: 'Clone the repo, deploy to your own infra, swap the lesson library for your stack. Apache-2.0 — no vendor lock-in.',
    bullets: ['Role-mapped curricula', 'No tracking · no phone-home', 'Fork the eval rubrics'],
    cta: 'Self-host on GitHub',
    href: 'https://github.com/learnkit-ai/learnkit',
    tone: 'var(--accent-3)',
  },
  {
    tag: 'For developers',
    title: 'Open SDKs to embed the AI Guide in your own product.',
    copy: 'Three lines of JSX adds adaptive lessons and an in-product tutor to anything you ship.',
    bullets: ['Apache-2.0 npm packages', 'TypeScript end to end', 'White-label theming'],
    cta: 'Read the docs',
    href: '/developers',
    tone: 'var(--accent-4)',
  },
];

export function PathsForEveryone() {
  return (
    <section
      id="audiences"
      className="lk-section-pad lk-section"
      style={{ padding: '32px 56px 80px', borderTop: '1px solid var(--rule)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ paddingTop: 48, marginBottom: 40, maxWidth: 720 }}>
          <Eyebrow>One product. Three doors.</Eyebrow>
          <h2
            className="serif lk-section-title"
            style={{
              fontSize: 48,
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              margin: '12px 0 14px',
              fontWeight: 400,
            }}
          >
            Built for whoever&apos;s <span style={{ fontStyle: 'italic' }}>asking</span>.
          </h2>
        </div>

        <div className="lk-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {AUDIENCES.map((a) => (
            <div
              key={a.tag}
              style={{
                background: 'var(--surface)',
                borderRadius: 16,
                padding: 28,
                border: '1px solid var(--rule)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 380,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: a.tone,
                }}
              />
              <Eyebrow color={a.tone}>{a.tag}</Eyebrow>
              <h3
                className="serif"
                style={{
                  fontSize: 26,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: '18px 0 10px',
                  fontWeight: 500,
                }}
              >
                {a.title}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.55,
                  margin: '0 0 16px',
                }}
              >
                {a.copy}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 7,
                }}
              >
                {a.bullets.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--ink-soft)' }}>
                    <span style={{ color: a.tone }}>·</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto' }}>
                {a.href.startsWith('http') ? (
                  <a href={a.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button variant="ghost" size="sm">
                      {a.cta} <ArrowR size={11} />
                    </Button>
                  </a>
                ) : (
                  <a href={a.href} style={{ textDecoration: 'none' }}>
                    <Button variant="ghost" size="sm">
                      {a.cta} <ArrowR size={11} />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
