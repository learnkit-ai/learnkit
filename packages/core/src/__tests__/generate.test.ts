import { describe, expect, it } from 'vitest';
import { generateLearningPath } from '../generate';
import type { LearningPathInput } from '@learnkit-ai/schemas';

const SAMPLE: LearningPathInput = {
  role: 'Product Manager',
  tools: ['Claude', 'Cursor'],
  goal: 'Ship an internal research agent',
  level: 'beginner',
};

describe('generateLearningPath', () => {
  it('produces a four-week path with three lessons per week', () => {
    const path = generateLearningPath(SAMPLE);
    expect(path.weeks).toHaveLength(4);
    for (const w of path.weeks) {
      expect(w.lessons).toHaveLength(3);
    }
  });

  it('is deterministic — same input always produces the same id and total minutes', () => {
    const a = generateLearningPath(SAMPLE);
    const b = generateLearningPath(SAMPLE);
    expect(a.id).toBe(b.id);
    expect(a.totalMinutes).toBe(b.totalMinutes);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('produces different ids for different goals', () => {
    const a = generateLearningPath(SAMPLE);
    const b = generateLearningPath({ ...SAMPLE, goal: 'Ship a customer-facing chatbot' });
    expect(a.id).not.toBe(b.id);
  });

  it('reduces lesson minutes at advanced level', () => {
    const beginner = generateLearningPath({ ...SAMPLE, level: 'beginner' });
    const advanced = generateLearningPath({ ...SAMPLE, level: 'advanced' });
    expect(advanced.totalMinutes).toBeLessThan(beginner.totalMinutes);
  });

  it('uses the primary and secondary tools in alternating weeks', () => {
    const path = generateLearningPath(SAMPLE);
    expect(path.weeks[0]!.lessons[0]!.tool).toBe('Claude');
    expect(path.weeks[1]!.lessons[0]!.tool).toBe('Cursor');
  });

  it('falls back to a default secondary when only one tool given', () => {
    const path = generateLearningPath({ ...SAMPLE, tools: ['Claude'] });
    expect(path.weeks[1]!.lessons[0]!.tool).toBe('Claude');
  });

  it('rejects empty tools via Zod validation', () => {
    expect(() =>
      generateLearningPath({ ...SAMPLE, tools: [] as unknown as string[] }),
    ).toThrow();
  });

  it('rejects companyContext over 500 chars via Zod validation', () => {
    expect(() =>
      generateLearningPath({ ...SAMPLE, companyContext: 'x'.repeat(501) }),
    ).toThrow();
  });

  it('always assigns day numbers in 1..30 range', () => {
    const path = generateLearningPath(SAMPLE);
    for (const w of path.weeks) {
      for (const l of w.lessons) {
        expect(l.day).toBeGreaterThanOrEqual(1);
        expect(l.day).toBeLessThanOrEqual(30);
      }
    }
  });
});
