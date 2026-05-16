import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow } from '@/components/ui/primitives';
import { JsonLd } from '@/components/seo/JsonLd';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { SITE_URL } from '@/lib/seo-data';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      siteName: 'LearnKit AI',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'LearnKit AI', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'LearnKit AI', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
  };

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main
      className="paper-grain"
      style={{ background: 'var(--paper)', minHeight: '100vh', overflow: 'hidden' }}
    >
      <JsonLd data={articleSchema} />
      <Nav />

      <article
        className="lk-section-pad lk-section"
        style={{ padding: '72px 56px 64px' }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Eyebrow>{post.category} · {post.readMin} min read</Eyebrow>
          <h1
            className="serif lk-hero-title"
            style={{
              fontSize: 52,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '18px 0 22px',
              fontWeight: 400,
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
              marginBottom: 40,
              paddingBottom: 24,
              borderBottom: '1px solid var(--rule)',
            }}
          >
            Published{' '}
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            · LearnKit AI team
          </div>

          {post.body.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'var(--ink)',
                margin: '0 0 22px',
              }}
            >
              {para}
            </p>
          ))}

          <div
            style={{
              marginTop: 56,
              padding: '20px 24px',
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 14,
            }}
          >
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
              Try LearnKit AI
            </div>
            <div
              className="serif"
              style={{ fontSize: 22, letterSpacing: '-0.02em', fontWeight: 500, marginBottom: 10 }}
            >
              Build your own 30-day path in 90 seconds.
            </div>
            <Link
              href="/demo"
              style={{
                fontSize: 14,
                color: 'var(--accent)',
                fontWeight: 500,
                textDecoration: 'underline',
              }}
            >
              Run the demo →
            </Link>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section
          className="lk-section-pad lk-section"
          style={{
            padding: '48px 56px 96px',
            borderTop: '1px solid var(--rule)',
            background: 'var(--paper-2)',
          }}
        >
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <Eyebrow>More writing</Eyebrow>
            <div
              className="lk-grid-2"
              style={{
                marginTop: 18,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 14,
              }}
            >
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--rule)',
                    borderRadius: 14,
                    padding: 22,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
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
                    {p.category}
                  </div>
                  <div
                    className="serif"
                    style={{
                      fontSize: 20,
                      letterSpacing: '-0.02em',
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {p.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
