'use client';

import { useMemo } from 'react';
import { generateLearningPath } from '@learnkit-ai/core';
import type { LearningPath, LearningPathInput } from '@learnkit-ai/schemas';

export interface UseLearnKitResult {
  path: LearningPath | null;
  loading: false;
  error: Error | null;
}

/**
 * useLearnKit — synchronous, deterministic. The path is computed from input on render.
 * Loading state is always false because `generateLearningPath` is pure.
 */
export function useLearnKit(input: LearningPathInput | null | undefined): UseLearnKitResult {
  return useMemo(() => {
    if (!input) return { path: null, loading: false, error: null };
    try {
      const path = generateLearningPath(input);
      return { path, loading: false, error: null };
    } catch (err) {
      return {
        path: null,
        loading: false,
        error: err instanceof Error ? err : new Error(String(err)),
      };
    }
  }, [input]);
}
