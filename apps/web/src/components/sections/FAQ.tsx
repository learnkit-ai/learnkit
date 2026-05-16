import { Eyebrow } from '@/components/ui/primitives';
import { FAQ_SCHEMA } from '@/components/seo/JsonLd';

const FAQS = FAQ_SCHEMA.mainEntity.map((entry) => ({
  q: entry.name,
  a: entry.acceptedAnswer.text,
}));

export function FAQ() {
  return (
    <section
      id="faq"
      className="lk-section-pad lk-section"
      style={{ padding: '88px 56px', borderTop: '1px solid var(--rule)' }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ marginBottom: 40, maxWidth: 720 }}>
          <Eyebrow>Frequently asked</Eyebrow>
          <h2
            className="serif lk-section-title"
            style={{
              fontSize: 44,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '12px 0 14px',
              fontWeight: 400,
            }}
          >
            Questions, <span style={{ fontStyle: 'italic' }}>answered</span>.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 1,
            background: 'var(--rule)',
            border: '1px solid var(--rule)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {FAQS.map((item) => (
            <details
              key={item.q}
              style={{
                background: 'var(--surface)',
                padding: '22px 26px',
              }}
            >
              <summary
                className="serif"
                style={{
                  fontSize: 19,
                  lineHeight: 1.3,
                  letterSpacing: '-0.015em',
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: 'var(--ink)',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span>{item.q}</span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 18,
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  marginTop: 12,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'var(--ink-soft)',
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
