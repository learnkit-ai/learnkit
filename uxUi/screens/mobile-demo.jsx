// LearnKit — Mobile Demo (390) · compact selectors + stacked lesson cards

const MobileDemo = () => {
  const [step, setStep] = React.useState(0); // 0 role, 1 tools, 2 goal, 3 generating, 4 path, 5 lesson
  const [role, setRole] = React.useState('Product Manager');
  const [tools, setTools] = React.useState(['Claude','Cursor']);
  const [goal, setGoal] = React.useState('Ship an internal research agent');
  const [gen, setGen] = React.useState(0);

  const roles = ['Product Manager','Engineer','Designer','Data Analyst','Marketer','Founder'];
  const allTools = ['Claude','ChatGPT','Cursor','Copilot','Midjourney','Notion AI','Perplexity','Gemini'];

  React.useEffect(() => {
    if (step !== 3) return;
    setGen(0);
    const id = setInterval(() => setGen(g => {
      if (g >= 100) { clearInterval(id); setTimeout(() => setStep(4), 300); return 100; }
      return g + 3;
    }), 50);
    return () => clearInterval(id);
  }, [step]);

  const toggle = t => setTools(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);

  return (
    <div data-screen-label="Mobile · Demo" className="paper-grain" style={{
      background: 'var(--paper)', minHeight: '100%', display: 'flex', flexDirection: 'column', paddingBottom: 90,
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30, background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)', padding: '12px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Wordmark size={16}/>
          <Button size="sm" variant="ghost" onClick={() => { setStep(0); setGoal(''); }}>Reset</Button>
        </div>
        {/* Step pills */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2,3,4].map(i => (
            <span key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: step >= i ? 'var(--accent)' : 'var(--rule)',
              transition: 'background .3s ease',
            }}/>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Step {Math.min(step + 1, 5)} of 5
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px 16px' }}>
        {step === 0 && (
          <>
            <h1 className="serif" style={{ fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 8px', fontWeight: 400 }}>
              What do you <span style={{ fontStyle: 'italic' }}>do</span>?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 22px' }}>
              Pick one. Olé tunes the curriculum to your role.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {roles.map(r => (
                <button key={r} onClick={() => setRole(r)} style={{
                  padding: '14px 16px', minHeight: 52, textAlign: 'left',
                  background: role === r ? 'var(--ink)' : 'var(--surface)',
                  color: role === r ? 'var(--paper)' : 'var(--ink)',
                  border: `1px solid ${role === r ? 'var(--ink)' : 'var(--rule)'}`,
                  borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  fontFamily: 'var(--sans)',
                }}>
                  {r}
                  {role === r && <span style={{ color: 'var(--accent-2)' }}>✓</span>}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="serif" style={{ fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 8px', fontWeight: 400 }}>
              Which tools do you <span style={{ fontStyle: 'italic' }}>use</span>?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 22px' }}>
              Pick all that apply. We'll only teach what your team actually pays for.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {allTools.map(t => {
                const on = tools.includes(t);
                return (
                  <button key={t} onClick={() => toggle(t)} style={{
                    padding: '14px 12px', minHeight: 60, textAlign: 'left',
                    background: on ? 'var(--surface)' : 'var(--surface)',
                    border: `1.5px solid ${on ? 'var(--accent)' : 'var(--rule)'}`,
                    borderRadius: 12, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <ToolIcon name={t} size={22}/>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{t}</span>
                    {on && <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: 14 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="serif" style={{ fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 8px', fontWeight: 400 }}>
              What do you want to <span style={{ fontStyle: 'italic' }}>ship</span>?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 18px' }}>One sentence. Olé will turn it into a 30-day plan.</p>
            <textarea
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="e.g. Ship an internal research agent for my team"
              rows={3}
              style={{
                width: '100%', padding: 14, fontSize: 15, lineHeight: 1.45,
                background: 'var(--surface)', border: '1.5px solid var(--rule)', borderRadius: 12,
                fontFamily: 'var(--sans)', color: 'var(--ink)', resize: 'none',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ marginTop: 14, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Or pick one</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Ship an internal research agent',
                'Use AI to draft and review specs',
                'Stop hallucinated answers in our support bot',
              ].map(s => (
                <button key={s} onClick={() => setGoal(s)} style={{
                  padding: '12px 14px', minHeight: 44, textAlign: 'left',
                  background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 10,
                  fontSize: 13, color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'var(--sans)',
                }}>{s}</button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <div style={{ paddingTop: 60, textAlign: 'center' }}>
            <Ole size={56} animated/>
            <h2 className="serif" style={{ fontSize: 24, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '20px 0 8px', fontWeight: 400 }}>
              Olé is building your path…
            </h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 30px', fontFamily: 'var(--mono)' }}>
              {gen < 35 ? 'Reading your goal' : gen < 70 ? 'Mapping tools to skills' : 'Sequencing 30 lessons'}
            </p>
            <div style={{ height: 6, background: 'var(--paper-2)', borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
              <div style={{ width: `${gen}%`, height: '100%', background: 'var(--accent)', transition: 'width .3s ease' }}/>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>{gen}%</div>
          </div>
        )}

        {step === 4 && (
          <>
            <Eyebrow color="var(--accent-3)">Your 30-day path</Eyebrow>
            <h2 className="serif" style={{ fontSize: 24, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '8px 0 6px', fontWeight: 400 }}>
              {role}, shipping a research agent.
            </h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px', fontFamily: 'var(--mono)' }}>
              12 lessons · 4 projects · ~9h
            </p>
            {/* Stacked lesson cards (swipeable on touch via overflow-x for week strip) */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', padding: '2px 0', scrollSnapType: 'x mandatory' }}>
              {['Week 1','Week 2','Week 3','Week 4'].map((w, i) => (
                <span key={w} style={{
                  flexShrink: 0, padding: '6px 12px', borderRadius: 999,
                  background: i === 0 ? 'var(--ink)' : 'var(--surface)',
                  color: i === 0 ? 'var(--paper)' : 'var(--ink-soft)',
                  fontSize: 12, fontFamily: 'var(--mono)', border: '1px solid var(--rule)',
                  scrollSnapAlign: 'start',
                }}>{w}</span>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { d: 'Day 1', t: 'Your first system prompt', mins: 12, tool: 'Claude', preview: true },
                { d: 'Day 3', t: 'Tool use & function calls', mins: 18, tool: 'Claude' },
                { d: 'Day 5', t: 'Building a research agent', mins: 35, tool: 'Cursor' },
                { d: 'Day 7', t: 'Evals on your work', mins: 22, tool: 'Claude' },
              ].map((l, i) => (
                <div key={i} onClick={l.preview ? () => setStep(5) : undefined} style={{
                  padding: '14px 14px', background: 'var(--surface)',
                  border: l.preview ? '1.5px solid var(--accent)' : '1px solid var(--rule)',
                  borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center',
                  cursor: l.preview ? 'pointer' : 'default',
                }}>
                  <ToolIcon name={l.tool} size={28}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l.d} · {l.mins}m</div>
                    <div style={{ fontSize: 14, color: 'var(--ink)', marginTop: 2, fontWeight: 500 }}>{l.t}</div>
                  </div>
                  {l.preview && (
                    <span style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Preview →</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <Eyebrow>Lesson 01 · Day 1 · 12 min</Eyebrow>
            <h2 className="serif" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '10px 0 14px', fontWeight: 400 }}>
              Your first <span style={{ fontStyle: 'italic' }}>system prompt</span>.
            </h2>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '0 0 12px' }}>
                A great system prompt has three things: a <strong style={{ color: 'var(--ink)' }}>persona</strong>, a <strong style={{ color: 'var(--ink)' }}>process</strong>, and <strong style={{ color: 'var(--ink)' }}>boundaries</strong>.
              </p>
              <div style={{ background: 'var(--paper-2)', borderRadius: 10, padding: 12, fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink)', lineHeight: 1.7 }}>
                <div style={{ color: 'var(--muted)' }}># persona</div>
                <div>You are a <span style={{ color: 'var(--accent)' }}>skeptical senior {role.toLowerCase()}</span></div>
              </div>
            </div>
            <div style={{
              padding: 14, background: 'var(--surface)', borderRadius: 12,
              borderLeft: '3px solid var(--accent)', display: 'flex', gap: 10,
            }}>
              <Ole size={24} animated/>
              <div>
                <div style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Olé · personalized</div>
                <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                  Swapped the example to fit <strong>{tools[0] || 'Claude'}</strong>. Spot the missing knob below — try it.
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky bottom CTA bar */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '12px 16px',
        background: 'rgba(250,247,240,0.92)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--rule)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        {step > 0 && step < 5 && (
          <Button variant="ghost" size="md" onClick={() => setStep(s => s - 1)} style={{ minHeight: 48 }}>Back</Button>
        )}
        {step < 4 && (
          <Button variant="primary" size="lg" onClick={() => setStep(s => s + 1)} style={{ flex: 1, justifyContent: 'center', minHeight: 48 }}>
            {step === 0 ? 'Continue' : step === 1 ? `Continue (${tools.length})` : step === 2 ? 'Generate path' : '…'} <ArrowR size={12}/>
          </Button>
        )}
        {step === 4 && (
          <Button variant="primary" size="lg" onClick={() => setStep(5)} style={{ flex: 1, justifyContent: 'center', minHeight: 48 }}>
            Preview lesson 01 <ArrowR size={12}/>
          </Button>
        )}
        {step === 5 && (
          <Button variant="primary" size="lg" style={{ flex: 1, justifyContent: 'center', minHeight: 48 }}>
            Sign up to keep going <ArrowR size={12}/>
          </Button>
        )}
      </div>
    </div>
  );
};

window.MobileDemo = MobileDemo;
