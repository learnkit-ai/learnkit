// LearnKit — Design System · Components (buttons, inputs, cards, chips, code, accordion, Olé)

// ─── BUTTONS ────────────────────────────────────────────────────────────────
const ButtonsSection = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <DSSection id="buttons" title="Buttons" blurb="Four variants by intent — Primary (book demo, sign up), Secondary (browse, alt CTA), Tertiary (in-context links), and Developer (API/SDK actions). Each has 5 states: default, hover, active, loading, disabled.">

      <SubHead top={0}>Variants</SubHead>
      <DemoWell>
        <Button variant="primary" size="md">Start free <ArrowR/></Button>
        <Button variant="ghost" size="md">Book a demo</Button>
        <Button variant="link" size="md">See how it works →</Button>
        <Button variant="primary" size="md" style={{ background: 'var(--accent-4)', borderColor: 'var(--accent-4)', color: '#FFF' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-3)' }}/> Get API key
        </Button>
      </DemoWell>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 14 }}>
        {[
          { name: 'Primary', use: 'Hero CTAs, demo bookings, sign-up.', token: 'bg-ink text-paper' },
          { name: 'Secondary (Ghost)', use: 'Alt CTA next to primary. Never alone.', token: '1px border-rule-strong' },
          { name: 'Tertiary (Link)', use: 'In-flow nav, "see all", footers.', token: 'inline · accent on hover' },
          { name: 'Developer', use: 'API key, docs, SDK actions. Lapis accent.', token: 'bg-accent-4 + status dot' },
        ].map(v => (
          <div key={v.name}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>{v.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.5 }}>{v.use}</div>
            <div style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: 6 }}>{v.token}</div>
          </div>
        ))}
      </div>

      <SubHead>States</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {[
          { label: 'Default', el: <Button variant="primary">Primary</Button> },
          { label: 'Hover',   el: <Button variant="primary" style={{ background: 'var(--ink-2)', boxShadow: '0 4px 14px rgba(26,37,71,.18)' }}>Primary</Button> },
          { label: 'Active',  el: <Button variant="primary" style={{ background: 'var(--ink-2)', transform: 'translateY(1px)' }}>Primary</Button> },
          { label: 'Loading', el: (
            <Button variant="primary" style={{ pointerEvents: 'none' }} onClick={() => setLoading(l => !l)}>
              <span style={{ display: 'inline-flex', gap: 4 }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--paper)', opacity: 0.4 + ((i + Date.now()/300|0) % 3) * 0.3 }}/>)}
              </span>
              Working
            </Button>
          )},
          { label: 'Disabled',el: <Button variant="primary" style={{ opacity: 0.4, cursor: 'not-allowed' }}>Primary</Button> },
        ].map(s => (
          <div key={s.label} style={{ padding: 16, background: 'var(--paper-2)', borderRadius: 10, border: '1px solid var(--rule)' }}>
            <StateTag>{s.label}</StateTag>
            <div style={{ marginTop: 10 }}>{s.el}</div>
          </div>
        ))}
      </div>

      <SubHead>Sizes</SubHead>
      <DemoWell>
        <Button size="sm" variant="primary">Small · 32h</Button>
        <Button size="md" variant="primary">Medium · 40h</Button>
        <Button size="lg" variant="primary">Large · 48h <ArrowR/></Button>
      </DemoWell>
      <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 8 }}>
        Mobile minimum 44h (Apple HIG). Pricing &amp; final-CTA buttons use Large; in-flow buttons use Medium.
      </p>

      <SubHead>React + Tailwind</SubHead>
      <CodeBlock lang="tsx" label="components/Button.tsx">{`type Variant = 'primary' | 'ghost' | 'link' | 'developer';
type Size    = 'sm' | 'md' | 'lg';

const base = 'inline-flex items-center gap-2 font-medium tracking-tight ' +
             'transition active:translate-y-px ' +
             'disabled:opacity-40 disabled:cursor-not-allowed';

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3.5 text-[13px] rounded-lg',
  md: 'h-10 px-5 text-sm rounded-[10px]',
  lg: 'h-12 px-6 text-[15px] rounded-xl',
};

const variants: Record<Variant, string> = {
  primary:   'bg-ink text-paper border border-ink hover:bg-ink-2 hover:shadow-md',
  ghost:     'bg-transparent text-ink border border-rule-strong hover:bg-paper-2',
  link:      'bg-transparent text-ink hover:text-accent px-0',
  developer: 'bg-accent-4 text-white border border-accent-4 hover:brightness-110',
};

export const Button = ({variant='primary', size='md', loading, ...p}) => (
  <button {...p} className={\`\${base} \${sizes[size]} \${variants[variant]}\`}
          aria-busy={loading} disabled={p.disabled || loading}>
    {loading ? <Dots/> : p.children}
  </button>
);`}</CodeBlock>
    </DSSection>
  );
};

