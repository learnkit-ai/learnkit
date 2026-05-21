import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow, AmbientArc } from '@/components/ui/primitives';
import { SITE_URL } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'LearnKit AI for Teams — Embed AI learning across your org',
  description:
    'Role-mapped learning paths for every engineer, PM, designer, and data scientist on your team. Self-hosted, open source, no SSO contracts.',
  alternates: { canonical: '/teams' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/teams`,
    title: 'LearnKit AI for Teams — Embed AI learning across your org',
    description:
      'Role-mapped learning paths for every engineer, PM, designer, and data scientist on your team. Open source, Apache-2.0.',
  },
};

const FEATURES = [
  {
    t: 'Role-mapped curricula',
    d: 'PMs learn one path, engineers another, designers a third. generateLearningPath() tunes every lesson to the role and the tools your team actually uses.',
  },
  {
    t: 'Embed in any internal tool',
    d: 'Drop <LearningPath /> into your internal portal, onboarding app, or Notion embed. Ships with three themes and CSS custom properties for full white-labeling.',
  },
  {
    t: 'Headless hook for custom UIs',
    d: 'useLearnKit(input) returns { path, error }. If our default components do not fit your design system, build your own UI on top.',
  },
  {
    t: 'Pure TypeScript, no lock-in',
    d: 'generateLearningPath() is a pure function — no network, no LLM, no API keys. Clone it, fork it, change the lesson templates. Apache-2.0.',
  },
  {
    t: 'Every role covered out of the box',
    d: 'Software Engineer, Product Manager, Designer, Data Scientist, DevOps, and more. getSupportedRoles() returns the full list; add your own in the fork.',
  },
  {
    t: 'Works where your team works',
    d: 'Next.js, Vite, Remix, plain React. The packages ship as source TypeScript — no pre-build step required, bundle it with whatever you use.',
  },
];

const BEFORE_AFTER = [
  {
    before: 'One generic "AI for everyone" course. Same content for the backend engineer and the content writer.',
    after: 'generateLearningPath({ role, tools, goal, level }) produces a 4-week path tuned to what each person actually ships.',
    tag: 'Personalization',
  },
  {
    before: 'Training lives in a third-party LMS no one opens after week one.',
    after: 'Embed <LearningPath /> directly in the product your team already uses every day. Learning happens in context.',
    tag: 'Placement',
  },
  {
    before: 'Content goes stale the day a tool ships a new feature. Update cycles are quarters.',
    after: 'Fork the lesson templates in packages/core/src. A one-line change updates every generated path instantly.',
    tag: 'Maintenance',
  },
  {
    before: 'Vendor contract to negotiate, renewal to manage, price to justify every fiscal year.',
    after: 'Apache-2.0. Self-host it. No per-seat fee, no contract, no support tier, no renewal. Fork and own it.',
    tag: 'Ownership',
  },
];

const STEPS = [
  {
    n: '1',
    t: 'Install the packages',
    code: 'pnpm add @learnkit-ai/core @learnkit-ai/react',
  },
  {
    n: '2',
    t: 'Generate a path for each role',
    code: "generateLearningPath({ role: 'Software Engineer', tools: ['Claude', 'Cursor'], goal: 'ship a prod agent', level: 'intermediate' })",
  },
  {
    n: '3',
    t: 'Drop in the component',
    code: '<LearningPath input={input} theme="warm" />',
  },
];

export default function TeamsPage() {
  return (
    <main
      className="paper-grain"
      style={{ background: 'var(--paper)', minHeight: '100vh', overflow: 'hidden' }}
    >
      <Nav />

      {/* Hero */}
      <section
        className="lk-section-pad lk-section"
        style={{ padding: '72px 56px 56px', position: 'relative', overflow: 'hidden' }}
      >
        <AmbientArc style={{ top: -100, right: -120 }} size={480} color="var(--accent-3)" />
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: 56,
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div>
            <Eyebrow color="var(--accent-3)">For L&D, Eng leaders & People Ops</Eyebrow>
            <h1
              className="serif lk-hero-title"
              style={{
                fontSize: 60,
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
                margin: '14px 0 20px',
                fontWeight: 400,
              }}
            >
              Make every team<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>good at AI</span> — in your own stack.
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
              Role-mapped curricula embedded directly in the tools your team already uses.
              Self-hosted, Apache-2.0, no per-seat contract — ever.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href="https://github.com/learnkit-ai/learnkit"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  padding: '12px 22px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Star on GitHub
              </Link>
              <Link
                href="/demo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'transparent',
                  color: 'var(--ink)',
                  padding: '12px 22px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  border: '1px solid var(--rule-strong)',
                  textDecoration: 'none',
                }}
              >
                Try the demo
              </Link>
            </div>
          </div>

          {/* Install card */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 16,
              border: '1px solid var(--rule)',
              boxShadow: 'var(--shadow-3)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                borderBottom: '1px solid var(--rule)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                  <span
                    key={c}
                    style={{ width: 10, height: 10, borderRadius: '50%', background: c }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  marginLeft: 4,
                }}
              >
                internal-portal/src/app/onboarding.tsx
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '20px 22px',
                fontFamily: 'var(--mono)',
                fontSize: 12.5,
                lineHeight: 1.7,
                color: 'var(--ink)',
                background: 'var(--paper-2)',
                overflowX: 'auto',
              }}
            >
              <span style={{ color: 'var(--muted)' }}>// one component, every role</span>
              {'\n'}
              <span style={{ color: 'var(--accent-4)' }}>{'import'}</span>
              {' { LearningPath } '}
              <span style={{ color: 'var(--accent-4)' }}>{'from'}</span>
              {" '@learnkit-ai/react';\n\n"}
              <span style={{ color: 'var(--accent-4)' }}>{'export default function'}</span>
              {' '}
              <span style={{ color: 'var(--accent-3)' }}>OnboardingPage</span>
              {'() {\n'}
              {'  '}
              <span style={{ color: 'var(--accent-4)' }}>{'const'}</span>
              {' user = useCurrentUser();\n\n'}
              {'  '}
              <span style={{ color: 'var(--accent-4)' }}>{'return'}</span>
              {' (\n'}
              {'    '}
              <span style={{ color: 'var(--accent-3)' }}>{'<LearningPath'}</span>
              {'\n'}
              {'      input={{\n'}
              {'        role: user.role,\n'}
              {'        tools: user.tools,\n'}
              {'        goal: '}
              <span style={{ color: 'var(--accent-2)' }}>{"'ship AI features'"}</span>
              {',\n'}
              {'        level: user.level,\n'}
              {'      }}\n'}
              {'      theme='}
              <span style={{ color: 'var(--accent-2)' }}>{'"warm"'}</span>
              {'\n'}
              {'    '}
              <span style={{ color: 'var(--accent-3)' }}>{'/>  '}</span>
              <span style={{ color: 'var(--muted)' }}>{'// fully personalized'}</span>
              {'\n  );\n}'}
            </pre>
            <div
              style={{
                borderTop: '1px solid var(--rule)',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>
                Apache-2.0 · no API key · self-hosted
              </span>
              <Link
                href="/developers"
                style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}
              >
                API docs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section
        style={{
          padding: '64px 56px',
          background: 'var(--paper-2)',
          borderTop: '1px solid var(--rule)',
        }}
      >
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <Eyebrow>What you get</Eyebrow>
          <h2
            className="serif"
            style={{
              fontSize: 40,
              letterSpacing: '-0.025em',
              margin: '14px 0 32px',
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            Everything your team needs.{' '}
            <span style={{ fontStyle: 'italic' }}>Nothing you have to negotiate.</span>
          </h2>
          <div
            className="lk-grid-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.t}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <div
                  className="serif"
                  style={{ fontSize: 18, letterSpacing: '-0.02em', marginBottom: 8, fontWeight: 500 }}
                >
                  {f.t}
                </div>
                <div style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section
        style={{
          padding: '64px 56px',
          borderTop: '1px solid var(--rule)',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Eyebrow>What changes when you embed LearnKit AI</Eyebrow>
          <h2
            className="serif"
            style={{
              fontSize: 36,
              letterSpacing: '-0.025em',
              margin: '14px 0 36px',
              fontWeight: 400,
              lineHeight: 1.1,
              maxWidth: 760,
            }}
          >
            From{' '}
            <span style={{ fontStyle: 'italic' }}>&ldquo;they watched it&rdquo;</span> to{' '}
            <span style={{ fontStyle: 'italic' }}>&ldquo;they shipped it&rdquo;</span>.
          </h2>
          <div
            className="lk-grid-2"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}
          >
            {BEFORE_AFTER.map((c) => (
              <div
                key={c.tag}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 14,
                  }}
                >
                  {c.tag}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div
                    style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55 }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 11,
                        fontWeight: 500,
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      BEFORE
                    </span>
                    <span>{c.before}</span>
                  </div>
                  <div style={{ height: 1, background: 'var(--rule)' }} />
                  <div
                    style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.55 }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 11,
                        fontWeight: 500,
                        color: 'var(--accent-3)',
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      AFTER
                    </span>
                    <span>{c.after}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick start */}
      <section
        style={{
          padding: '64px 56px',
          background: 'var(--paper-2)',
          borderTop: '1px solid var(--rule)',
        }}
      >
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Eyebrow>Get started in minutes</Eyebrow>
          <h2
            className="serif"
            style={{
              fontSize: 36,
              letterSpacing: '-0.025em',
              margin: '14px 0 36px',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Three steps from zero to a personalized path.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: 14,
                  padding: '18px 22px',
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr',
                  gap: 16,
                  alignItems: 'start',
                }}
              >
                <div
                  className="serif"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{s.t}</div>
                  <code
                    style={{
                      display: 'block',
                      fontFamily: 'var(--mono)',
                      fontSize: 12.5,
                      color: 'var(--ink)',
                      background: 'var(--paper-2)',
                      border: '1px solid var(--rule)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                    }}
                  >
                    {s.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/developers"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '11px 20px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Full API reference →
            </Link>
            <Link
              href="https://github.com/learnkit-ai/learnkit/tree/main/examples/nextjs-basic"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'transparent',
                color: 'var(--ink)',
                padding: '11px 20px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid var(--rule-strong)',
                textDecoration: 'none',
              }}
            >
              View example app
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
