import { Eyebrow, Ole } from '@/components/ui/primitives';

const LESSON_LIST = [
  { t: 'Why agents fail', done: true },
  { t: 'Tool use & function calls', done: true },
  { t: 'Building a research agent', active: true },
  { t: 'Evaluating outputs', done: false },
  { t: 'Productionizing', done: false },
  { t: 'Practicum: ship it', done: false, lock: true },
];

function WorkbenchMock() {
  return (
    <div
      className="lk-workbench-mock"
      style={{
        background: 'var(--surface)',
        borderRadius: 18,
        border: '1px solid var(--rule)',
        padding: 16,
        boxShadow: 'var(--shadow-2)',
      }}
    >
      {/* Chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 6px 12px',
          borderBottom: '1px solid var(--rule)',
          marginBottom: 12,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF6058' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA42' }} />
        <div
          style={{
            marginLeft: 16,
            fontSize: 12,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
          }}
        >
          learnkit · workbench / module-04 / build-a-research-agent.lk
        </div>
      </div>

      <div className="lk-workbench-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: 14, height: 460 }}>
        {/* Sidebar */}
        <div
          className="lk-workbench-sidebar"
          style={{
            background: 'var(--paper-2)',
            borderRadius: 10,
            padding: 14,
            border: '1px solid var(--rule)',
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
            Module 04
          </div>
          {LESSON_LIST.map((it, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 8px',
                borderRadius: 6,
                marginBottom: 2,
                background: it.active ? 'var(--surface)' : 'transparent',
                color: it.lock ? 'var(--muted)' : 'var(--ink)',
                fontSize: 12.5,
                fontWeight: it.active ? 500 : 400,
              }}
            >
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: it.done ? 'var(--accent-3)' : it.active ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${it.done || it.active ? 'transparent' : 'var(--rule-strong)'}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontSize: 9,
                  flexShrink: 0,
                }}
              >
                {it.done ? '✓' : ''}
              </span>
              <span>{it.t}</span>
              {it.lock && <span style={{ marginLeft: 'auto', fontSize: 10 }}>🔒</span>}
            </div>
          ))}
        </div>

        {/* Editor */}
        <div
          style={{
            background: 'var(--ink)',
            borderRadius: 10,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['system.md', 'agent.py', 'eval.json'].map((tab, i) => (
              <div
                key={tab}
                style={{
                  padding: '10px 16px',
                  fontSize: 12,
                  fontFamily: 'var(--mono)',
                  color: i === 0 ? 'var(--paper)' : 'rgba(244,239,227,0.5)',
                  background: i === 0 ? 'rgba(255,255,255,0.04)' : 'transparent',
                  borderRight: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {tab}
              </div>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              padding: '16px 18px',
              fontFamily: 'var(--mono)',
              fontSize: 12.5,
              color: 'var(--paper)',
              lineHeight: 1.7,
              overflow: 'hidden',
            }}
          >
            <div style={{ color: 'rgba(244,239,227,0.4)' }}># System prompt - research analyst</div>
            <div style={{ marginTop: 8 }}>
              You are a{' '}
              <span style={{ color: 'var(--accent-2)' }}>senior research analyst</span> at a
            </div>
            <div>boutique consultancy. When given a PDF, you:</div>
            <div style={{ marginTop: 4, paddingLeft: 16 }}>
              <div>1. Extract the 3 most important claims</div>
              <div>
                2. Cross-reference against{' '}
                <span style={{ color: 'var(--accent-2)' }}>web_search()</span>
              </div>
              <div>3. Draft a 200-word memo with citations</div>
            </div>
            <div style={{ marginTop: 12, color: 'rgba(244,239,227,0.4)' }}># Tone</div>
            <div>
              Concise. Skeptical. Cite sources
              <span
                style={{
                  animation: 'typewriter-cursor 1s infinite',
                  borderRight: '2px solid var(--accent)',
                  marginLeft: 2,
                }}
              >
                &nbsp;
              </span>
            </div>

            {/* AI Guide inline feedback */}
            <div
              style={{
                marginTop: 28,
                padding: '10px 12px',
                background: 'rgba(232,181,71,0.10)',
                borderLeft: '2px solid var(--accent-2)',
                borderRadius: '0 8px 8px 0',
                fontFamily: 'var(--sans)',
                fontSize: 12.5,
                color: 'rgba(244,239,227,0.85)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 4,
                  color: 'var(--accent-2)',
                }}
              >
                <Ole size={16} animated={false} />
                <strong
                  style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  AI Guide
                </strong>
              </div>
              Add a refusal clause - last week your agent invented a citation when it
              couldn&apos;t find one.
            </div>
          </div>
        </div>

        {/* Chat panel */}
        <div
          className="lk-workbench-chat"
          style={{
            background: 'var(--paper-2)',
            borderRadius: 10,
            padding: 14,
            border: '1px solid var(--rule)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Ole size={20} />
            <div style={{ fontSize: 13, fontWeight: 500 }}>AI Guide</div>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent-3)',
              }}
            />
            <span
              style={{
                marginLeft: 'auto',
                fontSize: 10,
                color: 'var(--muted)',
                fontFamily: 'var(--mono)',
              }}
            >
              2s
            </span>
          </div>
          <div
            style={{
              background: 'var(--surface)',
              padding: '10px 12px',
              borderRadius: 10,
              fontSize: 12.5,
              lineHeight: 1.5,
              color: 'var(--ink)',
            }}
          >
            Your prompt is solid. Two notes before you run it:
          </div>
          <div style={{ paddingLeft: 6, fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <span style={{ color: 'var(--accent)' }}>·</span>
              <code
                style={{
                  background: 'var(--surface)',
                  padding: '1px 5px',
                  borderRadius: 4,
                  fontSize: 11,
                }}
              >
                web_search
              </code>{' '}
              with no domain allowlist.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ color: 'var(--accent)' }}>·</span>
              200-word cap will clip on long PDFs.
            </div>
          </div>
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 10px',
              background: 'var(--surface)',
              borderRadius: 10,
              border: '1px solid var(--rule)',
            }}
          >
            <span style={{ fontSize: 12, color: 'var(--muted)', flex: 1 }}>
              Ask the AI Guide anything…
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>
              ⌘K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkbenchShowcase() {
  return (
    <section className="lk-section-pad lk-section" style={{ padding: '40px 56px 96px', background: 'var(--paper-2)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 36, maxWidth: 640 }}>
          <Eyebrow>The workbench</Eyebrow>
          <h2
            className="serif lk-section-title-md"
            style={{
              fontSize: 40,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '12px 0 10px',
              fontWeight: 400,
            }}
          >
            Where the lesson{' '}
            <span style={{ fontStyle: 'italic' }}>becomes the work</span>.
          </h2>
          <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
            One pane for the prompt, one for the run, one for the AI Guide&apos;s review.
            Everything you build is saved to a portfolio your manager can audit.
          </p>
        </div>
        <WorkbenchMock />
      </div>
    </section>
  );
}
