import { Eyebrow } from '@/components/ui/primitives';

interface ApiItem {
  pkg: '@learnkit-ai/core' | '@learnkit-ai/react' | '@learnkit-ai/schemas';
  symbol: string;
  kind: 'fn' | 'component' | 'hook' | 'schema';
  desc: string;
}

const PUBLIC_API: ApiItem[] = [
  {
    pkg: '@learnkit-ai/core',
    symbol: 'generateLearningPath(input)',
    kind: 'fn',
    desc: 'Pure function. No network, no LLM. Same input always produces the same path.',
  },
  {
    pkg: '@learnkit-ai/core',
    symbol: 'getSupportedRoles()',
    kind: 'fn',
    desc: 'Returns the list of role labels you can pass as input.role.',
  },
  {
    pkg: '@learnkit-ai/core',
    symbol: 'getSupportedTools()',
    kind: 'fn',
    desc: 'Returns the list of tool names you can include in input.tools.',
  },
  {
    pkg: '@learnkit-ai/react',
    symbol: '<LearningPath />',
    kind: 'component',
    desc: 'Renders a full 30-day path. Three built-in themes. CSS variables, no Tailwind.',
  },
  {
    pkg: '@learnkit-ai/react',
    symbol: '<AIGuide />',
    kind: 'component',
    desc: 'Drop-in avatar + tip card. Embed anywhere you want contextual help.',
  },
  {
    pkg: '@learnkit-ai/react',
    symbol: 'useLearnKit(input)',
    kind: 'hook',
    desc: 'Headless hook. Returns { path, error }. Build your own UI on top.',
  },
];

const KIND_STYLES: Record<ApiItem['kind'], { bg: string; label: string }> = {
  fn: { bg: 'var(--accent)', label: 'FN' },
  component: { bg: 'var(--accent-4)', label: 'JSX' },
  hook: { bg: 'var(--accent-3)', label: 'HOOK' },
  schema: { bg: 'var(--accent-2)', label: 'TYPE' },
};

export function EndpointGrid() {
  return (
    <div
      id="endpoints"
      className="lk-section-pad lk-section"
      style={{
        padding: '40px 56px 64px',
        maxWidth: 1320,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <Eyebrow>Public API</Eyebrow>
      <h2
        className="serif lk-section-title-md"
        style={{
          fontSize: 36,
          letterSpacing: '-0.025em',
          margin: '12px 0 12px',
          fontWeight: 400,
        }}
      >
        Six exports.{' '}
        <span style={{ fontStyle: 'italic' }}>That&apos;s the whole surface area.</span>
      </h2>
      <p
        style={{
          fontSize: 15,
          color: 'var(--ink-soft)',
          lineHeight: 1.55,
          marginBottom: 32,
          maxWidth: 680,
        }}
      >
        Small, stable, and inferred from Zod. The shape of <code style={{ background: 'var(--paper-2)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 13 }}>LearningPathInput</code> is a contract — it will not change without a major version bump.
      </p>
      <div
        className="lk-grid-3"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}
      >
        {PUBLIC_API.map((item) => {
          const k = KIND_STYLES[item.kind];
          return (
            <div
              key={item.symbol}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--rule)',
                borderRadius: 12,
                padding: 18,
              }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: k.bg,
                    color: '#FFF',
                    letterSpacing: '0.05em',
                  }}
                >
                  {k.label}
                </span>
                <code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)' }}>
                  {item.symbol}
                </code>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 10 }}>
                {item.desc}
              </div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                }}
              >
                {item.pkg}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
