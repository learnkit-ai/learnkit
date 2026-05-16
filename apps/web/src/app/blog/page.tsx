import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow } from '@/components/ui/primitives';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { SITE_URL } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Blog — LearnKit AI',
  description:
    'Writing on AI pedagogy, engineering, and the LearnKit AI roadmap. Open-source. Published from the team building the workbench.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'LearnKit AI Blog — AI pedagogy and engineering',
    description:
      'Writing on AI pedagogy, engineering, and the LearnKit AI roadmap.',
  },
};

export default function BlogIndex() {
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
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <Eyebrow>Blog</Eyebrow>
          <h1
            className="serif lk-hero-title"
            style={{
              fontSize: 64,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              margin: '18px 0 18px',
              fontWeight: 400,
            }}
          >
            Notes from the{' '}
            <span style={{ fontStyle: 'italic' }}>workbench</span>.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--ink-soft)',
              lineHeight: 1.55,
              maxWidth: 720,
            }}
          >
            Writing on AI pedagogy, engineering, and the LearnKit AI roadmap.
          </p>
        </div>
      </section>

      <section className="lk-section-pad lk-section" style={{ padding: '32px 56px 96px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              borderTop: '1px solid var(--rule)',
            }}
          >
            {BLOG_POSTS.map((post) => (
              <li key={post.slug} style={{ borderBottom: '1px solid var(--rule)' }}>
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'flex',
                    padding: '22px 0',
                    gap: 24,
                    alignItems: 'flex-start',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--muted)',
                      width: 120,
                      flexShrink: 0,
                      paddingTop: 4,
                    }}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 11,
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 6,
                      }}
                    >
                      {post.category} · {post.readMin} min read
                    </div>
                    <h2
                      className="serif"
                      style={{
                        fontSize: 26,
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        fontWeight: 500,
                        margin: '0 0 6px',
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        fontSize: 15,
                        color: 'var(--ink-soft)',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
