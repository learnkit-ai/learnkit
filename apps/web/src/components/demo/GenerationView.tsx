import { Ole } from '@/components/ui/primitives';

interface Phase {
  at: number;
  label: string;
  detail: string;
}

export function GenerationView({
  role,
  tools,
  goal,
  progress,
}: {
  role: string;
  tools: string[];
  goal: string;
  progress: number;
}) {
  const phases: Phase[] = [
    {
      at: 0,
      label: 'Reading your goal',
      detail: `"${goal.slice(0, 60)}${goal.length > 60 ? '…' : ''}"`,
    },
    {
      at: 18,
      label: 'Mapping tools to skills',
      detail: `${tools.join(' · ')} → 14 core skills`,
    },
    {
      at: 38,
      label: `Looking up ${role} archetypes`,
      detail: 'Cross-referencing 4,200 similar paths',
    },
    {
      at: 58,
      label: 'Sequencing 30 lessons',
      detail: 'Day 1 → 30 · spaced practice',
    },
    {
      at: 78,
      label: 'Picking your first project',
      detail: 'Something you can ship Friday',
    },
    { at: 95, label: 'Done', detail: 'Path ready' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 720, marginTop: 16 }}>
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 18,
          padding: 28,
          border: '1px solid var(--rule)',
          boxShadow: 'var(--shadow-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <Ole size={36} animated />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>AI Guide</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
              thinking · {Math.round(progress / 5)}s
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {phases.slice(0, -1).map((p, i) => {
            const next = phases[i + 1];
            const done = progress > (next?.at ?? 100);
            const active = progress >= p.at && !done;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  opacity: progress >= p.at ? 1 : 0.3,
                  transition: 'opacity .3s ease',
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    marginTop: 2,
                    background: done
                      ? 'var(--accent-3)'
                      : active
                        ? 'var(--accent)'
                        : 'var(--rule)',
                    color: '#FFF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    flexShrink: 0,
                    animation: active ? 'pulse-soft 1.2s infinite' : 'none',
                  }}
                >
                  {done ? '✓' : ''}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--ink)',
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {p.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      fontFamily: 'var(--mono)',
                      marginTop: 2,
                    }}
                  >
                    {p.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 24,
            height: 3,
            background: 'var(--rule)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--accent)',
              transition: 'width .15s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}
