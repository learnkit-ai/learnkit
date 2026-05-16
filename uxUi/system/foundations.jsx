// LearnKit — Design System · Foundations (colors, type, spacing, radius/shadow, motion)

// ─── COLORS ─────────────────────────────────────────────────────────────────
const PALETTES = {
  Surface: [
    { name: 'paper',    hex: '#FAF7F0', token: '--paper',    use: 'page background' },
    { name: 'paper-2',  hex: '#F4EFE3', token: '--paper-2',  use: 'alt section bg' },
    { name: 'paper-3',  hex: '#ECE4D2', token: '--paper-3',  use: 'inset wells' },
    { name: 'surface',  hex: '#FFFFFF', token: '--surface',  use: 'cards' },
  ],
  Ink: [
    { name: 'ink',      hex: '#1A2547', token: '--ink',      use: 'primary text, primary buttons' },
    { name: 'ink-2',    hex: '#2B3560', token: '--ink-2',    use: 'hover, ink2' },
    { name: 'ink-soft', hex: '#4A557A', token: '--ink-soft', use: 'body copy' },
    { name: 'muted',    hex: '#6B7280', token: '--muted',    use: 'metadata, helper text' },
  ],
  Accent: [
    { name: 'accent',   hex: '#C8472A', token: '--accent',   use: 'primary CTA, italic emphasis' },
    { name: 'accent-2', hex: '#E8B547', token: '--accent-2', use: 'Olé warmth, highlights' },
    { name: 'accent-3', hex: '#6B8F6E', token: '--accent-3', use: 'success, Teams accent' },
    { name: 'accent-4', hex: '#2C5F8D', token: '--accent-4', use: 'Developer accent' },
  ],
  Rule: [
    { name: 'rule',         hex: 'rgba(26,37,71,.10)', token: '--rule',         use: 'card borders, hairlines' },
    { name: 'rule-strong',  hex: 'rgba(26,37,71,.18)', token: '--rule-strong',  use: 'ghost button border' },
  ],
};

const Swatch = ({ s }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{
      width: '100%', height: 88, borderRadius: 10,
      background: s.hex, border: '1px solid var(--rule)',
      boxShadow: 'var(--shadow-1)',
    }}/>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{s.name}</span>
      <span style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{s.hex}</span>
    </div>
    <div style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>var({s.token})</div>
    <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', lineHeight: 1.4 }}>{s.use}</div>
  </div>
);

const ColorsSection = () => (
  <DSSection id="colors" title="Colors" blurb="Warm-academic palette. Paper neutrals carry the page; ink is the workhorse text and primary CTA color; the four accents are role-coded — burnt sienna for primary actions, warm gold for Olé, sage for Teams, lapis for Developer.">
    {Object.entries(PALETTES).map(([group, swatches]) => (
      <div key={group} style={{ marginBottom: 32 }}>
        <SubHead top={0}>{group}</SubHead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {swatches.map(s => <Swatch key={s.name} s={s}/>)}
        </div>
      </div>
    ))}
    <SubHead>Tailwind config</SubHead>
    <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', maxWidth: 640, margin: 0 }}>
      Drop these into <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--paper-2)', padding: '2px 6px', borderRadius: 4 }}>tailwind.config.js</code> under <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--paper-2)', padding: '2px 6px', borderRadius: 4 }}>theme.extend.colors</code>.
    </p>
    <CodeBlock lang="js" label="tailwind.config.js">{`extend: {
  colors: {
    paper:    { DEFAULT: '#FAF7F0', 2: '#F4EFE3', 3: '#ECE4D2' },
    ink:      { DEFAULT: '#1A2547', 2: '#2B3560', soft: '#4A557A' },
    muted:    '#6B7280',
    accent:   { DEFAULT: '#C8472A', 2: '#E8B547', 3: '#6B8F6E', 4: '#2C5F8D' },
  },
  borderColor: {
    rule:      'rgba(26,37,71,0.10)',
    'rule-strong': 'rgba(26,37,71,0.18)',
  },
}`}</CodeBlock>
    <SubHead>Usage rules</SubHead>
    <ul style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.7, paddingLeft: 18, maxWidth: 640 }}>
      <li><strong style={{ color: 'var(--ink)' }}>One accent per surface.</strong> Don't mix sienna, sage, and lapis on the same card.</li>
      <li><strong style={{ color: 'var(--ink)' }}>Sienna is for action.</strong> Reserve <code style={{ fontFamily: 'var(--mono)' }}>--accent</code> for primary CTAs and one italic-emphasis word per section. It loses meaning when sprinkled.</li>
      <li><strong style={{ color: 'var(--ink)' }}>Ink ≠ black.</strong> Never use #000. Always <code style={{ fontFamily: 'var(--mono)' }}>--ink</code> (#1A2547) or <code style={{ fontFamily: 'var(--mono)' }}>--ink-soft</code>.</li>
    </ul>
  </DSSection>
);

