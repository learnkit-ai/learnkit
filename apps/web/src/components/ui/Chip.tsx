'use client';

import type { CSSProperties, ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  style?: CSSProperties;
}

export function Chip({ children, active, onClick, icon, style }: ChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 12px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 500,
        background: active ? 'var(--ink)' : 'var(--surface)',
        color: active ? 'var(--paper)' : 'var(--ink-soft)',
        border: `1px solid ${active ? 'var(--ink)' : 'var(--rule)'}`,
        fontFamily: 'var(--sans)',
        letterSpacing: '-0.005em',
        transition: 'all .15s ease',
        cursor: 'pointer',
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

export function OleHint({ children }: { children: ReactNode }) {
  return (
    <div
      className="ole-hideable"
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '10px 14px',
        background: 'var(--surface)',
        border: '1px solid var(--rule)',
        borderRadius: 14,
        boxShadow: 'var(--shadow-1)',
        maxWidth: 420,
        animation: 'float-up .5s ease both',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, var(--accent-2), var(--accent))',
          boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5)',
          flexShrink: 0,
          marginTop: 2,
        }}
      />
      <div
        style={{
          fontSize: 12.5,
          color: 'var(--ink-soft)',
          lineHeight: 1.5,
          paddingTop: 2,
        }}
      >
        <span style={{ color: 'var(--ink)', fontWeight: 500 }}>AI Guide · </span>
        {children}
      </div>
    </div>
  );
}
