import { Eyebrow, Ole } from '@/components/ui/primitives';

const FEATURES = [
  'Ships in 3 lines of JS',
  'Works in any framework or none',
  'Custom system prompts per route',
  'Streaming, function calls, file inputs',
];

export function TutorWidget() {
  return (
    <section
      style={{
        padding: '64px 56px',
        background: 'var(--paper-2)',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div
        className="lk-split"
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <Eyebrow>{'<LearnKit.AIGuide />'}</Eyebrow>
          <h2
            className="serif"
            style={{
              fontSize: 40,
              letterSpacing: '-0.025em',
              margin: '14px 0 16px',
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          >
            Drop the AI Guide into{' '}
            <span style={{ fontStyle: 'italic' }}>your</span> product.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            A React component, a Web Component, or a vanilla JS bundle. White-label the avatar,
            the voice, and the lesson library — keep your brand, get the pedagogy.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FEATURES.map((f) => (
              <div
                key={f}
                style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink-soft)' }}
              >
                <span style={{ color: 'var(--accent)' }}>✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Mock app with floating widget */}
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 16,
            padding: 22,
            border: '1px solid var(--rule)',
            boxShadow: 'var(--shadow-2)',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--mono)',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}
          >
            your-app.com / dashboard
          </div>
          <div
            style={{
              height: 200,
              background: 'var(--paper-2)',
              borderRadius: 10,
              marginBottom: 14,
              padding: 16,
              position: 'relative',
            }}
          >
            <div
              style={{
                height: 8,
                width: '40%',
                background: 'var(--rule-strong)',
                borderRadius: 4,
                marginBottom: 10,
              }}
            />
            <div
              style={{
                height: 6,
                width: '70%',
                background: 'var(--rule)',
                borderRadius: 4,
                marginBottom: 6,
              }}
            />
            <div
              style={{
                height: 6,
                width: '60%',
                background: 'var(--rule)',
                borderRadius: 4,
                marginBottom: 24,
              }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ height: 60, flex: 1, background: 'var(--rule)', borderRadius: 8 }} />
              <div style={{ height: 60, flex: 1, background: 'var(--rule)', borderRadius: 8 }} />
              <div style={{ height: 60, flex: 1, background: 'var(--rule)', borderRadius: 8 }} />
            </div>

            {/* Floating AI Guide widget */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                width: 280,
                background: 'var(--surface)',
                borderRadius: 12,
                boxShadow: 'var(--shadow-3)',
                border: '1px solid var(--rule)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  borderBottom: '1px solid var(--rule)',
                  background: 'var(--paper-2)',
                }}
              >
                <Ole size={18} />
                <div style={{ fontSize: 12, fontWeight: 500 }}>Need a hand?</div>
                <span
                  style={{ marginLeft: 'auto', fontSize: 14, color: 'var(--muted)' }}
                >
                  ×
                </span>
              </div>
              <div
                style={{
                  padding: 12,
                  fontSize: 11.5,
                  color: 'var(--ink)',
                  lineHeight: 1.5,
                }}
              >
                Looks like you&apos;re about to write a system prompt. Want a 2-min refresher?
              </div>
              <div style={{ display: 'flex', gap: 6, padding: '0 12px 12px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    fontSize: 11,
                    borderRadius: 6,
                    border: '1px solid var(--rule)',
                    background: 'var(--surface)',
                    cursor: 'pointer',
                    color: 'var(--ink)',
                  }}
                >
                  Show me
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    fontSize: 11,
                    borderRadius: 6,
                    border: 'none',
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    cursor: 'pointer',
                  }}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11.5,
              color: 'var(--ink-soft)',
              background: 'var(--paper-2)',
              padding: 12,
              borderRadius: 8,
            }}
          >
            <span style={{ color: 'var(--muted)' }}>{'// 3 lines.'}</span>
            <br />
            <span style={{ color: 'var(--accent-4)' }}>import</span> {'{ AIGuide }'}{' '}
            <span style={{ color: 'var(--accent-4)' }}>from</span>{' '}
            <span style={{ color: 'var(--accent)' }}>&apos;@learnkit-ai/react&apos;</span>;
            <br />
            <span style={{ color: 'var(--ink)' }}>
              {'<AIGuide apiKey={KEY} userId={user.id} />'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
