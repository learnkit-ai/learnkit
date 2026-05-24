import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { generateLearningPath } from '@learnkit-ai/core';
import type { LearningPathInput } from '@learnkit-ai/schemas';
import { LessonDetail } from '../LessonDetail';

const INPUT: LearningPathInput = {
  role: 'Software Engineer',
  tools: ['Claude'],
  goal: 'Build an AI code review tool',
  level: 'intermediate',
};

function getFirstLesson() {
  return generateLearningPath(INPUT).weeks[0]!.lessons[0]!;
}

describe('LessonDetail', () => {
  it('renders the lesson title', () => {
    const lesson = getFirstLesson();
    render(<LessonDetail lesson={lesson} />);
    expect(screen.getByText(lesson.title)).toBeInTheDocument();
  });

  it('renders the lesson kind badge', () => {
    const lesson = getFirstLesson();
    render(<LessonDetail lesson={lesson} />);
    expect(screen.getByText(lesson.kind)).toBeInTheDocument();
  });

  it('renders exercises section', () => {
    const lesson = getFirstLesson();
    render(<LessonDetail lesson={lesson} />);
    expect(screen.getByText(/Exercises/i)).toBeInTheDocument();
    expect(screen.getByText(/Exercise 1/i)).toBeInTheDocument();
  });

  it('renders rubric section', () => {
    const lesson = getFirstLesson();
    render(<LessonDetail lesson={lesson} />);
    expect(screen.getByText(/^Rubric$/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^Excellent$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Needs work$/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders without throwing for a project lesson', () => {
    const path = generateLearningPath(INPUT);
    const project = path.weeks.flatMap((w) => w.lessons).find((l) => l.kind === 'project');
    expect(project).toBeDefined();
    const { container } = render(<LessonDetail lesson={project!} />);
    expect(container).toBeTruthy();
  });

  it('renders without throwing for a practicum lesson', () => {
    const path = generateLearningPath(INPUT);
    const practicum = path.weeks.flatMap((w) => w.lessons).find((l) => l.kind === 'practicum');
    expect(practicum).toBeDefined();
    const { container } = render(<LessonDetail lesson={practicum!} />);
    expect(container).toBeTruthy();
  });

  it('renders without throwing for all four themes', () => {
    const lesson = getFirstLesson();
    const themes = ['warm', 'midnight', 'technical', 'light'] as const;
    for (const theme of themes) {
      const { unmount } = render(<LessonDetail lesson={lesson} theme={theme} />);
      unmount();
    }
  });
});
