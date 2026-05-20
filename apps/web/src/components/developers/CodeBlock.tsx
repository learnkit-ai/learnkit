'use client';

import { useEffect, useState } from 'react';

type Lang = 'install' | 'core' | 'react';

const SNIPPETS: Record<Lang, string> = {
  install: `# Install the packages from npm
pnpm add @learnkit-ai/core @learnkit-ai/react

# Or clone the source
git clone https://github.com/learnkit-ai/learnkit
cd learnkit && pnpm install && pnpm dev

# Apache-2.0 · no API key · no signup`,
  core: `import { generateLearningPath } from '@learnkit-ai/core';

const path = generateLearningPath({
  role: 'Software Engineer',
  tools: ['Claude', 'Cursor'],
  goal: 'ship a research agent',
  level: 'beginner',
});

// Pure function. No network. Deterministic.
console.log(path.weeks.length);              // 4
console.log(path.weeks[0].lessons[0].title); // "Your first system prompt"`,
  react: `import { LearningPath, AIGuide } from '@learnkit-ai/react';

export default function MyApp() {
  return (
    <>
      <LearningPath
        input={{
          role: 'Software Engineer',
          tools: ['Claude', 'Cursor'],
          goal: 'ship a research agent',
          level: 'beginner',
        }}
        theme="warm"
      />
      <AIGuide message="Need a hand with your first prompt?" />
    </>
  );
}`,
};

function highlight(line: string) {
  return line
    .replace(/('[^']*'|"[^"]*")/g, '<span style="color:#E8B547">$1</span>')
    .replace(
      /\b(import|from|const|export|default|function|return|new|await)\b/g,
      '<span style="color:#7BA8D9">$1</span>',
    )
    .replace(/(#[^\n]*)/g, '<span style="color:rgba(244,239,227,0.4)">$1</span>')
    .replace(/(\/\/[^\n]*)/g, '<span style="color:rgba(244,239,227,0.4)">$1</span>')
    .replace(/(&lt;\/?[A-Z][A-Za-z]*)/g, '<span style="color:#8FB293">$1</span>');
}

export function CodeBlock() {
  const [tab, setTab] = useState<Lang>('install');
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        background: 'var(--ink)',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-3)',
        border: '1px solid var(--ink-2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '0 4px',
        }}
      >
        {(['install', 'core', 'react'] as Lang[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '12px 18px',
              fontSize: 12,
              fontFamily: 'var(--mono)',
              background: 'transparent',
              border: 'none',
              color: tab === t ? 'var(--paper)' : 'rgba(244,239,227,0.45)',
              borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
              cursor: 'pointer',
              textTransform: 'lowercase',
            }}
          >
            {t}
          </button>
        ))}
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: 'rgba(244,239,227,0.5)',
              fontFamily: 'var(--mono)',
            }}
          >
            {tab === 'install' ? 'shell' : `${tab === 'core' ? '@learnkit-ai/core' : '@learnkit-ai/react'} · v0.1.0`}
          </span>
          <button
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              color: 'rgba(244,239,227,0.7)',
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontFamily: 'var(--mono)',
              cursor: 'pointer',
            }}
          >
            copy
          </button>
        </div>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '20px 22px',
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--paper)',
          lineHeight: 1.65,
          overflow: 'auto',
          minHeight: 280,
        }}
      >
        {SNIPPETS[tab].split('\n').map((line, i) => {
          const escaped = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          return (
            <div key={i} style={{ display: 'flex', gap: 14 }}>
              <span
                style={{
                  color: 'rgba(244,239,227,0.25)',
                  userSelect: 'none',
                  textAlign: 'right',
                  minWidth: 18,
                }}
              >
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: highlight(escaped) }} />
            </div>
          );
        })}
      </pre>
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: 'rgba(244,239,227,0.5)',
            fontFamily: 'var(--mono)',
          }}
        >
          Apache-2.0 · runs locally · returns{' '}
          <span style={{ color: 'var(--accent-2)' }}>LearningPath</span>
        </div>
        <span style={{ display: 'inline-flex', gap: 4 }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: i === step ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
