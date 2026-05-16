// LearnKit wordmark — refined typographic with optional aperture mark
const Wordmark = ({ size = 22, showMark = true, color, markColor }) => {
  const c = color || 'var(--ink)';
  const mc = markColor || 'var(--accent)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: size * 0.36,
      fontFamily: 'var(--serif)', fontSize: size, fontWeight: 500,
      letterSpacing: '-0.025em', color: c, lineHeight: 1,
    }}>
      {showMark && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: size * 1.05, height: size * 1.05, position: 'relative',
        }}>
          <svg viewBox="0 0 32 32" width={size * 1.05} height={size * 1.05} fill="none">
            {/* Aperture / open book — abstract, geometric */}
            <circle cx="16" cy="16" r="14.5" stroke={c} strokeWidth="1.25" opacity="0.85"/>
            <path d="M16 4 L16 28 M4 16 L28 16" stroke={c} strokeWidth="1" opacity="0.25"/>
            <path d="M16 8 L23 16 L16 24 L9 16 Z" fill={mc} opacity="0.95"/>
            <circle cx="16" cy="16" r="2" fill={c}/>
          </svg>
        </span>
      )}
      <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
        <span>Learn</span>
        <span style={{ fontStyle: 'italic', fontWeight: 400, color: mc }}>K</span>
        <span>it</span>
      </span>
    </span>
  );
};

// Compact mono variant for footer / API surfaces
const WordmarkMono = ({ size = 14, color }) => {
  const c = color || 'var(--ink)';
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: size, fontWeight: 500,
      letterSpacing: '-0.02em', color: c, textTransform: 'lowercase',
    }}>
      learn<span style={{ color: 'var(--accent)' }}>·</span>kit
    </span>
  );
};

window.Wordmark = Wordmark;
window.WordmarkMono = WordmarkMono;
