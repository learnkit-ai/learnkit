'use client';

import { generateLearningPath, generateLessonContent } from '@learnkit-ai/core';
import { Button, ArrowR } from '@/components/ui/Button';
import { Ole } from '@/components/ui/primitives';
import { FlowFooter } from './StepShell';

export function LessonPreview({
  role,
  tools,
  goal,
  level,
  onBack,
}: {
  role: string;
  tools: string[];
  goal?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  onBack: () => void;
}) {
  const path = generateLearningPath({
    role: role || 'Product Manager',
    tools: tools.length > 0 ? tools : ['Claude'],
    goal: goal || 'Ship an AI feature this sprint',
    level: level ?? 'beginner',
  });

  const firstLesson = path.weeks[0]!.lessons[0]!;
  const content = generateLessonContent(firstLesson);
  const [firstPara, secondPara] = content.body.split('\n\n');
  const firstExercise = content.exercises[0]!;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1100,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div
        className="lk-lesson-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr 320px',
          gap: 16,
          minHeight: 540,
        }}
      >
        {/* Outline: week 1 lessons */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--rule)',
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--mono)',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}
          >
            Week 1 — {path.weeks[0]!.title}
          </div>
          {path.weeks[0]!.lessons.map((l, i) => (
            <div
              key={l.id}
              style={{
                display: 'flex',
                gap: 10,
                padding: '8px 8px',
                borderRadius: 6,
                marginBottom: 2,
                background: i === 0 ? 'var(--paper-3)' : 'transparent',
                cursor: 'pointer',
                fontSize: 12.5,
                fontWeight: i === 0 ? 500 : 400,
                color: 'var(--ink)',
              }}
            >
              <span
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  width: 16,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              {l.title}
            </div>
          ))}
        </div>

        {/* Content: real lesson body */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--rule)',
            borderRadius: 14,
            padding: '32px 36px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--mono)',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Day {firstLesson.day} · {firstLesson.kind} · {firstLesson.minutes}m
          </div>
          <h2
            className="serif"
            style={{
              fontSize: 26,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: 0,
              fontWeight: 500,
            }}
          >
            {firstLesson.title}
          </h2>
          <p
            style={{
              fontSize: 14.5,
              color: 'var(--ink-soft)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {firstPara}
          </p>
          {secondPara && (
            <p
              style={{
                fontSize: 14.5,
                color: 'var(--ink-soft)',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {secondPara}
            </p>
          )}
          <div
            style={{
              background: 'var(--paper-2)',
              borderRadius: 10,
              padding: '14px 16px',
              border: '1px solid var(--rule)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: 'var(--mono)',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 8,
              }}
            >
              Exercise 1
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: 'var(--ink)',
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 500,
              }}
            >
              {firstExercise.prompt}
            </p>
          </div>
        </div>

        {/* AI Guide */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--rule)',
              borderRadius: 14,
              padding: 16,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Ole size={20} />
              <div style={{ fontSize: 13, fontWeight: 500 }}>AI Guide</div>
            </div>
            <div
              style={{
                background: 'var(--paper-2)',
                padding: '10px 12px',
                borderRadius: 10,
                fontSize: 12.5,
                lineHeight: 1.5,
              }}
            >
              This is your first lesson as a{' '}
              <strong style={{ color: 'var(--ink)' }}>{role}</strong>. Your primary tool is{' '}
              <strong style={{ color: 'var(--ink)' }}>{firstLesson.tool}</strong>. The exercise
              below is a real task — not a tutorial. Do it before reading ahead.
            </div>
            <div
              style={{
                background: 'var(--paper-2)',
                padding: '10px 12px',
                borderRadius: 10,
                fontSize: 12.5,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
              }}
            >
              <strong style={{ color: 'var(--ink)' }}>Reviewer note:</strong>{' '}
              {firstExercise.rubricHint}
            </div>
          </div>
          <Button variant="accent" size="md" style={{ justifyContent: 'center' }}>
            Continue to exercise 2 <ArrowR size={12} />
          </Button>
        </div>
      </div>
      <FlowFooter
        onBack={onBack}
        nextLabel="Install the npm package"
        canNext
        onNext={() => {
          if (typeof window !== 'undefined') {
            window.open('https://github.com/learnkit-ai/learnkit', '_blank', 'noopener');
          }
        }}
      />
    </div>
  );
}
