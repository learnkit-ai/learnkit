import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { LearningPathInput } from '@learnkit-ai/schemas';
import { LearningPath } from '../LearningPath';

const INPUT: LearningPathInput = {
  role: 'Product Manager',
  tools: ['Claude'],
  goal: 'run an AI discovery sprint',
  level: 'beginner',
};

describe('LearningPath', () => {
  it('renders 4 week headings', () => {
    render(<LearningPath input={INPUT} />);
    expect(screen.getByText(/Week 1/)).toBeInTheDocument();
    expect(screen.getByText(/Week 2/)).toBeInTheDocument();
    expect(screen.getByText(/Week 3/)).toBeInTheDocument();
    expect(screen.getByText(/Week 4/)).toBeInTheDocument();
  });

  it('renders 12 lesson cards total (4 weeks × 3 lessons)', () => {
    render(<LearningPath input={INPUT} />);
    expect(screen.getAllByRole('button')).toHaveLength(12);
  });

  it('renders an error message for invalid input', () => {
    const bad = { role: '', tools: [], goal: '', level: 'beginner' } as unknown as LearningPathInput;
    render(<LearningPath input={bad} />);
    expect(screen.getByText(/Invalid LearningPathInput/)).toBeInTheDocument();
  });

  it('renders without throwing for all three themes', () => {
    const themes = ['warm', 'midnight', 'technical'] as const;
    for (const theme of themes) {
      const { unmount } = render(<LearningPath input={INPUT} theme={theme} />);
      unmount();
    }
  });

  it('shows lesson count summary line', () => {
    render(<LearningPath input={INPUT} />);
    expect(screen.getByText(/4 weeks/)).toBeInTheDocument();
    expect(screen.getByText(/12 lessons/)).toBeInTheDocument();
  });
});
