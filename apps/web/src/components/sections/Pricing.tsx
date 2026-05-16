import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';

const TIERS = [
  {
    name: 'Learner',
    price: '$24',
    per: '/mo',
    desc: 'For individuals.',
    features: ['All 40 tool tracks', 'AI Guide tutoring', 'Practicums + credentials', 'Portfolio hosting'],
    cta: 'Try free 7 days',
  },
  {
    name: 'Team',
    price: '$18',
    per: '/seat/mo',
    desc: 'For L&D and engineering leaders.',
    features: [
      'Everything in Learner',
      'SSO + SCIM',
      'Manager evidence reports',
      'Role-mapped curricula',
      'Slack & Teams delivery',
    ],
    cta: 'Book a demo',
    featured: true,
  },
  {
    name: 'API',
    price: 'Usage',
    per: 'pay-as-you-go',
    desc: 'Embed LearnKit AI in your product.',
    features: ['Open SDKs · Apache-2.0', 'REST + Webhooks', 'Custom evals', 'White-label AI Guide'],
    cta: 'Read the docs',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="lk-section-pad lk-section" style={{ padding: '88px 56px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <Eyebrow>Plans</Eyebrow>
          <h2
            className="serif lk-section-title"
            style={{
              fontSize: 44,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '12px 0 10px',
              fontWeight: 400,
            }}
          >
            Pick the door <span style={{ fontStyle: 'italic' }}>that fits</span>.
          </h2>
        </div>

        <div
          className="lk-pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
            maxWidth: 1080,
            margin: '0 auto',
          }}
        >
          {TIERS.map((t) => (
            <div
              key={t.name}
              style={{
                background: t.featured ? 'var(--ink)' : 'var(--surface)',
                color: t.featured ? 'var(--paper)' : 'var(--ink)',
                borderRadius: 16,
                padding: 30,
                border: '1px solid var(--rule)',
                boxShadow: t.featured ? 'var(--shadow-3)' : 'var(--shadow-1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {t.featured && (
                <span
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent)',
                    color: '#FFF',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 11,
                    fontFamily: 'var(--mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Most popular
                </span>
              )}
              <div
                className="serif"
                style={{ fontSize: 22, letterSpacing: '-0.02em', marginBottom: 6, fontWeight: 500 }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: t.featured ? 'rgba(244,239,227,0.7)' : 'var(--ink-soft)',
                  marginBottom: 20,
                }}
              >
                {t.desc}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 4,
                  marginBottom: 22,
                }}
              >
                <span
                  className="serif"
                  style={{ fontSize: 44, letterSpacing: '-0.03em', fontWeight: 400 }}
                >
                  {t.price}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: t.featured ? 'rgba(244,239,227,0.6)' : 'var(--muted)',
                  }}
                >
                  {t.per}
                </span>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 9,
                }}
              >
                {t.features.map((f) => (
                  <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13.5, alignItems: 'flex-start' }}>
                    <span style={{ color: t.featured ? 'var(--accent-2)' : 'var(--accent)' }}>✓</span>
                    <span
                      style={{ color: t.featured ? 'rgba(244,239,227,0.85)' : 'var(--ink-soft)' }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant={t.featured ? 'accent' : 'ghost'}
                size="md"
                style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
              >
                {t.cta} <ArrowR size={12} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
