// API / Developer screen — code-forward, technical-friendly within warm palette

const ApiScreen = () => {
  const [tab, setTab] = React.useState('curl');
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 4), 2200);
    return () => clearInterval(id);
  }, []);

  const snippets = {
    curl: `curl https://api.getlearnkit.com/v1/paths \\
  -H "Authorization: Bearer lk_live_a2b9..." \\
  -d '{
    "user_id": "u_8Hk3p",
    "role": "software_engineer",
    "tools": ["claude", "cursor"],
    "goal": "ship a research agent"
  }'`,
    node: `import LearnKit from '@learnkit/sdk';

const lk = new LearnKit(process.env.LK_API_KEY);

const path = await lk.paths.create({
  user_id: 'u_8Hk3p',
  role: 'software_engineer',
  tools: ['claude', 'cursor'],
  goal: 'ship a research agent',
});

// Embed Olé in your app
<LearnKit.Tutor pathId={path.id} />`,
    python: `from learnkit import LearnKit

lk = LearnKit(api_key=os.environ["LK_API_KEY"])

path = lk.paths.create(
    user_id="u_8Hk3p",
    role="software_engineer",
    tools=["claude", "cursor"],
    goal="ship a research agent",
)

# Stream lesson events
for event in lk.lessons.stream(path.id):
    print(event.type, event.data)`,
  };

  return (
    <div data-screen-label="Developers · API" style={{ background: 'var(--paper)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 56px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Wordmark size={20}/>
          <span style={{ width: 1, height: 18, background: 'var(--rule-strong)' }}/>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>api.getlearnkit.com / v1</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--ink-soft)' }}>
          <span>Reference</span><span>Guides</span><span>Webhooks</span><span>SDKs</span><span>Status</span>
        </div>
        <Button size="sm" variant="primary">Get an API key <ArrowR size={12}/></Button>
      </div>

      {/* Hero */}
      <div style={{ padding: '64px 56px 40px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, maxWidth: 1320, margin: '0 auto', alignItems: 'center' }}>
        <div>
          <Eyebrow color="var(--accent-4)">Open SDKs · MIT licensed</Eyebrow>
          <h1 className="serif" style={{ fontSize: 64, lineHeight: 1, letterSpacing: '-0.035em', margin: '14px 0 20px', fontWeight: 400 }}>
            The learning <span style={{ fontStyle: 'italic' }}>layer</span><br/>
            for the AI you<br/>
            <span style={{ color: 'var(--accent)' }}>build</span>.
          </h1>
          <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 480, marginBottom: 28 }}>
            Embed Olé in three lines. Run evals on your users' work. Fork our rubrics — the SDKs are open.
            Build adaptive learning into your product without writing the pedagogy yourself.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <Button variant="primary" size="lg">Read the docs <ArrowR/></Button>
            <Button variant="ghost" size="lg">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>
              4.2k on GitHub
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 22, fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-3)' }}/> 99.95% SLA
            </span>
            <span>SOC 2 Type II</span>
            <span>HIPAA · GDPR</span>
            <span>~140ms p95</span>
            <span>JS · Py · Rb · Go</span>
          </div>
        </div>

        {/* Code panel */}
        <div style={{ background: 'var(--ink)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-3)', border: '1px solid var(--ink-2)' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 4px' }}>
            {['curl','node','python'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '12px 18px', fontSize: 12, fontFamily: 'var(--mono)',
                background: 'transparent', border: 'none',
                color: tab === t ? 'var(--paper)' : 'rgba(244,239,227,0.45)',
                borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
                cursor: 'pointer', textTransform: 'lowercase',
              }}>{t}</button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'rgba(244,239,227,0.5)', fontFamily: 'var(--mono)' }}>POST /v1/paths</span>
              <button style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(244,239,227,0.7)', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontFamily: 'var(--mono)', cursor: 'pointer' }}>copy</button>
            </div>
          </div>
          <pre style={{
            margin: 0, padding: '20px 22px', fontFamily: 'var(--mono)', fontSize: 13,
            color: 'var(--paper)', lineHeight: 1.65, overflow: 'auto', minHeight: 280,
          }}>
{snippets[tab].split('\n').map((line, i) => (
  <div key={i} style={{ display: 'flex', gap: 14 }}>
    <span style={{ color: 'rgba(244,239,227,0.25)', userSelect: 'none', textAlign: 'right', minWidth: 18 }}>{i + 1}</span>
    <span dangerouslySetInnerHTML={{ __html: highlightCode(line) }}/>
  </div>
))}
          </pre>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 11, color: 'rgba(244,239,227,0.5)', fontFamily: 'var(--mono)' }}>
              200 OK · {Math.round(120 + step * 4)}ms · returns <span style={{ color: 'var(--accent-2)' }}>Path</span>
            </div>
            <span style={{ display: 'inline-flex', gap: 4 }}>
              {[0,1,2,3].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: i === step ? 'var(--accent)' : 'rgba(255,255,255,0.2)' }}/>)}
            </span>
          </div>
        </div>
      </div>

      {/* Endpoint reference grid */}
      <div style={{ padding: '40px 56px 64px', maxWidth: 1320, margin: '0 auto', width: '100%' }}>
        <Eyebrow>Reference</Eyebrow>
        <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-0.025em', margin: '12px 0 32px', fontWeight: 400 }}>
          Six endpoints. <span style={{ fontStyle: 'italic' }}>That's the whole product.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { m: 'POST', p: '/v1/paths', d: 'Generate a learning path from role + tools + goal.' },
            { m: 'GET',  p: '/v1/lessons/:id', d: 'Fetch a lesson with content, exercises, evals.' },
            { m: 'POST', p: '/v1/tutor/messages', d: 'Send a message to Olé. Streamed responses.' },
            { m: 'POST', p: '/v1/evals/run', d: 'Run an eval on student work. Returns rubric scores.' },
            { m: 'GET',  p: '/v1/credentials/:id', d: 'Verify a LearnKit Practitioner credential.' },
            { m: 'POST', p: '/v1/webhooks', d: 'Subscribe to lesson, evaluation, and credential events.' },
          ].map(e => (
            <div key={e.p} style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600,
                  padding: '2px 6px', borderRadius: 4,
                  background: e.m === 'POST' ? 'var(--accent)' : 'var(--accent-4)',
                  color: '#FFF', letterSpacing: '0.05em',
                }}>{e.m}</span>
                <code style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)' }}>{e.p}</code>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{e.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Olé widget showcase */}
      <div style={{ padding: '64px 56px', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Eyebrow>{'<LearnKit.Tutor />'}</Eyebrow>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-0.025em', margin: '14px 0 16px', lineHeight: 1.05, fontWeight: 400 }}>
              Drop Olé into <span style={{ fontStyle: 'italic' }}>your</span> product.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 20 }}>
              A React component, a Web Component, or a vanilla JS bundle. White-label the avatar, the voice, and the lesson library — keep your brand, get the pedagogy.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Ships in 3 lines of JS',
                'Works in any framework or none',
                'Custom system prompts per route',
                'Streaming, function calls, file inputs',
              ].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink-soft)' }}>
                  <span style={{ color: 'var(--accent)' }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>
          <div style={{
            background: 'var(--surface)', borderRadius: 16, padding: 22,
            border: '1px solid var(--rule)', boxShadow: 'var(--shadow-2)', position: 'relative',
          }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              your-app.com / dashboard
            </div>
            <div style={{ height: 200, background: 'var(--paper-2)', borderRadius: 10, marginBottom: 14, padding: 16, position: 'relative' }}>
              <div style={{ height: 8, width: '40%', background: 'var(--rule-strong)', borderRadius: 4, marginBottom: 10 }}/>
              <div style={{ height: 6, width: '70%', background: 'var(--rule)', borderRadius: 4, marginBottom: 6 }}/>
              <div style={{ height: 6, width: '60%', background: 'var(--rule)', borderRadius: 4, marginBottom: 24 }}/>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ height: 60, flex: 1, background: 'var(--rule)', borderRadius: 8 }}/>
                <div style={{ height: 60, flex: 1, background: 'var(--rule)', borderRadius: 8 }}/>
                <div style={{ height: 60, flex: 1, background: 'var(--rule)', borderRadius: 8 }}/>
              </div>

              {/* Floating Olé widget */}
              <div style={{ position: 'absolute', bottom: 12, right: 12, width: 280, background: 'var(--surface)', borderRadius: 12, boxShadow: 'var(--shadow-3)', border: '1px solid var(--rule)', overflow: 'hidden' }}>
                <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
                  <Ole size={18}/>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>Need a hand?</div>
                  <span style={{ marginLeft: 'auto', fontSize: 14, color: 'var(--muted)' }}>×</span>
                </div>
                <div style={{ padding: 12, fontSize: 11.5, color: 'var(--ink)', lineHeight: 1.5 }}>
                  Looks like you're about to write a system prompt. Want a 2-min refresher?
                </div>
                <div style={{ display: 'flex', gap: 6, padding: '0 12px 12px' }}>
                  <button style={{ flex: 1, padding: '6px 8px', fontSize: 11, borderRadius: 6, border: '1px solid var(--rule)', background: 'var(--surface)', cursor: 'pointer', color: 'var(--ink)' }}>Show me</button>
                  <button style={{ flex: 1, padding: '6px 8px', fontSize: 11, borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--paper)', cursor: 'pointer' }}>Skip</button>
                </div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-soft)', background: 'var(--paper-2)', padding: 12, borderRadius: 8 }}>
              <span style={{ color: 'var(--muted)' }}>{'// 3 lines.'}</span><br/>
              <span style={{ color: 'var(--accent-4)' }}>import</span> {'{ Tutor }'} <span style={{ color: 'var(--accent-4)' }}>from</span> <span style={{ color: 'var(--accent)' }}>'@learnkit/react'</span>;<br/>
              <span style={{ color: 'var(--ink)' }}>{'<Tutor apiKey={KEY} userId={user.id} />'}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

function highlightCode(line) {
  return line
    .replace(/("[^"]*")/g, '<span style="color:#E8B547">$1</span>')
    .replace(/\b(curl|import|from|const|await|new|for|in)\b/g, '<span style="color:#7BA8D9">$1</span>')
    .replace(/(--\w+|-H)/g, '<span style="color:#8FB293">$1</span>')
    .replace(/(#[^\n]*)/g, '<span style="color:rgba(244,239,227,0.4)">$1</span>')
    .replace(/(\$\{[^}]+\})/g, '<span style="color:#C8472A">$1</span>');
}

window.ApiScreen = ApiScreen;
