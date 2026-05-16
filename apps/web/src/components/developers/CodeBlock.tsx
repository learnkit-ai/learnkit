'use client';

import { useEffect, useState } from 'react';

type Lang = 'curl' | 'node' | 'python';

const SNIPPETS: Record<Lang, string> = {
  curl: `curl https://api.learnkit-ai.com/v1/paths \\
  -H "Authorization: Bearer lk_live_a2b9..." \\
  -d '{
    "user_id": "u_8Hk3p",
    "role": "software_engineer",
    "tools": ["claude", "cursor"],
    "goal": "ship a research agent"
  }'`,
  node: `import { LearnKit } from '@learnkit-ai/core';

const lk = new LearnKit(process.env.LK_API_KEY);

const path = await lk.paths.create({
  user_id: 'u_8Hk3p',
  role: 'software_engineer',
  tools: ['claude', 'cursor'],
  goal: 'ship a research agent',
});

// Embed the AI Guide in your app
<LearnKit.AIGuide pathId={path.id} />`,
  python: `from learnkit_ai import LearnKit

lk = LearnKit(api_key=os.environ["LK_API_KEY"])

path = lk.paths.create(
    user_id="u_8Hk3p",
    role="software_engineer",
    tools=["claude", "cursor"],
    goal="ship a research agent",
)

# Stream lesson events
for event in lk.lessons.stream(path.id):
    print(event.type, event.data)`,
};

function highlight(line: string) {
  return line
    .replace(/("[^"]*")/g, '<span style="color:#E8B547">$1</span>')
    .replace(
      /\b(curl|import|from|const|await|new|for|in)\b/g,
      '<span style="color:#7BA8D9">$1</span>',
    )
    .replace(/(--\w+|-H)/g, '<span style="color:#8FB293">$1</span>')
    .replace(/(#[^\n]*)/g, '<span style="color:rgba(244,239,227,0.4)">$1</span>')
    .replace(/(\$\{[^}]+\})/g, '<span style="color:#C8472A">$1</span>');
}

export function CodeBlock() {
  const [tab, setTab] = useState<Lang>('curl');
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
        {(['curl', 'node', 'python'] as Lang[]).map((t) => (
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
            POST /v1/paths
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
        {SNIPPETS[tab].split('\n').map((line, i) => (
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
            <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
          </div>
        ))}
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
          200 OK · {Math.round(120 + step * 4)}ms · returns{' '}
          <span style={{ color: 'var(--accent-2)' }}>Path</span>
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
