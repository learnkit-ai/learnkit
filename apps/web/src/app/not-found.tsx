import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '404 — Page not found · LearnKit AI',
};

export default function NotFound() {
  return (
    <main
      className="paper-grain"
      style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Nav />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 56px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 20,
          }}
        >
          404
        </div>
        <h1
          className="serif"
          style={{
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            margin: '0 0 18px',
          }}
        >
          Page not found.
        </h1>
        <p
          style={{
            fontSize: 17,
            color: 'var(--ink-soft)',
            lineHeight: 1.55,
            maxWidth: 440,
            margin: '0 0 36px',
          }}
        >
          The path you followed doesn&apos;t exist — but a learning path does. Try one of these instead.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/demo"
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              padding: '11px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Build your path
          </Link>
          <Link
            href="/docs"
            style={{
              background: 'transparent',
              color: 'var(--ink)',
              padding: '11px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              border: '1px solid var(--rule-strong)',
              textDecoration: 'none',
            }}
          >
            Read the docs
          </Link>
          <Link
            href="/"
            style={{
              background: 'transparent',
              color: 'var(--ink-soft)',
              padding: '11px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 450,
              textDecoration: 'none',
            }}
          >
            Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