// ─── INPUTS ────────────────────────────────────────────────────────────────
const InputsSection = () => {
  const [v, setV] = React.useState('');
  const [focused, setFocused] = React.useState(null);
  const Field = ({ id, label, hint, children, error }) => (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', marginBottom: 6 }}>{label}</div>
      {children}
      {hint && !error && <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 6, fontFamily: 'var(--mono)' }}>{hint}</div>}
      {error && <div style={{ fontSize: 11.5, color: 'var(--accent)', marginTop: 6 }}>{error}</div>}
    </label>
  );
  const inputBase = (id) => ({
    width: '100%', padding: '10px 12px', fontSize: 14, fontFamily: 'var(--sans)',
    background: 'var(--surface)', color: 'var(--ink)',
    border: `1.5px solid ${focused === id ? 'var(--accent)' : 'var(--rule-strong)'}`,
    borderRadius: 10, outline: 'none',
    boxShadow: focused === id ? '0 0 0 3px rgba(200,71,42,0.12)' : 'none',
    transition: 'border-color .15s, box-shadow .15s',
    boxSizing: 'border-box',
  });
  return (
    <DSSection id="inputs" title="Input fields & selectors" blurb="Inputs use a 1.5px border that thickens to accent on focus + 3px sienna ring. Always pair with a label; place hint text in mono so it never competes with copy.">

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginBottom: 20 }}>
        <Field label="Work email" hint="We'll send your magic link.">
          <input id="email" type="email" placeholder="you@company.com"
            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
            value={v} onChange={e => setV(e.target.value)}
            style={inputBase('email')}
          />
        </Field>
        <Field label="Goal" hint="One sentence — Olé reads it.">
          <textarea rows={3} placeholder="Ship an internal research agent for my team"
            onFocus={() => setFocused('goal')} onBlur={() => setFocused(null)}
            style={{ ...inputBase('goal'), resize: 'vertical', minHeight: 78 }}
          />
        </Field>
        <Field label="Team size" hint="Used to scope the demo.">
          <select onFocus={() => setFocused('sel')} onBlur={() => setFocused(null)}
            style={{ ...inputBase('sel'), appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%231A2547' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
              paddingRight: 36,
            }}>
            <option>1–10</option>
            <option>11–50</option>
            <option>51–250</option>
            <option>250+</option>
          </select>
        </Field>
        <Field label="API key" error="Invalid key — check the prefix.">
          <input type="text" defaultValue="lk_live_xxxxxxxxxxxxxxxx"
            style={{ ...inputBase('err'), borderColor: 'var(--accent)', boxShadow: '0 0 0 3px rgba(200,71,42,0.12)', fontFamily: 'var(--mono)', fontSize: 12.5 }}
          />
        </Field>
      </div>

      <SubHead>States</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { tag: 'Default', el: <input style={inputBase('a')} placeholder="Default"/> },
          { tag: 'Focused', el: <input style={{...inputBase('b'), borderColor: 'var(--accent)', boxShadow: '0 0 0 3px rgba(200,71,42,0.12)'}} defaultValue="Focused"/> },
          { tag: 'Filled',  el: <input style={inputBase('c')} defaultValue="priya@ramp.com"/> },
          { tag: 'Disabled',el: <input style={{...inputBase('d'), background: 'var(--paper-2)', color: 'var(--muted)'}} disabled defaultValue="Locked"/> },
        ].map(s => (
          <div key={s.tag} style={{ padding: 14, background: 'var(--paper-2)', borderRadius: 10, border: '1px solid var(--rule)' }}>
            <StateTag>{s.tag}</StateTag>
            <div style={{ marginTop: 10 }}>{s.el}</div>
          </div>
        ))}
      </div>

      <SubHead>Tailwind</SubHead>
      <CodeBlock lang="tsx" label="Input.tsx">{`<input
  className="w-full h-10 px-3 text-sm bg-surface text-ink rounded-[10px]
             border-[1.5px] border-rule-strong outline-none
             placeholder:text-muted
             focus:border-accent focus:ring-[3px] focus:ring-accent/15
             disabled:bg-paper-2 disabled:text-muted"
/>`}</CodeBlock>
    </DSSection>
  );
};

