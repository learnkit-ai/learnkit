'use client';

import { useEffect, useState } from 'react';
import { Button, ArrowR } from '@/components/ui/Button';
import { AmbientArc, Ole, ToolIcon } from '@/components/ui/primitives';

const TARGET =
  'You are a senior research analyst. For each PDF: extract 3 claims, cross-reference with web_search, and draft a 200-word memo with citations.';

function HeroLiveWorkbench() {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (phase === 0) {
      let i = 0;
      const id = setInterval(() => {
        if (i <= TARGET.length) {
          setTyped(TARGET.slice(0, i));
          i += 2;
        } else {
          clearInterval(id);
          setTimeout(() => setPhase(1), 600);
        }
      }, 30);
      return () => clearInterval(id);
    }
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 1600);
      return () => clearTimeout(t);
    }
    if (phase === 2) {
      const t = setTimeout(() => { setPhase(0); setTyped(''); }, 4000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div
      className="lk-hero-workbench"
      style={{
        background: 'var(--surface)',
        borderRadius: 18,
        border: '1px solid var(--rule)',
        boxShadow: 'var(--shadow-3)',
        padding: 18,
        position: 'relative',
        minHeight: 520,
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 6px 12px',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF6058' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FFBD2E' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28CA42' }} />
        <span
          style={{ marginLeft: 12, fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}
        >
          workbench / lesson 12 · prompt.md
        </span>
        <span
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: phase === 1 ? 'var(--accent-2)' : 'var(--accent-3)',
              animation: phase === 1 ? 'pulse-soft 1s infinite' : 'none',
            }}
          />
          {phase === 0 ? 'editing' : phase === 1 ? 'running' : 'reviewed'}
        </span>
      </div>

      {/* Prompt editor */}
      <div
        style={{
          background: 'var(--ink)',
          borderRadius: 10,
          padding: 14,
          marginTop: 12,
          minHeight: 140,
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily: 'var(--mono)',
            fontSize: 12.5,
            color: 'var(--paper)',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
          }}
        >
          {typed}
          {phase === 0 && (
            <span
              style={{
                borderRight: '2px solid var(--accent)',
                marginLeft: 1,
                animation: 'typewriter-cursor 1s infinite',
              }}
            >
              &nbsp;
            </span>
          )}
        </pre>
      </div>

      {/* Run output */}
      {phase >= 1 && (
        <div
          style={{
            marginTop: 12,
            padding: 14,
            background: 'var(--paper-2)',
            borderRadius: 10,
            border: '1px solid var(--rule)',
            animation: 'float-up .3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <ToolIcon name="Claude" size={18} />
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
              claude · {phase === 1 ? 'streaming…' : 'response · 2.1s · 312 tokens'}
            </span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.55 }}>
            {phase === 1 ? (
              <span className="shimmer">Reading PDF · cross-referencing sources · drafting memo</span>
            ) : (
              <span>
                <strong>3 claims found.</strong> Memo drafted with 4 citations.
                <br />
                <span style={{ color: 'var(--muted)' }}>memo.md saved → portfolio</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* AI Guide feedback */}
      {phase === 2 && (
        <div
          style={{
            marginTop: 12,
            padding: 14,
            background: 'var(--surface)',
            borderRadius: 10,
            border: '1px solid var(--accent)',
            borderLeft: '3px solid var(--accent)',
            boxShadow: 'var(--shadow-1)',
            animation: 'float-up .35s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Ole size={24} animated />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--accent)',
                  fontFamily: 'var(--mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 4,
                }}
              >
                AI Guide · review
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                Solid prompt - but no refusal clause. When the PDF lacks a claim, your agent will
                invent one. Add:{' '}
                <code
                  style={{
                    background: 'var(--paper-2)',
                    padding: '1px 6px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontFamily: 'var(--mono)',
                  }}
                >
                  &quot;If unsupported, say so.&quot;
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="lk-hero-pad"
      style={{ padding: '72px 56px 40px', position: 'relative', overflow: 'hidden' }}
    >
      <AmbientArc style={{ top: -120, right: -120 }} size={460} color="var(--accent-2)" />

      <div
        className="lk-hero-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ width: 18, height: 1, background: 'currentColor', opacity: 0.6 }} />
            The AI workbench for teams that ship
          </div>

          <h1
            className="serif lk-hero-title"
            style={{
              fontSize: 76,
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              margin: '20px 0 22px',
              color: 'var(--ink)',
              fontWeight: 400,
            }}
          >
            Make your team
            <br />
            good at AI by{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Friday</span>.
          </h1>

          <p
            style={{
              fontSize: 18.5,
              lineHeight: 1.5,
              color: 'var(--ink-soft)',
              maxWidth: 540,
              margin: '0 0 28px',
              letterSpacing: '-0.005em',
            }}
          >
            LearnKit AI turns Claude, Cursor, ChatGPT and 40 other tools into a curriculum
            your people learn by <em>building real things</em> at work - reviewed by the AI
            Guide.
          </p>

          {/* Audience tri-CTA */}
          <div
            className="lk-hero-tri"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
              marginBottom: 18,
              maxWidth: 560,
            }}
          >
            {[
              { tag: 'For me', cta: 'Run the demo', sub: '90 seconds · no signup', accent: 'var(--ink)', primary: true, href: '/demo' },
              { tag: 'For my team', cta: 'Self-host it', sub: 'Apache-2.0 · deploys anywhere', accent: 'var(--accent-3)', href: 'https://github.com/learnkit-ai/learnkit' },
              { tag: 'For developers', cta: 'Read the docs', sub: 'TypeScript · open SDKs', accent: 'var(--accent-4)', href: '/developers' },
            ].map((p) => (
              <a
                key={p.tag}
                href={p.href}
                style={{
                  display: 'block',
                  padding: '14px 14px',
                  background: p.primary ? 'var(--ink)' : 'var(--surface)',
                  color: p.primary ? 'var(--paper)' : 'var(--ink)',
                  border: `1px solid ${p.primary ? 'var(--ink)' : 'var(--rule)'}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  borderTop: `3px solid ${p.accent}`,
                  transition: 'all .15s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                    marginBottom: 6,
                  }}
                >
                  {p.tag}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{p.cta}</span>
                  <ArrowR size={11} />
                </div>
                <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4, fontFamily: 'var(--mono)' }}>
                  {p.sub}
                </div>
              </a>
            ))}
          </div>

          {/* Trust ribbon */}
          <div
            className="lk-trust-ribbon"
            style={{
              marginTop: 22,
              display: 'flex',
              gap: 22,
              alignItems: 'center',
              flexWrap: 'wrap',
              fontSize: 12.5,
              color: 'var(--muted)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-flex' }}>
                {['#C8472A', '#E8B547', '#6B8F6E', '#2C5F8D', '#1A2547'].map((bg, i) => (
                  <span
                    key={i}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: bg,
                      border: '2px solid var(--paper)',
                      marginLeft: i ? -6 : 0,
                    }}
                  />
                ))}
              </span>
              <span>
                <strong style={{ color: 'var(--ink)' }}>Open-source</strong> · Apache-2.0
              </span>
            </span>
            <span style={{ width: 1, height: 14, background: 'var(--rule-strong)' }} />
            <span>TypeScript · Zod · Next.js 15</span>
            <span style={{ width: 1, height: 14, background: 'var(--rule-strong)' }} />
            <span>Node ≥ 20 · pnpm workspaces</span>
          </div>
        </div>

        <HeroLiveWorkbench />
      </div>
    </section>
  );
}
