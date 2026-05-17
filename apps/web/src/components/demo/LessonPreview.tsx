'use client';

import { useState } from 'react';
import { Button, ArrowR } from '@/components/ui/Button';
import { Ole } from '@/components/ui/primitives';
import { FlowFooter } from './StepShell';

const OUTLINE = [
  'What a system prompt does',
  'Anatomy of a great prompt',
  'Try one: rewriting your standup',
  'Common mistakes',
  'Practice & ship',
];

export function LessonPreview({
  role,
  tools,
  onBack,
}: {
  role: string;
  tools: string[];
  onBack: () => void;
}) {
  const [section, setSection] = useState(1);
  const primaryTool = tools[0] ?? 'Claude';
  const roleShort = (role || 'Product Manager').split(' ').slice(-1)[0].toLowerCase();

  const exampleForTool = () => {
    if (primaryTool === 'Cursor') return '"You are a senior engineer. Refactor this file."';
    if (primaryTool === 'Claude') return `"You are a senior ${roleShort}. Review this spec."`;
    if (primaryTool === 'ChatGPT') return '"You are a research assistant. Summarize this report."';
    return `"You are a ${roleShort}'s assistant. Help with this task."`;
  };

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
        {/* Outline */}
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
            Outline
          </div>
          {OUTLINE.map((t, i) => (
            <div
              key={i}
              onClick={() => setSection(i)}
              style={{
                display: 'flex',
                gap: 10,
                padding: '8px 8px',
                borderRadius: 6,
                marginBottom: 2,
                background: section === i ? 'var(--paper-3)' : 'transparent',
                cursor: 'pointer',
                fontSize: 12.5,
                fontWeight: section === i ? 500 : 400,
                color: 'var(--ink)',
              }}
            >
              <span
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  width: 16,
                }}
              >
                {i + 1}
              </span>
              {t}
            </div>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--rule)',
            borderRadius: 14,
            padding: '32px 36px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--mono)',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 8,
            }}
          >
            Section 02 · Anatomy
          </div>
          <h2
            className="serif"
            style={{
              fontSize: 32,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
              fontWeight: 500,
            }}
          >
            A great system prompt has{' '}
            <span style={{ fontStyle: 'italic' }}>three</span> things.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--ink-soft)',
              lineHeight: 1.65,
              margin: '0 0 20px',
            }}
          >
            Most people open ChatGPT and start asking. The pros write a{' '}
            <strong style={{ color: 'var(--ink)' }}>persona</strong>, define a{' '}
            <strong style={{ color: 'var(--ink)' }}>process</strong>, and set{' '}
            <strong style={{ color: 'var(--ink)' }}>boundaries</strong>. That&apos;s it. Three
            knobs.
          </p>
          <div
            style={{
              background: 'var(--paper-2)',
              borderRadius: 12,
              padding: 16,
              fontFamily: 'var(--mono)',
              fontSize: 12.5,
              color: 'var(--ink)',
              lineHeight: 1.7,
              border: '1px solid var(--rule)',
            }}
          >
            <div style={{ color: 'var(--muted)' }}># persona</div>
            <div>
              You are a <span style={{ color: 'var(--accent)' }}>skeptical senior PM</span>
            </div>
            <div style={{ marginTop: 8, color: 'var(--muted)' }}># process</div>
            <div>For each user input, you:</div>
            <div style={{ paddingLeft: 16 }}>1. Ask one clarifying question</div>
            <div style={{ paddingLeft: 16 }}>2. List 3 alternatives</div>
            <div style={{ paddingLeft: 16 }}>3. Pick one with rationale</div>
            <div style={{ marginTop: 8, color: 'var(--muted)' }}># boundaries</div>
            <div>Never invent metrics. If unsure, say so.</div>
          </div>
          <p
            style={{
              fontSize: 14,
              color: 'var(--ink-soft)',
              lineHeight: 1.65,
              margin: '20px 0 0',
            }}
          >
            Try it now in the workbench on the right →
          </p>
        </div>

        {/* AI Guide chat */}
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
              I noticed you picked{' '}
              <strong style={{ color: 'var(--ink)' }}>{primaryTool}</strong> as your main tool —
              I swapped the example to fit. Spot the missing knob:
            </div>
            <div
              style={{
                background: 'var(--paper-2)',
                padding: '10px 12px',
                borderRadius: 10,
                fontFamily: 'var(--mono)',
                fontSize: 11.5,
                lineHeight: 1.5,
              }}
            >
              {exampleForTool()}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                marginTop: 4,
              }}
            >
              {['Persona', 'Process', 'Boundaries'].map((o, i) => (
                <button
                  key={o}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    fontSize: 13,
                    border: '1px solid var(--rule)',
                    background: i === 1 ? 'var(--paper-2)' : 'var(--surface)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--ink)',
                    fontFamily: 'var(--sans)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: 'var(--muted)',
                      marginRight: 8,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {o}
                </button>
              ))}
            </div>
          </div>
          <Button variant="accent" size="md" style={{ justifyContent: 'center' }}>
            Continue to section 03 <ArrowR size={12} />
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