// ─── ROLE SELECTOR CARDS ───────────────────────────────────────────────────
const RoleCardsSection = () => {
  const [picked, setPicked] = React.useState('Engineer');
  const roles = [
    { r: 'Product Manager', g: 'Specs, evals, roadmap research' },
    { r: 'Engineer',        g: 'Agents, RAG, prompt eval' },
    { r: 'Designer',        g: 'Prototyping, copy, UX research' },
    { r: 'Data Analyst',    g: 'Pipelines, charts, anomaly hunts' },
  ];
  return (
    <DSSection id="role-cards" title="Role selector card" blurb="Used in the demo flow to capture the learner's role. Single-select. Emits an event so Olé personalizes copy in subsequent screens.">
      <DemoWell style={{ alignItems: 'stretch', gap: 12 }}>
        {roles.map(r => {
          const on = picked === r.r;
          return (
            <button key={r.r} onClick={() => setPicked(r.r)} style={{
              flex: 1, minWidth: 140, padding: '14px 14px', textAlign: 'left',
              background: on ? 'var(--ink)' : 'var(--surface)',
              color: on ? 'var(--paper)' : 'var(--ink)',
              border: `1px solid ${on ? 'var(--ink)' : 'var(--rule)'}`,
              borderRadius: 12, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 6,
              transition: 'transform .15s ease',
            }}>
              <span style={{ fontSize: 14, fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
                {r.r}{on && <span style={{ color: 'var(--accent-2)' }}>✓</span>}
              </span>
              <span style={{ fontSize: 11.5, color: on ? 'rgba(244,239,227,0.7)' : 'var(--muted)' }}>{r.g}</span>
            </button>
          );
        })}
      </DemoWell>
      <CodeBlock lang="tsx" label="RoleCard.tsx">{`<button onClick={() => onPick(role)}
  aria-pressed={selected}
  className={cn(
    'flex flex-col gap-1.5 p-3.5 text-left rounded-xl border transition',
    selected
      ? 'bg-ink text-paper border-ink'
      : 'bg-surface text-ink border-rule hover:-translate-y-0.5 hover:shadow-md'
  )}>
  <span className="text-sm font-medium flex justify-between">
    {role.label} {selected && <CheckIcon className="text-accent-2"/>}
  </span>
  <span className="text-[11.5px] text-muted">{role.gloss}</span>
</button>`}</CodeBlock>
    </DSSection>
  );
};

// ─── TOOL CHIPS ────────────────────────────────────────────────────────────
const ToolChipsSection = () => {
  const tools = ['Claude','ChatGPT','Cursor','Copilot','Midjourney','Notion AI','Perplexity','Gemini'];
  const [picked, setPicked] = React.useState(['Claude','Cursor']);
  const toggle = t => setPicked(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  return (
    <DSSection id="tool-chips" title="Tool chips" blurb="Multi-select chips for the tool stack. Each tool has a 22px brand glyph and a label; picked chips swap to a 1.5px sienna border.">
      <DemoWell>
        {tools.map(t => {
          const on = picked.includes(t);
          return (
            <button key={t} onClick={() => toggle(t)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 12px 7px 8px', borderRadius: 999, fontSize: 13,
              background: 'var(--surface)', color: 'var(--ink)',
              border: `1.5px solid ${on ? 'var(--accent)' : 'var(--rule)'}`,
              cursor: 'pointer', fontWeight: 500,
              boxShadow: on ? '0 0 0 3px rgba(200,71,42,.08)' : 'none',
              transition: 'all .15s ease',
            }}>
              <ToolIcon name={t} size={18}/> {t}
              {on && <span style={{ color: 'var(--accent)', fontSize: 12, marginLeft: 2 }}>✓</span>}
            </button>
          );
        })}
      </DemoWell>
      <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 10 }}>
        <strong style={{ color: 'var(--ink)' }}>Picked count → CTA label.</strong> "Continue" on 0; "Continue (3)" with selection count.
      </p>
      <CodeBlock lang="tsx" label="ToolChip.tsx">{`<button
  onClick={() => toggle(tool)}
  aria-pressed={picked}
  className={cn(
    'inline-flex items-center gap-2 h-9 pl-2 pr-3 rounded-full text-sm font-medium',
    'bg-surface text-ink border-[1.5px] transition',
    picked
      ? 'border-accent ring-[3px] ring-accent/8'
      : 'border-rule hover:border-rule-strong'
  )}>
  <ToolGlyph name={tool}/> {tool}
  {picked && <CheckIcon className="text-accent ml-0.5"/>}
</button>`}</CodeBlock>
    </DSSection>
  );
};

