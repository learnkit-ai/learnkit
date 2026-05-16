// LearnKit — Design System shell (sidebar nav + section frame)

const SECTIONS = [
  { id: 'foundations', title: 'Foundations', items: [
    { id: 'colors', label: 'Colors' },
    { id: 'type', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius & shadow' },
    { id: 'motion', label: 'Motion' },
  ]},
  { id: 'components', title: 'Components', items: [
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'role-cards', label: 'Role selector' },
    { id: 'tool-chips', label: 'Tool chips' },
    { id: 'lesson-cards', label: 'Lesson cards' },
    { id: 'progress-cards', label: 'Progress cards' },
    { id: 'code', label: 'Code preview' },
    { id: 'testimonial', label: 'Testimonial' },
    { id: 'pricing', label: 'Pricing card' },
    { id: 'accordion', label: 'FAQ accordion' },
    { id: 'ole', label: 'Olé hint bubble' },
  ]},
  { id: 'patterns', title: 'Patterns', items: [
    { id: 'nav', label: 'Navigation' },
    { id: 'footer', label: 'Footer' },
  ]},
];

const Sidebar = ({ active, onPick }) => (
  <aside style={{
    width: 240, padding: '32px 20px 32px 32px', borderRight: '1px solid var(--rule)',
    height: '100vh', position: 'sticky', top: 0, overflowY: 'auto',
    background: 'var(--paper)', flexShrink: 0,
  }}>
    <div style={{ marginBottom: 28 }}>
      <Wordmark size={20}/>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>
        Design System · v0.9
      </div>
    </div>
    {SECTIONS.map(group => (
      <div key={group.id} style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
          {group.title}
        </div>
        {group.items.map(it => (
          <a key={it.id} onClick={() => onPick(it.id)}
            href={`#${it.id}`}
            style={{
              display: 'block', padding: '5px 10px', margin: '0 -10px',
              fontSize: 13, fontWeight: 450,
              color: active === it.id ? 'var(--ink)' : 'var(--ink-soft)',
              background: active === it.id ? 'var(--paper-2)' : 'transparent',
              borderRadius: 6, textDecoration: 'none',
              borderLeft: active === it.id ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
            }}>
            {it.label}
          </a>
        ))}
      </div>
    ))}
  </aside>
);

// Section header + intro
const DSSection = ({ id, title, blurb, children }) => (
  <section id={id} style={{ padding: '56px 56px', borderBottom: '1px solid var(--rule)' }}>
    <Eyebrow>{`§ ${id}`}</Eyebrow>
    <h2 className="serif" style={{ fontSize: 36, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '12px 0 10px', fontWeight: 400 }}>
      {title}
    </h2>
    {blurb && <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '0 0 32px', maxWidth: 720 }}>{blurb}</p>}
    {children}
  </section>
);

// Spec row — label + monospace value
const Spec = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px dashed var(--rule)', fontSize: 12 }}>
    <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{label}</span>
    <span style={{ color: 'var(--ink)', fontFamily: 'var(--mono)' }}>{value}</span>
  </div>
);

// Code snippet block (Tailwind-flavored, copy-able)
const CodeBlock = ({ children, lang = 'tsx', label }) => (
  <div style={{ marginTop: 14, background: 'var(--ink)', borderRadius: 10, overflow: 'hidden', fontSize: 12 }}>
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'rgba(244,239,227,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {label || lang}
      </span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'rgba(244,239,227,0.4)' }}>copy</span>
    </div>
    <pre style={{
      margin: 0, padding: '14px 16px', color: 'var(--paper)',
      fontFamily: 'var(--mono)', fontSize: 11.5, lineHeight: 1.6,
      whiteSpace: 'pre', overflowX: 'auto',
    }}>{children}</pre>
  </div>
);

// "Demo well" — a soft card holding a live component
const DemoWell = ({ children, dark, style }) => (
  <div style={{
    padding: 24, borderRadius: 14,
    background: dark ? 'var(--ink)' : 'var(--paper-2)',
    border: '1px solid var(--rule)',
    display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
    ...style,
  }}>
    {children}
  </div>
);

// Two-up: demo on the left, spec/notes on the right
const TwoUp = ({ children, ratio = '1.4fr 1fr' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: ratio, gap: 28, marginTop: 12 }}>{children}</div>
);

// Subhead / mini section title within a section
const SubHead = ({ children, top = 36 }) => (
  <h3 className="serif" style={{ fontSize: 20, letterSpacing: '-0.015em', margin: `${top}px 0 14px`, fontWeight: 500 }}>
    {children}
  </h3>
);

// Tag pill (for state labels: default / hover / active …)
const StateTag = ({ children, tone = 'default' }) => {
  const tones = {
    default: { bg: 'var(--paper-3)', fg: 'var(--ink-soft)' },
    accent: { bg: 'var(--accent)', fg: '#FFF' },
    warn: { bg: 'var(--accent-2)', fg: 'var(--ink)' },
  };
  const t = tones[tone];
  return (
    <span style={{
      padding: '3px 8px', borderRadius: 4, fontSize: 10.5, fontWeight: 600,
      background: t.bg, color: t.fg, fontFamily: 'var(--mono)',
      letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>{children}</span>
  );
};

Object.assign(window, { Sidebar, DSSection, Spec, CodeBlock, DemoWell, TwoUp, SubHead, StateTag, SECTIONS });
