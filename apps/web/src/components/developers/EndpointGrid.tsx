import { Eyebrow } from '@/components/ui/primitives';

const ENDPOINTS = [
  { m: 'POST', p: '/v1/paths', d: 'Generate a learning path from role + tools + goal.' },
  { m: 'GET', p: '/v1/lessons/:id', d: 'Fetch a lesson with content, exercises, evals.' },
  { m: 'POST', p: '/v1/guide/messages', d: 'Send a message to the AI Guide. Streamed responses.' },
  { m: 'POST', p: '/v1/evals/run', d: 'Run an eval on student work. Returns rubric scores.' },
  { m: 'GET', p: '/v1/credentials/:id', d: 'Verify a LearnKit AI Practitioner credential.' },
  { m: 'POST', p: '/v1/webhooks', d: 'Subscribe to lesson, evaluation, and credential events.' },
] as const;

export function EndpointGrid() {
  return (
    <div
      className="lk-section-pad lk-section"
      style={{
        padding: '40px 56px 64px',
        maxWidth: 1320,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <Eyebrow>Reference</Eyebrow>
      <h2
        className="serif lk-section-title-md"
        style={{
          fontSize: 36,
          letterSpacing: '-0.025em',
          margin: '12px 0 32px',
          fontWeight: 400,
        }}
      >
        Six endpoints.{' '}
        <span style={{ fontStyle: 'italic' }}>That&apos;s the whole product.</span>
      </h2>
      <div className="lk-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {ENDPOINTS.map((e) => (
          <div
            key={e.p}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--rule)',
              borderRadius: 12,
              padding: 18,
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: e.m === 'POST' ? 'var(--accent)' : 'var(--accent-4)',
                  color: '#FFF',
                  letterSpacing: '0.05em',
                }}
              >
                {e.m}
              </span>
              <code
                style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)' }}
              >
                {e.p}
              </code>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{e.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
