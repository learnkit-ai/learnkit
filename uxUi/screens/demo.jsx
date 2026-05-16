// Demo flow — Role → Tools → Goal → Generation → Curriculum → Lesson preview

const DemoFlow = () => {
  const [step, setStep] = React.useState(0); // 0=role, 1=tools, 2=goal, 3=generating, 4=path, 5=lesson
  const [role, setRole] = React.useState('Product Manager');
  const [tools, setTools] = React.useState(['Claude','Cursor']);
  const [goal, setGoal] = React.useState('');
  const [typedGoal, setTypedGoal] = React.useState('');
  const [genProgress, setGenProgress] = React.useState(0);

  const roles = ['Product Manager','Software Engineer','Designer','Data Analyst','Marketer','Founder','Operations','Researcher'];
  const allTools = ['Claude','ChatGPT','Cursor','Copilot','Midjourney','Notion AI','Perplexity','Gemini'];
  const goalSamples = [
    'Ship an internal research agent for my team',
    'Use AI to draft and review specs faster',
    'Build a Cursor workflow for shipping features alone',
    'Stop hallucinated answers in our customer support bot',
  ];

  // Auto-type goal placeholder
  React.useEffect(() => {
    if (step !== 2 || goal) return;
    const target = goalSamples[0];
    let i = 0;
    const id = setInterval(() => {
      if (i <= target.length) { setTypedGoal(target.slice(0, i)); i++; } else clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [step, goal]);

  // Generation animation
  React.useEffect(() => {
    if (step !== 3) return;
    setGenProgress(0);
    const id = setInterval(() => {
      setGenProgress(p => {
        if (p >= 100) { clearInterval(id); setTimeout(() => setStep(4), 400); return 100; }
        return p + 2.5;
      });
    }, 60);
    return () => clearInterval(id);
  }, [step]);

  const advance = () => {
    if (step === 2 && !goal) setGoal(typedGoal);
    setStep(s => s + 1);
  };
  const reset = () => { setStep(0); setGoal(''); setTypedGoal(''); };

  return (
    <div data-screen-label="Demo · Build Your Path" className="paper-grain" style={{ background: 'var(--paper)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Mini header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 56px', borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Wordmark size={20}/>
          <span style={{ width: 1, height: 18, background: 'var(--rule-strong)' }}/>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>build your path</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: step > i ? 'var(--accent-3)' : step === i ? 'var(--ink)' : 'var(--surface)',
                color: step >= i ? '#FFF' : 'var(--muted)',
                border: `1px solid ${step >= i ? 'transparent' : 'var(--rule-strong)'}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontFamily: 'var(--mono)', fontWeight: 500,
              }}>{step > i ? '✓' : i + 1}</span>
              {i < 4 && <span style={{ width: 28, height: 1, background: step > i ? 'var(--accent-3)' : 'var(--rule)' }}/>}
            </div>
          ))}
          <Button size="sm" variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '48px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto' }}>
        {step === 0 && (
          <StepShell
            eyebrow="Step 01 · Tell us about you"
            title={<>What do you <span style={{ fontStyle: 'italic' }}>do</span> all day?</>}
            sub="We tune your curriculum to your role. You can change it later."
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, maxWidth: 800 }}>
              {roles.map(r => (
                <button key={r} onClick={() => setRole(r)} style={{
                  padding: '20px 16px', borderRadius: 14,
                  background: role === r ? 'var(--ink)' : 'var(--surface)',
                  color: role === r ? 'var(--paper)' : 'var(--ink)',
                  border: `1px solid ${role === r ? 'var(--ink)' : 'var(--rule)'}`,
                  fontFamily: 'var(--serif)', fontSize: 18, letterSpacing: '-0.015em',
                  textAlign: 'left', cursor: 'pointer', transition: 'all .15s ease',
                  fontWeight: 500,
                }}>{r}</button>
              ))}
            </div>
            <FlowFooter onNext={advance} canNext={!!role}/>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell
            eyebrow={`Step 02 · ${role}`}
            title={<>Which tools are <span style={{ fontStyle: 'italic' }}>already</span> in your stack?</>}
            sub="Pick what you use today — even if you barely know how. Olé will fill the gaps."
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, maxWidth: 800 }}>
              {allTools.map(t => {
                const active = tools.includes(t);
                return (
                  <button key={t} onClick={() => setTools(active ? tools.filter(x => x !== t) : [...tools, t])} style={{
                    padding: '18px', borderRadius: 14,
                    background: active ? 'var(--surface)' : 'var(--surface-2)',
                    border: `1.5px solid ${active ? 'var(--accent)' : 'var(--rule)'}`,
                    display: 'flex', alignItems: 'center', gap: 12,
                    cursor: 'pointer', transition: 'all .15s ease',
                    boxShadow: active ? 'var(--shadow-1)' : 'none',
                  }}>
                    <ToolIcon name={t} size={28}/>
                    <div style={{ textAlign: 'left' }}>
                      <div className="serif" style={{ fontSize: 17, letterSpacing: '-0.015em', fontWeight: 500, color: 'var(--ink)' }}>{t}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                        {active ? '✓ Selected' : 'Tap to add'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <OleHint>Got something else? Olé covers 40+ tools — you can add the rest after signup.</OleHint>
            <FlowFooter onBack={() => setStep(0)} onNext={advance} canNext={tools.length > 0}/>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            eyebrow="Step 03 · Your goal"
            title={<>What do you want to <span style={{ fontStyle: 'italic' }}>actually do</span> with these?</>}
            sub="One sentence is plenty. Olé will turn it into a 30-day plan."
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
              <textarea
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder=""
                style={{
                  width: '100%', minHeight: 120, padding: '18px 20px',
                  fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.4,
                  background: 'var(--surface)', border: '1.5px solid var(--rule-strong)',
                  borderRadius: 14, resize: 'none', color: 'var(--ink)',
                  letterSpacing: '-0.015em', outline: 'none',
                }}
              />
              {!goal && (
                <div style={{ position: 'absolute', top: 18, left: 21, fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--muted)', pointerEvents: 'none', lineHeight: 1.4, letterSpacing: '-0.015em' }}>
                  {typedGoal}
                  <span style={{ borderRight: '2px solid var(--accent)', animation: 'typewriter-cursor 1s infinite', marginLeft: 1 }}>&nbsp;</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 720, marginTop: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', alignSelf: 'center' }}>Try:</span>
              {goalSamples.map(s => (
                <Chip key={s} onClick={() => setGoal(s)}>{s}</Chip>
              ))}
            </div>
            <FlowFooter onBack={() => setStep(1)} onNext={advance} canNext={!!(goal || typedGoal)}/>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell eyebrow="Step 04 · Olé is thinking" title={<>Drafting your <span style={{ fontStyle: 'italic' }}>30-day path</span>…</>} sub="">
            <GenerationView role={role} tools={tools} goal={goal || typedGoal} progress={genProgress}/>
          </StepShell>
        )}

        {step === 4 && (
          <StepShell eyebrow="Step 05 · Your path" title={<>Here's your <span style={{ fontStyle: 'italic' }}>30 days</span>.</>} sub={`Tuned for a ${role} working with ${tools.join(' + ')}. Reorder, swap, or skip — it's yours.`}>
            <CurriculumView tools={tools} goal={goal || typedGoal} onLessonClick={() => setStep(5)}/>
            <FlowFooter onBack={() => setStep(2)} nextLabel="Start day 1" onNext={() => setStep(5)} canNext/>
          </StepShell>
        )}

        {step === 5 && (
          <StepShell eyebrow="Lesson 01 · Day 1 · 12 min" title={<>Your first <span style={{ fontStyle: 'italic' }}>system prompt</span>.</>} sub="">
            <LessonPreview role={role} tools={tools} goal={goal || typedGoal} onBack={() => setStep(4)}/>
          </StepShell>
        )}
      </div>
    </div>
  );
};

const StepShell = ({ eyebrow, title, sub, children }) => (
  <div style={{ width: '100%', maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
    <div style={{ animation: 'float-up .4s ease both' }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="serif" style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '14px 0 12px', fontWeight: 400 }}>{title}</h1>
      {sub && <p style={{ fontSize: 16.5, color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0, maxWidth: 640 }}>{sub}</p>}
    </div>
    {children}
  </div>
);

const FlowFooter = ({ onBack, onNext, canNext, nextLabel = 'Continue' }) => (
  <div style={{ display: 'flex', gap: 12, marginTop: 16, alignItems: 'center' }}>
    {onBack && <Button variant="ghost" size="md" onClick={onBack}>← Back</Button>}
    <Button variant="primary" size="md" onClick={canNext ? onNext : undefined} style={{ opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}>
      {nextLabel} <ArrowR size={12}/>
    </Button>
  </div>
);

const GenerationView = ({ role, tools, goal, progress }) => {
  const phases = [
    { at: 0, label: 'Reading your goal', detail: '"' + (goal.slice(0, 60) + (goal.length > 60 ? '…' : '')) + '"' },
    { at: 18, label: 'Mapping tools to skills', detail: tools.join(' · ') + ' → 14 core skills' },
    { at: 38, label: `Looking up ${role} archetypes`, detail: 'Cross-referencing 4,200 similar paths' },
    { at: 58, label: 'Sequencing 30 lessons', detail: 'Day 1 → 30 · spaced practice' },
    { at: 78, label: 'Picking your first project', detail: 'Something you can ship Friday' },
    { at: 95, label: 'Done', detail: 'Path ready' },
  ];
  const current = [...phases].reverse().find(p => progress >= p.at);
  return (
    <div style={{ width: '100%', maxWidth: 720, marginTop: 16 }}>
      <div style={{
        background: 'var(--surface)', borderRadius: 18, padding: 28,
        border: '1px solid var(--rule)', boxShadow: 'var(--shadow-2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <Ole size={36} animated/>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Olé</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>thinking · {Math.round(progress / 5)}s</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {phases.slice(0, -1).map((p, i) => {
            const done = progress > (phases[i + 1]?.at || 100);
            const active = progress >= p.at && !done;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                opacity: progress >= p.at ? 1 : 0.3,
                transition: 'opacity .3s ease',
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%', marginTop: 2,
                  background: done ? 'var(--accent-3)' : active ? 'var(--accent)' : 'var(--rule)',
                  color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, flexShrink: 0,
                  animation: active ? 'pulse-soft 1.2s infinite' : 'none',
                }}>{done ? '✓' : ''}</span>
                <div>
                  <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: active ? 500 : 400 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 2 }}>{p.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 24, height: 3, background: 'var(--rule)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)', transition: 'width .15s ease' }}/>
        </div>
      </div>
    </div>
  );
};

const CurriculumView = ({ tools, goal, onLessonClick }) => {
  const path = [
    { week: 'Week 1', title: 'Fundamentals', accent: 'var(--accent)', lessons: [
      { d: 'Day 1', t: 'Your first system prompt', mins: 12, tool: tools[0] || 'Claude' },
      { d: 'Day 2', t: 'When AI lies (and how to catch it)', mins: 14, tool: tools[0] || 'Claude' },
      { d: 'Day 3', t: 'Project: rewrite your daily standup', mins: 22, tool: tools[0] || 'Claude' },
    ]},
    { week: 'Week 2', title: 'Workflows', accent: 'var(--accent-3)', lessons: [
      { d: 'Day 8', t: 'Chaining prompts into pipelines', mins: 18, tool: tools[1] || tools[0] || 'Claude' },
      { d: 'Day 10', t: 'Tools, functions, and structured output', mins: 24, tool: tools[1] || tools[0] || 'Claude' },
      { d: 'Day 12', t: 'Project: a research agent for your team', mins: 45, tool: tools[1] || tools[0] || 'Claude' },
    ]},
    { week: 'Week 3', title: 'Production', accent: 'var(--accent-4)', lessons: [
      { d: 'Day 15', t: 'Evals: how to know it actually works', mins: 20, tool: tools[0] || 'Claude' },
      { d: 'Day 17', t: 'Fixing hallucinations the boring way', mins: 16, tool: tools[0] || 'Claude' },
      { d: 'Day 20', t: 'Project: ship to your team Friday', mins: 60, tool: tools[0] || 'Claude' },
    ]},
    { week: 'Week 4', title: 'Practicum', accent: 'var(--accent-2)', lessons: [
      { d: 'Day 24', t: 'Prompt review with Olé', mins: 30, tool: 'Olé' },
      { d: 'Day 27', t: 'Office hours: bring your work', mins: 60, tool: 'Live' },
      { d: 'Day 30', t: 'Earn the LearnKit Practitioner mark', mins: 90, tool: 'Cert' },
    ]},
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Summary bar */}
      <div style={{
        background: 'var(--surface)', borderRadius: 14, padding: 18,
        border: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {[
            { k: '12', v: 'core lessons' },
            { k: '4', v: 'shipped projects' },
            { k: '~9h', v: 'total time' },
            { k: '30', v: 'days' },
          ].map(s => (
            <div key={s.v}>
              <div className="serif" style={{ fontSize: 28, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 500 }}>{s.k}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 2 }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="sm">Swap a lesson</Button>
          <Button variant="ghost" size="sm">Export to calendar</Button>
        </div>
      </div>

      {path.map((w, wi) => (
        <div key={wi} style={{
          background: 'var(--surface)', borderRadius: 14, padding: 0,
          border: '1px solid var(--rule)', overflow: 'hidden',
          animation: `float-up .5s ease both`, animationDelay: `${wi * 0.08}s`,
        }}>
          <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface-2)' }}>
            <span style={{ width: 6, height: 28, background: w.accent, borderRadius: 3 }}/>
            <div className="serif" style={{ fontSize: 20, letterSpacing: '-0.02em', fontWeight: 500 }}>
              <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 12 }}>{w.week}</span>
              {w.title}
            </div>
          </div>
          <div>
            {w.lessons.map((l, li) => (
              <div key={li}
                onClick={wi === 0 && li === 0 ? onLessonClick : undefined}
                style={{
                  padding: '14px 22px',
                  display: 'flex', alignItems: 'center', gap: 16,
                  borderBottom: li < w.lessons.length - 1 ? '1px solid var(--rule)' : 'none',
                  cursor: (wi === 0 && li === 0) ? 'pointer' : 'default',
                  transition: 'background .15s ease',
                }}
                onMouseEnter={e => { if (wi === 0 && li === 0) e.currentTarget.style.background = 'var(--paper-2)'; }}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', width: 60, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.d}</span>
                <div style={{ flex: 1, fontSize: 15, color: 'var(--ink)' }}>
                  {l.t}
                  {wi === 0 && li === 0 && (
                    <span style={{ marginLeft: 10, fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      ← preview
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{l.mins}m</span>
                <ToolIcon name={l.tool} size={20}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const LessonPreview = ({ role, tools, goal, onBack }) => {
  const [section, setSection] = React.useState(1);
  const primaryTool = (tools && tools[0]) || 'Claude';
  const roleShort = (role || 'Product Manager').split(' ').slice(-1)[0].toLowerCase();
  return (
    <div style={{ width: '100%', maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 320px', gap: 16, minHeight: 540 }}>
        {/* Left — outline */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: 16 }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Outline</div>
          {[
            'What a system prompt does',
            'Anatomy of a great prompt',
            'Try one: rewriting your standup',
            'Common mistakes',
            'Practice & ship',
          ].map((t, i) => (
            <div key={i} onClick={() => setSection(i)} style={{
              display: 'flex', gap: 10, padding: '8px 8px', borderRadius: 6, marginBottom: 2,
              background: section === i ? 'var(--paper-3)' : 'transparent', cursor: 'pointer',
              fontSize: 12.5, fontWeight: section === i ? 500 : 400, color: 'var(--ink)',
            }}>
              <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11, width: 16 }}>{i + 1}</span>
              {t}
            </div>
          ))}
        </div>

        {/* Center — content */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: '32px 36px', overflow: 'hidden' }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Section 02 · Anatomy</div>
          <h2 className="serif" style={{ fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 16px', fontWeight: 500 }}>
            A great system prompt has <span style={{ fontStyle: 'italic' }}>three</span> things.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.65, margin: '0 0 20px' }}>
            Most people open ChatGPT and start asking. The pros write a <strong style={{ color: 'var(--ink)' }}>persona</strong>, define a <strong style={{ color: 'var(--ink)' }}>process</strong>, and set <strong style={{ color: 'var(--ink)' }}>boundaries</strong>. That's it. Three knobs.
          </p>
          <div style={{ background: 'var(--paper-2)', borderRadius: 12, padding: 16, fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.7, border: '1px solid var(--rule)' }}>
            <div style={{ color: 'var(--muted)' }}># persona</div>
            <div>You are a <span style={{ color: 'var(--accent)' }}>skeptical senior PM</span></div>
            <div style={{ marginTop: 8, color: 'var(--muted)' }}># process</div>
            <div>For each user input, you:</div>
            <div style={{ paddingLeft: 16 }}>1. Ask one clarifying question</div>
            <div style={{ paddingLeft: 16 }}>2. List 3 alternatives</div>
            <div style={{ paddingLeft: 16 }}>3. Pick one with rationale</div>
            <div style={{ marginTop: 8, color: 'var(--muted)' }}># boundaries</div>
            <div>Never invent metrics. If unsure, say so.</div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.65, margin: '20px 0 0' }}>
            Try it now in the workbench on the right →
          </p>
        </div>

        {/* Right — Olé chat in lesson */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Ole size={20}/>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Olé</div>
            </div>
            <div style={{ background: 'var(--paper-2)', padding: '10px 12px', borderRadius: 10, fontSize: 12.5, lineHeight: 1.5 }}>
              I noticed you picked <strong style={{ color: 'var(--ink)' }}>{primaryTool}</strong> as your main tool — I swapped the example to fit. Spot the missing knob:
            </div>
            <div style={{ background: 'var(--paper-2)', padding: '10px 12px', borderRadius: 10, fontFamily: 'var(--mono)', fontSize: 11.5, lineHeight: 1.5 }}>
              {primaryTool === 'Cursor' && '"You are a senior engineer. Refactor this file."'}
              {primaryTool === 'Claude' && `"You are a senior ${roleShort}. Review this spec."`}
              {primaryTool === 'ChatGPT' && '"You are a research assistant. Summarize this report."'}
              {!['Cursor','Claude','ChatGPT'].includes(primaryTool) && `"You are a ${roleShort}'s assistant. Help with this task."`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
              {['Persona','Process','Boundaries'].map((o, i) => (
                <button key={o} style={{
                  padding: '10px 12px', borderRadius: 10, fontSize: 13,
                  border: '1px solid var(--rule)', background: i === 1 ? 'var(--paper-2)' : 'var(--surface)',
                  textAlign: 'left', cursor: 'pointer', color: 'var(--ink)',
                  fontFamily: 'var(--sans)',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', marginRight: 8 }}>{String.fromCharCode(65 + i)}</span>
                  {o}
                </button>
              ))}
            </div>
          </div>
          <Button variant="accent" size="md" style={{ justifyContent: 'center' }}>
            Continue to section 03 <ArrowR size={12}/>
          </Button>
        </div>
      </div>
      <FlowFooter onBack={onBack} nextLabel="Sign up to keep going" canNext onNext={() => {}}/>
    </div>
  );
};

window.DemoFlow = DemoFlow;
