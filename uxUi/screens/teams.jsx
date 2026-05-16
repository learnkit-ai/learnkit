// Teams / L&D screen — analytics-forward dashboard

const TeamsScreen = () => {
  return (
    <div data-screen-label="Teams · L&D" style={{ background: 'var(--paper)', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 56px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Wordmark size={20}/>
          <span style={{ width: 1, height: 18, background: 'var(--rule-strong)' }}/>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>for teams & L&D</span>
        </div>
        <Button size="sm" variant="primary">Book a demo <ArrowR size={12}/></Button>
      </div>

      {/* Hero */}
      <div style={{ padding: '72px 56px 48px', position: 'relative', overflow: 'hidden' }}>
        <AmbientArc style={{ top: -100, right: -120 }} size={460} color="var(--accent-3)"/>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div>
            <Eyebrow color="var(--accent-3)">For L&D, People Ops & Eng leaders</Eyebrow>
            <h1 className="serif" style={{ fontSize: 60, lineHeight: 1.0, letterSpacing: '-0.035em', margin: '14px 0 20px', fontWeight: 400 }}>
              Make every team<br/>
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>good at AI</span> — at scale.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 480, marginBottom: 28 }}>
              Role-mapped curricula, SSO, manager dashboards, and evidence — actual evidence — that your team can use the AI you bought.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button variant="primary" size="lg">Book a 20-min demo <ArrowR/></Button>
              <Button variant="ghost" size="lg">See sample report</Button>
            </div>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 480 }}>
              {[
                { k: '94%', v: 'avg completion' },
                { k: '6.2x', v: 'tools per IC' },
                { k: '$1,840', v: 'eng hours saved/seat' },
              ].map(s => (
                <div key={s.v}>
                  <div className="serif" style={{ fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 500, color: 'var(--ink)' }}>{s.k}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mock */}
          <DashboardMock />
        </div>
      </div>

      {/* Feature grid */}
      <div style={{ padding: '64px 56px', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <Eyebrow>What you get</Eyebrow>
          <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-0.025em', margin: '14px 0 32px', fontWeight: 400, lineHeight: 1.05 }}>
            Everything procurement <span style={{ fontStyle: 'italic' }}>and</span> your team will love.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { t: 'Role-mapped curricula', d: 'PMs learn one path, engineers another. Olé tunes content per role + seniority.' },
              { t: 'SSO + SCIM', d: 'Okta, Azure AD, Google Workspace. Provision and de-provision automatically.' },
              { t: 'Skill maps', d: 'See exactly which skills your team has — and which AI capabilities are still on the table.' },
              { t: 'Cohort office hours', d: 'Weekly live sessions with senior practitioners. Recorded and indexed.' },
              { t: 'Evidence-based reporting', d: 'Not "they watched the video." Actual evals on actual work.' },
              { t: 'Slack & Teams', d: 'Olé in your team chat. Lessons land in DMs. Practicums review themselves.' },
            ].map(f => (
              <div key={f.t} style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: 22 }}>
                <div className="serif" style={{ fontSize: 19, letterSpacing: '-0.02em', marginBottom: 8, fontWeight: 500 }}>{f.t}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why not a video library — prose, not strawman table */}
      <div style={{ padding: '64px 56px', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Eyebrow>What changes when you replace your video library</Eyebrow>
          <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-0.025em', margin: '14px 0 36px', fontWeight: 400, lineHeight: 1.1, maxWidth: 760 }}>
            From <span style={{ fontStyle: 'italic' }}>"they watched it"</span> to <span style={{ fontStyle: 'italic' }}>"they shipped it"</span>.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
            {[
              {
                before: 'Manager sees: 73% of the team finished the course.',
                after: 'Manager sees: 38 shipped projects, 12 production-ready agents, 4 evals broken and fixed.',
                tag: 'Evidence',
              },
              {
                before: 'Curriculum: a fixed playlist. Same for everyone.',
                after: 'Curriculum: generated per role and stack. A PM and an SRE share zero lessons.',
                tag: 'Personalization',
              },
              {
                before: 'Practice: copy the example into your own tool, hope you got it right.',
                after: 'Practice: in-workbench, Olé reviews each prompt and tells you exactly where it breaks.',
                tag: 'Feedback',
              },
              {
                before: 'Updates: a quarterly content refresh — already stale by Q2.',
                after: 'Updates: tracks ship every other week as each tool ships. Lessons regenerate, not reshoot.',
                tag: 'Pace',
              },
            ].map((c, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, padding: 22 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>{c.tag}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500, marginTop: 2, flexShrink: 0 }}>BEFORE</span>
                    <span>{c.before}</span>
                  </div>
                  <div style={{ height: 1, background: 'var(--rule)' }}/>
                  <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.55 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500, color: 'var(--accent-3)', marginTop: 2, flexShrink: 0 }}>AFTER</span>
                    <span>{c.after}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const DashboardMock = () => (
  <div style={{
    background: 'var(--surface)', borderRadius: 16, padding: 18,
    border: '1px solid var(--rule)', boxShadow: 'var(--shadow-3)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
      <div>
        <div className="serif" style={{ fontSize: 18, letterSpacing: '-0.02em', fontWeight: 500 }}>Engineering team · Q2</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 2 }}>240 seats · updated 4m ago</div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['7d','30d','90d','All'].map((p, i) => (
          <span key={p} style={{
            padding: '4px 10px', borderRadius: 6, fontSize: 11,
            background: i === 1 ? 'var(--ink)' : 'var(--paper-2)',
            color: i === 1 ? 'var(--paper)' : 'var(--ink-soft)',
            fontFamily: 'var(--mono)',
          }}>{p}</span>
        ))}
      </div>
    </div>

    {/* KPIs */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
      {[
        { k: '94%', v: 'completion', t: '+12%' },
        { k: '6.2x', v: 'tools/IC', t: '+1.4x' },
        { k: '38', v: 'shipped projects', t: '+22' },
        { k: '4.7', v: 'CSAT', t: '+0.3' },
      ].map(s => (
        <div key={s.v} style={{ background: 'var(--paper-2)', borderRadius: 10, padding: 12 }}>
          <div className="serif" style={{ fontSize: 22, lineHeight: 1, fontWeight: 500, letterSpacing: '-0.02em' }}>{s.k}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <span style={{ fontSize: 10.5, color: 'var(--muted)' }}>{s.v}</span>
            <span style={{ fontSize: 10.5, color: 'var(--accent-3)', fontFamily: 'var(--mono)' }}>{s.t}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Skill matrix */}
    <div style={{ background: 'var(--paper-2)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 500 }}>Skill mastery by team</div>
        <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Δ vs last month</div>
      </div>
      {[
        { team: 'Backend', vals: [95, 88, 72, 60, 45], delta: '+8' },
        { team: 'Frontend', vals: [82, 90, 68, 55, 38], delta: '+12' },
        { team: 'Platform', vals: [98, 92, 85, 78, 62], delta: '+4' },
        { team: 'Mobile', vals: [70, 75, 55, 40, 25], delta: '+15' },
      ].map(r => (
        <div key={r.team} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 11, width: 60, color: 'var(--ink-soft)' }}>{r.team}</span>
          <div style={{ display: 'flex', gap: 2, flex: 1 }}>
            {r.vals.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: 18, borderRadius: 3,
                background: `oklch(${50 + v * 0.3}% 0.10 ${30 + i * 20})`,
                opacity: 0.4 + (v / 100) * 0.6,
              }}/>
            ))}
          </div>
          <span style={{ fontSize: 10, color: 'var(--accent-3)', fontFamily: 'var(--mono)', width: 24 }}>{r.delta}</span>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 9.5, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <span>Prompting</span><span>Agents</span><span>Evals</span><span>Tool use</span><span>Production</span>
      </div>
    </div>

    {/* Recent practicum */}
    <div style={{ background: 'var(--paper-2)', borderRadius: 10, padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Recent practicum reviews</div>
      {[
        { name: 'A. Chen', proj: 'Internal RAG bot', score: 92, ole: 'Strong evals' },
        { name: 'M. Patel', proj: 'PR triage agent', score: 87, ole: 'Watch refusal logic' },
        { name: 'J. Okafor', proj: 'Data Q&A in Slack', score: 95, ole: 'Ship-ready' },
      ].map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '1px solid var(--rule)' }}>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-3)', color: '#FFF', fontSize: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)' }}>{p.name[0]}</span>
          <span style={{ fontSize: 11, fontWeight: 500, width: 70 }}>{p.name}</span>
          <span style={{ fontSize: 11, color: 'var(--ink-soft)', flex: 1 }}>{p.proj}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{p.score}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--muted)' }}>
            <Ole size={14} animated={false}/>{p.ole}
          </span>
        </div>
      ))}
    </div>
  </div>
);

window.TeamsScreen = TeamsScreen;