// ─── TYPE ───────────────────────────────────────────────────────────────────
const TypeSpec = ({ label, sample, size, weight, lh, tracking, family = 'serif' }) => (
  <div style={{ padding: '20px 0', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: '180px 1fr 280px', gap: 24, alignItems: 'baseline' }}>
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
      <div style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: 4 }}>{family} · {weight}</div>
    </div>
    <div className={family === 'serif' ? 'serif' : ''} style={{
      fontFamily: family === 'serif' ? 'var(--serif)' : family === 'mono' ? 'var(--mono)' : 'var(--sans)',
      fontSize: size, fontWeight: weight, lineHeight: lh, letterSpacing: tracking,
      color: 'var(--ink)',
    }}>{sample}</div>
    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', lineHeight: 1.7 }}>
      {size}px / {lh}<br/>
      tracking: {tracking}<br/>
      weight: {weight}
    </div>
  </div>
);

const TypeSection = () => (
  <DSSection id="type" title="Typography" blurb="Newsreader (serif) for display & section headlines. Inter (sans) for UI & body. JetBrains Mono for metadata, code, and eyebrow labels. Headlines lean italic for emphasis — used sparingly, one per section.">
    <SubHead top={0}>Display & headline (Newsreader)</SubHead>
    <TypeSpec label="Display / D1" sample="Get fluent in AI." size={76} weight={400} lh={0.95} tracking="-0.035em"/>
    <TypeSpec label="Display / D2" sample="The AI workbench you'll use." size={56} weight={400} lh={1.0} tracking="-0.03em"/>
    <TypeSpec label="Section / H2" sample="Pick your path." size={40} weight={400} lh={1.05} tracking="-0.025em"/>
    <TypeSpec label="Subsection / H3" sample="Three doors in." size={28} weight={400} lh={1.1} tracking="-0.02em"/>
    <TypeSpec label="Card title / H4" sample="Building a research agent" size={20} weight={500} lh={1.15} tracking="-0.015em"/>

    <SubHead>UI & body (Inter)</SubHead>
    <TypeSpec family="sans" label="Lead" sample="Adaptive lessons. A tutor named Olé." size={18} weight={400} lh={1.5} tracking="-0.005em"/>
    <TypeSpec family="sans" label="Body" sample="Olé reads your prompts and tells you what to fix." size={15} weight={400} lh={1.55} tracking="0"/>
    <TypeSpec family="sans" label="Body small" sample="Free tier · 1k requests / month" size={13} weight={400} lh={1.5} tracking="0"/>
    <TypeSpec family="sans" label="UI label" sample="Start free assessment" size={14} weight={500} lh={1.2} tracking="-0.005em"/>

    <SubHead>Mono & metadata (JetBrains Mono)</SubHead>
    <TypeSpec family="mono" label="Eyebrow" sample="§ FOR TEAMS · DEVELOPERS" size={11} weight={500} lh={1.3} tracking="0.12em"/>
    <TypeSpec family="mono" label="Code / inline" sample="POST /v1/paths" size={12} weight={500} lh={1.5} tracking="0"/>
    <TypeSpec family="mono" label="Code / block" sample="lk.paths.create({ user_id })" size={11.5} weight={400} lh={1.7} tracking="0"/>

    <SubHead>Tailwind tokens</SubHead>
    <CodeBlock lang="js" label="tailwind.config.js">{`fontFamily: {
  serif: ['Newsreader', 'Georgia', 'serif'],
  sans:  ['Inter', 'system-ui', 'sans-serif'],
  mono:  ['JetBrains Mono', 'ui-monospace', 'monospace'],
},
fontSize: {
  // semantic — use these in components
  'display-1': ['76px',  { lineHeight: '0.95', letterSpacing: '-0.035em' }],
  'display-2': ['56px',  { lineHeight: '1.0',  letterSpacing: '-0.03em'  }],
  'h2':        ['40px',  { lineHeight: '1.05', letterSpacing: '-0.025em' }],
  'h3':        ['28px',  { lineHeight: '1.1',  letterSpacing: '-0.02em'  }],
  'h4':        ['20px',  { lineHeight: '1.15', letterSpacing: '-0.015em' }],
  'lead':      ['18px',  { lineHeight: '1.5',  letterSpacing: '-0.005em' }],
  'body':      ['15px',  { lineHeight: '1.55' }],
  'body-sm':   ['13px',  { lineHeight: '1.5'  }],
  'ui':        ['14px',  { lineHeight: '1.2',  letterSpacing: '-0.005em' }],
  'eyebrow':   ['11px',  { lineHeight: '1.3',  letterSpacing: '0.12em'   }],
  'code':      ['12px',  { lineHeight: '1.5'  }],
}`}</CodeBlock>
    <SubHead>Rules</SubHead>
    <ul style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.7, paddingLeft: 18, maxWidth: 640 }}>
      <li>Display sizes (D1 / D2) only on hero. Never two D1s on the same page.</li>
      <li>One italic emphasis per headline. Italic on more than one word breaks the rhythm.</li>
      <li>Mono is reserved for: eyebrows, code, metadata (counts, timestamps, IDs). Don't use it for buttons or body.</li>
      <li>Body never goes below 13px on desktop, 14px on mobile.</li>
    </ul>
  </DSSection>
);

