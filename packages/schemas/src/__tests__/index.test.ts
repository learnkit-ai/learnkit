import { describe, expect, it } from 'vitest';
import {
  LearningPathInputSchema,
  LearningPathSchema,
  LessonSchema,
  WeekSchema,
} from '../index';

describe('LearningPathInputSchema', () => {
  it('accepts a minimal valid input', () => {
    const result = LearningPathInputSchema.safeParse({
      role: 'Product Manager',
      tools: ['Claude'],
      goal: 'Ship a research agent',
      level: 'beginner',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty tools', () => {
    const result = LearningPathInputSchema.safeParse({
      role: 'Product Manager',
      tools: [],
      goal: 'Ship something',
      level: 'beginner',
    });
    expect(result.success).toBe(false);
  });

  it('rejects companyContext longer than 500 chars', () => {
    const result = LearningPathInputSchema.safeParse({
      role: 'Product Manager',
      tools: ['Claude'],
      goal: 'Ship',
      level: 'beginner',
      companyContext: 'x'.repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it('accepts companyContext at the 500-char boundary', () => {
    const result = LearningPathInputSchema.safeParse({
      role: 'Product Manager',
      tools: ['Claude'],
      goal: 'Ship',
      level: 'beginner',
      companyContext: 'x'.repeat(500),
    });
    expect(result.success).toBe(true);
  });
});

describe('LessonSchema', () => {
  it('rejects day=0 and day=31', () => {
    const base = {
      id: 'l_1',
      title: 't',
      summary: 's',
      tool: 'Claude',
      minutes: 12,
      kind: 'lesson' as const,
    };
    expect(LessonSchema.safeParse({ ...base, day: 0 }).success).toBe(false);
    expect(LessonSchema.safeParse({ ...base, day: 31 }).success).toBe(false);
    expect(LessonSchema.safeParse({ ...base, day: 1 }).success).toBe(true);
    expect(LessonSchema.safeParse({ ...base, day: 30 }).success).toBe(true);
  });
});

describe('WeekSchema', () => {
  it('requires at least one lesson', () => {
    const result = WeekSchema.safeParse({ index: 1, title: 'w', lessons: [] });
    expect(result.success).toBe(false);
  });
});

describe('LearningPathSchema', () => {
  it('requires exactly four weeks', () => {
    const validInput = {
      role: 'PM',
      tools: ['Claude'],
      goal: 'Ship',
      level: 'beginner' as const,
    };
    const week = (index: 1 | 2 | 3 | 4) => ({
      index,
      title: `Week ${index}`,
      lessons: [
        {
          id: `l_${index}`,
          day: index,
          title: 't',
          summary: 's',
          tool: 'Claude',
          minutes: 10,
          kind: 'lesson' as const,
        },
      ],
    });
    const base = {
      id: 'p_1',
      input: validInput,
      totalMinutes: 40,
      generatedAt: new Date().toISOString(),
    };

    expect(
      LearningPathSchema.safeParse({ ...base, weeks: [week(1), week(2), week(3)] }).success,
    ).toBe(false);
    expect(
      LearningPathSchema.safeParse({
        ...base,
        weeks: [week(1), week(2), week(3), week(4)],
      }).success,
    ).toBe(true);
  });
});
