// LearnKit — Landing page (warm-academic, audit pass)

const Nav = () => (
  <nav style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 56px', borderBottom: '1px solid var(--rule)',
    position: 'sticky', top: 0, background: 'var(--paper)', zIndex: 50,
    backdropFilter: 'blur(8px)',
  }}>
    <Wordmark size={22} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 13.5, color: 'var(--ink-soft)' }}>
      <a style={navLink}>For teams</a>
      <a style={navLink}>Developers</a>
      <a style={navLink}>Curriculum</a>
      <a style={navLink}>Pricing</a>
      <a style={navLink}>Docs</a>
      <a style={{ ...navLink, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>
        GitHub
      </a>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <a style={{ ...navLink, fontSize: 13.5 }}>Sign in</a>
      <Button size="sm" variant="ghost">Book a demo</Button>
      <Button size="sm" variant="primary">Try free <ArrowR size={12}/></Button>
    </div>
  </nav>
);

const navLink = {
  color: 'var(--ink-soft)', textDecoration: 'none', cursor: 'pointer',
  fontWeight: 450, letterSpacing: '-0.005em',
};

// ─── HERO — concrete promise, audience tri-path, pricing chip, live workbench
const Hero = () => (
  <section style={{ padding: '72px 56px 40px', position: 'relative', overflow: 'hidden' }}>
    <AmbientArc style={{ top: -120, right: -120 }} size={460} color="var(--accent-2)"/>

    <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Eyebrow>The AI workbench for teams that ship</Eyebrow>
        <h1 className="serif" style={{
          fontSize: 76, lineHeight: 0.98, letterSpacing: '-0.035em',
          margin: '20px 0 22px', color: 'var(--ink)', fontWeight: 400,
        }}>
          Make your team<br/>
          good at AI by <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Friday</span>.
        </h1>
        <p style={{
          fontSize: 18.5, lineHeight: 1.5, color: 'var(--ink-soft)',
          maxWidth: 540, margin: '0 0 28px', letterSpacing: '-0.005em',
        }}>
          LearnKit turns Claude, Cursor, ChatGPT and 40 other tools into a curriculum
          your people learn by <em>building real things</em> at work — reviewed by Olé,
          our AI tutor.
        </p>

        {/* Audience tri-CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18, maxWidth: 560 }}>
          {[
            { tag: 'For me', cta: 'Try free', sub: '$24/mo · 7-day trial', accent: 'var(--ink)', primary: true },
            { tag: 'For my team', cta: 'Book a demo', sub: '$18/seat · SSO + SCIM', accent: 'var(--accent-3)' },
            { tag: 'For developers', cta: 'Open the docs', sub: 'REST · open SDKs', accent: 'var(--accent-4)' },
          ].map(p => (
            <a key={p.tag} style={{
              display: 'block', padding: '14px 14px',
              background: p.primary ? 'var(--ink)' : 'var(--surface)',
              color: p.primary ? 'var(--paper)' : 'var(--ink)',
              border: `1px solid ${p.primary ? 'var(--ink)' : 'var(--rule)'}`,
              borderRadius: 12, cursor: 'pointer', textDecoration: 'none',
              borderTop: `3px solid ${p.accent}`,
              transition: 'all .15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 6 }}>{p.tag}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{p.cta}</span>
                <ArrowR size={11}/>
              </div>
              <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4, fontFamily: 'var(--mono)' }}>{p.sub}</div>
            </a>
          ))}
        </div>

        {/* Quiet trust ribbon */}
        <div style={{ marginTop: 22, display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap', fontSize: 12.5, color: 'var(--muted)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-flex' }}>
              {[0,1,2,3,4].map(i => (
                <span key={i} style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: ['#C8472A','#E8B547','#6B8F6E','#2C5F8D','#1A2547'][i],
                  border: '2px solid var(--paper)', marginLeft: i ? -6 : 0,
                }}/>
              ))}
            </span>
            <span><strong style={{ color: 'var(--ink)' }}>240 ICs at Ramp</strong> · 94% completion</span>
          </span>
          <span style={{ width: 1, height: 14, background: 'var(--rule-strong)' }}/>
          <span>SOC 2 · GDPR · HIPAA</span>
          <span style={{ width: 1, height: 14, background: 'var(--rule-strong)' }}/>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>
            <strong style={{ color: 'var(--ink)' }}>4.2k</strong> on GitHub
          </span>
        </div>
      </div>

      <HeroLiveWorkbench />
    </div>
  </section>
);

// Animated mini-workbench: prompt → run → Olé feedback loop
const HeroLiveWorkbench = () => {
  const [phase, setPhase] = React.useState(0); // 0 typing, 1 running, 2 feedback
  const [typed, setTyped] = React.useState('');
  const target = 'You are a senior research analyst. For each PDF: extract 3 claims, cross-reference with web_search, and draft a 200-word memo with citations.';

  React.useEffect(() => {
    if (phase === 0) {
      let i = 0;
      const id = setInterval(() => {
        if (i <= target.length) { setTyped(target.slice(0, i)); i += 2; }
        else { clearInterval(id); setTimeout(() => setPhase(1), 600); }
      }, 30);
      return () => clearInterval(id);
    }
    if (phase === 1) { const t = setTimeout(() => setPhase(2), 1600); return () => clearTimeout(t); }
    if (phase === 2) { const t = setTimeout(() => { setPhase(0); setTyped(''); }, 4000); return () => clearTimeout(t); }
  }, [phase]);

  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 18, border: '1px solid var(--rule)',
      boxShadow: 'var(--shadow-3)', padding: 18, position: 'relative', minHeight: 520,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 12px', borderBottom: '1px solid var(--rule)' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF6058' }}/>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FFBD2E' }}/>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28CA42' }}/>
        <span style={{ marginLeft: 12, fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          workbench / lesson 12 · prompt.md
        </span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: phase === 1 ? 'var(--accent-2)' : 'var(--accent-3)', animation: phase === 1 ? 'pulse-soft 1s infinite' : 'none' }}/>
          {phase === 0 ? 'editing' : phase === 1 ? 'running' : 'reviewed'}
        </span>
      </div>

      {/* Prompt editor */}
      <div style={{ background: 'var(--ink)', borderRadius: 10, padding: 14, marginTop: 12, minHeight: 140 }}>
        <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--paper)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
{typed}
{phase === 0 && <span style={{ borderRight: '2px solid var(--accent)', marginLeft: 1, animation: 'typewriter-cursor 1s infinite' }}>&nbsp;</span>}
        </pre>
      </div>

      {/* Run output */}
      {phase >= 1 && (
        <div style={{ marginTop: 12, padding: 14, background: 'var(--paper-2)', borderRadius: 10, border: '1px solid var(--rule)', animation: 'float-up .3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <ToolIcon name="Claude" size={18}/>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>claude · {phase === 1 ? 'streaming…' : 'response · 2.1s · 312 tokens'}</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.55 }}>
            {phase === 1 ? (
              <span className="shimmer">Reading PDF · cross-referencing sources · drafting memo</span>
            ) : (
              <span>
                <strong>3 claims found.</strong> Memo drafted with 4 citations.<br/>
                <span style={{ color: 'var(--muted)' }}>memo.md saved → portfolio</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Olé feedback */}
      {phase === 2 && (
        <div style={{
          marginTop: 12, padding: 14, background: 'var(--surface)', borderRadius: 10,
          border: '1px solid var(--accent)', borderLeft: '3px solid var(--accent)',
          boxShadow: 'var(--shadow-1)', animation: 'float-up .35s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Ole size={24} animated/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Olé · review</div>
              <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                Solid prompt — but no refusal clause. When the PDF lacks a claim, your agent will invent one.
                Add: <code style={{ background: 'var(--paper-2)', padding: '1px 6px', borderRadius: 4, fontSize: 12, fontFamily: 'var(--mono)' }}>"If unsupported, say so."</code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── PathsForEveryone — moved to position 2 (right after hero)
const PathsForEveryone = () => {
  const audiences = [
    {
      tag: 'For individuals',
      title: 'Get good at the AI tools your team already uses.',
      copy: 'Pick a role, pick your stack, ship something Friday. Adaptive curriculum, real projects, reviewed by Olé.',
      bullets: ['40+ tool tracks', 'Project-based assessments', 'LearnKit Practitioner credential'],
      cta: 'Try free for 7 days',
      tone: 'var(--accent)',
    },
    {
      tag: 'For teams & L&D',
      title: 'Roll out AI capability across hundreds of seats.',
      copy: 'SCIM, SSO, role-mapped curricula, and dashboards that show what your team can build — not just what they watched.',
      bullets: ['SSO + SCIM (Okta, Azure)', 'Role-mapped curricula', 'Manager evidence reports'],
      cta: 'Book a 20-min demo',
      tone: 'var(--accent-3)',
    },
    {
      tag: 'For developers',
      title: 'Open SDKs to embed Olé in your own product.',
      copy: 'Three lines of JS adds adaptive lessons, evals, and an in-product tutor to anything you ship.',
      bullets: ['MIT-licensed SDKs · GitHub', 'REST + Webhooks', 'White-label Olé'],
      cta: 'Read the docs',
      tone: 'var(--accent-4)',
    },
  ];
  return (
    <section style={{ padding: '32px 56px 80px', borderTop: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ paddingTop: 48, marginBottom: 40, maxWidth: 720 }}>
          <Eyebrow>One product. Three doors.</Eyebrow>
          <h2 className="serif" style={{ fontSize: 48, lineHeight: 1.04, letterSpacing: '-0.025em', margin: '12px 0 14px', fontWeight: 400 }}>
            Built for whoever's <span style={{ fontStyle: 'italic' }}>asking</span>.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {audiences.map((a, i) => (
            <div key={i} style={{
              background: 'var(--surface)', borderRadius: 16, padding: 28,
              border: '1px solid var(--rule)', display: 'flex', flexDirection: 'column',
              minHeight: 380, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: a.tone }}/>
              <Eyebrow color={a.tone}>{a.tag}</Eyebrow>
              <h3 className="serif" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '18px 0 10px', fontWeight: 500 }}>{a.title}</h3>
              <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '0 0 16px' }}>{a.copy}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {a.bullets.map(b => (
                  <li key={b} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--ink-soft)' }}>
                    <span style={{ color: a.tone }}>·</span>{b}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto' }}>
                <Button variant="ghost" size="sm">{a.cta} <ArrowR size={11}/></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── How it works (single, sharper section — replaces HowItWorks + ProductShowcase split)
const HowItWorks = () => {
  const steps = [
    { n: '01', title: 'Tell Olé about your work', body: 'Role, stack, and one sentence about what you want to ship. Takes 90 seconds.' },
    { n: '02', title: 'Get a 30-day path', body: 'Lessons, projects, and a final practicum — sequenced for your job, not a generic curriculum.' },
    { n: '03', title: 'Build in the workbench', body: 'Real prompts, real agents, real outputs. Olé reviews each one and tells you exactly where it breaks.' },
    { n: '04', title: 'Ship to your team', body: 'Pass the practicum and you ship to production with a credential your manager actually recognizes.' },
  ];
  return (
    <section style={{ padding: '88px 56px 64px', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, maxWidth: 720 }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="serif" style={{ fontSize: 48, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '12px 0 14px', fontWeight: 400 }}>
            Less <span style={{ fontStyle: 'italic' }}>watching</span>. More building.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 580 }}>
            Most AI training is a video library. LearnKit gives you a 30-day path, a workbench,
            and a tutor that reads your prompts — built for the work, not the certificate.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
          {steps.map(s => (
            <div key={s.n} style={{ background: 'var(--surface)', padding: 26, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: 24 }}>{s.n}</span>
              <h3 className="serif" style={{ fontSize: 21, lineHeight: 1.15, margin: '0 0 10px', letterSpacing: '-0.02em', fontWeight: 500 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Workbench (kept; one section, not two)
const ProductShowcase = () => (
  <section style={{ padding: '40px 56px 96px', background: 'var(--paper-2)' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 36, maxWidth: 640 }}>
        <Eyebrow>The workbench</Eyebrow>
        <h2 className="serif" style={{ fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '12px 0 10px', fontWeight: 400 }}>
          Where the lesson <span style={{ fontStyle: 'italic' }}>becomes the work</span>.
        </h2>
        <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
          One pane for the prompt, one for the run, one for Olé's review. Everything you build is saved to a portfolio your manager can audit.
        </p>
      </div>
      <WorkbenchMock />
    </div>
  </section>
);

const WorkbenchMock = () => (
  <div style={{ background: 'var(--surface)', borderRadius: 18, border: '1px solid var(--rule)', padding: 16, boxShadow: 'var(--shadow-2)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 12px', borderBottom: '1px solid var(--rule)', marginBottom: 12 }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF6058' }}/>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }}/>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA42' }}/>
      <div style={{ marginLeft: 16, fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
        learnkit · workbench / module-04 / build-a-research-agent.lk
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: 14, height: 460 }}>
      <div style={{ background: 'var(--paper-2)', borderRadius: 10, padding: 14, border: '1px solid var(--rule)' }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Module 04</div>
        {[
          { t: 'Why agents fail', done: true },
          { t: 'Tool use & function calls', done: true },
          { t: 'Building a research agent', active: true },
          { t: 'Evaluating outputs', done: false },
          { t: 'Productionizing', done: false },
          { t: 'Practicum: ship it', done: false, lock: true },
        ].map((it, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px',
            borderRadius: 6, marginBottom: 2,
            background: it.active ? 'var(--surface)' : 'transparent',
            color: it.lock ? 'var(--muted)' : 'var(--ink)',
            fontSize: 12.5, fontWeight: it.active ? 500 : 400,
          }}>
            <span style={{
              width: 13, height: 13, borderRadius: '50%',
              background: it.done ? 'var(--accent-3)' : it.active ? 'var(--accent)' : 'transparent',
              border: `1px solid ${it.done || it.active ? 'transparent' : 'var(--rule-strong)'}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFF', fontSize: 9,
            }}>{it.done ? '✓' : ''}</span>
            <span>{it.t}</span>
            {it.lock && <span style={{ marginLeft: 'auto', fontSize: 10 }}>🔒</span>}
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--ink)', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {['system.md','agent.py','eval.json'].map((t, i) => (
            <div key={t} style={{
              padding: '10px 16px', fontSize: 12, fontFamily: 'var(--mono)',
              color: i === 0 ? 'var(--paper)' : 'rgba(244,239,227,0.5)',
              background: i === 0 ? 'rgba(255,255,255,0.04)' : 'transparent',
              borderRight: '1px solid rgba(255,255,255,0.06)',
            }}>{t}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--paper)', lineHeight: 1.7, overflow: 'hidden' }}>
          <div style={{ color: 'rgba(244,239,227,0.4)' }}># System prompt — research analyst</div>
          <div style={{ marginTop: 8 }}>You are a <span style={{ color: 'var(--accent-2)' }}>senior research analyst</span> at a</div>
          <div>boutique consultancy. When given a PDF, you:</div>
          <div style={{ marginTop: 4, paddingLeft: 16 }}>
            <div>1. Extract the 3 most important claims</div>
            <div>2. Cross-reference against <span style={{ color: 'var(--accent-2)' }}>web_search()</span></div>
            <div>3. Draft a 200-word memo with citations</div>
          </div>
          <div style={{ marginTop: 12, color: 'rgba(244,239,227,0.4)' }}># Tone</div>
          <div>Concise. Skeptical. Cite sources<span style={{ animation: 'typewriter-cursor 1s infinite', borderRight: '2px solid var(--accent)', marginLeft: 2 }}>&nbsp;</span></div>
          <div style={{
            marginTop: 28, padding: '10px 12px', background: 'rgba(232,181,71,0.10)',
            borderLeft: '2px solid var(--accent-2)', borderRadius: '0 8px 8px 0',
            fontFamily: 'var(--sans)', fontSize: 12.5, color: 'rgba(244,239,227,0.85)',
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 4, color: 'var(--accent-2)' }}>
              <Ole size={16}/> <strong style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Olé</strong>
            </div>
            Add a refusal clause — last week your agent invented a citation when it couldn't find one.
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--paper-2)', borderRadius: 10, padding: 14, border: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Ole size={20}/>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Olé</div>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-3)' }}/>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>2s</span>
        </div>
        <div style={{ background: 'var(--surface)', padding: '10px 12px', borderRadius: 10, fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink)' }}>
          Your prompt is solid. Two notes before you run it:
        </div>
        <div style={{ paddingLeft: 6, fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
            <span style={{ color: 'var(--accent)' }}>·</span>
            <code style={{ background: 'var(--surface)', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>web_search</code> with no domain allowlist.
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ color: 'var(--accent)' }}>·</span>
            200-word cap will clip on long PDFs.
          </div>
        </div>
        <div style={{
          marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 10px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--rule)',
        }}>
          <span style={{ fontSize: 12, color: 'var(--muted)', flex: 1 }}>Ask Olé anything…</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>⌘K</span>
        </div>
      </div>
    </div>
  </div>
);

// ─── Curriculum
const Curriculum = () => {
  const tracks = [
    { tool: 'Claude', mods: 8, hours: 14, hot: true },
    { tool: 'Cursor', mods: 5, hours: 9, hot: true },
    { tool: 'ChatGPT', mods: 6, hours: 11 },
    { tool: 'Copilot', mods: 4, hours: 7 },
    { tool: 'Midjourney', mods: 4, hours: 6 },
    { tool: 'Notion AI', mods: 3, hours: 5 },
    { tool: 'Perplexity', mods: 3, hours: 4 },
    { tool: 'Gemini', mods: 4, hours: 7 },
  ];
  return (
    <section style={{ padding: '88px 56px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <Eyebrow>Library</Eyebrow>
            <h2 className="serif" style={{ fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '12px 0 10px', fontWeight: 400 }}>
              Pick a tool. Or all of them.
            </h2>
            <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 580 }}>
              Tracks for the tools your team actually pays for. Updated every other week with each tool's latest capabilities.
            </p>
          </div>
          <Button variant="link" size="sm">Browse all 40 tracks <ArrowR size={11}/></Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {tracks.map(t => (
            <div key={t.tool} style={{
              background: 'var(--surface)', border: '1px solid var(--rule)',
              borderRadius: 12, padding: 18, cursor: 'pointer', position: 'relative',
              transition: 'all .2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              {t.hot && (
                <span style={{ position: 'absolute', top: 14, right: 14, fontSize: 9.5, fontFamily: 'var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Most picked</span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <ToolIcon name={t.tool} size={26}/>
                <div className="serif" style={{ fontSize: 18, letterSpacing: '-0.02em', fontWeight: 500 }}>{t.tool}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                <span>{t.mods} modules · {t.hours}h</span>
                <span style={{ color: 'var(--ink-soft)' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Proof block — replaces fake-logo wall, replaces dark testimonial overdesign
const Proof = () => (
  <section style={{ padding: '88px 56px', background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
      <Eyebrow color="var(--accent-2)">Working at</Eyebrow>
      <div style={{
        marginTop: 24, marginBottom: 56,
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20, alignItems: 'center',
      }}>
        {/* Stylized customer wordmarks — clearly placeholder-quality monograms, not pretending to be real lockups */}
        {[
          { n: 'Ramp', w: 600 },
          { n: 'Figma', w: 500 },
          { n: 'Linear', w: 400 },
          { n: 'Vercel', w: 600 },
          { n: 'Notion', w: 500 },
          { n: 'Replit', w: 600 },
        ].map(c => (
          <div key={c.n} className="serif" style={{
            fontSize: 24, fontWeight: c.w / 100, letterSpacing: '-0.025em',
            color: 'rgba(244,239,227,0.55)', textAlign: 'center',
          }}>{c.n}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 32, alignItems: 'flex-start', borderTop: '1px solid rgba(244,239,227,0.12)', paddingTop: 36 }}>
        <blockquote className="serif" style={{
          fontSize: 26, lineHeight: 1.25, letterSpacing: '-0.015em',
          margin: 0, fontWeight: 400, fontStyle: 'italic',
        }}>
          "Six weeks in, our PMs were shipping AI features without engineers babysitting them.
          That's the ROI nobody believes until they see it."
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18, fontStyle: 'normal' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}/>
            <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.7)' }}>
              <strong style={{ color: 'var(--paper)' }}>Maya Krishnan</strong> · VP Eng · Ramp
            </div>
          </div>
        </blockquote>
        {[
          { k: '94%', v: 'completion rate', sub: 'across 240 ICs' },
          { k: '6.2×', v: 'tools per IC', sub: 'after week 4' },
          { k: '38', v: 'shipped projects', sub: 'in Q1' },
        ].map(s => (
          <div key={s.v}>
            <div className="serif" style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--accent-2)', lineHeight: 1 }}>{s.k}</div>
            <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.85)', marginTop: 6 }}>{s.v}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(244,239,227,0.5)', marginTop: 2, fontFamily: 'var(--mono)' }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Open-source / developer call-out — strengthens dev positioning
const OpenSource = () => (
  <section style={{ padding: '80px 56px', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }}>
      <div>
        <Eyebrow color="var(--accent-4)">Open SDKs</Eyebrow>
        <h2 className="serif" style={{ fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '12px 0 14px', fontWeight: 400 }}>
          The SDKs are <span style={{ fontStyle: 'italic' }}>open</span>. The pedagogy is the product.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 22 }}>
          MIT-licensed clients for JavaScript, Python, Ruby and Go. Embed Olé in your app, run evals on your users' work, or fork the eval rubrics for your own product.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="primary" size="md">Star on GitHub <ArrowR size={12}/></Button>
          <Button variant="ghost" size="md">Read the docs</Button>
        </div>
      </div>
      <div style={{ background: 'var(--ink)', borderRadius: 14, padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-2)' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, fontFamily: 'var(--mono)', color: 'rgba(244,239,227,0.6)' }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="rgba(244,239,227,0.6)"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>
          getlearnkit/sdk · MIT · 4.2k ★
          <span style={{ marginLeft: 'auto', color: 'var(--accent-3)' }}>● synced 2m ago</span>
        </div>
        <pre style={{ margin: 0, padding: '20px 22px', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--paper)', lineHeight: 1.7, overflow: 'auto' }}>
<span style={{ color: 'rgba(244,239,227,0.4)' }}>{`// 3 lines. That's the whole integration.`}</span>{'\n'}
<span style={{ color: '#7BA8D9' }}>import</span>{' { Tutor } '}<span style={{ color: '#7BA8D9' }}>from</span>{' '}<span style={{ color: '#E8B547' }}>'@learnkit/react'</span>;{'\n\n'}
<span style={{ color: '#7BA8D9' }}>{'<'}</span>Tutor{' '}<span style={{ color: '#8FB293' }}>apiKey</span>={'{KEY}'} <span style={{ color: '#8FB293' }}>userId</span>={'{user.id}'} <span style={{ color: '#7BA8D9' }}>{'/>'}</span>
        </pre>
      </div>
    </div>
  </section>
);

// ─── Pricing
const Pricing = () => {
  const tiers = [
    { name: 'Learner', price: '$24', per: '/mo', desc: 'For individuals.', features: ['All 40 tool tracks','Olé tutoring','Practicums + credentials','Portfolio hosting'], cta: 'Try free 7 days' },
    { name: 'Team', price: '$18', per: '/seat/mo', desc: 'For L&D and engineering leaders.', features: ['Everything in Learner','SSO + SCIM','Manager evidence reports','Role-mapped curricula','Slack & Teams delivery'], cta: 'Book a demo', featured: true },
    { name: 'API', price: 'Usage', per: 'pay-as-you-go', desc: 'Embed LearnKit in your product.', features: ['Open SDKs · MIT','REST + Webhooks','Custom evals','White-label Olé','SOC 2 · GDPR · HIPAA'], cta: 'Read the docs' },
  ];
  return (
    <section style={{ padding: '88px 56px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <Eyebrow>Plans</Eyebrow>
          <h2 className="serif" style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '12px 0 10px', fontWeight: 400 }}>
            Pick the door <span style={{ fontStyle: 'italic' }}>that fits</span>.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 1080, margin: '0 auto' }}>
          {tiers.map(t => (
            <div key={t.name} style={{
              background: t.featured ? 'var(--ink)' : 'var(--surface)',
              color: t.featured ? 'var(--paper)' : 'var(--ink)',
              borderRadius: 16, padding: 30, border: '1px solid var(--rule)',
              boxShadow: t.featured ? 'var(--shadow-3)' : 'var(--shadow-1)',
              position: 'relative', display: 'flex', flexDirection: 'column',
            }}>
              {t.featured && (
                <span style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--accent)', color: '#FFF', padding: '4px 12px',
                  borderRadius: 999, fontSize: 11, fontFamily: 'var(--mono)',
                  letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
                }}>Most popular</span>
              )}
              <div className="serif" style={{ fontSize: 22, letterSpacing: '-0.02em', marginBottom: 6, fontWeight: 500 }}>{t.name}</div>
              <div style={{ fontSize: 13.5, color: t.featured ? 'rgba(244,239,227,0.7)' : 'var(--ink-soft)', marginBottom: 20 }}>{t.desc}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 22 }}>
                <span className="serif" style={{ fontSize: 44, letterSpacing: '-0.03em', fontWeight: 400 }}>{t.price}</span>
                <span style={{ fontSize: 13, color: t.featured ? 'rgba(244,239,227,0.6)' : 'var(--muted)' }}>{t.per}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {t.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13.5, alignItems: 'flex-start' }}>
                    <span style={{ color: t.featured ? 'var(--accent-2)' : 'var(--accent)' }}>✓</span>
                    <span style={{ color: t.featured ? 'rgba(244,239,227,0.85)' : 'var(--ink-soft)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={t.featured ? 'accent' : 'ghost'} size="md" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                {t.cta} <ArrowR size={12}/>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Final CTA — distinct from hero, single audience focus
const FinalCTA = () => (
  <section style={{ padding: '96px 56px', position: 'relative', overflow: 'hidden', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)' }}>
    <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <h2 className="serif" style={{
        fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.03em',
        margin: '0 0 20px', fontWeight: 400,
      }}>
        Try it on your <span style={{ fontStyle: 'italic' }}>actual work</span>.
      </h2>
      <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '0 auto 28px', maxWidth: 480 }}>
        90 seconds, no signup. Tell Olé what you do — see your curriculum.
      </p>
      <div style={{ display: 'inline-flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" size="lg">Run the demo <ArrowR/></Button>
        <Button variant="ghost" size="lg">Talk to sales</Button>
      </div>
      <div style={{ marginTop: 22, fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
        No credit card · 7-day trial · Cancel anytime
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ padding: '56px 56px 36px', borderTop: '1px solid var(--rule)', background: 'var(--paper)' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 36, paddingBottom: 40 }}>
        <div>
          <Wordmark size={20}/>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '14px 0 0', maxWidth: 280 }}>
            The AI workbench for teams that ship.
          </p>
        </div>
        {[
          { h: 'Product', l: ['Workbench','Library','Olé','Credentials'] },
          { h: 'For', l: ['Individuals','Teams & L&D','Developers','Educators'] },
          { h: 'Developers', l: ['Docs','API reference','SDKs · GitHub','Changelog'] },
          { h: 'Company', l: ['About','Customers','Careers','Contact'] },
        ].map(c => (
          <div key={c.h}>
            <div style={{ fontSize: 12, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 12 }}>{c.h}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {c.l.map(i => <li key={i} style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 24, borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <WordmarkMono size={12} color="var(--muted)"/>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>© 2026 LearnKit, Inc. · getlearnkit.com</span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
          <span>Privacy</span><span>Terms</span><span>Security</span><span>SOC 2</span>
        </div>
      </div>
    </div>
  </footer>
);

const LandingPage = () => (
  <div data-screen-label="Landing" className="paper-grain lk-landing-root" style={{ background: 'var(--paper)', minHeight: '100%', overflow: 'hidden' }}>
    <Nav />
    <Hero />
    <PathsForEveryone />
    <HowItWorks />
    <ProductShowcase />
    <Curriculum />
    <Proof />
    <OpenSource />
    <Pricing />
    <FinalCTA />
    <Footer />
  </div>
);

window.LandingPage = LandingPage;
window.Footer = Footer;
