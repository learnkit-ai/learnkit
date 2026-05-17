'use client';

import type { CSSProperties } from 'react';

export interface AIGuideProps {
  message: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

const SIZE_MAP = { sm: 24, md: 32, lg: 44 };

/**
 * AIGuide — a small avatar + a one-line tip.
 * Drop-in for surfacing AI Guide reviews and hints inside any host UI.
 */
export function AIGuide({
  message,
  animated = true,
  size = 'md',
  className,
  style,
}: AIGuideProps) {
  const px = SIZE_MAP[size];
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '10px 14px',
        borderRadius: 14,
        background: 'var(--lk-surface, #ffffff)',
        border: '1px solid var(--lk-rule, rgba(0,0,0,0.1))',
        boxShadow: '0 1px 2px rgba(26, 37, 71, 0.04)',
        maxWidth: 420,
        fontFamily:
          'var(--lk-font-sans, system-ui, -apple-system, "Segoe UI", sans-serif)',
        color: 'var(--lk-ink, #1A2547)',
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: px,
          height: px,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 30%, var(--lk-accent-2, #E8B547), var(--lk-accent, #C8472A))',
          boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5)',
          flexShrink: 0,
          animation: animated ? 'lk-pulse 3s ease-in-out infinite' : 'none',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={px * 0.55}
          height={px * 0.55}
          fill="none"
          role="presentation"
        >
          <path
            d="M6 14 Q12 18 18 14"
            stroke="rgba(26,37,71,0.7)"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="9" cy="10" r="1.2" fill="rgba(26,37,71,0.85)" />
          <circle cx="15" cy="10" r="1.2" fill="rgba(26,37,71,0.85)" />
        </svg>
      </span>
      <div style={{ paddingTop: 2 }}>
        <div
          style={{
            fontFamily:
              'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--lk-accent, #C8472A)',
            fontWeight: 500,
            marginBottom: 2,
          }}
        >
          AI Guide
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--lk-ink, #1A2547)' }}>
          {message}
        </div>
      </div>
      {animated && (
        <style>{`@keyframes lk-pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
}`}</style>
      )}
    </div>
  );
}
