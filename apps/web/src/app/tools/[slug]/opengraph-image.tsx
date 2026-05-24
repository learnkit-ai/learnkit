import { ImageResponse } from 'next/og';
import { TOOLS } from '@/lib/seo-data';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#1A2547',
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
            color: 'rgba(244,239,227,0.5)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          LearnKit AI
        </div>

        {/* Middle: tool name + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                background: tool.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: '#fff',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 700,
              }}
            >
              {tool.name[0]}
            </div>
            <div
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 15,
                fontWeight: 600,
                color: 'rgba(244,239,227,0.5)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {tool.vendor}
            </div>
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 400,
              color: '#F4EFE3',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            {tool.tagline}.
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: 'system-ui, sans-serif',
              color: 'rgba(244,239,227,0.65)',
              lineHeight: 1.4,
              maxWidth: 800,
              marginTop: 8,
            }}
          >
            {tool.blurb}
          </div>
        </div>

        {/* Bottom: stats */}
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
              color: 'rgba(244,239,227,0.4)',
              letterSpacing: '0.04em',
            }}
          >
            <span>{tool.modules} modules</span>
            <span>~{tool.hours}h</span>
            <span>Apache-2.0</span>
          </div>
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 15,
              color: 'rgba(244,239,227,0.3)',
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
