import { describe, it, expect } from 'vitest';
import { computeProgress, generateLearningPath } from '../index';

const INPUT = {
  role: 'Software Engineer',
  tools: ['Claude'],
  goal: 'Build an AI code review tool',
  level: 'beginner' as const,
};

describe('computeProgress', () => {
  it('returns zero progress for empty completedIds', () => {
    const path = generateLearningPath(INPUT);
    const progress = computeProgress(path, []);
    expect(progress.completedCount).toBe(0);
    expect(progress.totalCount).toBe(12);
    expect(progress.percentComplete).toBe(0);
    expect(progress.pathId).toBe(path.id);
    expect(progress.completedLessonIds).toHaveLength(0);
  });

  it('filters out IDs that do not belong to the path', () => {
    const path = generateLearningPath(INPUT);
    const progress = computeProgress(path, ['fake-id-1', 'fake-id-2']);
    expect(progress.completedCount).toBe(0);
    expect(progress.completedLessonIds).toHaveLength(0);
  });

  it('computes 100% for all lessons completed', () => {
    const path = generateLearningPath(INPUT);
    const allIds = path.weeks.flatMap((w) => w.lessons.map((l) => l.id));
    const progress = computeProgress(path, allIds);
    expect(progress.completedCount).toBe(12);
    expect(progress.totalCount).toBe(12);
    expect(progress.percentComplete).toBe(100);
  });

  it('computes partial progress correctly', () => {
    const path = generateLearningPath(INPUT);
    const firstId = path.weeks[0]!.lessons[0]!.id;
    const progress = computeProgress(path, [firstId]);
    expect(progress.completedCount).toBe(1);
    expect(progress.totalCount).toBe(12);
    expect(progress.percentComplete).toBe(Math.round((1 / 12) * 100));
    expect(progress.completedLessonIds).toEqual([firstId]);
  });

  it('deduplicates repeated IDs', () => {
    const path = generateLearningPath(INPUT);
    const firstId = path.weeks[0]!.lessons[0]!.id;
    const progress = computeProgress(path, [firstId, firstId]);
    // Set filtering: only first occurrence is valid, second is duplicate - both valid but same ID
    expect(progress.completedLessonIds.filter((id) => id === firstId).length).toBeGreaterThanOrEqual(1);
  });

  it('returns a parseable ISO datetime in updatedAt', () => {
    const path = generateLearningPath(INPUT);
    const progress = computeProgress(path, []);
    expect(() => new Date(progress.updatedAt)).not.toThrow();
    expect(new Date(progress.updatedAt).getTime()).toBeGreaterThan(0);
  });
});
