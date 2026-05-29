import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SeoLandingShell } from '@/components/seo/SeoLandingShell';
import { Eyebrow, ToolIcon } from '@/components/ui/primitives';
import { JsonLd } from '@/components/seo/JsonLd';
import { ROLES, SITE_URL, TOOLS } from '@/lib/seo-data';

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) return {};

  const title = `${role.tagline} - build real skills in 30 days`;
  const description = `${role.blurb} Project-based, reviewed by the AI Guide, with role-mapped curricula for ${role.tools.slice(0, 3).join(', ')} and more.`;

  return {
    title,
    description,
    keywords: [
      `AI for ${role.name.toLowerCase()}s`,
      `${role.name} AI training`,
      `learn AI as a ${role.name.toLowerCase()}`,
      `${role.name} ChatGPT`,
      `${role.name} Claude`,
    ],
    alternates: { canonical: `/roles/${role.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/roles/${role.slug}`,
      title,
      description,
      siteName: 'LearnKit AI',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) notFound();

  const related = ROLES.filter((r) => r.slug !== role.slug)
    .slice(0, 3)
    .map((r) => ({ href: `/roles/${r.slug}`, label: r.tagline }));

  const occupationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: role.tagline,
    description: role.blurb,
    provider: {
      '@type': 'Organization',
      name: 'LearnKit AI',
      url: SITE_URL,
    },
    occupationalCategory: role.name,
    timeToComplete: 'P30D',
  };

  return (
    <>
      <JsonLd data={occupationSchema} />
      <SeoLandingShell
        eyebrow={`For ${role.name}s`}
        title={
          <>
            AI training for
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent-3)' }}>
              {role.name}s
            </span>
            .
          </>
        }
        intro={role.blurb}
        primaryColor="var(--accent-3)"
        ctaLabel={`Build a ${role.name} path`}
        relatedHeading="Other roles"
        related={related}
      >
        {/* Skills */}
        <section className="lk-section-pad lk-section" style={{ padding: '32px 56px 64px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <Eyebrow color="var(--accent-3)">What you&apos;ll build</Eyebrow>
            <h2
              className="serif lk-section-title-md"
              style={{
                fontSize: 36,
                letterSpacing: '-0.025em',
                margin: '12px 0 24px',
                fontWeight: 400,
              }}
            >
              The skills <span style={{ fontStyle: 'italic' }}>your role</span> actually
              needs.
            </h2>
            <div className="lk-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {role.skills.map((skill, i) => (
                <div
                  key={skill}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--rule)',
                    borderRadius: 12,
                    padding: 22,
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--muted)',
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="serif"
                    style={{
                      fontSize: 19,
                      lineHeight: 1.3,
                      letterSpacing: '-0.015em',
                      fontWeight: 500,
                    }}
                  >
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended tools */}
        <section
          className="lk-section-pad lk-section"
          style={{
            padding: '64px 56px',
            background: 'var(--paper-2)',
            borderTop: '1px solid var(--rule)',
          }}
        >
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <Eyebrow>Recommended tools</Eyebrow>
            <h2
              className="serif lk-section-title-md"
              style={{
                fontSize: 36,
                letterSpacing: '-0.025em',
                margin: '12px 0 24px',
                fontWeight: 400,
              }}
            >
              Start with the tools{' '}
              <span style={{ fontStyle: 'italic' }}>{role.name.toLowerCase()}s use</span>.
            </h2>
            <div className="lk-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {role.tools.map((toolName) => {
                const t = TOOLS.find((x) => x.name === toolName);
                if (!t) return null;
                return (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--rule)',
                      borderRadius: 12,
                      padding: 18,
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <ToolIcon name={t.name} size={28} />
                    <div>
                      <div
                        className="serif"
                        style={{
                          fontSize: 17,
                          fontWeight: 500,
                          letterSpacing: '-0.015em',
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'var(--muted)',
                          fontFamily: 'var(--mono)',
                        }}
                      >
                        {t.modules} modules · {t.hours}h
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </SeoLandingShell>
    </>
  );
}
