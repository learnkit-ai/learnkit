import { ImageResponse } from 'next/og';
import { ROLES } from '@/lib/seo-data';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#F7F4EF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top: brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'system-ui, sans-serif',
            fontSize: 16,
            fontWeight: 600,
            color: '#6B7280',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          LearnKit AI
        </div>

        {/* Middle: role name + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 14,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500,
              color: '#C8472A',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            30-day AI learning path
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 400,
              color: '#1A2547',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            AI training for
            <br />
            <span style={{ fontStyle: 'italic', color: '#C8472A' }}>{role.name}s</span>.
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: 'system-ui, sans-serif',
              color: '#4A557A',
              lineHeight: 1.4,
              maxWidth: 800,
              marginTop: 8,
            }}
          >
            {role.blurb}
          </div>
        </div>

        {/* Bottom: stats + tools */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 32,
              fontFamily: 'system-ui, sans-serif',
              fontSize: 15,
              color: '#6B7280',
              letterSpacing: '0.04em',
            }}
          >
            <span>4 weeks</span>
            <span>12 lessons</span>
            <span>Apache-2.0</span>
          </div>
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 15,
              color: '#9CA3AF',
            }}
          >
            learnkit-ai.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
