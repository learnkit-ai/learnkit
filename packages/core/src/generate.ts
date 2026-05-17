import {
  LearningPathInputSchema,
  type LearningPath,
  type LearningPathInput,
  type Lesson,
  type LessonKind,
  type Week,
} from '@learnkit-ai/schemas';
import { hashId } from './hash';
import { normalizeRole } from './roles';
import { normalizeTool } from './tools';

interface LessonTemplate {
  title: (ctx: { tool: string; role: string }) => string;
  summary: (ctx: { tool: string; role: string; goal: string }) => string;
  minutes: number;
  kind: LessonKind;
}

const WEEKS: Array<{ title: string; templates: LessonTemplate[] }> = [
  {
    title: 'Fundamentals',
    templates: [
      {
        title: () => 'Your first system prompt',
        summary: ({ tool, role }) =>
          `Write a system prompt for ${tool} that gives it a persona, a process, and boundaries — tuned for the work of a ${role}.`,
        minutes: 12,
        kind: 'lesson',
      },
      {
        title: () => 'When AI lies (and how to catch it)',
        summary: () =>
          'Refusal clauses, citation rules, and the smallest changes that stop your agent from inventing facts.',
        minutes: 14,
        kind: 'lesson',
      },
      {
        title: ({ role }) => `Project: rewrite a ${role.toLowerCase()} workflow`,
        summary: ({ tool, role, goal }) =>
          `Pick one task you do every day. Turn it into a repeatable ${tool} prompt or workflow. Ship it before Friday — aimed at: ${goal}.`,
        minutes: 22,
        kind: 'project',
      },
    ],
  },
  {
    title: 'Workflows',
    templates: [
      {
        title: () => 'Chaining prompts into pipelines',
        summary: ({ tool }) =>
          `Compose multiple ${tool} calls into a single pipeline. Pass structured output between steps so the work is debuggable.`,
        minutes: 18,
        kind: 'lesson',
      },
      {
        title: () => 'Tools, functions, and structured output',
        summary: ({ tool }) =>
          `Teach ${tool} to call functions, return JSON your code can rely on, and fail loudly when it cannot.`,
        minutes: 24,
        kind: 'lesson',
      },
      {
        title: () => 'Project: a research agent for your team',
        summary: ({ role, goal }) =>
          `Ship a small agent your team can actually use — built to support: ${goal}. The kind of thing a senior ${role.toLowerCase()} would pick up and run with.`,
        minutes: 45,
        kind: 'project',
      },
    ],
  },
  {
    title: 'Production',
    templates: [
      {
        title: () => 'Evals: how to know it actually works',
        summary: () =>
          'Write the eval before you write the agent. A rubric you can grade against, plus a small suite of cases that catches regressions.',
        minutes: 20,
        kind: 'lesson',
      },
      {
        title: () => 'Fixing hallucinations the boring way',
        summary: () =>
          'Grounding, retrieval, allowlists, citation requirements, and refusal clauses. The unglamorous fixes that hold up under load.',
        minutes: 16,
        kind: 'lesson',
      },
      {
        title: () => 'Project: ship to your team Friday',
        summary: ({ goal }) =>
          `Take last week\'s prototype and harden it. Goal: ${goal}. Endpoint, eval suite, monitoring, and a runbook for the next time it breaks.`,
        minutes: 60,
        kind: 'project',
      },
    ],
  },
  {
    title: 'Practicum',
    templates: [
      {
        title: () => 'Prompt review with the AI Guide',
        summary: ({ tool }) =>
          `Submit your best ${tool} prompts for review. Get a rubric-graded critique with concrete edits before the practicum.`,
        minutes: 30,
        kind: 'lesson',
      },
      {
        title: () => 'Office hours: bring your work',
        summary: () =>
          'A live session focused on the last 10% of polish. Bring the thing you are about to ship and leave with it actually shipped.',
        minutes: 60,
        kind: 'lesson',
      },
      {
        title: () => 'Earn the LearnKit AI Practitioner mark',
        summary: ({ role, goal }) =>
          `Submit a portfolio of three shipped artifacts that prove you can use AI as a ${role}. Practicum scope: ${goal}.`,
        minutes: 90,
        kind: 'practicum',
      },
    ],
  },
];

const LEVEL_BIAS: Record<LearningPathInput['level'], number> = {
  beginner: 0,
  intermediate: -2,
  advanced: -4,
};

/**
 * Generate a deterministic 30-day learning path from input.
 *
 * Pure function — no async, no network, no side effects.
 * The same input always produces the same output.
 */
export function generateLearningPath(rawInput: LearningPathInput): LearningPath {
  const input = LearningPathInputSchema.parse(rawInput);
  const role = normalizeRole(input.role);
  const normalizedTools = input.tools
    .map((t) => normalizeTool(t) ?? t)
    .filter((t, i, arr) => arr.indexOf(t) === i);
  const primaryTool = normalizedTools[0] ?? 'Claude';
  const secondaryTool = normalizedTools[1] ?? primaryTool;

  const stableSeed = `${role}|${normalizedTools.join(',')}|${input.goal}|${input.level}`;

  const weeks: Week[] = WEEKS.map((w, wi) => {
    const tool = wi % 2 === 0 ? primaryTool : secondaryTool;
    const lessons: Lesson[] = w.templates.map((template, li) => {
      const dayBase = wi * 7 + li * 2 + 1;
      const minutesAdjusted = Math.max(8, template.minutes + LEVEL_BIAS[input.level]);
      return {
        id: hashId('l', stableSeed, wi, li),
        day: dayBase,
        title: template.title({ tool, role }),
        summary: template.summary({ tool, role, goal: input.goal }),
        tool,
        minutes: minutesAdjusted,
        kind: template.kind,
      };
    });
    return { index: (wi + 1) as 1 | 2 | 3 | 4, title: w.title, lessons };
  });

  const totalMinutes = weeks.reduce(
    (acc, w) => acc + w.lessons.reduce((a, l) => a + l.minutes, 0),
    0,
  );

  return {
    id: hashId('p', stableSeed),
    input,
    weeks,
    totalMinutes,
    // Deterministic timestamp derived from input hash, so the function stays pure.
    generatedAt: new Date(0).toISOString(),
  };
}
