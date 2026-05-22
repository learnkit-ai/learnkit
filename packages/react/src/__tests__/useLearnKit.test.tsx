import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { LearningPathInput } from '@learnkit-ai/schemas';
import { useLearnKit } from '../useLearnKit';

const INPUT: LearningPathInput = {
  role: 'Software Engineer',
  tools: ['Claude', 'Cursor'],
  goal: 'ship a research agent',
  level: 'beginner',
};

describe('useLearnKit', () => {
  it('returns a LearningPath when given valid input', () => {
    const { result } = renderHook(() => useLearnKit(INPUT));
    expect(result.current.path).not.toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('path has 4 weeks', () => {
    const { result } = renderHook(() => useLearnKit(INPUT));
    expect(result.current.path?.weeks).toHaveLength(4);
  });

  it('returns null path and no error when input is null', () => {
    const { result } = renderHook(() => useLearnKit(null));
    expect(result.current.path).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('returns an error for invalid input', () => {
    const bad = { role: '', tools: [], goal: '', level: 'beginner' } as unknown as LearningPathInput;
    const { result } = renderHook(() => useLearnKit(bad));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.path).toBeNull();
  });

  it('is deterministic — same input returns identical path id', () => {
    const { result: a } = renderHook(() => useLearnKit(INPUT));
    const { result: b } = renderHook(() => useLearnKit({ ...INPUT }));
    expect(a.current.path?.id).toBe(b.current.path?.id);
  });
});
