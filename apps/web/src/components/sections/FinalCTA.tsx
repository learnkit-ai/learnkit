import { Button, ArrowR } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <section
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
          className="serif"
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
          <Button variant="primary" size="lg">
            Run the demo <ArrowR />
          </Button>
          <Button variant="ghost" size="lg">
            Talk to sales
          </Button>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 12,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
          }}
        >
          No credit card · 7-day trial · Cancel anytime
        </div>
      </div>
    </section>
  );
}
