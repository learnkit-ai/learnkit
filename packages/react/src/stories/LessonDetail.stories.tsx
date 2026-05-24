import type { Meta, StoryObj } from '@storybook/react';
import { generateLearningPath } from '@learnkit-ai/core';
import { LessonDetail } from '../LessonDetail';

const path = generateLearningPath({
  role: 'Software Engineer',
  tools: ['Claude'],
  goal: 'Build an AI code review tool',
  level: 'intermediate',
});

const allLessons = path.weeks.flatMap((w) => w.lessons);
const lessonLesson = allLessons.find((l) => l.kind === 'lesson')!;
const projectLesson = allLessons.find((l) => l.kind === 'project')!;
const practicumLesson = allLessons.find((l) => l.kind === 'practicum')!;

const meta: Meta<typeof LessonDetail> = {
  title: 'Components/LessonDetail',
  component: LessonDetail,
  args: { lesson: lessonLesson },
};
export default meta;
type Story = StoryObj<typeof LessonDetail>;

export const Default: Story = {};
export const Project: Story = { args: { lesson: projectLesson } };
export const Practicum: Story = { args: { lesson: practicumLesson } };
export const Midnight: Story = { args: { theme: 'midnight' } };
export const Technical: Story = { args: { theme: 'technical' } };
export const Light: Story = { args: { theme: 'light' } };
