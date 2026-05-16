'use client';

import { Button } from '@/components/ui/Button';
import { ToolIcon } from '@/components/ui/primitives';

interface Lesson {
  d: string;
  t: string;
  mins: number;
  tool: string;
}

interface Week {
  week: string;
  title: string;
  accent: string;
  lessons: Lesson[];
}

const SUMMARY = [
  { k: '12', v: 'core lessons' },
  { k: '4', v: 'shipped projects' },
  { k: '~9h', v: 'total time' },
  { k: '30', v: 'days' },
];

export function CurriculumView({
  tools,
  onLessonClick,
}: {
  tools: string[];
  onLessonClick: () => void;
}) {
  const primary = tools[0] ?? 'Claude';
  const secondary = tools[1] ?? primary;

  const path: Week[] = [
    {
      week: 'Week 1',
      title: 'Fundamentals',
      accent: 'var(--accent)',
      lessons: [
        { d: 'Day 1', t: 'Your first system prompt', mins: 12, tool: primary },
        { d: 'Day 2', t: 'When AI lies (and how to catch it)', mins: 14, tool: primary },
        { d: 'Day 3', t: 'Project: rewrite your daily standup', mins: 22, tool: primary },
      ],
    },
    {
      week: 'Week 2',
      title: 'Workflows',
      accent: 'var(--accent-3)',
      lessons: [
        { d: 'Day 8', t: 'Chaining prompts into pipelines', mins: 18, tool: secondary },
        { d: 'Day 10', t: 'Tools, functions, and structured output', mins: 24, tool: secondary },
        { d: 'Day 12', t: 'Project: a research agent for your team', mins: 45, tool: secondary },
      ],
    },
    {
      week: 'Week 3',
      title: 'Production',
      accent: 'var(--accent-4)',
      lessons: [
        { d: 'Day 15', t: 'Evals: how to know it actually works', mins: 20, tool: primary },
        { d: 'Day 17', t: 'Fixing hallucinations the boring way', mins: 16, tool: primary },
        { d: 'Day 20', t: 'Project: ship to your team Friday', mins: 60, tool: primary },
      ],
    },
    {
      week: 'Week 4',
      title: 'Practicum',
      accent: 'var(--accent-2)',
      lessons: [
        { d: 'Day 24', t: 'Prompt review with the AI Guide', mins: 30, tool: 'Guide' },
        { d: 'Day 27', t: 'Office hours: bring your work', mins: 60, tool: 'Live' },
        { d: 'Day 30', t: 'Earn the LearnKit Practitioner mark', mins: 90, tool: 'Cert' },
      ],
    },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Summary bar */}
      <div
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
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
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

      {path.map((w, wi) => (
        <div
          key={wi}
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
            <span style={{ width: 6, height: 28, background: w.accent, borderRadius: 3 }} />
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
                {w.week}
              </span>
              {w.title}
            </div>
          </div>
          <div>
            {w.lessons.map((l, li) => {
              const isPreview = wi === 0 && li === 0;
              return (
                <div
                  key={li}
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
                    {l.d}
                  </span>
                  <div style={{ flex: 1, fontSize: 15, color: 'var(--ink)' }}>
                    {l.t}
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
                    {l.mins}m
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
