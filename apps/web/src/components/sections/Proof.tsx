import { Eyebrow } from '@/components/ui/primitives';

const STATS = [
  { k: '94%', v: 'completion rate', sub: 'across 240 ICs' },
  { k: '6.2×', v: 'tools per IC', sub: 'after week 4' },
  { k: '38', v: 'shipped projects', sub: 'in Q1' },
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
        <Eyebrow color="var(--accent-2)">Working at</Eyebrow>

        {/* Placeholder wordmarks */}
        <div
          className="lk-proof-logos lk-grid-6"
          style={{
            marginTop: 24,
            marginBottom: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {[
            { n: 'Ramp', w: 600 },
            { n: 'Figma', w: 500 },
            { n: 'Linear', w: 400 },
            { n: 'Vercel', w: 600 },
            { n: 'Notion', w: 500 },
            { n: 'Replit', w: 600 },
          ].map((c) => (
            <div
              key={c.n}
              className="serif"
              style={{
                fontSize: 24,
                fontWeight: c.w / 100,
                letterSpacing: '-0.025em',
                color: 'rgba(244,239,227,0.55)',
                textAlign: 'center',
              }}
            >
              {c.n}
            </div>
          ))}
        </div>

        <div
          className="lk-proof-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: 32,
            alignItems: 'flex-start',
            borderTop: '1px solid rgba(244,239,227,0.12)',
            paddingTop: 36,
          }}
        >
          <blockquote
            className="serif lk-proof-quote"
            style={{
              fontSize: 26,
              lineHeight: 1.25,
              letterSpacing: '-0.015em',
              margin: 0,
              fontWeight: 400,
              fontStyle: 'italic',
            }}
          >
            &ldquo;Six weeks in, our PMs were shipping AI features without engineers
            babysitting them. That&apos;s the ROI nobody believes until they see it.&rdquo;
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 18,
                fontStyle: 'normal',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                }}
              />
              <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.7)' }}>
                <strong style={{ color: 'var(--paper)' }}>Maya Krishnan</strong> · VP Eng · Ramp
              </div>
            </div>
          </blockquote>

          {STATS.map((s) => (
            <div key={s.v}>
              <div
                className="serif"
                style={{
                  fontSize: 44,
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--accent-2)',
                  lineHeight: 1,
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
