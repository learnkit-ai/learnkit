// LearnKit — Mobile API/Developer (390) · collapsible code preview

const MobileApi = () => {
  const [tab, setTab] = React.useState('curl');
  const [codeOpen, setCodeOpen] = React.useState(true);

  const snippets = {
    curl: `curl https://api.getlearnkit.com/v1/paths \\
  -H "Authorization: Bearer lk_live_..." \\
  -d '{
    "user_id": "u_8Hk3p",
    "role": "engineer",
    "tools": ["claude","cursor"],
    "goal": "ship a research agent"
  }'`,
    node: `import LearnKit from '@learnkit/sdk';

const lk = new LearnKit(process.env.LK_API_KEY);

const path = await lk.paths.create({
  user_id: 'u_8Hk3p',
  role: 'engineer',
  tools: ['claude','cursor'],
  goal: 'ship a research agent',
});

<LearnKit.Tutor pathId={path.id} />`,
    python: `from learnkit import LearnKit

lk = LearnKit(api_key=os.environ["LK_API_KEY"])

path = lk.paths.create(
    user_id="u_8Hk3p",
    role="engineer",
    tools=["claude","cursor"],
    goal="ship a research agent",
)`,
  };

  return (
    <div data-screen-label="Mobile · API" style={{ background: 'var(--paper)', minHeight: '100%', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30, background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Wordmark size={16}/>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>/v1</span>
        </div>
        <Button size="sm" variant="primary">API key</Button>
      </div>

      {/* Hero */}
      <section style={{ padding: '24px 20px 20px' }}>
        <Eyebrow color="var(--accent-4)">Open SDKs · MIT</Eyebrow>
        <h1 className="serif" style={{ fontSize: 36, lineHeight: 1.0, letterSpacing: '-0.03em', margin: '14px 0 12px', fontWeight: 400 }}>
          The learning <span style={{ fontStyle: 'italic' }}>layer</span> for the AI you <span style={{ color: 'var(--accent)' }}>build</span>.
        </h1>
        <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: '0 0 18px' }}>
          Embed Olé in three lines. Run evals on your users' work. Fork our rubrics — the SDKs are open.
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <Button variant="primary" size="md" style={{ flex: 1, justifyContent: 'center', minHeight: 48 }}>Read docs <ArrowR size={12}/></Button>
          <Button variant="ghost" size="md" style={{ flex: 1, justifyContent: 'center', minHeight: 48 }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>
            4.2k ★
          </Button>
        </div>
        <div style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-3)' }}/>99.95% SLA
          </span>
          <span>·</span><span>SOC 2</span>
          <span>·</span><span>~140ms p95</span>
          <span>·</span><span>JS · Py · Rb · Go</span>
        </div>
      </section>

      {/* COLLAPSIBLE CODE PREVIEW */}
      <section style={{ padding: '0 16px 24px' }}>
        <button
          onClick={() => setCodeOpen(o => !o)}
          style={{
            width: '100%', padding: '12px 14px',
            background: 'var(--ink)', color: 'var(--paper)',
            border: 'none', borderRadius: codeOpen ? '12px 12px 0 0' : 12,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', minHeight: 48,
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-3)' }}/>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Live preview</span>
            <span style={{ fontSize: 11, fontFamily: 'var(--mono)', opacity: 0.6 }}>POST /v1/paths</span>
          </span>
          <span style={{
            display: 'inline-flex', width: 22, height: 22, alignItems: 'center', justifyContent: 'center',
            transform: codeOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s ease',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </span>
        </button>

        {codeOpen && (
          <div style={{ background: 'var(--ink)', borderRadius: '0 0 12px 12px', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex' }}>
              {['curl','node','python'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex: 1, padding: '10px 8px', minHeight: 40,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: tab === t ? 'var(--paper)' : 'rgba(244,239,227,0.45)',
                  fontFamily: 'var(--mono)', fontSize: 12,
                  borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
                }}>{t}</button>
              ))}
            </div>
            <pre style={{
              margin: 0, padding: '14px 16px',
              fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--paper)', lineHeight: 1.65,
              overflowX: 'auto', whiteSpace: 'pre',
            }}>{snippets[tab]}</pre>
            <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button style={{
                flex: 1, padding: 12, background: 'transparent', border: 'none',
                color: 'rgba(244,239,227,0.7)', fontSize: 11.5, fontFamily: 'var(--mono)',
                cursor: 'pointer',
              }}>Copy</button>
              <span style={{ width: 1, background: 'rgba(255,255,255,0.08)' }}/>
              <button style={{
                flex: 1, padding: 12, background: 'transparent', border: 'none',
                color: 'rgba(244,239,227,0.7)', fontSize: 11.5, fontFamily: 'var(--mono)',
                cursor: 'pointer',
              }}>Run ▶</button>
            </div>
          </div>
        )}
      </section>

      {/* Endpoints — collapsible list */}
      <section style={{ padding: '8px 16px 24px' }}>
        <Eyebrow>Endpoints</Eyebrow>
        <h2 className="serif" style={{ fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '8px 0 14px', fontWeight: 400 }}>
          Six endpoints. That's it.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { m: 'POST', p: '/v1/paths', d: 'Generate adaptive curriculum' },
            { m: 'GET', p: '/v1/paths/{id}', d: 'Read a learner\'s path + progress' },
            { m: 'POST', p: '/v1/lessons/{id}/eval', d: 'Run Olé\'s eval against learner work' },
            { m: 'POST', p: '/v1/tutor/messages', d: 'Stream tutor response' },
            { m: 'POST', p: '/v1/credentials/issue', d: 'Issue a verified credential' },
            { m: 'POST', p: '/v1/webhooks', d: 'Subscribe to lesson events' },
          ].map(e => (
            <div key={e.p} style={{
              padding: '12px 14px', minHeight: 56, background: 'var(--surface)',
              border: '1px solid var(--rule)', borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                padding: '3px 7px', borderRadius: 5,
                background: e.m === 'POST' ? 'var(--accent)' : 'var(--accent-3)',
                color: '#FFF', fontSize: 10, fontFamily: 'var(--mono)', fontWeight: 600, letterSpacing: '0.04em',
              }}>{e.m}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.p}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{e.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SDK call-out */}
      <section style={{ padding: '0 16px 24px' }}>
        <div style={{ background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 14, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>
            getlearnkit/sdk · MIT · 4.2k ★
          </div>
          <h3 className="serif" style={{ fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 10px', fontWeight: 500 }}>
            Three lines. That's the integration.
          </h3>
          <pre style={{ margin: 0, padding: 12, background: 'var(--ink)', color: 'var(--paper)', borderRadius: 10, fontFamily: 'var(--mono)', fontSize: 11.5, overflowX: 'auto' }}>
{`import { Tutor } from '@learnkit/react';

<Tutor apiKey={KEY} userId={user.id} />`}
          </pre>
        </div>
      </section>

      {/* Sticky CTA */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '12px 16px',
        background: 'rgba(250,247,240,0.92)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--rule)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <div style={{ flex: 1, fontSize: 12, color: 'var(--ink-soft)' }}>
          <div style={{ fontWeight: 500, color: 'var(--ink)', fontSize: 13 }}>Free tier · 1k req/mo</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Pay-as-you-go after</div>
        </div>
        <Button variant="primary" size="md" style={{ minHeight: 44 }}>
          Get key <ArrowR size={12}/>
        </Button>
      </div>
    </div>
  );
};

window.MobileApi = MobileApi;