// ─── SPACING ────────────────────────────────────────────────────────────────
const SpacingSection = () => {
  const scale = [
    { token: 'xs',  px: 4,  use: 'icon → label gap' },
    { token: 'sm',  px: 8,  use: 'chip padding-y, tight stacks' },
    { token: 'md',  px: 12, use: 'card padding, chip padding-x' },
    { token: 'lg',  px: 16, use: 'card padding, button padding-y' },
    { token: 'xl',  px: 24, use: 'inter-card, card content gap' },
    { token: '2xl', px: 32, use: 'card → card' },
    { token: '3xl', px: 48, use: 'inter-section sm' },
    { token: '4xl', px: 56, use: 'section padding-x desktop' },
    { token: '5xl', px: 72, use: 'hero padding-y' },
    { token: '6xl', px: 96, use: 'big section padding-y' },
  ];
  return (
    <DSSection id="spacing" title="Spacing" blurb="Built on a 4-pixel grid. Most things use lg (16) or xl (24). Hero verticals reach 72–96. Section padding-x is 56 desktop / 36 tablet / 16 mobile.">
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 240px', columnGap: 24, rowGap: 6 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Token</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Visual · px</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Use</div>
        {scale.map(s => (
          <React.Fragment key={s.token}>
            <div style={{ padding: '10px 0', borderTop: '1px dashed var(--rule)', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)' }}>space-{s.token}</div>
            <div style={{ padding: '10px 0', borderTop: '1px dashed var(--rule)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ height: 16, width: s.px, background: 'var(--accent)', borderRadius: 2 }}/>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--muted)' }}>{s.px}px</span>
            </div>
            <div style={{ padding: '10px 0', borderTop: '1px dashed var(--rule)', fontSize: 12.5, color: 'var(--ink-soft)' }}>{s.use}</div>
          </React.Fragment>
        ))}
      </div>
      <SubHead>Tailwind</SubHead>
      <CodeBlock lang="js" label="tailwind.config.js">{`spacing: {
  'xs':  '4px',  'sm':  '8px',  'md':  '12px',
  'lg':  '16px', 'xl':  '24px', '2xl': '32px',
  '3xl': '48px', '4xl': '56px', '5xl': '72px',
  '6xl': '96px',
}`}</CodeBlock>
    </DSSection>
  );
};

// ─── RADIUS & SHADOW ────────────────────────────────────────────────────────
const RadiusShadowSection = () => {
  const radii = [
    { token: 'sm', px: 6,  use: 'inline tags, kbd' },
    { token: 'md', px: 10, use: 'buttons, inputs' },
    { token: 'lg', px: 16, use: 'cards' },
    { token: 'xl', px: 24, use: 'hero panels, focused artboards' },
    { token: 'pill', px: 999, use: 'chips' },
  ];
  const shadows = [
    { token: 'shadow-1', use: 'subtle lift — input focus, ghost cards', value: '0 1px 2px rgba(26,37,71,.04), 0 1px 1px rgba(26,37,71,.03)' },
    { token: 'shadow-2', use: 'active card, popover, workbench', value: '0 2px 6px rgba(26,37,71,.06), 0 8px 24px rgba(26,37,71,.06)' },
    { token: 'shadow-3', use: 'modal, focused / dragged artboard', value: '0 4px 12px rgba(26,37,71,.08), 0 24px 48px rgba(26,37,71,.10)' },
  ];
  return (
    <DSSection id="radius" title="Radius & shadow" blurb="Soft, paper-friendly elevation. Three shadow levels — most surfaces use shadow-1 or shadow-2; shadow-3 is reserved for modals and focused overlays.">
      <SubHead top={0}>Border radius</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        {radii.map(r => (
          <div key={r.token}>
            <div style={{
              height: 80, background: 'var(--surface)', border: '1px solid var(--rule)',
              borderRadius: r.px === 999 ? 999 : r.px, marginBottom: 10,
              boxShadow: 'var(--shadow-1)',
            }}/>
            <div style={{ fontSize: 12, fontWeight: 500 }}>radius-{r.token}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{r.px === 999 ? '999px' : `${r.px}px`}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{r.use}</div>
          </div>
        ))}
      </div>
      <SubHead>Shadow</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {shadows.map(s => (
          <div key={s.token} style={{
            padding: '32px 24px', background: 'var(--surface)', borderRadius: 14,
            boxShadow: `var(--${s.token})`, border: '1px solid var(--rule)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{s.token}</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 10 }}>{s.use}</div>
            <code style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', display: 'block', wordBreak: 'break-all', lineHeight: 1.4 }}>{s.value}</code>
          </div>
        ))}
      </div>
    </DSSection>
  );
};

// ─── MOTION ─────────────────────────────────────────────────────────────────
const MotionSection = () => {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 80); return () => clearInterval(id); }, []);
  const typed = 'Build me a research agent that…'.slice(0, Math.min(40, (tick * 2) % 80));
  const genPct = (tick * 3) % 100;

  return (
    <DSSection id="motion" title="Motion" blurb="Five reusable animations. All use ease-out by default; durations are conservative — fast enough to feel snappy, slow enough to read.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {/* Typing */}
        <div style={{ padding: 18, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Typing</span>
            <span style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>~30ms / char · cursor 530ms</span>
          </div>
          <div style={{ padding: 12, background: 'var(--paper-2)', borderRadius: 8, fontFamily: 'var(--mono)', fontSize: 12.5, minHeight: 56 }}>
            {typed}<span style={{ opacity: tick % 2 ? 1 : 0, color: 'var(--accent)' }}>▍</span>
          </div>
          <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', margin: '10px 0 0', lineHeight: 1.5 }}>
            Hero subhead, demo placeholder, and Olé hint reveal. Skip on <code>prefers-reduced-motion</code>.
          </p>
        </div>

        {/* Loading dots */}
        <div style={{ padding: 18, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Loading dots</span>
            <span style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>1.2s loop · 3 dots, 0.15s offset</span>
          </div>
          <div style={{ padding: 24, background: 'var(--paper-2)', borderRadius: 8, display: 'flex', justifyContent: 'center', gap: 6, minHeight: 56, alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)',
                opacity: ((tick + i*3) % 12) < 6 ? 1 : 0.25,
                transition: 'opacity .2s ease',
              }}/>
            ))}
          </div>
          <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', margin: '10px 0 0', lineHeight: 1.5 }}>
            For Olé thinking states &lt;2s. For longer waits use the generation pattern below.
          </p>
        </div>

        {/* Generation */}
        <div style={{ padding: 18, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Generation progress</span>
            <span style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>3 phases · 4–6s total</span>
          </div>
          <div style={{ padding: 16, background: 'var(--paper-2)', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, marginBottom: 8 }}>
              <span style={{ color: 'var(--ink)' }}>{genPct < 35 ? 'Reading your goal' : genPct < 70 ? 'Mapping tools to skills' : 'Sequencing 30 lessons'}</span>
              <span style={{ color: 'var(--muted)' }}>{genPct}%</span>
            </div>
            <div style={{ height: 5, background: 'var(--paper-3)', borderRadius: 3 }}>
              <div style={{ width: `${genPct}%`, height: '100%', background: 'var(--accent)', borderRadius: 3, transition: 'width .3s ease' }}/>
            </div>
          </div>
          <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', margin: '10px 0 0', lineHeight: 1.5 }}>
            Always show 3 named phases. Pure spinner = "thinking", which buyers don't trust.
          </p>
        </div>

        {/* Hover lift */}
        <div style={{ padding: 18, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Hover lift</span>
            <span style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>2px · 150ms ease-out</span>
          </div>
          <div style={{ padding: 16, background: 'var(--paper-2)', borderRadius: 8, display: 'flex', gap: 10, justifyContent: 'center' }}>
            {[0,1].map(i => (
              <div key={i} className="ds-hover-lift" style={{
                padding: 16, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 10,
                fontSize: 12, fontFamily: 'var(--mono)', minWidth: 90, textAlign: 'center', cursor: 'pointer',
                transition: 'transform .15s ease, box-shadow .15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                hover me
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', margin: '10px 0 0', lineHeight: 1.5 }}>
            Cards and chips. Buttons get a 1px <em>down</em> press, not a lift.
          </p>
        </div>

        {/* Shimmer */}
        <div style={{ padding: 18, background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 14, gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Shimmer (Olé presence)</span>
            <span style={{ fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>3s linear · use sparingly</span>
          </div>
          <div style={{ padding: 24, background: 'var(--paper-2)', borderRadius: 8, textAlign: 'center' }}>
            <span className="serif shimmer" style={{ fontSize: 24, fontStyle: 'italic' }}>Olé is reading your prompt…</span>
          </div>
          <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', margin: '10px 0 0', lineHeight: 1.5 }}>
            Reserved for Olé text states. Never apply to UI labels or numbers — it reads as broken.
          </p>
        </div>
      </div>

      <SubHead>Easing & duration</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <Spec label="ease-out (default)" value="cubic-bezier(0.2, 0.8, 0.2, 1)"/>
        <Spec label="ease-in-out (loops)" value="cubic-bezier(0.4, 0, 0.2, 1)"/>
        <Spec label="duration / micro" value="150ms"/>
        <Spec label="duration / standard" value="220ms"/>
        <Spec label="duration / generation" value="4000–6000ms"/>
        <Spec label="reduced motion" value="disable typing, shimmer, pulse"/>
      </div>
    </DSSection>
  );
};

Object.assign(window, { ColorsSection, TypeSection, SpacingSection, RadiusShadowSection, MotionSection });
