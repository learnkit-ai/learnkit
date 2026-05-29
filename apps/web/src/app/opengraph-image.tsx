import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'LearnKit AI - Open-source AI learning paths for every role';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#FAF7F0',
          color: '#1A2547',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#1A2547" strokeWidth="1.4" />
            <path d="M16 8 L23 16 L16 24 L9 16 Z" fill="#C8472A" />
            <circle cx="16" cy="16" r="2" fill="#1A2547" />
          </svg>
          <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Learn<span style={{ fontStyle: 'italic', color: '#C8472A' }}>K</span>it AI
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              fontWeight: 400,
            }}
          >
            Personalized AI paths
            <br />
            for <span style={{ fontStyle: 'italic', color: '#C8472A' }}>every role</span>.
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#4A557A',
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Open-source TypeScript engine for embedding role-aware AI learning paths in any product.
            No API key. No backend. No paid tier.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            color: '#6B7280',
          }}
        >
          <div>learnkit-ai.com</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span>Apache-2.0</span>
            <span>·</span>
            <span>@learnkit-ai/core</span>
            <span>·</span>
            <span>@learnkit-ai/react</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
