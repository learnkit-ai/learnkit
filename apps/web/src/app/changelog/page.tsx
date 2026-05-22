import type { Metadata } from 'next';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow } from '@/components/ui/primitives';
import { CHANGELOG, KIND_COLORS } from '@/lib/changelog-data';
import { SITE_URL } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Changelog · LearnKit AI',
  description:
    'What shipped and when. Every notable change to @learnkit-ai/core, @learnkit-ai/react, and the LearnKit AI web app.',
  alternates: { canonical: '/changelog' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/changelog`,
    title: 'Changelog · LearnKit AI',
    description: 'What shipped and when. Every notable change to the LearnKit AI packages.',
    siteName: 'LearnKit AI',
  },
};

export default function ChangelogPage() {
  return (
    <main
      className="paper-grain"
      style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Nav />

      <div
        className="lk-section-pad"
        style={{ flex: 1, maxWidth: 860, margin: '0 auto', width: '100%', padding: '72px 56px 96px' }}
      >
        <Eyebrow>Changelog</Eyebrow>
        <h1
          className="serif"
          style={{
            fontSize: 52,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            margin: '18px 0 12px',
          }}
        >
          What shipped.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 56, maxWidth: 520 }}>
          Every notable change to{' '}
          <code style={{ fontFamily: 'var(--mono)', fontSize: 13, background: 'var(--paper-2)', padding: '1px 5px', borderRadius: 4 }}>
            @learnkit-ai/core
          </code>
          ,{' '}
          <code style={{ fontFamily: 'var(--mono)', fontSize: 13, background: 'var(--paper-2)', padding: '1px 5px', borderRadius: 4 }}>
            @learnkit-ai/react
          </code>
          , and the web app.{' '}
          <a
            href="https://github.com/learnkit-ai/learnkit/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            View on GitHub →
          </a>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {CHANGELOG.map((version) => (
            <section key={version.version}>
              {/* Version header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 16,
                  marginBottom: 20,
                  paddingBottom: 14,
                  borderBottom: '1px solid var(--rule)',
                }}
              >
                <h2
                  className="serif"
                  style={{
                    fontSize: 26,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  {version.version === 'Unreleased' ? 'Unreleased' : `v${version.version}`}
                </h2>
                {version.date && (
                  <time
                    dateTime={version.date}
                    style={{
                      fontSize: 12,
                      fontFamily: 'var(--mono)',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {new Date(version.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
                {version.version === 'Unreleased' && (
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: 'var(--mono)',
                      background: 'rgba(200,71,42,0.1)',
                      color: 'var(--accent)',
                      padding: '2px 8px',
                      borderRadius: 999,
                      letterSpacing: '0.06em',
                    }}
                  >
                    in progress
                  </span>
                )}
              </div>

              {/* Change entries */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {version.entries.map((entry, i) => {
                  const style = KIND_COLORS[entry.kind];
                  return (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                        fontSize: 14.5,
                        lineHeight: 1.55,
                        color: 'var(--ink)',
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          marginTop: 2,
                          fontSize: 11,
                          fontFamily: 'var(--mono)',
                          background: style.bg,
                          color: style.color,
                          padding: '2px 7px',
                          borderRadius: 5,
                          letterSpacing: '0.04em',
                          fontWeight: 500,
                          minWidth: 56,
                          textAlign: 'center',
                        }}
                      >
                        {entry.kind}
                      </span>
                      <span style={{ color: 'var(--ink-soft)' }}>{entry.text}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
