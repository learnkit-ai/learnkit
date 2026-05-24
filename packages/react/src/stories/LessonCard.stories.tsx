import type { Meta, StoryObj } from '@storybook/react';
import type { Lesson } from '@learnkit-ai/schemas';
import { LessonCard } from '../LessonCard';

const LESSON: Lesson = {
  id: 'l_1',
  day: 1,
  title: 'Your first system prompt',
  summary: 'Write a system prompt for Claude that gives it a persona, a process, and constraints.',
  tool: 'Claude',
  minutes: 12,
  kind: 'lesson',
  prerequisiteIds: [],
};

const meta: Meta<typeof LessonCard> = {
  title: 'Components/LessonCard',
  component: LessonCard,
  args: { lesson: LESSON },
};
export default meta;
type Story = StoryObj<typeof LessonCard>;

export const Available: Story = { args: { status: 'available' } };
export const InProgress: Story = { args: { status: 'in-progress' } };
export const Completed: Story = { args: { status: 'completed' } };
export const Locked: Story = { args: { status: 'locked' } };
export const Project: Story = {
  args: {
    lesson: { ...LESSON, kind: 'project', title: 'Project: AI-assisted code review', minutes: 30 },
    status: 'available',
  },
};
export const Practicum: Story = {
  args: {
    lesson: {
      ...LESSON,
      kind: 'practicum',
      title: 'Earn the LearnKit AI Practitioner mark',
      minutes: 90,
    },
    status: 'available',
  },
};
