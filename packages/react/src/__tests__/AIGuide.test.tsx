import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AIGuide } from '../AIGuide';

describe('AIGuide', () => {
  it('renders the message', () => {
    render(<AIGuide message="Need a hand with your first prompt?" />);
    expect(screen.getByText('Need a hand with your first prompt?')).toBeInTheDocument();
  });

  it('always shows the "AI Guide" label', () => {
    render(<AIGuide message="Hello" />);
    expect(screen.getByText('AI Guide')).toBeInTheDocument();
  });

  it('renders in all three sizes without throwing', () => {
    const { unmount } = render(<AIGuide message="sm" size="sm" />);
    unmount();
    render(<AIGuide message="md" size="md" />);
    unmount();
    render(<AIGuide message="lg" size="lg" />);
  });

  it('omits the keyframe style tag when animated=false', () => {
    const { container } = render(<AIGuide message="test" animated={false} />);
    expect(container.querySelector('style')).toBeNull();
  });

  it('includes the keyframe style tag when animated=true', () => {
    const { container } = render(<AIGuide message="test" animated={true} />);
    expect(container.querySelector('style')).not.toBeNull();
  });
});
