'use client';

import Link from 'next/link';
import { ArrowR } from '@/components/ui/Button';
import { Eyebrow, ToolIcon } from '@/components/ui/primitives';

const TRACKS = [
  { tool: 'Claude', slug: 'claude', mods: 8, hours: 14, hot: true },
  { tool: 'Cursor', slug: 'cursor', mods: 5, hours: 9, hot: true },
  { tool: 'ChatGPT', slug: 'chatgpt', mods: 6, hours: 11 },
  { tool: 'Copilot', slug: 'copilot', mods: 4, hours: 7 },
  { tool: 'Midjourney', slug: 'midjourney', mods: 4, hours: 6 },
  { tool: 'Notion AI', slug: 'notion-ai', mods: 3, hours: 5 },
  { tool: 'Perplexity', slug: 'perplexity', mods: 3, hours: 4 },
  { tool: 'Gemini', slug: 'gemini', mods: 4, hours: 7 },
];

export function Curriculum() {
  return (
    <section id="curriculum" className="lk-section-pad lk-section" style={{ padding: '88px 56px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            marginBottom: 40,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <Eyebrow>Library</Eyebrow>
            <h2
              className="serif lk-section-title-md"
              style={{
                fontSize: 40,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                margin: '12px 0 10px',
                fontWeight: 400,
              }}
            >
              Pick a tool. Or all of them.
            </h2>
            <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 580 }}>
              Tracks for the tools your team actually pays for. Updated every other week with
              each tool&apos;s latest capabilities.
            </p>
          </div>
          <Link
            href="/tools"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--ink)',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Browse all 40 tracks <ArrowR size={11} />
          </Link>
        </div>

        <div className="lk-grid-4 lk-curriculum-tracks" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {TRACKS.map((t) => (
            <Link
              key={t.tool}
              href={`/tools/${t.slug}`}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--rule)',
                borderRadius: 12,
                padding: 18,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all .2s ease',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--shadow-2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = '';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '';
              }}
            >
              {t.hot && (
                <span
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    fontSize: 9.5,
                    fontFamily: 'var(--mono)',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 500,
                  }}
                >
                  Most picked
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <ToolIcon name={t.tool} size={26} />
                <div className="serif" style={{ fontSize: 18, letterSpacing: '-0.02em', fontWeight: 500 }}>
                  {t.tool}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 12,
                  color: 'var(--muted)',
                  fontFamily: 'var(--mono)',
                }}
              >
                <span>
                  {t.mods} modules · {t.hours}h
                </span>
                <span style={{ color: 'var(--ink-soft)' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
