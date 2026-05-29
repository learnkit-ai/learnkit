'use client';

import { useState, useEffect, useRef } from 'react';
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

const NAV_LINKS = [
  { label: 'For teams', href: '/teams' },
  { label: 'Docs', href: '/docs' },
  { label: 'API', href: '/developers' },
  { label: 'Blog', href: '/blog' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on route navigation (hash or pathname change)
  useEffect(() => { setOpen(false); }, []);

  return (
    <nav
      className="lk-nav"
      ref={menuRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 56px',
        borderBottom: open ? 'none' : '1px solid var(--rule)',
        position: 'sticky',
        top: 0,
        background: 'var(--paper)',
        zIndex: 50,
        backdropFilter: 'blur(8px)',
        flexWrap: 'wrap',
        gap: open ? 0 : undefined,
      }}
    >
      <a href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex' }}>
        <Wordmark size={22} />
      </a>

      {/* Desktop links */}
      <div className="lk-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 13.5, color: 'var(--ink-soft)' }}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} style={navLink}>{l.label}</a>
        ))}
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

      {/* Desktop CTA */}
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

      {/* Mobile hamburger button - visible only when lk-nav-links is hidden */}
      <button
        className="lk-nav-hamburger"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        style={{
          display: 'none', // shown by CSS on mobile
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 6px',
          color: 'var(--ink)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="3" y1="6" x2="17" y2="6" />
            <line x1="3" y1="10" x2="17" y2="10" />
            <line x1="3" y1="14" x2="17" y2="14" />
          </svg>
        )}
      </button>

      {/* Mobile dropdown menu */}
      {open && (
        <div
          className="lk-nav-mobile-menu"
          style={{
            display: 'none', // shown by CSS on mobile
            width: '100%',
            borderTop: '1px solid var(--rule)',
            paddingTop: 16,
            paddingBottom: 20,
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                ...navLink,
                display: 'block',
                padding: '10px 4px',
                fontSize: 16,
                borderBottom: '1px solid var(--rule)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/learnkit-ai/learnkit"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              ...navLink,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 4px',
              fontSize: 16,
              borderBottom: '1px solid var(--rule)',
            }}
          >
            <GithubIcon />
            GitHub
          </a>
          <div style={{ paddingTop: 12 }}>
            <a href="/demo" style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
              <Button size="sm" variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                Run the demo <ArrowR size={12} />
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
