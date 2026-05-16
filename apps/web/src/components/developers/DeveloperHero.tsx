import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';
import { Wordmark } from '@/components/ui/Wordmark';
import { CodeBlock } from './CodeBlock';

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export function DeveloperHero() {
  return (
    <>
      {/* Sub-nav */}
      <div
        className="lk-subnav"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 56px',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Wordmark size={20} />
          <span style={{ width: 1, height: 18, background: 'var(--rule-strong)' }} />
          <span
            style={{
              fontSize: 13,
              color: 'var(--ink-soft)',
              fontFamily: 'var(--mono)',
            }}
          >
            api.learnkit-ai.com / v1
          </span>
        </a>
        <div
          className="lk-subnav-links"
          style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--ink-soft)' }}
        >
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Reference</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Guides</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Webhooks</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>SDKs</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Status</a>
        </div>
        <Button size="sm" variant="primary">
          Get an API key <ArrowR size={12} />
        </Button>
      </div>

      <section
        className="lk-split lk-section-pad"
        style={{
          padding: '64px 56px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 56,
          maxWidth: 1320,
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        <div>
          <Eyebrow color="var(--accent-4)">Open SDKs · Apache-2.0</Eyebrow>
          <h1
            className="serif lk-hero-title"
            style={{
              fontSize: 64,
              lineHeight: 1,
              letterSpacing: '-0.035em',
              margin: '14px 0 20px',
              fontWeight: 400,
            }}
          >
            The learning <span style={{ fontStyle: 'italic' }}>layer</span>
            <br />
            for the AI you
            <br />
            <span style={{ color: 'var(--accent)' }}>build</span>.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: 'var(--ink-soft)',
              lineHeight: 1.55,
              maxWidth: 480,
              marginBottom: 28,
            }}
          >
            Embed the AI Guide in three lines. Run evals on your users&apos; work. Fork our
            rubrics — the SDKs are open. Build adaptive learning into your product without
            writing the pedagogy yourself.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg">
              Read the docs <ArrowR />
            </Button>
            <Button variant="ghost" size="lg">
              <GithubIcon />
              Star on GitHub
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 22,
              fontSize: 12,
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent-3)',
                }}
              />{' '}
              Type-safe end to end
            </span>
            <span>Zero-config Next.js</span>
            <span>Edge-ready</span>
            <span>~140ms p95</span>
            <span>JS · TS · Edge</span>
          </div>
        </div>

        <CodeBlock />
      </section>
    </>
  );
}
