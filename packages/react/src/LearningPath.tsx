'use client';

import type { CSSProperties, ReactNode } from 'react';
import type { LearningPathInput, Lesson } from '@learnkit-ai/schemas';
import { LessonCard } from './LessonCard';
import type { LessonStatus } from './LessonCard';
import { useLearnKit } from './useLearnKit';

export type LearnKitTheme = 'warm' | 'midnight' | 'technical' | 'light';

export interface LearningPathProps {
  input: LearningPathInput;
  onLessonClick?: (lesson: Lesson) => void;
  renderItem?: (lesson: Lesson, status: LessonStatus) => ReactNode;
  theme?: LearnKitTheme;
  className?: string;
  style?: CSSProperties;
}

export const THEMES: Record<LearnKitTheme, CSSProperties> = {
  warm: {
    ['--lk-surface' as string]: '#FFFFFF',
    ['--lk-ink' as string]: '#1A2547',
    ['--lk-ink-soft' as string]: '#4A557A',
    ['--lk-muted' as string]: '#6B7280',
    ['--lk-accent' as string]: '#C8472A',
    ['--lk-accent-2' as string]: '#E8B547',
    ['--lk-accent-3' as string]: '#6B8F6E',
    ['--lk-rule' as string]: 'rgba(26, 37, 71, 0.10)',
    ['--lk-rule-strong' as string]: 'rgba(26, 37, 71, 0.18)',
  },
  midnight: {
    ['--lk-surface' as string]: '#161C36',
    ['--lk-ink' as string]: '#F4EFE3',
    ['--lk-ink-soft' as string]: '#B8B0A0',
    ['--lk-muted' as string]: '#8A91A8',
    ['--lk-accent' as string]: '#E8B547',
    ['--lk-accent-2' as string]: '#F4C77A',
    ['--lk-accent-3' as string]: '#8FB293',
    ['--lk-rule' as string]: 'rgba(244, 239, 227, 0.10)',
    ['--lk-rule-strong' as string]: 'rgba(244, 239, 227, 0.20)',
  },
  technical: {
    ['--lk-surface' as string]: '#151A22',
    ['--lk-ink' as string]: '#E6E6E6',
    ['--lk-ink-soft' as string]: '#B0B7C3',
    ['--lk-muted' as string]: '#7A8290',
    ['--lk-accent' as string]: '#7CFFB2',
    ['--lk-accent-2' as string]: '#A78BFA',
    ['--lk-accent-3' as string]: '#60A5FA',
    ['--lk-rule' as string]: 'rgba(230, 230, 230, 0.08)',
    ['--lk-rule-strong' as string]: 'rgba(230, 230, 230, 0.16)',
  },
  light: {
    ['--lk-surface' as string]: '#FFFFFF',
    ['--lk-ink' as string]: '#111827',
    ['--lk-ink-soft' as string]: '#374151',
    ['--lk-muted' as string]: '#9CA3AF',
    ['--lk-accent' as string]: '#6366F1',
    ['--lk-accent-2' as string]: '#EC4899',
    ['--lk-accent-3' as string]: '#10B981',
    ['--lk-rule' as string]: 'rgba(17, 24, 39, 0.08)',
    ['--lk-rule-strong' as string]: 'rgba(17, 24, 39, 0.16)',
  },
};

export function LearningPath({
  input,
  onLessonClick,
  renderItem,
  theme = 'warm',
  className,
  style,
}: LearningPathProps) {
  const { path, error } = useLearnKit(input);

  if (error) {
    return (
      <div
        className={className}
        style={{
          padding: 16,
          borderRadius: 12,
          border: '1px solid rgba(200, 71, 42, 0.4)',
          background: 'rgba(200, 71, 42, 0.06)',
          color: '#C8472A',
          fontFamily:
            'var(--lk-font-sans, system-ui, -apple-system, "Segoe UI", sans-serif)',
          fontSize: 14,
          ...style,
        }}
      >
        Invalid LearningPathInput: {error.message}
      </div>
    );
  }

  if (!path) return null;

  return (
    <div
      className={className}
      style={{
        ...THEMES[theme],
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily:
            'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--lk-muted)',
        }}
      >
        {path.weeks.length} weeks · {path.weeks.reduce((a, w) => a + w.lessons.length, 0)}{' '}
        lessons · {Math.round(path.totalMinutes / 60)}h
      </div>
      {path.weeks.map((week) => (
        <section
          key={week.index}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <h3
            style={{
              fontFamily:
                'var(--lk-font-serif, Newsreader, Georgia, serif)',
              fontSize: 20,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              margin: 0,
              color: 'var(--lk-ink)',
            }}
          >
            <span
              style={{
                fontFamily:
                  'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
                fontSize: 12,
                color: 'var(--lk-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginRight: 10,
              }}
            >
              Week {week.index}
            </span>
            {week.title}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {week.lessons.map((lesson, li) => {
              const status: LessonStatus =
                week.index === 1 && li === 0
                  ? 'in-progress'
                  : week.index === 4
                    ? 'locked'
                    : 'available';
              return renderItem ? (
                <div key={lesson.id}>{renderItem(lesson, status)}</div>
              ) : (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={status}
                  onClick={onLessonClick}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
