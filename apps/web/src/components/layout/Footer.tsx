import { Wordmark, WordmarkMono } from '@/components/ui/Wordmark';

const LINKS = [
  { h: 'Product', l: ['Workbench', 'Library', 'AI Guide', 'Credentials'] },
  { h: 'For', l: ['Individuals', 'Teams & L&D', 'Developers', 'Educators'] },
  { h: 'Developers', l: ['Docs', 'API reference', 'SDKs · GitHub', 'Changelog'] },
  { h: 'Company', l: ['About', 'Customers', 'Careers', 'Contact'] },
];

export function Footer() {
  return (
    <footer
      className="lk-section-pad"
      style={{ padding: '56px 56px 36px', borderTop: '1px solid var(--rule)', background: 'var(--paper)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          className="lk-footer-cols lk-grid-5"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: 36,
            paddingBottom: 40,
          }}
        >
          <div className="lk-footer-brand">
            <Wordmark size={20} />
            <p
              style={{
                fontSize: 13,
                color: 'var(--ink-soft)',
                lineHeight: 1.55,
                margin: '14px 0 0',
                maxWidth: 280,
              }}
            >
              The AI workbench for teams that ship.
            </p>
          </div>
          {LINKS.map((col) => (
            <div key={col.h}>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
                  marginBottom: 12,
                }}
              >
                {col.h}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.l.map((item) => (
                  <li key={item} style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="lk-footer-bottom"
          style={{
            paddingTop: 24,
            borderTop: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <WordmarkMono size={12} color="var(--muted)" />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>© 2026 LearnKit AI, Inc. · learnkit-ai.com</span>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
            {['Privacy', 'Terms', 'Security', 'Apache-2.0'].map((item) => (
              <a key={item} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
