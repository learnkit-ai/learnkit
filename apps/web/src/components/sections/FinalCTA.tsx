import { Button, ArrowR } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <section
      className="lk-section-pad lk-section"
      style={{
        padding: '96px 56px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--paper-2)',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h2
          className="serif lk-final-title"
          style={{
            fontSize: 56,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
            fontWeight: 400,
          }}
        >
          Try it on your <span style={{ fontStyle: 'italic' }}>actual work</span>.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: 'var(--ink-soft)',
            lineHeight: 1.55,
            margin: '0 auto 28px',
            maxWidth: 480,
          }}
        >
          90 seconds, no signup. Tell the AI Guide what you do — see your curriculum.
        </p>
        <div
          style={{
            display: 'inline-flex',
            gap: 10,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a
            href="/demo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '16px 26px',
              fontSize: 15,
              borderRadius: 12,
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: '1px solid var(--ink)',
              fontWeight: 500,
              letterSpacing: '-0.005em',
              textDecoration: 'none',
            }}
          >
            Run the demo <ArrowR />
          </a>
          <a
            href="https://github.com/learnkit-ai/learnkit"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button variant="ghost" size="lg">
              Star on GitHub
            </Button>
          </a>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 12,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
          }}
        >
          Apache-2.0 · No signup · No tracking · Run locally
        </div>
      </div>
    </section>
  );
}
