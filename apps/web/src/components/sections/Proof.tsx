import { Eyebrow } from '@/components/ui/primitives';

const STACK = [
  { k: 'Apache-2.0', v: 'license', sub: 'commercial use allowed' },
  { k: 'TypeScript', v: 'strict mode', sub: 'inferred from Zod' },
  { k: '0', v: 'tracking pixels', sub: 'no phone-home, ever' },
  { k: 'Node 20+', v: 'pnpm workspaces', sub: 'Turborepo · Next.js 15' },
];

export function Proof() {
  return (
    <section
      className="lk-section-pad lk-section"
      style={{
        padding: '88px 56px',
        background: 'var(--ink)',
        color: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Eyebrow color="var(--accent-2)">What you actually get</Eyebrow>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 56,
            alignItems: 'flex-start',
            marginTop: 28,
          }}
          className="lk-split"
        >
          <h2
            className="serif"
            style={{
              fontSize: 40,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              margin: 0,
            }}
          >
            Real source code.{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent-2)' }}>
              No vendor strings
            </span>{' '}
            attached.
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgba(244,239,227,0.75)',
              margin: 0,
              paddingTop: 8,
            }}
          >
            LearnKit AI is built in the open under Apache-2.0. The packages on npm, the
            marketing site you are reading right now, and the demo flow are all the same
            source - clone it, fork it, run it locally, deploy it. No license keys, no SaaS
            tier, no telemetry to disable.
          </p>
        </div>

        <div
          className="lk-grid-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
            alignItems: 'flex-start',
            borderTop: '1px solid rgba(244,239,227,0.12)',
            paddingTop: 36,
            marginTop: 48,
          }}
        >
          {STACK.map((s) => (
            <div key={s.v}>
              <div
                className="serif"
                style={{
                  fontSize: 32,
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--accent-2)',
                  lineHeight: 1.05,
                }}
              >
                {s.k}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.85)', marginTop: 6 }}>
                {s.v}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: 'rgba(244,239,227,0.5)',
                  marginTop: 2,
                  fontFamily: 'var(--mono)',
                }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
