'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Chip, OleHint } from '@/components/ui/Chip';
import { ToolIcon } from '@/components/ui/primitives';
import { Wordmark } from '@/components/ui/Wordmark';
import { StepShell, FlowFooter } from './StepShell';
import { GenerationView } from './GenerationView';
import { CurriculumView } from './CurriculumView';
import { LessonPreview } from './LessonPreview';

const ROLES = [
  'Product Manager',
  'Software Engineer',
  'Designer',
  'Data Analyst',
  'Marketer',
  'Founder',
  'Operations',
  'Researcher',
];

const ALL_TOOLS = [
  'Claude',
  'ChatGPT',
  'Cursor',
  'Copilot',
  'Midjourney',
  'Notion AI',
  'Perplexity',
  'Gemini',
];

const GOAL_SAMPLES = [
  'Ship an internal research agent for my team',
  'Use AI to draft and review specs faster',
  'Build a Cursor workflow for shipping features alone',
  'Stop hallucinated answers in our customer support bot',
];

export function DemoFlow() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('Product Manager');
  const [tools, setTools] = useState<string[]>(['Claude', 'Cursor']);
  const [goal, setGoal] = useState('');
  const [typedGoal, setTypedGoal] = useState('');
  const [genProgress, setGenProgress] = useState(0);

  // Auto-type goal placeholder
  useEffect(() => {
    if (step !== 2 || goal) return;
    const target = GOAL_SAMPLES[0];
    let i = 0;
    const id = setInterval(() => {
      if (i <= target.length) {
        setTypedGoal(target.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, 35);
    return () => clearInterval(id);
  }, [step, goal]);

  // Generation animation
  useEffect(() => {
    if (step !== 3) return;
    setGenProgress(0);
    const id = setInterval(() => {
      setGenProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => setStep(4), 400);
          return 100;
        }
        return p + 2.5;
      });
    }, 60);
    return () => clearInterval(id);
  }, [step]);

  const advance = () => {
    if (step === 2 && !goal) setGoal(typedGoal);
    setStep((s) => s + 1);
  };
  const reset = () => {
    setStep(0);
    setGoal('');
    setTypedGoal('');
  };

  return (
    <div
      className="paper-grain"
      style={{
        background: 'var(--paper)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Mini header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 56px',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Wordmark size={20} />
          <span style={{ width: 1, height: 18, background: 'var(--rule-strong)' }} />
          <span
            style={{
              fontSize: 13,
              color: 'var(--ink-soft)',
              fontFamily: 'var(--mono)',
            }}
          >
            build your path
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background:
                    step > i ? 'var(--accent-3)' : step === i ? 'var(--ink)' : 'var(--surface)',
                  color: step >= i ? '#FFF' : 'var(--muted)',
                  border: `1px solid ${step >= i ? 'transparent' : 'var(--rule-strong)'}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontFamily: 'var(--mono)',
                  fontWeight: 500,
                }}
              >
                {step > i ? '✓' : i + 1}
              </span>
              {i < 4 && (
                <span
                  style={{
                    width: 28,
                    height: 1,
                    background: step > i ? 'var(--accent-3)' : 'var(--rule)',
                  }}
                />
              )}
            </div>
          ))}
          <Button size="sm" variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'auto',
        }}
      >
        {step === 0 && (
          <StepShell
            eyebrow="Step 01 · Tell us about you"
            title={
              <>
                What do you <span style={{ fontStyle: 'italic' }}>do</span> all day?
              </>
            }
            sub="We tune your curriculum to your role. You can change it later."
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 10,
                maxWidth: 800,
              }}
            >
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    padding: '20px 16px',
                    borderRadius: 14,
                    background: role === r ? 'var(--ink)' : 'var(--surface)',
                    color: role === r ? 'var(--paper)' : 'var(--ink)',
                    border: `1px solid ${role === r ? 'var(--ink)' : 'var(--rule)'}`,
                    fontFamily: 'var(--serif)',
                    fontSize: 18,
                    letterSpacing: '-0.015em',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all .15s ease',
                    fontWeight: 500,
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
            <FlowFooter onNext={advance} canNext={!!role} />
          </StepShell>
        )}

        {step === 1 && (
          <StepShell
            eyebrow={`Step 02 · ${role}`}
            title={
              <>
                Which tools are <span style={{ fontStyle: 'italic' }}>already</span> in your stack?
              </>
            }
            sub="Pick what you use today — even if you barely know how. The AI Guide will fill the gaps."
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 10,
                maxWidth: 800,
              }}
            >
              {ALL_TOOLS.map((t) => {
                const active = tools.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() =>
                      setTools(active ? tools.filter((x) => x !== t) : [...tools, t])
                    }
                    style={{
                      padding: '18px',
                      borderRadius: 14,
                      background: active ? 'var(--surface)' : 'var(--surface-2)',
                      border: `1.5px solid ${active ? 'var(--accent)' : 'var(--rule)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      transition: 'all .15s ease',
                      boxShadow: active ? 'var(--shadow-1)' : 'none',
                    }}
                  >
                    <ToolIcon name={t} size={28} />
                    <div style={{ textAlign: 'left' }}>
                      <div
                        className="serif"
                        style={{
                          fontSize: 17,
                          letterSpacing: '-0.015em',
                          fontWeight: 500,
                          color: 'var(--ink)',
                        }}
                      >
                        {t}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'var(--muted)',
                          fontFamily: 'var(--mono)',
                        }}
                      >
                        {active ? '✓ Selected' : 'Tap to add'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <OleHint>Got something else? The AI Guide covers 40+ tools — you can add the rest after signup.</OleHint>
            <FlowFooter onBack={() => setStep(0)} onNext={advance} canNext={tools.length > 0} />
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            eyebrow="Step 03 · Your goal"
            title={
              <>
                What do you want to <span style={{ fontStyle: 'italic' }}>actually do</span> with
                these?
              </>
            }
            sub="One sentence is plenty. The AI Guide will turn it into a 30-day plan."
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: 720 }}>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: 120,
                  padding: '18px 20px',
                  fontFamily: 'var(--serif)',
                  fontSize: 22,
                  lineHeight: 1.4,
                  background: 'var(--surface)',
                  border: '1.5px solid var(--rule-strong)',
                  borderRadius: 14,
                  resize: 'none',
                  color: 'var(--ink)',
                  letterSpacing: '-0.015em',
                  outline: 'none',
                }}
              />
              {!goal && (
                <div
                  style={{
                    position: 'absolute',
                    top: 18,
                    left: 21,
                    fontFamily: 'var(--serif)',
                    fontSize: 22,
                    color: 'var(--muted)',
                    pointerEvents: 'none',
                    lineHeight: 1.4,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {typedGoal}
                  <span
                    style={{
                      borderRight: '2px solid var(--accent)',
                      animation: 'typewriter-cursor 1s infinite',
                      marginLeft: 1,
                    }}
                  >
                    &nbsp;
                  </span>
                </div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                maxWidth: 720,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  fontFamily: 'var(--mono)',
                  alignSelf: 'center',
                }}
              >
                Try:
              </span>
              {GOAL_SAMPLES.map((s) => (
                <Chip key={s} onClick={() => setGoal(s)}>
                  {s}
                </Chip>
              ))}
            </div>
            <FlowFooter
              onBack={() => setStep(1)}
              onNext={advance}
              canNext={!!(goal || typedGoal)}
            />
          </StepShell>
        )}

        {step === 3 && (
          <StepShell
            eyebrow="Step 04 · The AI Guide is thinking"
            title={
              <>
                Drafting your <span style={{ fontStyle: 'italic' }}>30-day path</span>…
              </>
            }
          >
            <GenerationView
              role={role}
              tools={tools}
              goal={goal || typedGoal}
              progress={genProgress}
            />
          </StepShell>
        )}

        {step === 4 && (
          <StepShell
            eyebrow="Step 05 · Your path"
            title={
              <>
                Here&apos;s your <span style={{ fontStyle: 'italic' }}>30 days</span>.
              </>
            }
            sub={`Tuned for a ${role} working with ${tools.join(' + ')}. Reorder, swap, or skip — it's yours.`}
          >
            <CurriculumView tools={tools} onLessonClick={() => setStep(5)} />
            <FlowFooter
              onBack={() => setStep(2)}
              nextLabel="Start day 1"
              onNext={() => setStep(5)}
              canNext
            />
          </StepShell>
        )}

        {step === 5 && (
          <StepShell
            eyebrow="Lesson 01 · Day 1 · 12 min"
            title={
              <>
                Your first <span style={{ fontStyle: 'italic' }}>system prompt</span>.
              </>
            }
          >
            <LessonPreview role={role} tools={tools} onBack={() => setStep(4)} />
          </StepShell>
        )}
      </div>
    </div>
  );
}
