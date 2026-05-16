// LearnKit — Mobile landing (390 width)
// 10-second hero: WHAT · WHO · WHY-DEMO · CTA all visible without scroll

const MobileLanding = () => {
  const [drawer, setDrawer] = React.useState(false);
  const [demoPhase, setDemoPhase] = React.useState(0);

  // Mini-loop in hero card so users instantly see what the product is
  React.useEffect(() => {
    const id = setInterval(() => setDemoPhase(p => (p + 1) % 3), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div data-screen-label="Mobile · Landing" className="paper-grain" style={{
      background: 'var(--paper)', minHeight: '100%', overflow: 'hidden', position: 'relative',
      paddingBottom: 80, // reserve room for sticky CTA
    }}>
      {/* Sticky drawer nav */}
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)}/>

      {/* Top bar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px', borderBottom: '1px solid var(--rule)',
        position: 'sticky', top: 0, background: 'var(--paper)', zIndex: 40,
        backdropFilter: 'blur(8px)',
      }}>
        <Wordmark size={18}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 500 }}>Sign in</a>
          <button
            onClick={() => setDrawer(true)}
            aria-label="Menu"
            style={{
              width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 10, border: '1px solid var(--rule)', background: 'var(--surface)',
              cursor: 'pointer', padding: 0,
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ width: 16, height: 1.5, background: 'var(--ink)', borderRadius: 1 }}/>
              <span style={{ width: 16, height: 1.5, background: 'var(--ink)', borderRadius: 1 }}/>
              <span style={{ width: 16, height: 1.5, background: 'var(--ink)', borderRadius: 1 }}/>
            </span>
          </button>
        </div>
      </nav>

      {/* HERO — 10 second test */}
      <section style={{ padding: '20px 20px 24px', position: 'relative', overflow: 'hidden' }}>
        <AmbientArc style={{ top: -160, right: -180 }} size={340} color="var(--accent-2)"/>

        {/* (1) WHAT it is */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 999,
          background: 'var(--surface)', border: '1px solid var(--rule-strong)',
          fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-soft)',
          letterSpacing: '0.04em', position: 'relative', zIndex: 2,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-3)' }}/>
          AI workbench + tutor · est. 2025
        </div>

        {/* (1+2) WHAT it does — single, concrete promise */}
        <h1 className="serif" style={{
          fontSize: 38, lineHeight: 1.0, letterSpacing: '-0.03em',
          margin: '14px 0 12px', fontWeight: 400, position: 'relative', zIndex: 2,
        }}>
          Make your team good at AI by <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Friday</span>.
        </h1>

        {/* (2) WHO — explicit audience strip */}
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink-soft)', margin: '0 0 14px', position: 'relative', zIndex: 2 }}>
          For PMs, engineers and L&D leaders learning Claude, Cursor, ChatGPT and 40 more — by building real things at work, reviewed by Olé.
        </p>

        {/* (3) WHY THE DEMO matters — animated 3-step preview */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14,
          padding: 14, marginBottom: 16, boxShadow: 'var(--shadow-1)', position: 'relative', zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Ole size={20} animated/>
              <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Try it: 90-second demo</span>
            </div>
            <span style={{
              padding: '3px 7px', borderRadius: 6, background: 'var(--accent)', color: '#FFF',
              fontSize: 10, fontFamily: 'var(--mono)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>Live</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Pick role','Pick stack','See your path'].map((t, i) => (
              <div key={i} style={{
                flex: 1, padding: '10px 8px', borderRadius: 8, textAlign: 'center',
                background: i === demoPhase ? 'var(--ink)' : 'var(--paper-2)',
                color: i === demoPhase ? 'var(--paper)' : 'var(--ink-soft)',
                fontSize: 11.5, fontWeight: 500,
                transition: 'all .3s ease', border: '1px solid var(--rule)',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, opacity: 0.6, marginBottom: 3 }}>{String(i + 1).padStart(2, '0')}</div>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* (4) CTA — primary always-visible */}
        <Button variant="primary" size="lg" style={{
          width: '100%', justifyContent: 'center', minHeight: 52, fontSize: 15.5,
        }}>
          Run the 90-sec demo <ArrowR size={14}/>
        </Button>

        {/* Compact trust */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, fontSize: 12, color: 'var(--muted)' }}>
          <span style={{ display: 'inline-flex' }}>
            {[0,1,2,3].map(i => (
              <span key={i} style={{
                width: 18, height: 18, borderRadius: '50%',
                background: ['#C8472A','#E8B547','#6B8F6E','#2C5F8D'][i],
                border: '2px solid var(--paper)', marginLeft: i ? -5 : 0,
              }}/>
            ))}
          </span>
          <span><strong style={{ color: 'var(--ink)' }}>240 ICs at Ramp</strong> · 94% completion</span>
        </div>
      </section>

      {/* Audience strip — answers WHO with explicit doors */}
      <section style={{ padding: '24px 20px 8px', borderTop: '1px solid var(--rule)' }}>
        <Eyebrow>One product. Three doors.</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {[
            { tag: 'For me', cta: 'Try free · $24/mo', sub: '7-day trial', accent: 'var(--accent)', primary: true },
            { tag: 'For my team', cta: 'Book a demo', sub: '$18/seat · SSO + SCIM', accent: 'var(--accent-3)' },
            { tag: 'For developers', cta: 'Open the docs', sub: 'MIT SDKs · 4.2k ★', accent: 'var(--accent-4)' },
          ].map(p => (
            <a key={p.tag} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              padding: '14px 16px', minHeight: 64,
              background: p.primary ? 'var(--ink)' : 'var(--surface)',
              color: p.primary ? 'var(--paper)' : 'var(--ink)',
              border: '1px solid var(--rule)', borderTop: `3px solid ${p.accent}`,
              borderRadius: 12, textDecoration: 'none', cursor: 'pointer',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>{p.tag}</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{p.cta}</div>
                <div style={{ fontSize: 11.5, opacity: 0.65, marginTop: 2, fontFamily: 'var(--mono)' }}>{p.sub}</div>
              </div>
              <ArrowR size={14}/>
            </a>
          ))}
        </div>
      </section>

      {/* Workbench preview */}
      <section style={{ padding: '32px 20px 24px' }}>
        <Eyebrow>The workbench</Eyebrow>
        <h2 className="serif" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '10px 0 14px', fontWeight: 400 }}>
          Where the lesson <span style={{ fontStyle: 'italic' }}>becomes the work</span>.
        </h2>
        <div style={{
          background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--rule)',
          padding: 12, boxShadow: 'var(--shadow-2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 8, borderBottom: '1px solid var(--rule)', marginBottom: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF6058' }}/>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFBD2E' }}/>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28CA42' }}/>
            <span style={{ marginLeft: 6, fontSize: 10.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>workbench · prompt.md</span>
          </div>
          <div style={{ background: 'var(--ink)', borderRadius: 8, padding: 12, fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--paper)', lineHeight: 1.6 }}>
            <div style={{ color: 'rgba(244,239,227,0.4)' }}># research analyst</div>
            <div style={{ marginTop: 4 }}>You are a <span style={{ color: 'var(--accent-2)' }}>senior analyst</span>.</div>
            <div>Extract 3 claims, cite sources<span style={{ borderRight: '2px solid var(--accent)', marginLeft: 1, animation: 'typewriter-cursor 1s infinite' }}>&nbsp;</span></div>
          </div>
          <div style={{
            marginTop: 10, padding: 10, background: 'var(--paper-2)', borderRadius: 8,
            borderLeft: '3px solid var(--accent)',
            display: 'flex', gap: 8, alignItems: 'flex-start',
          }}>
            <Ole size={20} animated/>
            <div>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Olé · review</div>
              <div style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.5 }}>
                Add a refusal clause — your agent invented a citation last run.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library — horizontal scroll for compact */}
      <section style={{ padding: '24px 0 24px' }}>
        <div style={{ padding: '0 20px', marginBottom: 14 }}>
          <Eyebrow>Library</Eyebrow>
          <h2 className="serif" style={{ fontSize: 24, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '8px 0 4px', fontWeight: 400 }}>
            Pick a tool. Or all of them.
          </h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>40 tracks, updated every other week.</p>
        </div>
        <div style={{
          display: 'flex', gap: 10, overflowX: 'auto', padding: '4px 20px 10px',
          scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch',
        }}>
          {[
            { tool: 'Claude', mods: 8, hours: 14, hot: true },
            { tool: 'Cursor', mods: 5, hours: 9, hot: true },
            { tool: 'ChatGPT', mods: 6, hours: 11 },
            { tool: 'Copilot', mods: 4, hours: 7 },
            { tool: 'Midjourney', mods: 4, hours: 6 },
            { tool: 'Notion AI', mods: 3, hours: 5 },
          ].map(t => (
            <div key={t.tool} style={{
              flex: '0 0 158px', background: 'var(--surface)', border: '1px solid var(--rule)',
              borderRadius: 12, padding: 14, scrollSnapAlign: 'start', position: 'relative',
            }}>
              {t.hot && (
                <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Hot</span>
              )}
              <ToolIcon name={t.tool} size={26}/>
              <div className="serif" style={{ fontSize: 16, letterSpacing: '-0.02em', fontWeight: 500, marginTop: 10, marginBottom: 4 }}>{t.tool}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{t.mods} mods · {t.hours}h</div>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section style={{ padding: '36px 20px', background: 'var(--ink)', color: 'var(--paper)' }}>
        <Eyebrow color="var(--accent-2)">Working at</Eyebrow>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          marginTop: 16, marginBottom: 24,
        }}>
          {['Ramp','Figma','Linear','Vercel','Notion','Replit'].map(n => (
            <div key={n} className="serif" style={{
              fontSize: 16, color: 'rgba(244,239,227,0.55)', textAlign: 'center', letterSpacing: '-0.02em',
            }}>{n}</div>
          ))}
        </div>
        <blockquote className="serif" style={{
          margin: 0, paddingTop: 22, borderTop: '1px solid rgba(244,239,227,0.12)',
          fontSize: 20, lineHeight: 1.3, fontStyle: 'italic', letterSpacing: '-0.015em',
        }}>
          "Six weeks in, our PMs were shipping AI features without engineers babysitting them."
        </blockquote>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, fontSize: 12, color: 'rgba(244,239,227,0.7)' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}/>
          <span><strong style={{ color: 'var(--paper)' }}>Maya Krishnan</strong> · VP Eng · Ramp</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(244,239,227,0.12)' }}>
          {[
            { k: '94%', v: 'completion' },
            { k: '6.2×', v: 'tools/IC' },
            { k: '38', v: 'shipped' },
          ].map(s => (
            <div key={s.v}>
              <div className="serif" style={{ fontSize: 26, fontWeight: 400, color: 'var(--accent-2)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.k}</div>
              <div style={{ fontSize: 10.5, color: 'rgba(244,239,227,0.6)', marginTop: 4, fontFamily: 'var(--mono)' }}>{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '40px 20px 56px', background: 'var(--paper-2)', textAlign: 'center', borderTop: '1px solid var(--rule)' }}>
        <h2 className="serif" style={{ fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 12px', fontWeight: 400 }}>
          Try it on your <span style={{ fontStyle: 'italic' }}>actual work</span>.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 18px' }}>
          90 seconds, no signup.
        </p>
        <Button variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center', minHeight: 52 }}>
          Run the demo <ArrowR/>
        </Button>
        <div style={{ marginTop: 14, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          No credit card · 7-day trial
        </div>
      </section>

      {/* STICKY MOBILE CTA — appears below hero */}
      <MobileStickyCTA />
    </div>
  );
};

const MobileStickyCTA = () => (
  <div style={{
    position: 'sticky', bottom: 0, left: 0, right: 0, zIndex: 30,
    padding: '12px 16px',
    background: 'rgba(250,247,240,0.92)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid var(--rule)',
    display: 'flex', gap: 10, alignItems: 'center',
    marginTop: -64, // pull up into reserved space
  }}>
    <div style={{ flex: 1, fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.3 }}>
      <div style={{ fontWeight: 500, color: 'var(--ink)', fontSize: 13 }}>Start free · $24/mo</div>
      <div style={{ fontSize: 11, color: 'var(--muted)' }}>7-day trial · no card</div>
    </div>
    <Button variant="primary" size="md" style={{ minHeight: 44, flexShrink: 0 }}>
      Try free <ArrowR size={12}/>
    </Button>
  </div>
);

const MobileDrawer = ({ open, onClose }) => (
  <>
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,20,40,0.4)',
      opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity .25s ease', zIndex: 60,
    }}/>
    <aside style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: 300, maxWidth: '85%',
      background: 'var(--paper)', borderLeft: '1px solid var(--rule)',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform .28s cubic-bezier(.2,.8,.2,1)',
      zIndex: 70, display: 'flex', flexDirection: 'column',
      boxShadow: '-12px 0 40px rgba(15,20,40,0.18)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--rule)' }}>
        <Wordmark size={18}/>
        <button onClick={onClose} aria-label="Close" style={{
          width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <nav style={{ flex: 1, padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {[
          { label: 'For teams', sub: 'L&D, People Ops, Eng leaders', accent: 'var(--accent-3)' },
          { label: 'For developers', sub: 'Open SDKs · MIT', accent: 'var(--accent-4)' },
          { label: 'Curriculum', sub: '40 tool tracks', accent: 'var(--accent-2)' },
          { label: 'Pricing', sub: 'From $24/mo', accent: 'var(--accent)' },
          { label: 'Docs', sub: 'API reference + guides' },
          { label: 'GitHub', sub: '4.2k stars · MIT' },
        ].map(item => (
          <a key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 20px', minHeight: 56,
            borderBottom: '1px solid var(--rule)',
            color: 'var(--ink)', textDecoration: 'none', cursor: 'pointer',
          }}>
            {item.accent && <span style={{ width: 4, height: 24, borderRadius: 2, background: item.accent, flexShrink: 0 }}/>}
            {!item.accent && <span style={{ width: 4, height: 24, flexShrink: 0 }}/>}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{item.sub}</div>
            </div>
            <ArrowR size={12} color="var(--muted)"/>
          </a>
        ))}
      </nav>

      <div style={{ padding: 20, borderTop: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button variant="primary" size="lg" style={{ justifyContent: 'center', minHeight: 48 }}>Try free <ArrowR size={12}/></Button>
        <Button variant="ghost" size="md" style={{ justifyContent: 'center', minHeight: 44 }}>Sign in</Button>
      </div>
    </aside>
  </>
);

window.MobileLanding = MobileLanding;
