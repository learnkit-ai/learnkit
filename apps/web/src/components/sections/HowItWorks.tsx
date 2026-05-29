import { Eyebrow } from '@/components/ui/primitives';

const STEPS = [
  {
    n: '01',
    title: 'Tell the AI Guide about your work',
    body: 'Role, stack, and one sentence about what you want to ship. Takes 90 seconds.',
  },
  {
    n: '02',
    title: 'Get a 30-day path',
    body: 'Lessons, projects, and a final practicum - sequenced for your job, not a generic curriculum.',
  },
  {
    n: '03',
    title: 'Build in the workbench',
    body: 'Real prompts, real agents, real outputs. The AI Guide reviews each one and tells you exactly where it breaks.',
  },
  {
    n: '04',
    title: 'Ship to your team',
    body: 'Pass the practicum and you ship to production with a credential your manager actually recognizes.',
  },
];

export function HowItWorks() {
  return (
    <section
      className="lk-section-pad lk-section"
      style={{
        padding: '88px 56px 64px',
        background: 'var(--paper-2)',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, maxWidth: 720 }}>
          <Eyebrow>How it works</Eyebrow>
          <h2
            className="serif lk-section-title"
            style={{
              fontSize: 48,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '12px 0 14px',
              fontWeight: 400,
            }}
          >
            Less <span style={{ fontStyle: 'italic' }}>watching</span>. More building.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 580 }}>
            Most AI training is a video library. LearnKit AI gives you a 30-day path, a
            workbench, and a tutor that reads your prompts - built for the work, not the
            certificate.
          </p>
        </div>

        <div
          className="lk-how-grid lk-grid-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--rule)',
            border: '1px solid var(--rule)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                background: 'var(--surface)',
                padding: 26,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 240,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  color: 'var(--muted)',
                  letterSpacing: '0.05em',
                  marginBottom: 24,
                }}
              >
                {s.n}
              </span>
              <h3
                className="serif"
                style={{
                  fontSize: 21,
                  lineHeight: 1.15,
                  margin: '0 0 10px',
                  letterSpacing: '-0.02em',
                  fontWeight: 500,
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
