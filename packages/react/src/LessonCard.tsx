'use client';

import type { CSSProperties } from 'react';
import type { Lesson } from '@learnkit-ai/schemas';

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface LessonCardProps {
  lesson: Lesson;
  status?: LessonStatus;
  onClick?: (lesson: Lesson) => void;
  className?: string;
  style?: CSSProperties;
}

const STATUS_STYLES: Record<LessonStatus, { dot: string; label: string; opacity: number }> = {
  locked: { dot: 'var(--lk-rule, rgba(0,0,0,0.15))', label: 'Locked', opacity: 0.5 },
  available: { dot: 'var(--lk-rule-strong, rgba(0,0,0,0.3))', label: 'Up next', opacity: 1 },
  'in-progress': {
    dot: 'var(--lk-accent, #C8472A)',
    label: 'In progress',
    opacity: 1,
  },
  completed: { dot: 'var(--lk-accent-3, #6B8F6E)', label: 'Done', opacity: 1 },
};

export function LessonCard({
  lesson,
  status = 'available',
  onClick,
  className,
  style,
}: LessonCardProps) {
  const s = STATUS_STYLES[status];
  const clickable = !!onClick && status !== 'locked';

  return (
    <button
      type="button"
      onClick={clickable ? () => onClick!(lesson) : undefined}
      disabled={status === 'locked'}
      className={className}
      style={{
        all: 'unset',
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        cursor: clickable ? 'pointer' : 'default',
        opacity: s.opacity,
        padding: '14px 18px',
        borderRadius: 12,
        border: '1px solid var(--lk-rule, rgba(0,0,0,0.1))',
        background: 'var(--lk-surface, #ffffff)',
        color: 'var(--lk-ink, #1A2547)',
        textAlign: 'left',
        fontFamily:
          'var(--lk-font-sans, system-ui, -apple-system, "Segoe UI", sans-serif)',
        transition: 'transform .15s ease, box-shadow .15s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!clickable) return;
        const el = e.currentTarget;
        el.style.transform = 'translateY(-1px)';
        el.style.boxShadow = '0 4px 12px rgba(26, 37, 71, 0.08)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = '';
        el.style.boxShadow = '';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 11,
          fontFamily:
            'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
          color: 'var(--lk-muted, #6B7280)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: s.dot,
            flexShrink: 0,
          }}
        />
        <span>Day {lesson.day}</span>
        <span>·</span>
        <span>{lesson.kind}</span>
        <span style={{ marginLeft: 'auto' }}>{lesson.minutes}m</span>
      </div>
      <div
        style={{
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.25,
          letterSpacing: '-0.015em',
          marginBottom: 6,
        }}
      >
        {lesson.title}
      </div>
      <div
        style={{
          fontSize: 13.5,
          lineHeight: 1.5,
          color: 'var(--lk-ink-soft, #4A557A)',
        }}
      >
        {lesson.summary}
      </div>
    </button>
  );
}
