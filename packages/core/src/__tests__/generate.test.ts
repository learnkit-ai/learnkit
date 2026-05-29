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

  it('is deterministic - same input always produces the same id and total minutes', () => {
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

  it('first lesson has no prerequisites', () => {
    const path = generateLearningPath(SAMPLE);
    expect(path.weeks[0]!.lessons[0]!.prerequisiteIds).toHaveLength(0);
  });

  it('subsequent lessons have exactly one prerequisite', () => {
    const path = generateLearningPath(SAMPLE);
    const allLessons = path.weeks.flatMap((w) => w.lessons);
    for (let i = 1; i < allLessons.length; i++) {
      expect(allLessons[i]!.prerequisiteIds).toHaveLength(1);
    }
  });

  it('prerequisite ids reference real lesson ids', () => {
    const path = generateLearningPath(SAMPLE);
    const allIds = new Set(path.weeks.flatMap((w) => w.lessons.map((l) => l.id)));
    for (const w of path.weeks) {
      for (const l of w.lessons) {
        for (const pid of l.prerequisiteIds) {
          expect(allIds.has(pid)).toBe(true);
        }
      }
    }
  });

  it.each([
    'Marketer',
    'Founder',
    'Operations',
    'Researcher',
    'Sales',
    'Customer Success',
    'Finance',
  ])('generates a valid four-week path for %s', (role) => {
    const path = generateLearningPath({ ...SAMPLE, role });
    expect(path.weeks).toHaveLength(4);
    for (const w of path.weeks) {
      expect(w.lessons.length).toBeGreaterThan(0);
    }
  });

  it('generates different paths for different levels', () => {
    const roles = ['Marketer', 'Founder', 'Operations', 'Researcher', 'Sales', 'Customer Success', 'Finance'];
    for (const role of roles) {
      const beg = generateLearningPath({ ...SAMPLE, role, level: 'beginner' });
      const adv = generateLearningPath({ ...SAMPLE, role, level: 'advanced' });
      expect(adv.totalMinutes).toBeLessThan(beg.totalMinutes);
    }
  });

  it('appends context suffix to project lessons when companyContext is provided', () => {
    const path = generateLearningPath({ ...SAMPLE, companyContext: 'React/TypeScript team, ships weekly' });
    const projects = path.weeks.flatMap((w) => w.lessons.filter((l) => l.kind === 'project'));
    for (const p of projects) {
      expect(p.summary).toMatch(/react\/typescript|shipping weekly/i);
    }
  });

  it('leaves non-project lessons unchanged when companyContext is provided', () => {
    const base = generateLearningPath(SAMPLE);
    const withCtx = generateLearningPath({ ...SAMPLE, companyContext: 'Python team, ships weekly' });
    const baseLessons = base.weeks.flatMap((w) => w.lessons.filter((l) => l.kind === 'lesson'));
    const ctxLessons = withCtx.weeks.flatMap((w) => w.lessons.filter((l) => l.kind === 'lesson'));
    for (let i = 0; i < baseLessons.length; i++) {
      expect(ctxLessons[i]!.summary).toBe(baseLessons[i]!.summary);
    }
  });

  it('produces different path id when companyContext differs', () => {
    const a = generateLearningPath(SAMPLE);
    const b = generateLearningPath({ ...SAMPLE, companyContext: 'B2B SaaS, 20-person team, Python stack' });
    expect(a.id).not.toBe(b.id);
  });
});
