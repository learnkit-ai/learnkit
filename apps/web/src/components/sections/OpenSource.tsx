import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="rgba(244,239,227,0.6)">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export function OpenSource() {
  return (
    <section
      id="developers"
      style={{
        padding: '80px 56px',
        background: 'var(--paper-2)',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <Eyebrow color="var(--accent-4)">Open SDKs</Eyebrow>
          <h2
            className="serif"
            style={{
              fontSize: 40,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '12px 0 14px',
              fontWeight: 400,
            }}
          >
            The SDKs are <span style={{ fontStyle: 'italic' }}>open</span>. The pedagogy is the
            product.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              marginBottom: 22,
            }}
          >
            Apache-2.0 licensed packages for JavaScript and TypeScript. Embed the AI Guide in
            your app, run evals on your users&apos; work, or fork the eval rubrics for your own
            product.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="primary" size="md">
              Star on GitHub <ArrowR size={12} />
            </Button>
            <Button variant="ghost" size="md">
              Read the docs
            </Button>
          </div>
        </div>

        {/* Code block */}
        <div
          style={{
            background: 'var(--ink)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-2)',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 12,
              fontFamily: 'var(--mono)',
              color: 'rgba(244,239,227,0.6)',
            }}
          >
            <GithubIcon />
            @learnkit-ai/react · Apache-2.0
            <span style={{ marginLeft: 'auto', color: 'var(--accent-3)' }}>● synced 2m ago</span>
          </div>
          <pre
            style={{
              margin: 0,
              padding: '20px 22px',
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: 'var(--paper)',
              lineHeight: 1.7,
              overflow: 'auto',
            }}
          >
            <span style={{ color: 'rgba(244,239,227,0.4)' }}>
              {'// 3 lines. That\'s the whole integration.\n'}
            </span>
            <span style={{ color: '#7BA8D9' }}>import</span>
            {' { AIGuide } '}
            <span style={{ color: '#7BA8D9' }}>from</span>
            {' '}
            <span style={{ color: '#E8B547' }}>&apos;@learnkit-ai/react&apos;</span>
            {';\n\n'}
            <span style={{ color: '#7BA8D9' }}>{'<'}</span>
            AIGuide{' '}
            <span style={{ color: '#8FB293' }}>apiKey</span>
            {'={KEY} '}
            <span style={{ color: '#8FB293' }}>userId</span>
            {'={user.id} '}
            <span style={{ color: '#7BA8D9' }}>{'/>'}</span>
          </pre>
        </div>
      </div>
    </section>
  );
}
