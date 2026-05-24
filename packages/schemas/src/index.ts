import { z } from 'zod';

/**
 * LearnKit AI — Zod schemas and inferred TypeScript types.
 * Apache-2.0. https://learnkit-ai.com
 */

export const LevelSchema = z.enum(['beginner', 'intermediate', 'advanced']);
export type Level = z.infer<typeof LevelSchema>;

export const LearningPathInputSchema = z.object({
  role: z.string().min(1, 'role is required'),
  tools: z.array(z.string()).min(1, 'at least one tool is required'),
  goal: z.string().min(1, 'goal is required'),
  level: LevelSchema,
  companyContext: z.string().max(500, 'companyContext must be 500 characters or fewer').optional(),
});
export type LearningPathInput = z.infer<typeof LearningPathInputSchema>;

export const LessonKindSchema = z.enum(['lesson', 'project', 'practicum']);
export type LessonKind = z.infer<typeof LessonKindSchema>;

export const LessonSchema = z.object({
  id: z.string(),
  day: z.number().int().min(1).max(30),
  title: z.string(),
  summary: z.string(),
  tool: z.string(),
  minutes: z.number().int().min(1),
  kind: LessonKindSchema,
  prerequisiteIds: z.array(z.string()),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const WeekSchema = z.object({
  index: z.number().int().min(1).max(4),
  title: z.string(),
  lessons: z.array(LessonSchema).min(1),
});
export type Week = z.infer<typeof WeekSchema>;

export const LearningPathSchema = z.object({
  id: z.string(),
  input: LearningPathInputSchema,
  weeks: z.array(WeekSchema).length(4),
  totalMinutes: z.number().int().min(1),
  generatedAt: z.string().datetime(),
});
export type LearningPath = z.infer<typeof LearningPathSchema>;

export const ExerciseSchema = z.object({
  prompt: z.string(),
  expectedOutput: z.string(),
  rubricHint: z.string(),
});
export type Exercise = z.infer<typeof ExerciseSchema>;

export const RubricItemSchema = z.object({
  criterion: z.string(),
  excellent: z.string(),
  acceptable: z.string(),
  needsWork: z.string(),
});
export type RubricItem = z.infer<typeof RubricItemSchema>;

export const LessonContentSchema = z.object({
  lessonId: z.string(),
  body: z.string(),
  exercises: z.array(ExerciseSchema).min(1).max(5),
  rubric: z.array(RubricItemSchema).min(1).max(5),
});
export type LessonContent = z.infer<typeof LessonContentSchema>;

export const LearningPathProgressSchema = z.object({
  pathId: z.string(),
  completedLessonIds: z.array(z.string()),
  updatedAt: z.string().datetime(),
});
export type LearningPathProgress = z.infer<typeof LearningPathProgressSchema>;
