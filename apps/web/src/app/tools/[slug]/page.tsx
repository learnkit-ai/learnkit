import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SeoLandingShell } from '@/components/seo/SeoLandingShell';
import { Eyebrow, ToolIcon } from '@/components/ui/primitives';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, TOOLS } from '@/lib/seo-data';

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return {};

  const title = `Learn ${tool.name} in 30 days - ${tool.vendor} training that ships`;
  const description = `${tool.tagline}. ${tool.modules} project-based modules, ~${tool.hours} hours, reviewed by the AI Guide. From beginner prompts to production agents.`;

  return {
    title,
    description,
    keywords: [...tool.keywords, `${tool.name} training`, `${tool.name} for teams`],
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/tools/${tool.slug}`,
      title,
      description,
      siteName: 'LearnKit AI',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const CURRICULUM_PHASES = [
  { phase: 'Week 1 - Fundamentals', count: 3 },
  { phase: 'Week 2 - Workflows', count: 3 },
  { phase: 'Week 3 - Production', count: 3 },
  { phase: 'Week 4 - Practicum', count: 3 },
];

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  const related = TOOLS.filter((t) => t.slug !== tool.slug)
    .slice(0, 3)
    .map((t) => ({
      href: `/tools/${t.slug}`,
      label: `Learn ${t.name}`,
      sub: `${t.modules} modules · ${t.hours}h`,
      tool: t.name,
    }));

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Learn ${tool.name} in 30 days`,
    description: tool.blurb,
    provider: {
      '@type': 'Organization',
      name: 'LearnKit AI',
      url: SITE_URL,
    },
    educationalLevel: 'Beginner to Advanced',
    teaches: tool.keywords.join(', '),
    timeRequired: `PT${tool.hours}H`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${tool.hours}H`,
    },
  };

  return (
    <>
      <JsonLd data={courseSchema} />
      <SeoLandingShell
        eyebrow={`${tool.vendor} · 30-day path`}
        title={
          <>
            Learn{' '}
            <span style={{ fontStyle: 'italic', color: tool.color }}>{tool.name}</span>
            <br />
            in 30 days.
          </>
        }
        intro={tool.blurb}
        primaryColor={tool.color}
        ctaLabel={`Build your ${tool.name} path`}
        relatedHeading="More tracks"
        related={related}
      >
        {/* Stats strip */}
        <section className="lk-section-pad" style={{ padding: '0 56px 32px' }}>
          <div
            style={{
              maxWidth: 1080,
              margin: '0 auto',
              display: 'flex',
              gap: 32,
              alignItems: 'center',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--rule)',
              borderBottom: '1px solid var(--rule)',
              padding: '24px 0',
            }}
          >
            <ToolIcon name={tool.name} size={40} />
            {[
              { k: `${tool.modules}`, v: 'modules' },
              { k: `${tool.hours}h`, v: 'total time' },
              { k: '4', v: 'shipped projects' },
              { k: '30', v: 'days' },
            ].map((s) => (
              <div key={s.v}>
                <div
                  className="serif"
                  style={{
                    fontSize: 32,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    fontWeight: 500,
                  }}
                >
                  {s.k}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--muted)',
                    fontFamily: 'var(--mono)',
                    marginTop: 4,
                  }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum outline */}
        <section className="lk-section-pad lk-section" style={{ padding: '32px 56px 64px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <Eyebrow color={tool.color}>Curriculum</Eyebrow>
            <h2
              className="serif lk-section-title-md"
              style={{
                fontSize: 36,
                letterSpacing: '-0.025em',
                margin: '12px 0 28px',
                fontWeight: 400,
              }}
            >
              From first prompt to{' '}
              <span style={{ fontStyle: 'italic' }}>production agent</span>.
            </h2>
            <div
              style={{
                display: 'grid',
                gap: 1,
                background: 'var(--rule)',
                border: '1px solid var(--rule)',
                borderRadius: 14,
                overflow: 'hidden',
              }}
              className="lk-grid-4"
            >
              {CURRICULUM_PHASES.map((p, i) => (
                <div key={p.phase} style={{ background: 'var(--surface)', padding: 22 }}>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="serif"
                    style={{
                      fontSize: 19,
                      lineHeight: 1.2,
                      margin: '14px 0 6px',
                      letterSpacing: '-0.02em',
                      fontWeight: 500,
                    }}
                  >
                    {p.phase}
                  </h3>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      fontFamily: 'var(--mono)',
                    }}
                  >
                    {p.count} lessons
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why LearnKit for this tool */}
        <section
          className="lk-section-pad lk-section"
          style={{
            padding: '64px 56px',
            background: 'var(--paper-2)',
            borderTop: '1px solid var(--rule)',
          }}
        >
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <Eyebrow>Why LearnKit for {tool.name}</Eyebrow>
            <h2
              className="serif lk-section-title-md"
              style={{
                fontSize: 36,
                letterSpacing: '-0.025em',
                margin: '12px 0 24px',
                fontWeight: 400,
              }}
            >
              Less <span style={{ fontStyle: 'italic' }}>tutorials</span>. More shipping.
            </h2>
            <div className="lk-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                {
                  h: 'Real projects, not toy demos',
                  b: `Every ${tool.name} lesson ends with a prompt, agent, or workflow you can use at work the same day.`,
                },
                {
                  h: 'AI Guide reviews your work',
                  b: 'Your prompts get read, your agents get critiqued, and your evals get scored - by an LLM that knows what bad output looks like.',
                },
                {
                  h: `${tool.vendor}'s latest, kept current`,
                  b: `When ${tool.vendor} ships new ${tool.name} features, lessons update within two weeks. No outdated tutorials.`,
                },
              ].map((item) => (
                <div
                  key={item.h}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--rule)',
                    borderRadius: 12,
                    padding: 22,
                  }}
                >
                  <h3
                    className="serif"
                    style={{
                      fontSize: 19,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      fontWeight: 500,
                      margin: '0 0 8px',
                    }}
                  >
                    {item.h}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--ink-soft)',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {item.b}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--muted)' }}>
              Looking for a different tool?{' '}
              <Link
                href="/#curriculum"
                style={{ color: 'var(--accent)', textDecoration: 'underline' }}
              >
                Browse all 40 tracks
              </Link>{' '}
              or pick by role:{' '}
              {[
                'Software Engineer',
                'Product Manager',
                'Designer',
                'Data Analyst',
              ].map((r, i) => {
                const slug = r.toLowerCase().replace(/ /g, '-');
                return (
                  <span key={r}>
                    <Link
                      href={`/roles/${slug}`}
                      style={{ color: 'var(--ink-soft)', textDecoration: 'underline' }}
                    >
                      {r}
                    </Link>
                    {i < 3 ? ' · ' : ''}
                  </span>
                );
              })}
              .
            </div>
          </div>
        </section>
      </SeoLandingShell>
    </>
  );
}
