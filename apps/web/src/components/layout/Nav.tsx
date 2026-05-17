import { Wordmark } from '@/components/ui/Wordmark';
import { Button, ArrowR } from '@/components/ui/Button';

const navLink: React.CSSProperties = {
  color: 'var(--ink-soft)',
  textDecoration: 'none',
  cursor: 'pointer',
  fontWeight: 450,
  letterSpacing: '-0.005em',
};

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.83 1.27.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export function Nav() {
  return (
    <nav
      className="lk-nav"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 56px',
        borderBottom: '1px solid var(--rule)',
        position: 'sticky',
        top: 0,
        background: 'var(--paper)',
        zIndex: 50,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Wordmark size={22} />

      <div className="lk-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 13.5, color: 'var(--ink-soft)' }}>
        <a href="/roles" style={navLink}>For teams</a>
        <a href="/developers" style={navLink}>Developers</a>
        <a href="/tools" style={navLink}>Curriculum</a>
        <a href="/#install" style={navLink}>Install</a>
        <a href="/blog" style={navLink}>Blog</a>
        <a
          href="https://github.com/learnkit-ai/learnkit"
          style={{ ...navLink, display: 'inline-flex', alignItems: 'center', gap: 5 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          GitHub
        </a>
      </div>

      <div className="lk-nav-cta" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <a
          href="https://github.com/learnkit-ai/learnkit"
          className="lk-nav-cta-secondary"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...navLink, fontSize: 13.5 }}
        >
          Star us
        </a>
        <a href="/demo" style={{ textDecoration: 'none' }}>
          <Button size="sm" variant="primary">
            Run the demo <ArrowR size={12} />
          </Button>
        </a>
      </div>
    </nav>
  );
}
