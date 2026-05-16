import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';

const AUDIENCES = [
  {
    tag: 'For individuals',
    title: 'Get good at the AI tools your team already uses.',
    copy: 'Pick a role, pick your stack, ship something Friday. Adaptive curriculum, real projects, reviewed by the AI Guide.',
    bullets: ['40+ tool tracks', 'Project-based assessments', 'LearnKit AI Practitioner credential'],
    cta: 'Try free for 7 days',
    tone: 'var(--accent)',
  },
  {
    tag: 'For teams & L&D',
    title: 'Roll out AI capability across hundreds of seats.',
    copy: 'SCIM, SSO, role-mapped curricula, and dashboards that show what your team can build — not just what they watched.',
    bullets: ['SSO + SCIM (Okta, Azure)', 'Role-mapped curricula', 'Manager evidence reports'],
    cta: 'Book a 20-min demo',
    tone: 'var(--accent-3)',
  },
  {
    tag: 'For developers',
    title: 'Open SDKs to embed the AI Guide in your own product.',
    copy: 'Three lines of JS adds adaptive lessons, evals, and an in-product tutor to anything you ship.',
    bullets: ['MIT-licensed SDKs · GitHub', 'REST + Webhooks', 'White-label AI Guide'],
    cta: 'Read the docs',
    tone: 'var(--accent-4)',
  },
];

export function PathsForEveryone() {
  return (
    <section
      id="audiences"
      style={{ padding: '32px 56px 80px', borderTop: '1px solid var(--rule)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ paddingTop: 48, marginBottom: 40, maxWidth: 720 }}>
          <Eyebrow>One product. Three doors.</Eyebrow>
          <h2
            className="serif"
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
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
                <Button variant="ghost" size="sm">
                  {a.cta} <ArrowR size={11} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
