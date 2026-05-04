import { z } from 'zod'

export const levelSchema = z.enum(['beginner', 'intermediate', 'advanced'])
export type Level = z.infer<typeof levelSchema>

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  why: z.string(),
  practice: z.string(),
  expectedOutcome: z.string(),
  tools: z.array(z.string()),
  role: z.string(),
})
export type Lesson = z.infer<typeof lessonSchema>

export const learningPathSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  durationDays: z.number().int().positive(),
  lessons: z.array(lessonSchema),
  outcomes: z.array(z.string()),
})
export type LearningPath = z.infer<typeof learningPathSchema>

export const learningPathInputSchema = z.object({
  role: z.string().min(1),
  tools: z.array(z.string()).min(1),
  goal: z.string().min(1),
  level: levelSchema,
  companyContext: z.string().max(500).optional(),
})
export type LearningPathInput = z.infer<typeof learningPathInputSchema>
