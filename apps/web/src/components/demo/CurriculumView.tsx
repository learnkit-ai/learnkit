'use client';

import { generateLearningPath } from '@learnkit-ai/core';
import { Button } from '@/components/ui/Button';
import { ToolIcon } from '@/components/ui/primitives';

const WEEK_ACCENTS = [
  'var(--accent)',
  'var(--accent-3)',
  'var(--accent-4)',
  'var(--accent-2)',
];

export function CurriculumView({
  tools,
  goal,
  role,
  level = 'beginner',
  companyContext,
  onLessonClick,
}: {
  tools: string[];
  goal?: string;
  role?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  companyContext?: string;
  onLessonClick: () => void;
}) {
  const path = generateLearningPath({
    role: role ?? 'Product Manager',
    tools: tools.length > 0 ? tools : ['Claude'],
    goal: goal ?? 'Ship something useful this Friday',
    level,
    ...(companyContext ? { companyContext } : {}),
  });

  const totalHours = Math.round(path.totalMinutes / 60);
  const SUMMARY = [
    { k: String(path.weeks.reduce((a, w) => a + w.lessons.length, 0)), v: 'core lessons' },
    { k: String(path.weeks.reduce((a, w) => a + w.lessons.filter((l) => l.kind === 'project').length, 0)), v: 'shipped projects' },
    { k: `~${totalHours}h`, v: 'total time' },
    { k: '30', v: 'days' },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Summary bar */}
      <div
        className="lk-curriculum-summary"
        style={{
          background: 'var(--surface)',
          borderRadius: 14,
          padding: 18,
          border: '1px solid var(--rule)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div className="lk-curriculum-stats" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {SUMMARY.map((s) => (
            <div key={s.v}>
              <div
                className="serif"
                style={{
                  fontSize: 28,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontWeight: 500,
                }}
              >
                {s.k}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  fontFamily: 'var(--mono)',
                  marginTop: 2,
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="sm">
            Swap a lesson
          </Button>
          <Button variant="ghost" size="sm">
            Export to calendar
          </Button>
        </div>
      </div>

      {path.weeks.map((w, wi) => (
        <div
          key={w.index}
          style={{
            background: 'var(--surface)',
            borderRadius: 14,
            border: '1px solid var(--rule)',
            overflow: 'hidden',
            animation: 'float-up .5s ease both',
            animationDelay: `${wi * 0.08}s`,
          }}
        >
          <div
            style={{
              padding: '14px 22px',
              borderBottom: '1px solid var(--rule)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: 'var(--surface-2)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 28,
                background: WEEK_ACCENTS[wi] ?? 'var(--accent)',
                borderRadius: 3,
              }}
            />
            <div
              className="serif"
              style={{ fontSize: 20, letterSpacing: '-0.02em', fontWeight: 500 }}
            >
              <span
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginRight: 12,
                }}
              >
                Week {w.index}
              </span>
              {w.title}
            </div>
          </div>
          <div>
            {w.lessons.map((l, li) => {
              const isPreview = wi === 0 && li === 0;
              return (
                <div
                  key={l.id}
                  onClick={isPreview ? onLessonClick : undefined}
                  style={{
                    padding: '14px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    borderBottom:
                      li < w.lessons.length - 1 ? '1px solid var(--rule)' : 'none',
                    cursor: isPreview ? 'pointer' : 'default',
                    transition: 'background .15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (isPreview)
                      (e.currentTarget as HTMLDivElement).style.background = 'var(--paper-2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = '';
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: 'var(--muted)',
                      width: 60,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Day {l.day}
                  </span>
                  <div style={{ flex: 1, fontSize: 15, color: 'var(--ink)' }}>
                    {l.title}
                    {isPreview && (
                      <span
                        style={{
                          marginLeft: 10,
                          fontSize: 11,
                          color: 'var(--accent)',
                          fontFamily: 'var(--mono)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        ← preview
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      fontFamily: 'var(--mono)',
                    }}
                  >
                    {l.minutes}m
                  </span>
                  <ToolIcon name={l.tool} size={20} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
