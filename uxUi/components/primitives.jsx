// Shared LearnKit primitives

const Button = ({ children, variant = 'primary', size = 'md', onClick, style, icon }) => {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13, borderRadius: 8 },
    md: { padding: '12px 20px', fontSize: 14, borderRadius: 10 },
    lg: { padding: '16px 26px', fontSize: 15, borderRadius: 12 },
  };
  const variants = {
    primary: { background: 'var(--ink)', color: 'var(--paper)', border: '1px solid var(--ink)' },
    accent: { background: 'var(--accent)', color: '#FFF', border: '1px solid var(--accent)' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--rule-strong)' },
    soft: { background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--rule)' },
    link: { background: 'transparent', color: 'var(--ink)', border: 'none', padding: 0 },
  };
  return (
    <button onClick={onClick} style={{
      ...sizes[size], ...variants[variant],
      fontFamily: 'var(--sans)', fontWeight: 500, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 8,
      transition: 'transform .15s ease, box-shadow .15s ease, background .15s ease',
      letterSpacing: '-0.005em',
      ...style,
    }}
    onMouseDown={e => e.currentTarget.style.transform = 'translateY(1px)'}
    onMouseUp={e => e.currentTarget.style.transform = ''}
    onMouseLeave={e => e.currentTarget.style.transform = ''}
    >
      {children}
      {icon}
    </button>
  );
};

const ArrowR = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Chip = ({ children, active, onClick, icon, style }) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 12px', borderRadius: 999, fontSize: 13, fontWeight: 500,
    background: active ? 'var(--ink)' : 'var(--surface)',
    color: active ? 'var(--paper)' : 'var(--ink-soft)',
    border: `1px solid ${active ? 'var(--ink)' : 'var(--rule)'}`,
    fontFamily: 'var(--sans)', letterSpacing: '-0.005em',
    transition: 'all .15s ease',
    ...style,
  }}>
    {icon}
    {children}
  </button>
);

const Eyebrow = ({ children, color }) => (
  <div style={{
    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: color || 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 8,
  }}>
    <span style={{ width: 18, height: 1, background: 'currentColor', opacity: 0.6 }}></span>
    {children}
  </div>
);

// Olé — subtle assistant avatar
const Ole = ({ size = 28, animated = true }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: size, height: size, borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 30%, var(--accent-2), var(--accent))',
    boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5), 0 2px 8px rgba(200,71,42,0.25)',
    position: 'relative', flexShrink: 0,
    animation: animated ? 'pulse-soft 3s ease-in-out infinite' : 'none',
  }}>
    <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="none">
      <path d="M6 14 Q12 18 18 14" stroke="rgba(26,37,71,0.7)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <circle cx="9" cy="10" r="1.2" fill="rgba(26,37,71,0.85)"/>
      <circle cx="15" cy="10" r="1.2" fill="rgba(26,37,71,0.85)"/>
    </svg>
  </span>
);

const OleHint = ({ children, side = 'right' }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'flex-start', gap: 10,
    padding: '10px 14px', background: 'var(--surface)',
    border: '1px solid var(--rule)', borderRadius: 14,
    boxShadow: 'var(--shadow-1)', maxWidth: 320,
    animation: 'float-up .5s ease both',
  }}>
    <Ole size={22} />
    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.5, paddingTop: 2 }}>
      <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Olé · </span>
      {children}
    </div>
  </div>
);

// Ambient shape — quiet decorative glyphs
const AmbientArc = ({ style, color, size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
    <circle cx="100" cy="100" r="98" fill="none" stroke={color || 'var(--accent-2)'} strokeWidth="0.6" opacity="0.4"/>
    <circle cx="100" cy="100" r="70" fill="none" stroke={color || 'var(--accent-2)'} strokeWidth="0.6" opacity="0.3"/>
    <circle cx="100" cy="100" r="42" fill="none" stroke={color || 'var(--accent-2)'} strokeWidth="0.6" opacity="0.25"/>
  </svg>
);

// Star / asterisk glyph (academic motif)
const Asterisk = ({ size = 16, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" style={style} fill="none">
    <g stroke={color || 'currentColor'} strokeWidth="1.2" strokeLinecap="round">
      <path d="M8 1 L8 15"/>
      <path d="M1 8 L15 8"/>
      <path d="M3 3 L13 13"/>
      <path d="M13 3 L3 13"/>
    </g>
  </svg>
);

// Section divider — fine rule with center glyph
const Divider = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--rule-strong)', margin: '40px 0' }}>
    <div style={{ flex: 1, height: 1, background: 'var(--rule)' }}></div>
    {children && <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{children}</div>}
    <div style={{ flex: 1, height: 1, background: 'var(--rule)' }}></div>
  </div>
);

// Tool / brand icons (simplified marks for the demo)
const ToolIcon = ({ name, size = 22 }) => {
  const map = {
    'Claude': { bg: '#D97757', glyph: 'C' },
    'ChatGPT': { bg: '#10A37F', glyph: 'G' },
    'Cursor': { bg: '#000', glyph: '⌘' },
    'Copilot': { bg: '#1F2937', glyph: '⊕' },
    'Midjourney': { bg: '#3B2F6B', glyph: 'M' },
    'Notion AI': { bg: '#111', glyph: 'N' },
    'Perplexity': { bg: '#1FB8CD', glyph: 'P' },
    'Gemini': { bg: '#4285F4', glyph: '✦' },
  };
  const t = map[name] || { bg: 'var(--ink)', glyph: name?.[0] || '·' };
  return (
    <span style={{
      width: size, height: size, borderRadius: 6,
      background: t.bg, color: '#FFF', display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--serif)', fontWeight: 500, fontSize: size * 0.55,
      flexShrink: 0,
    }}>{t.glyph}</span>
  );
};

Object.assign(window, {
  Button, ArrowR, Chip, Eyebrow, Ole, OleHint,
  AmbientArc, Asterisk, Divider, ToolIcon,
});