// ─── LESSON CARDS ──────────────────────────────────────────────────────────
const LessonCardsSection = () => {
  const lessons = [
    { d: 'Day 1', t: 'Your first system prompt', mins: 12, tool: 'Claude', state: 'in-progress', pct: 40 },
    { d: 'Day 3', t: 'Tool use & function calls', mins: 18, tool: 'Claude', state: 'locked' },
    { d: 'Day 5', t: 'Building a research agent', mins: 35, tool: 'Cursor', state: 'preview' },
    { d: 'Day 7', t: 'Evals on your work',        mins: 22, tool: 'Claude', state: 'done' },
  ];
  const stateMeta = {
    'in-progress': { ring: 'var(--accent)', tag: 'In progress', tone: 'accent' },
    'locked':      { ring: 'var(--rule)',   tag: 'Locked',      tone: 'default' },
    'preview':     { ring: 'var(--accent-3)', tag: 'Preview',   tone: 'default' },
    'done':        { ring: 'var(--accent-3)', tag: 'Done',      tone: 'default' },
  };
  return (
    <DSSection id="lesson-cards" title="Lesson card" blurb="Used in path views and the curriculum library. Four states: locked, preview, in-progress (sienna border), done (sage check).">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {lessons.map((l, i) => {
          const m = stateMeta[l.state];
          return (
            <div key={i} style={{
              padding: 16, background: 'var(--surface)',
              border: `1.5px solid ${m.ring}`, borderRadius: 12,
              display: 'flex', gap: 14, alignItems: 'center',
              opacity: l.state === 'locked' ? 0.55 : 1,
            }}>
              <ToolIcon name={l.tool} size={36}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {l.d} · {l.mins}m
                  </div>
                  <StateTag tone={m.tone}>{m.tag}</StateTag>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{l.t}</div>
                {l.state === 'in-progress' && (
                  <div style={{ height: 3, background: 'var(--paper-3)', borderRadius: 2, marginTop: 10 }}>
                    <div style={{ width: `${l.pct}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }}/>
                  </div>
                )}
                {l.state === 'done' && (
                  <div style={{ marginTop: 6, fontSize: 11, color: 'var(--accent-3)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent-3)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>✓</span>
                    Verified credential earned
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DSSection>
  );
};

// ─── PROGRESS CARDS ────────────────────────────────────────────────────────
const ProgressCardsSection = () => (
  <DSSection id="progress-cards" title="Progress card" blurb="Compact KPI tile. Used in Teams dashboard and learner profile. Always 4 fields: stat, label, delta (with up/down arrow), period.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {[
        { k: '94%', v: 'completion', d: '+12%', up: true },
        { k: '6.2×', v: 'tools per IC', d: '+1.4×', up: true },
        { k: '38', v: 'shipped projects', d: '+22', up: true },
        { k: '4.7', v: 'CSAT', d: '−0.1', up: false },
      ].map((s, i) => (
        <div key={i} style={{
          padding: 16, background: 'var(--surface)', border: '1px solid var(--rule)',
          borderRadius: 12, boxShadow: 'var(--shadow-1)',
        }}>
          <div className="serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.025em' }}>{s.k}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{s.v}</span>
            <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: s.up ? 'var(--accent-3)' : 'var(--accent)' }}>
              {s.up ? '↑' : '↓'} {s.d}
            </span>
          </div>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>vs last 30d</div>
        </div>
      ))}
    </div>
  </DSSection>
);

// ─── CODE PREVIEW ──────────────────────────────────────────────────────────
const CodePreviewSection = () => {
  const [tab, setTab] = React.useState('curl');
  const code = {
    curl: `curl https://api.getlearnkit.com/v1/paths \\
  -H "Authorization: Bearer lk_live_..." \\
  -d '{"user_id":"u_8Hk3p","role":"engineer"}'`,
    node: `import LearnKit from '@learnkit/sdk';
const lk = new LearnKit(process.env.LK_KEY);
const path = await lk.paths.create({ user_id: 'u_8Hk3p' });`,
    python: `from learnkit import LearnKit
lk = LearnKit(api_key=os.environ["LK_KEY"])
path = lk.paths.create(user_id="u_8Hk3p")`,
  };
  return (
    <DSSection id="code" title="API code preview" blurb="Tabbed code panel. Always shows the same call across languages so devs can compare. Top-right has Run + Copy. Status dot in header indicates the request is live.">
      <div style={{ background: 'var(--ink)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-3)' }}/>
            <span style={{ color: 'var(--paper)', fontSize: 13, fontWeight: 500 }}>Live preview</span>
            <span style={{ color: 'rgba(244,239,227,0.5)', fontSize: 11, fontFamily: 'var(--mono)' }}>POST /v1/paths</span>
          </span>
          <span style={{ display: 'inline-flex', gap: 14, fontSize: 11, fontFamily: 'var(--mono)', color: 'rgba(244,239,227,0.6)' }}>
            <span>Copy</span><span>Run ▶</span>
          </span>
        </div>
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {['curl','node','python'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 18px', background: 'transparent', border: 'none',
              color: tab === t ? 'var(--paper)' : 'rgba(244,239,227,0.45)',
              fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer',
              borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
            }}>{t}</button>
          ))}
        </div>
        <pre style={{ margin: 0, padding: 18, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--paper)', lineHeight: 1.7, overflowX: 'auto' }}>{code[tab]}</pre>
      </div>
    </DSSection>
  );
};

// ─── TESTIMONIAL ───────────────────────────────────────────────────────────
const TestimonialSection = () => (
  <DSSection id="testimonial" title="Testimonial card" blurb="One quote, one number, one named buyer. We don't stack stats; the proof point in the quote does the work. Use the dark variant for proof sections, light for inline social proof.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <div style={{ padding: 28, background: 'var(--ink)', color: 'var(--paper)', borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
        <AmbientArc style={{ bottom: -100, right: -80 }} size={240} color="var(--accent)"/>
        <div style={{ position: 'relative' }}>
          <Eyebrow color="var(--accent-2)">Proof · dark</Eyebrow>
          <p className="serif" style={{ fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.015em', margin: '16px 0 18px' }}>
            "<span style={{ fontStyle: 'italic' }}>240 ICs went through it. 38 of them shipped a production agent</span> in the next quarter."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Priya Khanna</div>
              <div style={{ fontSize: 11, color: 'rgba(244,239,227,0.6)', fontFamily: 'var(--mono)' }}>VP Engineering · Ramp</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: 28, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 16 }}>
        <Eyebrow>Inline · light</Eyebrow>
        <p className="serif" style={{ fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.015em', margin: '16px 0 18px', color: 'var(--ink)' }}>
          "Olé caught a hallucinated answer in our support bot before QA did. <span style={{ fontStyle: 'italic' }}>Twice</span>."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-3), var(--accent-4))' }}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Marcus Lee</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Head of AI · Linear</div>
          </div>
        </div>
      </div>
    </div>
  </DSSection>
);

// ─── PRICING ───────────────────────────────────────────────────────────────
const PricingCardsSection = () => (
  <DSSection id="pricing" title="Pricing card" blurb="Three columns max. The middle (Team) is featured — inverted ink/paper, no jog upward. Always: tier name → price → 1-line description → 4-item feature list → CTA.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {[
        { name: 'Learner', price: '$24', per: '/mo', desc: 'For individuals committing to one tool stack.', features: ['All 40 tracks','Olé tutor','Verified credentials','Portfolio hosting'], cta: 'Try free 7 days', featured: false },
        { name: 'Team',    price: '$18', per: '/seat',desc: 'Roll AI training out across an org.', features: ['Everything in Learner','SSO + SCIM','Manager dashboard','Custom tracks'], cta: 'Book a demo', featured: true },
        { name: 'API',     price: 'Usage', per: '',  desc: 'For apps that ship learning.', features: ['Open SDKs','1k req/mo free','Eval API','Webhook events'], cta: 'Get API key', featured: false },
      ].map(t => (
        <div key={t.name} style={{
          padding: 22, borderRadius: 16,
          background: t.featured ? 'var(--ink)' : 'var(--surface)',
          color: t.featured ? 'var(--paper)' : 'var(--ink)',
          border: `1px solid ${t.featured ? 'var(--ink)' : 'var(--rule)'}`,
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: t.featured ? 'var(--accent-2)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            {t.name}{t.featured && ' · most popular'}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
            <span className="serif" style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.025em' }}>{t.price}</span>
            <span style={{ fontSize: 13, color: t.featured ? 'rgba(244,239,227,0.6)' : 'var(--muted)' }}>{t.per}</span>
          </div>
          <p style={{ fontSize: 13, color: t.featured ? 'rgba(244,239,227,0.7)' : 'var(--ink-soft)', margin: '0 0 16px' }}>{t.desc}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {t.features.map(f => (
              <li key={f} style={{ fontSize: 13, display: 'flex', gap: 8 }}>
                <span style={{ color: t.featured ? 'var(--accent-2)' : 'var(--accent)' }}>✓</span>{f}
              </li>
            ))}
          </ul>
          <Button variant={t.featured ? 'soft' : 'primary'} size="md" style={{ width: '100%', justifyContent: 'center', ...(t.featured ? { background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' } : {}) }}>{t.cta}</Button>
        </div>
      ))}
    </div>
  </DSSection>
);

// ─── ACCORDION ─────────────────────────────────────────────────────────────
const AccordionSection = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'How is this different from a Coursera course?', a: 'Olé reads each prompt your team writes and gives feedback. There are no videos to watch — every lesson ends in a project that runs against your codebase or stack.' },
    { q: 'Do you support our SSO / SCIM provider?',       a: 'Yes — Okta, Azure AD, Google Workspace, and OneLogin out of the box. SCIM provisioning is included on the Team plan.' },
    { q: 'Can we host it ourselves?',                     a: 'Self-hosting is available on the Enterprise plan. Most teams start on cloud and move to self-hosted in year two.' },
    { q: 'How do credentials work?',                      a: "Every track ends in a practicum we evaluate against a rubric. Pass and you get a verifiable credential signed by LearnKit — works on LinkedIn, in your portfolio, and via our credential API." },
  ];
  return (
    <DSSection id="accordion" title="FAQ accordion" blurb="One open at a time. Question is serif, answer is sans body. Chevron rotates on open. Use sparingly — flat FAQs convert better when you have ≤4 items.">
      <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div key={i} style={{ borderTop: i ? '1px solid var(--rule)' : 'none' }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{
              width: '100%', padding: '18px 22px', background: 'transparent', border: 'none',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
              textAlign: 'left', cursor: 'pointer',
            }}>
              <span className="serif" style={{ fontSize: 17, color: 'var(--ink)', fontWeight: 500, letterSpacing: '-0.01em' }}>{it.q}</span>
              <span style={{
                width: 24, height: 24, borderRadius: '50%', background: 'var(--paper-2)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s ease',
              }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
            </button>
            {open === i && (
              <div style={{ padding: '0 22px 22px', fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 720 }}>
                {it.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </DSSection>
  );
};

// ─── OLÉ HINT BUBBLE ───────────────────────────────────────────────────────
const OleSection = () => (
  <DSSection id="ole" title="Olé hint bubble" blurb="Olé is an avatar (not a mascot). Three modes — Off, Subtle, Featured — controlled globally so teams can tune the assistant's presence without breaking layouts.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      {[
        { tag: 'Off', sample: <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>Olé is hidden. Pure-content surfaces only.</div>, note: 'For unauthenticated users / pricing pages.' },
        { tag: 'Subtle', sample: <OleHint>Try replacing "summarize" with "extract — return JSON".</OleHint>, note: 'Default. Inline 14px hints next to relevant fields.' },
        { tag: 'Featured', sample: (
          <div style={{
            padding: 16, background: 'var(--surface)', border: '1.5px solid var(--accent)',
            borderRadius: 14, display: 'flex', gap: 12, boxShadow: '0 0 0 4px rgba(200,71,42,.06)',
          }}>
            <Ole size={36}/>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Olé · personalized</div>
              <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>I noticed you picked Cursor — let me swap this example to a cursor-rules file.</div>
            </div>
          </div>
        ), note: 'Demo flow & lesson player. Earned attention.' },
      ].map(s => (
        <div key={s.tag} style={{ padding: 16, background: 'var(--paper-2)', borderRadius: 12, border: '1px solid var(--rule)' }}>
          <StateTag tone={s.tag === 'Featured' ? 'accent' : 'default'}>{s.tag}</StateTag>
          <div style={{ marginTop: 14, minHeight: 96, display: 'flex', alignItems: 'center' }}>{s.sample}</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 12, lineHeight: 1.5 }}>{s.note}</div>
        </div>
      ))}
    </div>
    <SubHead>Avatar rules</SubHead>
    <ul style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, paddingLeft: 18, maxWidth: 640 }}>
      <li>Always 22–36px. Never make the avatar a hero element.</li>
      <li>Animate <code style={{ fontFamily: 'var(--mono)' }}>pulse-soft</code> only when active. Static otherwise.</li>
      <li>Olé text always opens with <strong>Olé · </strong> in mono uppercase.</li>
      <li>Disable shimmer + pulse on <code style={{ fontFamily: 'var(--mono)' }}>prefers-reduced-motion</code>.</li>
    </ul>
  </DSSection>
);

// ─── NAV + FOOTER ──────────────────────────────────────────────────────────
const NavFooterSection = () => (
  <>
    <DSSection id="nav" title="Navigation" blurb="Sticky on scroll, 64h desktop / 56h mobile. Wordmark + 5 links + 1 ghost CTA + 1 primary CTA. Mobile collapses to wordmark + hamburger + primary CTA.">
      {/* Desktop nav */}
      <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', height: 64, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <Wordmark size={20}/>
            <div style={{ display: 'flex', gap: 22 }}>
              {['Library','For teams','API','Pricing','Customers'].map(l => (
                <a key={l} style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none', cursor: 'pointer', fontWeight: 450 }}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button variant="primary" size="sm">Start free <ArrowR size={12}/></Button>
          </div>
        </div>
      </div>
      <SubHead>Mobile</SubHead>
      <div style={{ width: 390, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', height: 56, boxSizing: 'border-box' }}>
          <Wordmark size={18}/>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Button variant="primary" size="sm">Start free</Button>
            <button style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 8, padding: 0 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M2 4h12M2 8h12M2 12h12"/></svg>
            </button>
          </div>
        </div>
      </div>
    </DSSection>

    <DSSection id="footer" title="Footer" blurb="5-column desktop / single-column mobile. Top: wordmark + tagline + status. Columns: Product, For teams, Developers, Company, Resources. Bottom: copyright, social, legal.">
      <div style={{ background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 14, padding: '36px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 36, marginBottom: 32 }}>
          <div>
            <Wordmark size={22}/>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '12px 0 14px', maxWidth: 280 }}>
              The AI workbench for teams who want to ship — not just watch videos.
            </p>
            <span style={{ display: 'inline-flex', gap: 7, alignItems: 'center', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-soft)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-3)' }}/>
              All systems normal
            </span>
          </div>
          {[
            { h: 'Product',     i: ['Library','Workbench','Olé','Credentials','Changelog'] },
            { h: 'For teams',   i: ['Overview','Pricing','Customers','Security','SCIM'] },
            { h: 'Developers',  i: ['Docs','API reference','SDKs','Status','GitHub'] },
            { h: 'Company',     i: ['About','Careers','Press','Manifesto','Contact'] },
          ].map(c => (
            <div key={c.h}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {c.i.map(x => <li key={x} style={{ fontSize: 13, color: 'var(--ink)' }}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 18, borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          <span>© 2025 LearnKit, Inc. — Brooklyn &amp; Lisbon</span>
          <span>SOC 2 · GDPR · Privacy · Terms</span>
        </div>
      </div>
    </DSSection>
  </>
);

Object.assign(window, {
  ButtonsSection, InputsSection, RoleCardsSection, ToolChipsSection,
  LessonCardsSection, ProgressCardsSection, CodePreviewSection,
  TestimonialSection, PricingCardsSection, AccordionSection,
  OleSection, NavFooterSection,
});
