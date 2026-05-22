import {
  LearningPathInputSchema,
  type LearningPath,
  type LearningPathInput,
  type Lesson,
  type LessonKind,
  type Week,
} from '@learnkit-ai/schemas';
import { hashId } from './hash';
import { normalizeRole, type SupportedRole } from './roles';
import { normalizeTool } from './tools';

interface LessonTemplate {
  title: (ctx: { tool: string; role: string }) => string;
  summary: (ctx: { tool: string; role: string; goal: string }) => string;
  minutes: number;
  kind: LessonKind;
}

type WeekDef = { title: string; templates: LessonTemplate[] };

// ---------------------------------------------------------------------------
// Generic curriculum (fallback for all roles)
// ---------------------------------------------------------------------------

const GENERIC_WEEKS: WeekDef[] = [
  {
    title: 'Fundamentals',
    templates: [
      {
        title: () => 'Your first system prompt',
        summary: ({ tool, role }) =>
          `Write a system prompt for ${tool} that gives it a persona, a process, and constraints — tuned for the day-to-day work of a ${role}.`,
        minutes: 12,
        kind: 'lesson',
      },
      {
        title: () => 'When AI lies (and how to catch it)',
        summary: () =>
          'Refusal clauses, citation rules, and the smallest changes that stop your model from inventing facts.',
        minutes: 14,
        kind: 'lesson',
      },
      {
        title: ({ role }) => `Project: redesign a ${role.toLowerCase()} workflow`,
        summary: ({ tool, goal }) =>
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
          `Teach ${tool} to return JSON your code can rely on, call functions, and fail loudly when it cannot.`,
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
          `Take last week's prototype and harden it. Goal: ${goal}. Eval suite, monitoring, and a runbook for the next time it breaks.`,
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

// ---------------------------------------------------------------------------
// Role-specific curricula
// ---------------------------------------------------------------------------

const ROLE_WEEKS: Partial<Record<SupportedRole, WeekDef[]>> = {
  'Software Engineer': [
    {
      title: 'Prompt foundations',
      templates: [
        {
          title: () => 'System prompts that survive code review',
          summary: ({ tool }) =>
            `Write a ${tool} system prompt that is version-controlled, tested, and documented — the same bar you hold your code to.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Structured output: JSON you can actually deploy',
          summary: ({ tool }) =>
            `Make ${tool} return typed, validated JSON. Handle malformed responses without crashing. Integrate with your existing TypeScript or Python types.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted code review tool',
          summary: ({ tool, goal }) =>
            `Build a ${tool} prompt that reviews a diff and flags issues by severity. Practical scope: ${goal}. Ship it to your team Slack by Friday.`,
          minutes: 30,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Agentic workflows',
      templates: [
        {
          title: () => 'Tool use and function calling, properly',
          summary: ({ tool }) =>
            `Give ${tool} the ability to call real functions. Design a tool schema that is hard to misuse and easy to test.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Multi-step agents with state',
          summary: ({ tool }) =>
            `Build a ${tool} agent that plans a sequence of steps, executes them, and recovers from failures. Memory, context windows, and interrupts.`,
          minutes: 28,
          kind: 'lesson',
        },
        {
          title: () => 'Project: PR triage agent',
          summary: ({ goal }) =>
            `Build a small agent that reads open PRs, categorizes them by risk, and posts a summary. Scope: ${goal}. Ship to staging.`,
          minutes: 50,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Production & evals',
      templates: [
        {
          title: () => 'Writing evals that catch real failures',
          summary: () =>
            'A test suite for prompts, not just code. How to build eval cases that catch hallucinations, broken JSON, and off-topic responses before they reach prod.',
          minutes: 22,
          kind: 'lesson',
        },
        {
          title: () => 'Latency, cost, and caching in production',
          summary: ({ tool }) =>
            `Measure ${tool} latency in your stack. Cache prompt results where safe. Right-size context windows. Keep the bill under control.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Project: add AI to an existing endpoint',
          summary: ({ goal }) =>
            `Take a real endpoint in your codebase and add an AI layer — with evals, error handling, and a fallback. Goal: ${goal}.`,
          minutes: 60,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[3]!,
  ],

  'Product Manager': [
    {
      title: 'Discovery & framing',
      templates: [
        {
          title: () => 'Structuring a discovery brief with AI',
          summary: ({ tool }) =>
            `Use ${tool} to write a discovery brief that surfaces assumptions, maps stakeholders, and frames the problem — before a single engineer is in the room.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Interviewing users faster with AI synthesis',
          summary: ({ tool }) =>
            `Paste raw interview transcripts into ${tool}. Get a structured jobs-to-be-done summary, key quotes, and a draft "we heard" doc in minutes.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted PRD',
          summary: ({ tool, goal }) =>
            `Write a full PRD for a real feature using ${tool} as a first draft and critic. Scope: ${goal}. Share it with your team for review.`,
          minutes: 28,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Research workflows',
      templates: [
        {
          title: () => 'Competitive analysis at 10× speed',
          summary: ({ tool }) =>
            `Use ${tool} to scan competitor docs, pricing pages, and changelogs. Produce a structured matrix. Update it in minutes when a competitor ships.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Turning data into narrative',
          summary: ({ tool }) =>
            `Give ${tool} a table of numbers and a target audience. Get back the three-sentence story your exec presentation needs.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Project: sprint research package',
          summary: ({ goal }) =>
            `Build a research package for your next sprint: competitive context, user signals, and a ranked opportunity list. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Shipping with AI',
      templates: [
        {
          title: () => 'Spec-to-ticket with consistent language',
          summary: ({ tool }) =>
            `Use ${tool} to break a spec into well-formed tickets. Establish a format your engineers will actually accept without editing.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Using AI in retros and postmortems',
          summary: ({ tool }) =>
            `Feed your team's retro notes to ${tool}. Get a structured summary of themes, action items, and signals the team missed.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted go-to-market brief',
          summary: ({ goal }) =>
            `Write a go-to-market brief for a feature you are shipping. Use AI to pressure-test the positioning. Goal: ${goal}.`,
          minutes: 40,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[3]!,
  ],

  'Designer': [
    {
      title: 'AI for visual work',
      templates: [
        {
          title: () => 'Writing prompts that describe design intent',
          summary: ({ tool }) =>
            `Learn to write ${tool} prompts that describe UI intent, brand constraints, and accessibility requirements — not just visual descriptions.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Generating and stress-testing copy',
          summary: ({ tool }) =>
            `Use ${tool} to generate button labels, error states, and empty-state copy at scale. Then stress-test each variant against your tone of voice guide.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted component documentation',
          summary: ({ tool, goal }) =>
            `Use ${tool} to write usage guidelines for 5 components in your design system. Scope: ${goal}. Share with the engineering team.`,
          minutes: 28,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Generating & iterating',
      templates: [
        {
          title: () => 'From brief to concept in an hour',
          summary: ({ tool }) =>
            `Use ${tool} to generate 10 concept directions from a client brief. Present the three strongest with rationale — in the time it used to take to sketch one.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Using AI for user research synthesis',
          summary: ({ tool }) =>
            `Paste usability test notes into ${tool}. Get structured themes, severity ratings, and a ranked list of design issues to address.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Project: rapid design exploration',
          summary: ({ goal }) =>
            `Run a rapid exploration sprint: use AI to generate 5 directions for a real design problem. Present the best one with evidence. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[2]!,
    GENERIC_WEEKS[3]!,
  ],

  'Data Analyst': [
    {
      title: 'Data with AI',
      templates: [
        {
          title: () => 'Writing SQL with AI that you understand',
          summary: ({ tool }) =>
            `Use ${tool} to generate SQL queries — then review every line before running. Build the habit of AI-assisted, human-verified analysis.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Turning a raw dataset into a hypothesis',
          summary: ({ tool }) =>
            `Paste a CSV summary into ${tool}. Get back three testable hypotheses, each with a suggested query to validate it.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted weekly metrics report',
          summary: ({ tool, goal }) =>
            `Use ${tool} to write a weekly metrics narrative from raw numbers. Build a prompt you can reuse every week. Goal: ${goal}.`,
          minutes: 28,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Analysis pipelines',
      templates: [
        {
          title: () => 'Building repeatable analysis templates',
          summary: ({ tool }) =>
            `Create ${tool} prompt templates for your most common analysis patterns: cohort analysis, funnel drop-off, and metric anomaly investigation.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Data storytelling for non-technical stakeholders',
          summary: ({ tool }) =>
            `Give ${tool} a dashboard screenshot and an audience description. Get back the two-sentence insight that actually gets acted on in the exec meeting.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Project: root cause analysis with AI',
          summary: ({ goal }) =>
            `Run a full root cause analysis for a real metric drop. Use AI at each step: hypotheses, queries, synthesis. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[2]!,
    GENERIC_WEEKS[3]!,
  ],
};

// ---------------------------------------------------------------------------
// Level adjustments
// ---------------------------------------------------------------------------

const LEVEL_BIAS: Record<LearningPathInput['level'], number> = {
  beginner: 0,
  intermediate: -2,
  advanced: -4,
};

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

export function generateLearningPath(rawInput: LearningPathInput): LearningPath {
  const input = LearningPathInputSchema.parse(rawInput);
  const role = normalizeRole(input.role);
  const normalizedTools = input.tools
    .map((t) => normalizeTool(t) ?? t)
    .filter((t, i, arr) => arr.indexOf(t) === i);
  const primaryTool = normalizedTools[0] ?? 'Claude';
  const secondaryTool = normalizedTools[1] ?? primaryTool;

  const stableSeed = `${role}|${normalizedTools.join(',')}|${input.goal}|${input.level}`;

  const weeks = (ROLE_WEEKS[role] ?? GENERIC_WEEKS).map((w, wi) => {
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
    return { index: (wi + 1) as 1 | 2 | 3 | 4, title: w.title, lessons } satisfies Week;
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
    generatedAt: new Date(0).toISOString(),
  };
}
