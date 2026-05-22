'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'core', label: '@learnkit-ai/core' },
  { id: 'react', label: '@learnkit-ai/react' },
  { id: 'schemas', label: 'Types & schemas' },
  { id: 'theming', label: 'Theming' },
  { id: 'self-hosting', label: 'Self-hosting' },
];

export function DocsSidebar() {
  const [active, setActive] = useState('quickstart');

  useEffect(() => {
    const headings = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside style={{ position: 'sticky', top: 96 }}>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 12,
        }}
      >
        On this page
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                fontSize: 13.5,
                color: isActive ? 'var(--accent)' : 'var(--ink-soft)',
                textDecoration: 'none',
                padding: '5px 0 5px 10px',
                borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                fontWeight: isActive ? 500 : 400,
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--rule)' }}>
        <Link
          href="https://github.com/learnkit-ai/learnkit"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12.5,
            color: 'var(--ink-soft)',
            textDecoration: 'none',
            display: 'block',
            marginBottom: 8,
          }}
        >
          ↗ GitHub
        </Link>
        <Link
          href="/demo"
          style={{ fontSize: 12.5, color: 'var(--ink-soft)', textDecoration: 'none', display: 'block' }}
        >
          ↗ Live demo
        </Link>
      </div>
    </aside>
  );
}
