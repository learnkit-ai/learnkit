import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Lesson } from '@learnkit-ai/schemas';
import { LessonCard } from '../LessonCard';

const LESSON: Lesson = {
  id: 'l_1',
  day: 1,
  title: 'Your first system prompt',
  summary: 'Write a system prompt for Claude.',
  tool: 'Claude',
  minutes: 12,
  kind: 'lesson',
  prerequisiteIds: [],
};

describe('LessonCard', () => {
  it('renders the lesson title and summary', () => {
    render(<LessonCard lesson={LESSON} />);
    expect(screen.getByText('Your first system prompt')).toBeInTheDocument();
    expect(screen.getByText('Write a system prompt for Claude.')).toBeInTheDocument();
  });

  it('shows day, kind, and duration', () => {
    render(<LessonCard lesson={LESSON} />);
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('lesson')).toBeInTheDocument();
    expect(screen.getByText('12m')).toBeInTheDocument();
  });

  it('calls onClick with the lesson when clicked and status is not locked', () => {
    const onClick = vi.fn();
    render(<LessonCard lesson={LESSON} status="available" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith(LESSON);
  });

  it('does not call onClick when status is locked', () => {
    const onClick = vi.fn();
    render(<LessonCard lesson={LESSON} status="locked" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disables the button when status is locked', () => {
    render(<LessonCard lesson={LESSON} status="locked" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not disable the button for available, in-progress, or completed status', () => {
    const statuses = ['available', 'in-progress', 'completed'] as const;
    for (const status of statuses) {
      const { unmount } = render(<LessonCard lesson={LESSON} status={status} />);
      expect(screen.getByRole('button')).not.toBeDisabled();
      unmount();
    }
  });
});
