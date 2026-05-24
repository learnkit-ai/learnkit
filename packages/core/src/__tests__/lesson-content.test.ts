import { describe, expect, it } from 'vitest';
import { generateLearningPath, generateLessonContent } from '../index';
import type { LearningPathInput } from '@learnkit-ai/schemas';

const SAMPLE: LearningPathInput = {
  role: 'Software Engineer',
  tools: ['Claude'],
  goal: 'Build an AI code review tool',
  level: 'intermediate',
};

function getFirstLesson() {
  const path = generateLearningPath(SAMPLE);
  return path.weeks[0]!.lessons[0]!;
}

describe('generateLessonContent', () => {
  it('returns a LessonContent with the correct lessonId', () => {
    const lesson = getFirstLesson();
    const content = generateLessonContent(lesson);
    expect(content.lessonId).toBe(lesson.id);
  });

  it('returns a non-empty body string', () => {
    const lesson = getFirstLesson();
    const content = generateLessonContent(lesson);
    expect(content.body.length).toBeGreaterThan(50);
  });

  it('returns at least one exercise', () => {
    const lesson = getFirstLesson();
    const content = generateLessonContent(lesson);
    expect(content.exercises.length).toBeGreaterThanOrEqual(1);
  });

  it('returns at least one rubric item', () => {
    const lesson = getFirstLesson();
    const content = generateLessonContent(lesson);
    expect(content.rubric.length).toBeGreaterThanOrEqual(1);
  });

  it('is deterministic — same lesson always returns the same content', () => {
    const lesson = getFirstLesson();
    const a = generateLessonContent(lesson);
    const b = generateLessonContent(lesson);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('body references the lesson tool', () => {
    const lesson = getFirstLesson();
    const content = generateLessonContent(lesson);
    expect(content.body.toLowerCase()).toContain('claude');
  });

  it('generates content for project lessons', () => {
    const path = generateLearningPath(SAMPLE);
    const project = path.weeks.flatMap((w) => w.lessons).find((l) => l.kind === 'project');
    expect(project).toBeDefined();
    const content = generateLessonContent(project!);
    expect(content.body).toMatch(/deliver|ship|project/i);
    expect(content.exercises[0]!.prompt).toMatch(/brief|project/i);
  });

  it('generates content for practicum lessons', () => {
    const path = generateLearningPath(SAMPLE);
    const practicum = path.weeks.flatMap((w) => w.lessons).find((l) => l.kind === 'practicum');
    expect(practicum).toBeDefined();
    const content = generateLessonContent(practicum!);
    expect(content.body).toMatch(/portfolio|practicum/i);
  });

  it('each exercise has prompt, expectedOutput, and rubricHint', () => {
    const lesson = getFirstLesson();
    const content = generateLessonContent(lesson);
    for (const ex of content.exercises) {
      expect(ex.prompt.length).toBeGreaterThan(10);
      expect(ex.expectedOutput.length).toBeGreaterThan(10);
      expect(ex.rubricHint.length).toBeGreaterThan(10);
    }
  });

  it('each rubric item has excellent, acceptable, and needsWork', () => {
    const lesson = getFirstLesson();
    const content = generateLessonContent(lesson);
    for (const item of content.rubric) {
      expect(item.criterion.length).toBeGreaterThan(0);
      expect(item.excellent.length).toBeGreaterThan(10);
      expect(item.acceptable.length).toBeGreaterThan(10);
      expect(item.needsWork.length).toBeGreaterThan(10);
    }
  });
});
