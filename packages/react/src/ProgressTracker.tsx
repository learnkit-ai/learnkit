'use client';

import { useState, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { generateLearningPath } from '@learnkit-ai/core';
import type { LearningPathInput, Lesson } from '@learnkit-ai/schemas';
import { LessonCard } from './LessonCard';
import type { LessonStatus } from './LessonCard';
import type { LearnKitTheme } from './LearningPath';
import { THEMES } from './LearningPath';

export interface ProgressTrackerProps {
  input: LearningPathInput;
  theme?: LearnKitTheme;
  onLessonClick?: (lesson: Lesson) => void;
  renderItem?: (lesson: Lesson, status: LessonStatus) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

function readStorage(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? (parsed as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeStorage(key: string, ids: Set<string>): void {
  try {
    window.localStorage.setItem(key, JSON.stringify([...ids]));
  } catch {
    // localStorage unavailable - progress not persisted
  }
}

function isEffectiveDone(lessonId: string, allLessons: Lesson[], completedIds: Set<string>): boolean {
  if (!completedIds.has(lessonId)) return false;
  const lesson = allLessons.find((l) => l.id === lessonId);
  if (!lesson) return false;
  return lesson.prerequisiteIds.every((pid) => isEffectiveDone(pid, allLessons, completedIds));
}

function deriveStatus(lesson: Lesson, allLessons: Lesson[], completedIds: Set<string>): LessonStatus {
  if (isEffectiveDone(lesson.id, allLessons, completedIds)) return 'completed';
  const prereqsMet = lesson.prerequisiteIds.every((pid) =>
    isEffectiveDone(pid, allLessons, completedIds),
  );
  if (!prereqsMet) return 'locked';
  const firstAvailable = allLessons.find(
    (l) =>
      !isEffectiveDone(l.id, allLessons, completedIds) &&
      l.prerequisiteIds.every((pid) => isEffectiveDone(pid, allLessons, completedIds)),
  );
  return lesson.id === firstAvailable?.id ? 'in-progress' : 'available';
}

export function ProgressTracker({
  input,
  theme = 'warm',
  onLessonClick,
  renderItem,
  className,
  style,
}: ProgressTrackerProps) {
  let path;
  let error: Error | null = null;
  try {
    path = generateLearningPath(input);
  } catch (e) {
    error = e instanceof Error ? e : new Error(String(e));
  }

  const storageKey = path ? `lk-progress-${path.id}` : '';

  const [completedIds, setCompletedIds] = useState<Set<string>>(() =>
    storageKey ? readStorage(storageKey) : new Set(),
  );

  const toggle = useCallback(
    (lesson: Lesson) => {
      setCompletedIds((prev) => {
        const next = new Set(prev);
        if (next.has(lesson.id)) {
          next.delete(lesson.id);
        } else {
          next.add(lesson.id);
        }
        writeStorage(storageKey, next);
        return next;
      });
      onLessonClick?.(lesson);
    },
    [storageKey, onLessonClick],
  );

  if (error || !path) {
    return (
      <div
        className={className}
        style={{
          padding: 16,
          borderRadius: 12,
          border: '1px solid rgba(200, 71, 42, 0.4)',
          background: 'rgba(200, 71, 42, 0.06)',
          color: '#C8472A',
          fontFamily:
            'var(--lk-font-sans, system-ui, -apple-system, "Segoe UI", sans-serif)',
          fontSize: 14,
          ...style,
        }}
      >
        {error?.message ?? 'Unable to generate learning path.'}
      </div>
    );
  }

  const allLessons = path.weeks.flatMap((w) => w.lessons);
  const allIds = allLessons.map((l) => l.id);
  const completedCount = allIds.filter((id) =>
    isEffectiveDone(id, allLessons, completedIds),
  ).length;

  return (
    <div
      className={className}
      style={{ ...THEMES[theme], display: 'flex', flexDirection: 'column', gap: 18, ...style }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily:
            'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--lk-muted)',
        }}
      >
        <span>
          {path.weeks.length} weeks · {allIds.length} lessons ·{' '}
          {Math.round(path.totalMinutes / 60)}h
        </span>
        <span>
          {completedCount}/{allIds.length} done
        </span>
      </div>

      {path.weeks.map((week) => (
        <section key={week.index} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h3
            style={{
              fontFamily: 'var(--lk-font-serif, Newsreader, Georgia, serif)',
              fontSize: 20,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              margin: 0,
              color: 'var(--lk-ink)',
            }}
          >
            <span
              style={{
                fontFamily:
                  'var(--lk-font-mono, ui-monospace, "SF Mono", "JetBrains Mono", monospace)',
                fontSize: 12,
                color: 'var(--lk-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginRight: 10,
              }}
            >
              Week {week.index}
            </span>
            {week.title}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {week.lessons.map((lesson) => {
              const status = deriveStatus(lesson, allLessons, completedIds);
              return renderItem ? (
                <div key={lesson.id}>{renderItem(lesson, status)}</div>
              ) : (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={status}
                  onClick={toggle}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
