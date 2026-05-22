import { Wordmark, WordmarkMono } from '@/components/ui/Wordmark';

interface FooterLink { label: string; href: string }
interface FooterCol { h: string; l: FooterLink[] }

const LINKS: FooterCol[] = [
  {
    h: 'Product',
    l: [
      { label: 'Build your path', href: '/demo' },
      { label: 'Tools library', href: '/tools' },
      { label: 'AI Guide', href: '/developers' },
      { label: 'Install', href: '/#install' },
    ],
  },
  {
    h: 'For',
    l: [
      { label: 'Product Managers', href: '/roles/product-manager' },
      { label: 'Software Engineers', href: '/roles/software-engineer' },
      { label: 'Designers', href: '/roles/designer' },
      { label: 'Founders', href: '/roles/founder' },
    ],
  },
  {
    h: 'Tools',
    l: [
      { label: 'Learn Claude', href: '/tools/claude' },
      { label: 'Learn Cursor', href: '/tools/cursor' },
      { label: 'Learn ChatGPT', href: '/tools/chatgpt' },
      { label: 'Learn Gemini', href: '/tools/gemini' },
    ],
  },
  {
    h: 'Developers',
    l: [
      { label: 'Docs', href: '/docs' },
      { label: 'API reference', href: '/developers' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'GitHub', href: 'https://github.com/learnkit-ai/learnkit' },
    ],
  },
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
              Open-source TypeScript engine for embedding personalized AI learning paths. Apache-2.0.
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
                  <li key={item.label} style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
                    <a href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>{item.label}</a>
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
            <a href="https://github.com/learnkit-ai/learnkit/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Security</a>
            <a href="https://github.com/learnkit-ai/learnkit/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Apache-2.0</a>
            <a href="https://github.com/learnkit-ai/learnkit/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Contributing</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
