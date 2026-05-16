'use client';

import type { CSSProperties, ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'ghost' | 'soft' | 'link';
type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, CSSProperties> = {
  sm: { padding: '8px 14px', fontSize: 13, borderRadius: 8 },
  md: { padding: '12px 20px', fontSize: 14, borderRadius: 10 },
  lg: { padding: '16px 26px', fontSize: 15, borderRadius: 12 },
};

const VARIANTS: Record<Variant, CSSProperties> = {
  primary: { background: 'var(--ink)', color: 'var(--paper)', border: '1px solid var(--ink)' },
  accent: { background: 'var(--accent)', color: '#FFF', border: '1px solid var(--accent)' },
  ghost: { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--rule-strong)' },
  soft: { background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--rule)' },
  link: { background: 'transparent', color: 'var(--ink)', border: 'none', padding: '0' },
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

export function Button({ children, variant = 'primary', size = 'md', onClick, style, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        ...SIZES[size],
        ...VARIANTS[variant],
        fontFamily: 'var(--sans)',
        fontWeight: 500,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'transform .15s ease, box-shadow .15s ease, background .15s ease',
        letterSpacing: '-0.005em',
        ...style,
      }}
      onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
    >
      {children}
    </button>
  );
}

export function ArrowR({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M2 7h10m0 0L7.5 2.5M12 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
