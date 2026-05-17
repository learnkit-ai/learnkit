'use client';

import { useState } from 'react';
import type { LearnKitTheme } from '@learnkit-ai/react';
import { AIGuide, LearningPath } from '@learnkit-ai/react';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow } from '@/components/ui/primitives';

const THEMES: LearnKitTheme[] = ['warm', 'midnight', 'technical'];

export default function ExamplePage() {
  const [theme, setTheme] = useState<LearnKitTheme>('warm');

  return (
    <main
      className="paper-grain"
      style={{ background: 'var(--paper)', minHeight: '100vh', overflow: 'hidden' }}
    >
      <Nav />

      <section
        className="lk-section-pad lk-section"
        style={{ padding: '72px 56px 32px' }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Eyebrow>Live example</Eyebrow>
          <h1
            className="serif lk-hero-title"
            style={{
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '18px 0 18px',
              fontWeight: 400,
            }}
          >
            <code
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 38,
                fontWeight: 500,
                background: 'var(--paper-2)',
                padding: '2px 12px',
                borderRadius: 8,
              }}
            >
              &lt;LearningPath /&gt;
            </code>
            , rendered <span style={{ fontStyle: 'italic' }}>live</span>.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--ink-soft)',
              lineHeight: 1.55,
              maxWidth: 720,
              marginBottom: 24,
            }}
          >
            This page is rendered by the same{' '}
            <code
              style={{
                fontFamily: 'var(--mono)',
                background: 'var(--paper-2)',
                padding: '1px 6px',
                borderRadius: 4,
                fontSize: 14,
              }}
            >
              @learnkit-ai/react
            </code>{' '}
            component you can install from npm. No backend, no LLM call — the path is generated
            deterministically by{' '}
            <code
              style={{
                fontFamily: 'var(--mono)',
                background: 'var(--paper-2)',
                padding: '1px 6px',
                borderRadius: 4,
                fontSize: 14,
              }}
            >
              @learnkit-ai/core
            </code>
            .
          </p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  padding: '8px 16px',
                  fontSize: 13,
                  fontFamily: 'var(--mono)',
                  background: theme === t ? 'var(--ink)' : 'var(--surface)',
                  color: theme === t ? 'var(--paper)' : 'var(--ink)',
                  border: `1px solid ${theme === t ? 'var(--ink)' : 'var(--rule)'}`,
                  borderRadius: 999,
                  cursor: 'pointer',
                  textTransform: 'lowercase',
                  letterSpacing: '0.05em',
                }}
              >
                theme: {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="lk-section-pad lk-section" style={{ padding: '0 56px 64px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }} className="lk-split">
          <aside>
            <AIGuide
              message="Change the theme above to see the same component re-render with different CSS custom properties — no rebuild required."
              style={{ marginBottom: 16, display: 'flex' }}
            />
            <pre
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: 18,
                borderRadius: 12,
                fontFamily: 'var(--mono)',
                fontSize: 12.5,
                lineHeight: 1.7,
                overflow: 'auto',
                margin: 0,
              }}
            >
{`import { LearningPath } from
  '@learnkit-ai/react';

<LearningPath
  input={{
    role: 'Product Manager',
    tools: ['Claude', 'Cursor'],
    goal: 'Ship a research agent',
    level: 'beginner',
  }}
  theme="${theme}"
/>`}
            </pre>
          </aside>

          <div
            style={{
              background:
                theme === 'warm'
                  ? '#FAF7F0'
                  : theme === 'midnight'
                    ? '#0F1428'
                    : '#0E1116',
              borderRadius: 16,
              padding: 28,
              border: '1px solid var(--rule)',
            }}
          >
            <LearningPath
              input={{
                role: 'Product Manager',
                tools: ['Claude', 'Cursor'],
                goal: 'Ship an internal research agent',
                level: 'beginner',
              }}
              theme={theme}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
