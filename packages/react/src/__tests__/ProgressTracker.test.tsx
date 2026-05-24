import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import type { LearningPathInput } from '@learnkit-ai/schemas';
import { ProgressTracker } from '../ProgressTracker';

const INPUT: LearningPathInput = {
  role: 'Software Engineer',
  tools: ['Claude'],
  goal: 'Ship an AI code review tool',
  level: 'beginner',
};

beforeEach(() => {
  localStorage.clear();
});

describe('ProgressTracker', () => {
  it('renders 4 week headings', () => {
    render(<ProgressTracker input={INPUT} />);
    expect(screen.getByText(/Week 1/)).toBeInTheDocument();
    expect(screen.getByText(/Week 4/)).toBeInTheDocument();
  });

  it('renders a completion count', () => {
    render(<ProgressTracker input={INPUT} />);
    expect(screen.getByText(/0\/12 done/i)).toBeInTheDocument();
  });

  it('marks a lesson completed when clicked', () => {
    render(<ProgressTracker input={INPUT} />);
    const buttons = screen.getAllByRole('button');
    // First button should be 'in-progress' (clickable)
    fireEvent.click(buttons[0]!);
    expect(screen.getByText(/1\/12 done/i)).toBeInTheDocument();
  });

  it('toggles completion off when a completed lesson is clicked', () => {
    render(<ProgressTracker input={INPUT} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]!);
    expect(screen.getByText(/1\/12 done/i)).toBeInTheDocument();
    fireEvent.click(buttons[0]!);
    expect(screen.getByText(/0\/12 done/i)).toBeInTheDocument();
  });

  it('calls onLessonClick when a lesson is clicked', () => {
    let clicked = false;
    render(<ProgressTracker input={INPUT} onLessonClick={() => { clicked = true; }} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]!);
    expect(clicked).toBe(true);
  });

  it('renders an error for invalid input', () => {
    const bad = { role: '', tools: [], goal: '', level: 'beginner' } as unknown as LearningPathInput;
    render(<ProgressTracker input={bad} />);
    expect(screen.getByText(/role is required|Invalid|Unable/i)).toBeInTheDocument();
  });

  it('renders without throwing for all three themes', () => {
    const themes = ['warm', 'midnight', 'technical'] as const;
    for (const theme of themes) {
      const { unmount } = render(<ProgressTracker input={INPUT} theme={theme} />);
      unmount();
    }
  });
});
