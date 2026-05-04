import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import {
  levelSchema,
  lessonSchema,
  learningPathSchema,
  learningPathInputSchema,
} from '../index.js'

describe('levelSchema', () => {
  it('accepts valid levels', () => {
    expect(levelSchema.parse('beginner')).toBe('beginner')
    expect(levelSchema.parse('intermediate')).toBe('intermediate')
    expect(levelSchema.parse('advanced')).toBe('advanced')
  })

  it('rejects invalid level', () => {
    expect(() => levelSchema.parse('expert')).toThrow(ZodError)
  })
})

describe('lessonSchema', () => {
  const valid = {
    id: 'lesson-1',
    title: 'Introduction to AI prompting',
    duration: '8 min',
    difficulty: 'Beginner' as const,
    why: 'Prompting is the core skill.',
    practice: 'Write three prompts for your daily task.',
    expectedOutcome: 'You can write a clear prompt.',
    tools: ['Claude'],
    role: 'Product Manager',
  }

  it('accepts valid lesson', () => {
    expect(lessonSchema.parse(valid)).toEqual(valid)
  })

  it('rejects missing required field', () => {
    const { title: _title, ...withoutTitle } = valid
    expect(() => lessonSchema.parse(withoutTitle)).toThrow(ZodError)
  })
})

describe('learningPathSchema', () => {
  const valid = {
    id: 'path-abc123',
    title: 'AI for Product Managers',
    summary: 'Learn to ship AI features with confidence.',
    durationDays: 30,
    lessons: [],
    outcomes: ['Write effective prompts', 'Ship an AI feature'],
  }

  it('accepts valid path', () => {
    expect(learningPathSchema.parse(valid)).toEqual(valid)
  })

  it('rejects non-positive durationDays', () => {
    expect(() => learningPathSchema.parse({ ...valid, durationDays: 0 })).toThrow(ZodError)
    expect(() => learningPathSchema.parse({ ...valid, durationDays: -1 })).toThrow(ZodError)
  })
})

describe('learningPathInputSchema', () => {
  const valid = {
    role: 'Product Manager',
    tools: ['Cursor', 'Claude'],
    goal: 'ship AI features faster',
    level: 'beginner' as const,
  }

  it('accepts valid input', () => {
    expect(learningPathInputSchema.parse(valid)).toEqual(valid)
  })

  it('accepts optional companyContext', () => {
    const result = learningPathInputSchema.parse({ ...valid, companyContext: 'B2B SaaS' })
    expect(result.companyContext).toBe('B2B SaaS')
  })

  it('rejects empty role', () => {
    expect(() => learningPathInputSchema.parse({ ...valid, role: '' })).toThrow(ZodError)
  })

  it('rejects empty tools array', () => {
    expect(() => learningPathInputSchema.parse({ ...valid, tools: [] })).toThrow(ZodError)
  })

  it('rejects companyContext over 500 chars', () => {
    expect(() =>
      learningPathInputSchema.parse({ ...valid, companyContext: 'x'.repeat(501) }),
    ).toThrow(ZodError)
  })

  it('accepts companyContext at exactly 500 chars', () => {
    const result = learningPathInputSchema.parse({ ...valid, companyContext: 'x'.repeat(500) })
    expect(result.companyContext?.length).toBe(500)
  })
})
