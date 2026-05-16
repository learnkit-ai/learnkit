// LearnKit — Tablet Landing (768) · conversion-essential sections, reuses primitives

const TabletLanding = () => {
  return (
    <div data-screen-label="Tablet · Landing" className="paper-grain" style={{ background: 'var(--paper)', minHeight: '100%', overflow: 'hidden' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 36px', borderBottom: '1px solid var(--rule)',
        position: 'sticky', top: 0, background: 'rgba(250,247,240,0.92)',
        backdropFilter: 'blur(10px)', zIndex: 30,
      }}>
        <Wordmark size={20}/>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <a style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14, fontWeight: 450 }}>Library</a>
          <a style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14, fontWeight: 450 }}>For teams</a>
          <a style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 14, fontWeight: 450 }}>API</a>
          <Button size="sm" variant="primary">Try free</Button>
        </div>
      </nav>

      {/* HERO — single column, prominent visual below */}
      <section style={{ padding: '56px 36px 40px', position: 'relative', overflow: 'hidden' }}>
        <AmbientArc style={{ top: -100, right: -120 }} size={380} color="var(--accent-2)"/>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 640 }}>
          <Eyebrow color="var(--accent)">For teams shipping AI · For developers building it</Eyebrow>
          <h1 className="serif" style={{
            fontSize: 64, lineHeight: 0.98, letterSpacing: '-0.035em',
            margin: '18px 0 18px', fontWeight: 400,
          }}>
            The AI workbench your team will actually <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>use</span> on Monday.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--ink-soft)', margin: '0 0 24px', maxWidth: 540 }}>
            Adaptive lessons that build on your real work, paired with Olé — a tutor that watches your prompts and tells you what to fix.
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
            <Button variant="primary" size="lg">Start free assessment <ArrowR/></Button>
            <Button variant="ghost" size="lg">Book a demo</Button>
          </div>
          <div style={{
            display: 'inline-flex', gap: 12, alignItems: 'center',
            padding: '8px 14px', background: 'var(--surface)', border: '1px solid var(--rule)',
            borderRadius: 999, fontSize: 12, color: 'var(--ink-soft)', fontFamily: 'var(--mono)',
          }}>
            <span><strong style={{ color: 'var(--ink)' }}>$24</strong>/mo learner</span>
            <span style={{ width: 1, height: 12, background: 'var(--rule)' }}/>
            <span><strong style={{ color: 'var(--ink)' }}>$18</strong>/seat teams</span>
            <span style={{ width: 1, height: 12, background: 'var(--rule)' }}/>
            <span>API · usage-based</span>
          </div>
        </div>

        {/* Hero workbench mock — full-width below copy */}
        <div style={{ marginTop: 36, position: 'relative', zIndex: 2 }}>
          <WorkbenchMock />
        </div>
      </section>

      {/* THREE DOORS — moved to slot 2, 3-col grid */}
      <section style={{ padding: '64px 36px', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <Eyebrow>Three doors in</Eyebrow>
        <h2 className="serif" style={{ fontSize: 38, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '12px 0 32px', fontWeight: 400, maxWidth: 540 }}>
          Pick your <span style={{ fontStyle: 'italic' }}>path</span>.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { tag: 'Learner', color: 'var(--accent)', title: 'I want to get fluent.', body: 'Adaptive curriculum, weekly practicum, portfolio-grade credentials.', cta: 'Start free' },
            { tag: 'Team', color: 'var(--accent-3)', title: 'I run a team.', body: 'Role-mapped tracks, evals on real work, dashboards that prove ROI.', cta: 'Book demo' },
            { tag: 'Builder', color: 'var(--accent-4)', title: 'I ship AI products.', body: 'Embed Olé in your app. Open SDKs, eval API, six endpoints.', cta: 'See API' },
          ].map(d => (
            <div key={d.tag} style={{
              background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14,
              borderTop: `3px solid ${d.color}`, padding: 22, display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: d.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>{d.tag}</div>
              <h3 className="serif" style={{ fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 10px', fontWeight: 500 }}>{d.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: '0 0 18px', flex: 1 }}>{d.body}</p>
              <a style={{ fontSize: 13, color: d.color, textDecoration: 'none', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.cta} →</a>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — 2x2 on tablet */}
      <section style={{ padding: '64px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, marginBottom: 32, alignItems: 'end' }}>
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="serif" style={{ fontSize: 40, lineHeight: 1.0, letterSpacing: '-0.03em', margin: '12px 0 0', fontWeight: 400 }}>
              From <span style={{ fontStyle: 'italic' }}>"I should learn AI"</span> to <span style={{ fontStyle: 'italic' }}>shipping</span> in 30 days.
            </h2>
          </div>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
            Four steps. No deck. No 4-hour onboarding. By the end of week one your team has shipped something real.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[
            { n: '01', title: 'Tell Olé about your work', body: 'Role, stack, and one sentence about what you want to ship.' },
            { n: '02', title: 'Get a path you actually want', body: 'A 30-day curriculum mapped to your tools and your team\'s work.' },
            { n: '03', title: 'Build, with Olé in the loop', body: 'Olé reads your prompts, runs evals, tells you exactly what to fix.' },
            { n: '04', title: 'Ship + earn credentials', body: 'Practicums become portfolio pieces. Verified skills employers trust.' },
          ].map(s => (
            <div key={s.n} style={{ padding: '18px 4px', borderTop: '1px solid var(--rule)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 10 }}>{s.n}</div>
              <h3 className="serif" style={{ fontSize: 20, lineHeight: 1.15, letterSpacing: '-0.015em', margin: '0 0 8px', fontWeight: 500 }}>{s.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF — single quote, no fake logo wall */}
      <section style={{ padding: '64px 36px', background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
        <AmbientArc style={{ bottom: -160, left: -100 }} size={400} color="var(--accent)" />
        <div style={{ maxWidth: 640, position: 'relative', zIndex: 2 }}>
          <Eyebrow color="var(--accent-2)">Proof</Eyebrow>
          <blockquote style={{ margin: '20px 0 28px', padding: 0 }}>
            <p className="serif" style={{ fontSize: 32, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0, fontWeight: 400 }}>
              "<span style={{ fontStyle: 'italic' }}>240 ICs went through it. 94% finished. 38 of them shipped a production agent</span> in the next quarter."
            </p>
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}/>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Priya Khanna</div>
              <div style={{ fontSize: 12, color: 'rgba(244,239,227,0.6)', fontFamily: 'var(--mono)' }}>VP Engineering · Ramp</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING — 3-up tight */}
      <section style={{ padding: '64px 36px', background: 'var(--paper-2)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28, gap: 24 }}>
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="serif" style={{ fontSize: 40, lineHeight: 1.0, letterSpacing: '-0.03em', margin: '12px 0 0', fontWeight: 400 }}>
              Three <span style={{ fontStyle: 'italic' }}>fits</span>.
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { name: 'Learner', price: '$24', per: '/mo', desc: 'For individuals.', features: ['All 40 tracks','Olé tutoring','Credentials'], cta: 'Try free' },
            { name: 'Team', price: '$18', per: '/seat', desc: 'For org rollouts.', features: ['Everything in Learner','SSO + SCIM','Manager dashboard','Custom tracks'], cta: 'Book demo', featured: true },
            { name: 'API', price: 'Usage', per: '', desc: 'For builders.', features: ['Open SDKs','1k req/mo free','Eval API','Webhook events'], cta: 'Get key' },
          ].map(t => (
            <div key={t.name} style={{
              padding: 20, borderRadius: 14,
              background: t.featured ? 'var(--ink)' : 'var(--surface)',
              color: t.featured ? 'var(--paper)' : 'var(--ink)',
              border: t.featured ? '1px solid var(--ink)' : '1px solid var(--rule)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: t.featured ? 'var(--accent-2)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                {t.name}{t.featured && ' · most popular'}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                <span className="serif" style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.025em' }}>{t.price}</span>
                <span style={{ fontSize: 13, color: t.featured ? 'rgba(244,239,227,0.6)' : 'var(--muted)' }}>{t.per}</span>
              </div>
              <p style={{ fontSize: 13, color: t.featured ? 'rgba(244,239,227,0.7)' : 'var(--ink-soft)', margin: '0 0 16px' }}>{t.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {t.features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: t.featured ? 'rgba(244,239,227,0.85)' : 'var(--ink)', display: 'flex', gap: 8 }}>
                    <span style={{ color: t.featured ? 'var(--accent-2)' : 'var(--accent)' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={t.featured ? 'inverse' : 'primary'} size="md" style={{ width: '100%', justifyContent: 'center' }}>{t.cta}</Button>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '72px 36px', textAlign: 'center', borderTop: '1px solid var(--rule)' }}>
        <h2 className="serif" style={{ fontSize: 44, lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 14px', fontWeight: 400, maxWidth: 600, marginInline: 'auto' }}>
          See your team's <span style={{ fontStyle: 'italic' }}>baseline</span> in 20 minutes.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '0 0 22px' }}>
          Free assessment. No deck. No upsell.
        </p>
        <div style={{ display: 'inline-flex', gap: 10 }}>
          <Button variant="primary" size="lg">Start free assessment <ArrowR/></Button>
          <Button variant="ghost" size="lg">Book demo</Button>
        </div>
      </section>

      {/* Footer (reuses) */}
      <Footer />
    </div>
  );
};

window.TabletLanding = TabletLanding;
