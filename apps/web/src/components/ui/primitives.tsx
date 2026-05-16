import type { CSSProperties, ReactNode } from 'react';

export function Eyebrow({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <div
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: color ?? 'var(--accent)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span style={{ width: 18, height: 1, background: 'currentColor', opacity: 0.6 }} />
      {children}
    </div>
  );
}

export function AmbientArc({
  style,
  color,
  size = 200,
}: {
  style?: CSSProperties;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
    >
      <circle cx="100" cy="100" r="98" fill="none" stroke={color ?? 'var(--accent-2)'} strokeWidth="0.6" opacity="0.4" />
      <circle cx="100" cy="100" r="70" fill="none" stroke={color ?? 'var(--accent-2)'} strokeWidth="0.6" opacity="0.3" />
      <circle cx="100" cy="100" r="42" fill="none" stroke={color ?? 'var(--accent-2)'} strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

export function Ole({ size = 28, animated = true }: { size?: number; animated?: boolean }) {
  return (
    <span
      className="ole-hideable"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, var(--accent-2), var(--accent))',
        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5), 0 2px 8px rgba(200,71,42,0.25)',
        position: 'relative',
        flexShrink: 0,
        animation: animated ? 'pulse-soft 3s ease-in-out infinite' : 'none',
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="none">
        <path d="M6 14 Q12 18 18 14" stroke="rgba(26,37,71,0.7)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <circle cx="9" cy="10" r="1.2" fill="rgba(26,37,71,0.85)" />
        <circle cx="15" cy="10" r="1.2" fill="rgba(26,37,71,0.85)" />
      </svg>
    </span>
  );
}

export function ToolIcon({ name, size = 22 }: { name: string; size?: number }) {
  const map: Record<string, { bg: string; glyph: string }> = {
    Claude: { bg: '#D97757', glyph: 'C' },
    ChatGPT: { bg: '#10A37F', glyph: 'G' },
    Cursor: { bg: '#000', glyph: '⌘' },
    Copilot: { bg: '#1F2937', glyph: '⊕' },
    Midjourney: { bg: '#3B2F6B', glyph: 'M' },
    'Notion AI': { bg: '#111', glyph: 'N' },
    Perplexity: { bg: '#1FB8CD', glyph: 'P' },
    Gemini: { bg: '#4285F4', glyph: '✦' },
  };
  const t = map[name] ?? { bg: 'var(--ink)', glyph: name?.[0] ?? '·' };
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        background: t.bg,
        color: '#FFF',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--serif)',
        fontWeight: 500,
        fontSize: size * 0.55,
        flexShrink: 0,
      }}
    >
      {t.glyph}
    </span>
  );
}
