import type { LearningPath, LearningPathProgress } from '@learnkit-ai/schemas';

export function computeProgress(
  path: LearningPath,
  completedLessonIds: string[],
): LearningPathProgress {
  const allIds = path.weeks.flatMap((w) => w.lessons.map((l) => l.id));
  const allIdSet = new Set(allIds);
  const validCompleted = completedLessonIds.filter((id) => allIdSet.has(id));
  const totalCount = allIds.length;
  const completedCount = validCompleted.length;

  return {
    pathId: path.id,
    completedLessonIds: validCompleted,
    completedCount,
    totalCount,
    percentComplete: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    updatedAt: new Date().toISOString(),
  };
}
