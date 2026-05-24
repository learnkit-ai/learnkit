import type { Meta, StoryObj } from '@storybook/react';
import type { LearningPathInput, Lesson } from '@learnkit-ai/schemas';
import { LearningPath } from '../LearningPath';

const INPUT: LearningPathInput = {
  role: 'Software Engineer',
  tools: ['Claude'],
  goal: 'Build an AI code review tool',
  level: 'beginner',
};

const meta: Meta<typeof LearningPath> = {
  title: 'Components/LearningPath',
  component: LearningPath,
  args: { input: INPUT },
};
export default meta;
type Story = StoryObj<typeof LearningPath>;

export const Warm: Story = { args: { theme: 'warm' } };
export const Midnight: Story = { args: { theme: 'midnight' } };
export const Technical: Story = { args: { theme: 'technical' } };
export const Light: Story = { args: { theme: 'light' } };
export const Headless: Story = {
  args: {
    renderItem: (lesson: Lesson) => (
      <div
        style={{
          padding: '10px 12px',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          marginBottom: '6px',
          fontFamily: 'sans-serif',
        }}
      >
        <strong style={{ fontSize: '14px' }}>{lesson.title}</strong>
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
          {lesson.kind} · Day {lesson.day} · {lesson.minutes}m
        </div>
      </div>
    ),
  },
};
