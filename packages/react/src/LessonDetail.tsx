'use client';

import type { CSSProperties } from 'react';
import { generateLessonContent } from '@learnkit-ai/core';
import type { Lesson } from '@learnkit-ai/schemas';
import type { LearnKitTheme } from './LearningPath';
import { THEMES } from './LearningPath';

export interface LessonDetailProps {
  lesson: Lesson;
  theme?: LearnKitTheme;
  className?: string;
  style?: CSSProperties;
}

const KIND_COLORS: Record<string, string> = {
  lesson: 'var(--lk-accent-2, #E8B547)',
  project: 'var(--lk-accent, #C8472A)',
  practicum: 'var(--lk-accent-3, #6B8F6E)',
};

export function LessonDetail({ lesson, theme = 'warm', className, style }: LessonDetailProps) {
  const content = generateLessonContent(lesson);
  const kindColor = KIND_COLORS[lesson.kind] ?? 'var(--lk-muted)';

  return (
    <div
      className={className}
      style={{
        ...THEMES[theme],
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        fontFamily: 'var(--lk-font-sans, system-ui, -apple-system, "Segoe UI", sans-serif)',
        color: 'var(--lk-ink)',
        ...style,
      }}
    >
      {/* Meta row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
          fontFamily:
            'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--lk-muted)',
        }}
      >
        <span
          style={{
            background: kindColor,
            color: '#fff',
            borderRadius: 4,
            padding: '2px 8px',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {lesson.kind}
        </span>
        <span>{lesson.tool}</span>
        <span>·</span>
        <span>Day {lesson.day}</span>
        <span>·</span>
        <span>{lesson.minutes}m</span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily:
            'var(--lk-font-serif, Newsreader, Georgia, serif)',
          fontSize: 28,
          fontWeight: 500,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          margin: 0,
          color: 'var(--lk-ink)',
        }}
      >
        {lesson.title}
      </h2>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {content.body.split('\n\n').map((para, i) => (
          <p
            key={i}
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.65,
              color: 'var(--lk-ink-soft)',
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Exercises */}
      <section>
        <h3
          style={{
            fontFamily:
              'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--lk-muted)',
            margin: '0 0 14px',
            fontWeight: 500,
          }}
        >
          Exercises
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {content.exercises.map((ex, i) => (
            <div
              key={i}
              style={{
                background: 'var(--lk-surface)',
                border: '1px solid var(--lk-rule)',
                borderRadius: 12,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div
                style={{
                  fontFamily:
                    'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--lk-muted)',
                }}
              >
                Exercise {i + 1}
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--lk-ink)', fontWeight: 500 }}>
                {ex.prompt}
              </p>
              <div
                style={{
                  background: 'var(--lk-surface)',
                  borderLeft: `3px solid var(--lk-rule-strong)`,
                  paddingLeft: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--lk-ink-soft)' }}>
                  <strong style={{ color: 'var(--lk-ink)', fontWeight: 500 }}>Expected output: </strong>
                  {ex.expectedOutput}
                </p>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: 'var(--lk-muted)' }}>
                  <strong style={{ fontWeight: 500 }}>Reviewer note: </strong>
                  {ex.rubricHint}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rubric */}
      <section>
        <h3
          style={{
            fontFamily:
              'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--lk-muted)',
            margin: '0 0 14px',
            fontWeight: 500,
          }}
        >
          Rubric
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {content.rubric.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'var(--lk-surface)',
                border: '1px solid var(--lk-rule)',
                borderRadius: 12,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--lk-ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.criterion}
              </div>
              {(
                [
                  { label: 'Excellent', text: item.excellent, color: 'var(--lk-accent-3, #6B8F6E)' },
                  { label: 'Acceptable', text: item.acceptable, color: 'var(--lk-accent-2, #E8B547)' },
                  { label: 'Needs work', text: item.needsWork, color: 'var(--lk-accent, #C8472A)' },
                ] as const
              ).map(({ label, text, color }) => (
                <div key={label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      fontFamily:
                        'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color,
                      flexShrink: 0,
                      marginTop: 2,
                      minWidth: 80,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--lk-ink-soft)' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
