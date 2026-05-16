import type { ReactNode } from 'react';
import { Button, ArrowR } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';

export function StepShell({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1080,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        alignItems: 'flex-start',
      }}
    >
      <div style={{ animation: 'float-up .4s ease both' }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className="serif"
          style={{
            fontSize: 56,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            margin: '14px 0 12px',
            fontWeight: 400,
          }}
        >
          {title}
        </h1>
        {sub && (
          <p
            style={{
              fontSize: 16.5,
              color: 'var(--ink-soft)',
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 640,
            }}
          >
            {sub}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

export function FlowFooter({
  onBack,
  onNext,
  canNext,
  nextLabel = 'Continue',
}: {
  onBack?: () => void;
  onNext?: () => void;
  canNext?: boolean;
  nextLabel?: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 16, alignItems: 'center' }}>
      {onBack && (
        <Button variant="ghost" size="md" onClick={onBack}>
          ← Back
        </Button>
      )}
      <Button
        variant="primary"
        size="md"
        onClick={canNext ? onNext : undefined}
        style={{
          opacity: canNext ? 1 : 0.4,
          cursor: canNext ? 'pointer' : 'not-allowed',
        }}
      >
        {nextLabel} <ArrowR size={12} />
      </Button>
    </div>
  );
}
