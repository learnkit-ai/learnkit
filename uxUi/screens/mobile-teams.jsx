// LearnKit — Mobile Teams (390) · mobile analytics + scrollable charts

const MobileTeams = () => (
  <div data-screen-label="Mobile · Teams" className="paper-grain" style={{
    background: 'var(--paper)', minHeight: '100%', paddingBottom: 80,
  }}>
    {/* Header */}
    <div style={{
      position: 'sticky', top: 0, zIndex: 30, background: 'var(--paper)',
      borderBottom: '1px solid var(--rule)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Wordmark size={16}/>
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>For teams</span>
      </div>
      <Button size="sm" variant="primary">Book demo</Button>
    </div>

    {/* Hero */}
    <section style={{ padding: '28px 20px 24px', position: 'relative', overflow: 'hidden' }}>
      <AmbientArc style={{ top: -100, right: -160 }} size={300} color="var(--accent-3)"/>
      <Eyebrow color="var(--accent-3)">For L&D, People Ops & Eng leaders</Eyebrow>
      <h1 className="serif" style={{ fontSize: 38, lineHeight: 1.0, letterSpacing: '-0.03em', margin: '14px 0 14px', fontWeight: 400, position: 'relative', zIndex: 2 }}>
        Make every team <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>good at AI</span> — at scale.
      </h1>
      <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: '0 0 20px', position: 'relative', zIndex: 2 }}>
        SCIM, SSO, role-mapped curricula, and dashboards that show what your team can <em>build</em> — not just what they watched.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <Button variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center', minHeight: 52 }}>
          Book a 20-min demo <ArrowR size={12}/>
        </Button>
        <Button variant="ghost" size="md" style={{ width: '100%', justifyContent: 'center', minHeight: 44 }}>
          See sample report
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', flexWrap: 'wrap' }}>
        <span>SOC 2</span><span>·</span>
        <span>SCIM</span><span>·</span>
        <span>Okta · Azure</span><span>·</span>
        <span>HIPAA · GDPR</span>
      </div>
    </section>

    {/* MOBILE DASHBOARD */}
    <section style={{ padding: '0 16px 28px' }}>
      <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--rule)', padding: 14, boxShadow: 'var(--shadow-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--rule)', marginBottom: 14 }}>
          <div>
            <div className="serif" style={{ fontSize: 15, letterSpacing: '-0.02em', fontWeight: 500 }}>Engineering · Q2</div>
            <div style={{ fontSize: 10.5, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 1 }}>240 seats · 4m ago</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['7d','30d','90d'].map((p, i) => (
              <span key={p} style={{
                padding: '4px 8px', borderRadius: 5, fontSize: 10.5,
                background: i === 1 ? 'var(--ink)' : 'var(--paper-2)',
                color: i === 1 ? 'var(--paper)' : 'var(--ink-soft)',
                fontFamily: 'var(--mono)',
              }}>{p}</span>
            ))}
          </div>
        </div>

        {/* KPIs — 2x2 on mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { k: '94%', v: 'completion', t: '+12%', tone: 'var(--accent-3)' },
            { k: '6.2×', v: 'tools/IC', t: '+1.4×', tone: 'var(--accent-3)' },
            { k: '38', v: 'shipped projects', t: '+22', tone: 'var(--accent-3)' },
            { k: '4.7', v: 'CSAT', t: '+0.3', tone: 'var(--accent-3)' },
          ].map(s => (
            <div key={s.v} style={{ background: 'var(--paper-2)', borderRadius: 10, padding: 12 }}>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1, fontWeight: 500, letterSpacing: '-0.02em' }}>{s.k}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                <span style={{ fontSize: 10.5, color: 'var(--muted)' }}>{s.v}</span>
                <span style={{ fontSize: 10, color: s.tone, fontFamily: 'var(--mono)' }}>{s.t}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cohort progress chart */}
        <div style={{ padding: 12, background: 'var(--paper-2)', borderRadius: 10, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cohort progress</span>
            <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>180 / 240</span>
          </div>
          <svg viewBox="0 0 320 60" style={{ width: '100%', height: 60 }}>
            {[3,5,8,12,18,25,38,52,68,82,95,118,142,165,180].map((v, i, arr) => {
              const x = (i / (arr.length - 1)) * 320;
              const y = 60 - (v / 200) * 50;
              const next = arr[i + 1];
              if (!next) return null;
              const x2 = ((i + 1) / (arr.length - 1)) * 320;
              const y2 = 60 - (next / 200) * 50;
              return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>;
            })}
            {[3,5,8,12,18,25,38,52,68,82,95,118,142,165,180].map((v, i, arr) => {
              const x = (i / (arr.length - 1)) * 320;
              const y = 60 - (v / 200) * 50;
              return <circle key={i} cx={x} cy={y} r={i === arr.length - 1 ? 3.5 : 2} fill={i === arr.length - 1 ? 'var(--accent)' : 'var(--accent-2)'}/>;
            })}
          </svg>
        </div>

        {/* Top performers — scrollable list */}
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>By role</div>
          {[
            { r: 'Backend', n: 84, p: 96, c: 'var(--accent)' },
            { r: 'Frontend', n: 62, p: 92, c: 'var(--accent-2)' },
            { r: 'Mobile', n: 38, p: 88, c: 'var(--accent-3)' },
            { r: 'SRE', n: 31, p: 81, c: 'var(--accent-4)' },
          ].map(r => (
            <div key={r.r} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{r.r}</span>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{r.n} ICs · {r.p}%</span>
              </div>
              <div style={{ height: 4, background: 'var(--paper-3)', borderRadius: 2 }}>
                <div style={{ width: `${r.p}%`, height: '100%', background: r.c, borderRadius: 2 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Before / After */}
    <section style={{ padding: '32px 16px', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <Eyebrow>What changes when you replace your video library</Eyebrow>
      <h2 className="serif" style={{ fontSize: 24, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '10px 0 20px', fontWeight: 400 }}>
        From <span style={{ fontStyle: 'italic' }}>"they watched it"</span> to <span style={{ fontStyle: 'italic' }}>"they shipped it"</span>.
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { tag: 'Evidence', before: '73% of the team finished the course.', after: '38 shipped projects, 12 production agents, 4 evals broken and fixed.' },
          { tag: 'Personalization', before: 'A fixed playlist. Same for everyone.', after: 'Generated per role and stack. A PM and an SRE share zero lessons.' },
          { tag: 'Feedback', before: 'Copy the example, hope you got it right.', after: 'Olé reviews each prompt and tells you exactly where it breaks.' },
          { tag: 'Pace', before: 'Quarterly content refresh — stale by Q2.', after: 'Tracks ship every other week as each tool ships.' },
        ].map(c => (
          <div key={c.tag} style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{c.tag}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500, marginTop: 2, flexShrink: 0 }}>BEFORE</span>
                <span>{c.before}</span>
              </div>
              <div style={{ height: 1, background: 'var(--rule)' }}/>
              <div style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500, color: 'var(--accent-3)', marginTop: 2, flexShrink: 0 }}>AFTER</span>
                <span>{c.after}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Final CTA */}
    <section style={{ padding: '36px 20px 32px', textAlign: 'center' }}>
      <h2 className="serif" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 12px', fontWeight: 400 }}>
        See your team's <span style={{ fontStyle: 'italic' }}>baseline</span> in 20 minutes.
      </h2>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '0 0 18px' }}>
        Free assessment. No deck.
      </p>
      <Button variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center', minHeight: 52 }}>
        Book a demo <ArrowR/>
      </Button>
    </section>

    {/* Sticky CTA */}
    <div style={{
      position: 'sticky', bottom: 0, padding: '12px 16px',
      background: 'rgba(250,247,240,0.92)', backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--rule)',
      display: 'flex', gap: 8, alignItems: 'center',
    }}>
      <div style={{ flex: 1, fontSize: 12, color: 'var(--ink-soft)' }}>
        <div style={{ fontWeight: 500, color: 'var(--ink)', fontSize: 13 }}>$18/seat · SSO + SCIM</div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>From 25 seats · annual</div>
      </div>
      <Button variant="primary" size="md" style={{ minHeight: 44 }}>
        Demo <ArrowR size={12}/>
      </Button>
    </div>
  </div>
);

window.MobileTeams = MobileTeams;
