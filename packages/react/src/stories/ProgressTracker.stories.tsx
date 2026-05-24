import type { Meta, StoryObj } from '@storybook/react';
import type { LearningPathInput, Lesson } from '@learnkit-ai/schemas';
import type { LessonStatus } from '../LessonCard';
import { ProgressTracker } from '../ProgressTracker';

const INPUT: LearningPathInput = {
  role: 'Product Manager',
  tools: ['Claude'],
  goal: 'Run an AI discovery sprint',
  level: 'beginner',
};

const meta: Meta<typeof ProgressTracker> = {
  title: 'Components/ProgressTracker',
  component: ProgressTracker,
  args: { input: INPUT },
};
export default meta;
type Story = StoryObj<typeof ProgressTracker>;

export const Warm: Story = { args: { theme: 'warm' } };
export const Midnight: Story = { args: { theme: 'midnight' } };
export const Technical: Story = { args: { theme: 'technical' } };
export const Light: Story = { args: { theme: 'light' } };
export const Headless: Story = {
  args: {
    renderItem: (lesson: Lesson, status: LessonStatus) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          marginBottom: '6px',
          background:
            status === 'completed' ? '#d1fae5' : status === 'locked' ? '#f3f4f6' : '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          opacity: status === 'locked' ? 0.5 : 1,
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ fontSize: '16px' }}>
          {status === 'completed' ? '✓' : status === 'in-progress' ? '▶' : '○'}
        </span>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>{lesson.title}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {lesson.kind} · {lesson.minutes}m · {status}
          </div>
        </div>
      </div>
    ),
  },
};
