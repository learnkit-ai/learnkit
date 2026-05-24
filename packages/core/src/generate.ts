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

  'Marketer': [
    {
      title: 'Copy & content',
      templates: [
        {
          title: () => 'Writing brand-consistent copy with AI',
          summary: ({ tool }) =>
            `Build a ${tool} prompt that internalizes your brand voice, audience, and taboo words. Use it to produce first drafts that need editing, not rewriting.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Repurposing one asset into ten',
          summary: ({ tool }) =>
            `Take a blog post or webinar transcript and use ${tool} to spin it into a Twitter thread, three LinkedIn posts, an email nurture, and a one-pager — in under an hour.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-generated campaign brief',
          summary: ({ tool, goal }) =>
            `Write a campaign brief using ${tool}: audience, message, channels, and success metrics. Have it pressure-tested against your brand guidelines. Goal: ${goal}.`,
          minutes: 30,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Research & intelligence',
      templates: [
        {
          title: () => 'Audience research at scale',
          summary: ({ tool }) =>
            `Use ${tool} to synthesize Reddit threads, review sites, and social mentions into a structured portrait of what your audience actually worries about.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Competitive positioning in 30 minutes',
          summary: ({ tool }) =>
            `Feed competitor landing pages and messaging into ${tool}. Identify positioning gaps and get a draft differentiation statement your team can pressure-test.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: messaging matrix',
          summary: ({ goal }) =>
            `Build a full messaging matrix: audience segments, jobs-to-be-done, proof points, and objection handles — researched and drafted with AI. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Campaigns & automation',
      templates: [
        {
          title: () => 'Building an AI-assisted email sequence',
          summary: ({ tool }) =>
            `Use ${tool} to draft a 5-email nurture sequence. Define personas and triggers up front so every email lands in context — not in the bin.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'SEO content at scale without sacrificing quality',
          summary: ({ tool }) =>
            `Use ${tool} to generate content briefs from keyword clusters, then draft outlines you edit rather than write. Keep the brand voice tight across every piece.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Project: automated campaign reporting',
          summary: ({ goal }) =>
            `Build a prompt that turns raw campaign metrics into a one-page performance narrative for your stakeholders — every week, in minutes. Goal: ${goal}.`,
          minutes: 40,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[3]!,
  ],

  'Founder': [
    {
      title: 'Strategy & decisions',
      templates: [
        {
          title: () => 'Using AI as a thinking partner',
          summary: ({ tool }) =>
            `Learn to use ${tool} as a sounding board that pushes back. Write prompts that force the model to steelman your plan, then attack it — before the market does.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Rapid market validation with AI',
          summary: ({ tool }) =>
            `Use ${tool} to synthesize your target market's pain points from public signals: job postings, forums, reviews. Get to a hypothesis before spending a dollar on ads.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted business model stress-test',
          summary: ({ tool, goal }) =>
            `Write your current business model in one page. Use ${tool} to identify the three assumptions that kill it if wrong. Goal: ${goal}.`,
          minutes: 30,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Operating faster',
      templates: [
        {
          title: () => 'Delegating writing to AI without losing your voice',
          summary: ({ tool }) =>
            `Build a ${tool} persona that writes in your voice — for investor updates, hiring emails, and team memos. Train it with 5 examples before you trust it.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Automating founder-mode research',
          summary: ({ tool }) =>
            `Use ${tool} to produce weekly competitive intelligence, funding round summaries, and hiring market signals — in the time it used to take to read one newsletter.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-powered investor memo',
          summary: ({ goal }) =>
            `Draft a one-page investor memo with AI: traction, market, team, and ask — structured and pressure-tested for the objections you hear most. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Building with AI',
      templates: [
        {
          title: () => 'Prototyping with AI before writing a line of code',
          summary: ({ tool }) =>
            `Use ${tool} to draft UX flows, API contracts, and user stories. Validate the product with words and diagrams before a single sprint is planned.`,
          minutes: 22,
          kind: 'lesson',
        },
        {
          title: () => 'Hiring and culture at AI speed',
          summary: ({ tool }) =>
            `Use ${tool} to write job descriptions, structure interviews, and draft offer letters that reflect your actual culture — not the generic startup template.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: 90-day operating plan',
          summary: ({ goal }) =>
            `Write a 90-day operating plan: goals, experiments, metrics, and the kill criteria for each bet — drafted with AI, owned by you. Goal: ${goal}.`,
          minutes: 50,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[3]!,
  ],

  'Operations': [
    {
      title: 'Process & documentation',
      templates: [
        {
          title: () => 'Writing SOPs that people actually follow',
          summary: ({ tool }) =>
            `Use ${tool} to rewrite a tangled internal process as a clear, step-by-step SOP. Test it with a new hire before publishing.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Turning meetings into structured outputs',
          summary: ({ tool }) =>
            `Feed raw meeting notes into ${tool}. Get back a structured decision log, action items with owners, and a one-paragraph summary — in 90 seconds.`,
          minutes: 12,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted process audit',
          summary: ({ tool, goal }) =>
            `Pick one recurring process and document it end-to-end with ${tool}'s help. Identify bottlenecks and propose one AI-assisted improvement. Goal: ${goal}.`,
          minutes: 28,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Scaling with AI',
      templates: [
        {
          title: () => 'Building a team knowledge base with AI',
          summary: ({ tool }) =>
            `Use ${tool} to draft, organise, and cross-link your team's knowledge base from scattered docs, Slack threads, and Notion pages.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Vendor and contract analysis at speed',
          summary: ({ tool }) =>
            `Use ${tool} to extract key terms, obligations, and risks from contracts. Build a prompt that surfaces the three things your legal team should actually read.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted onboarding programme',
          summary: ({ goal }) =>
            `Build a week-one onboarding programme: schedule, readings, checkpoints, and a 30-60-90 plan — structured and drafted with AI. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Metrics & reporting',
      templates: [
        {
          title: () => 'Automating weekly ops reporting',
          summary: ({ tool }) =>
            `Build a ${tool} prompt that turns your weekly ops data into a structured stakeholder report: what happened, what it means, and what comes next.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Risk identification and escalation',
          summary: ({ tool }) =>
            `Use ${tool} to scan project updates and flag risks before they become incidents. Build a lightweight signal-to-escalation workflow your team can run daily.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: ops dashboard narrative',
          summary: ({ goal }) =>
            `Write a monthly ops narrative that translates your key metrics into leadership language — built with AI, signed off by you. Goal: ${goal}.`,
          minutes: 35,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[3]!,
  ],

  'Researcher': [
    {
      title: 'Research & synthesis',
      templates: [
        {
          title: () => 'Literature review at 10× speed',
          summary: ({ tool }) =>
            `Use ${tool} to summarise papers, extract key findings, and identify gaps in a body of literature. Build the habit of AI-assisted, human-verified synthesis.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Turning transcripts into structured findings',
          summary: ({ tool }) =>
            `Paste interview or focus group transcripts into ${tool}. Get structured themes, representative quotes, and a research memo ready for stakeholder review.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted literature summary',
          summary: ({ tool, goal }) =>
            `Synthesise 10 papers or data sources into a structured research brief using ${tool}. Include methodology notes and confidence levels. Goal: ${goal}.`,
          minutes: 35,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Analysis & validation',
      templates: [
        {
          title: () => 'Generating and stress-testing hypotheses',
          summary: ({ tool }) =>
            `Use ${tool} to generate competing hypotheses from your data, then argue against each. Surface the one your data can actually distinguish.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Checking for bias in AI-assisted analysis',
          summary: ({ tool }) =>
            `Learn where ${tool} introduces framing bias in synthesis tasks. Build verification steps into your workflow so the AI finds patterns but you validate them.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: mixed-methods analysis sprint',
          summary: ({ goal }) =>
            `Run a mixed-methods sprint: use AI for quantitative pattern detection, qualitative theme extraction, and cross-validation. Goal: ${goal}.`,
          minutes: 50,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Communication & dissemination',
      templates: [
        {
          title: () => 'Writing for multiple audiences from one dataset',
          summary: ({ tool }) =>
            `Use ${tool} to adapt the same research findings for a technical paper, an executive summary, and a public-facing blog post — each with the right framing.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Drafting grant and project proposals with AI',
          summary: ({ tool }) =>
            `Use ${tool} to draft the rationale, methodology, and impact sections of a proposal. Review every claim against your evidence before submitting.`,
          minutes: 22,
          kind: 'lesson',
        },
        {
          title: () => 'Project: research communication package',
          summary: ({ goal }) =>
            `Build a communication package for a real project: abstract, one-pager, and 5-slide deck — each audience-appropriate and drafted with AI. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[3]!,
  ],

  'Sales': [
    {
      title: 'Prospecting & outreach',
      templates: [
        {
          title: () => 'Researching accounts at scale with AI',
          summary: ({ tool }) =>
            `Use ${tool} to build an account brief in minutes: company priorities, recent news, likely pain points, and a hook that is actually relevant to their world.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Writing cold outreach that gets replies',
          summary: ({ tool }) =>
            `Build a ${tool} prompt that generates personalised first-touch emails — not templates with [NAME] placeholders, but messages that reference what the buyer actually cares about.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Project: outbound sequence for one target segment',
          summary: ({ tool, goal }) =>
            `Build a full outbound sequence for one ICP segment using ${tool}: account research prompt, first-touch email, follow-up cadence, and a voicemail script. Goal: ${goal}.`,
          minutes: 35,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Discovery & qualification',
      templates: [
        {
          title: () => 'Preparing for discovery calls with AI',
          summary: ({ tool }) =>
            `Use ${tool} to generate a call prep brief: the five questions you must ask, the red flags to watch for, and a hypothesis about the buyer's top priority before you dial.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Turning call notes into structured CRM updates',
          summary: ({ tool }) =>
            `Paste raw call notes into ${tool} and get back a structured MEDDIC or BANT summary, next steps, and a draft follow-up email — in under 90 seconds.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted deal qualification scorecard',
          summary: ({ goal }) =>
            `Build a deal qualification prompt that scores an opportunity against your ICP criteria and surfaces the one question you still need to answer. Goal: ${goal}.`,
          minutes: 40,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Closing & follow-up',
      templates: [
        {
          title: () => 'Writing proposals that move faster',
          summary: ({ tool }) =>
            `Use ${tool} to draft proposal sections: executive summary, business case, and ROI model. Get a first draft that frames the value in the buyer's language, not yours.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Handling objections with AI-prepared responses',
          summary: ({ tool }) =>
            `Feed your most common objections into ${tool} and build a bank of responses with the evidence, the reframe, and the next question. Review and own every word before you use it.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: end-to-end deal support package',
          summary: ({ goal }) =>
            `Build a full deal support package for one active opportunity: account brief, discovery questions, objection bank, and a draft proposal intro — all AI-assisted. Goal: ${goal}.`,
          minutes: 50,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[3]!,
  ],

  'Customer Success': [
    {
      title: 'Onboarding & activation',
      templates: [
        {
          title: () => 'Building personalised onboarding plans with AI',
          summary: ({ tool }) =>
            `Use ${tool} to generate a customer-specific onboarding plan: milestones mapped to the customer's stated goals, the right sequence, and the first-week checklist that actually lands.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Writing success plans customers keep open',
          summary: ({ tool }) =>
            `Use ${tool} to draft a success plan that speaks the customer's language, not your internal jargon. Define milestones in terms of outcomes the customer can measure, not features they will unlock.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted onboarding kit',
          summary: ({ tool, goal }) =>
            `Build a reusable onboarding kit for one customer segment using ${tool}: welcome email, day-one checklist, 30-day success plan, and a champion enablement guide. Goal: ${goal}.`,
          minutes: 35,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Health monitoring & churn prevention',
      templates: [
        {
          title: () => 'Spotting churn signals in customer data',
          summary: ({ tool }) =>
            `Use ${tool} to analyse usage notes, support tickets, and sentiment from calls. Build a prompt that surfaces the one or two signals that precede churn in your accounts.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Writing at-risk outreach that re-engages',
          summary: ({ tool }) =>
            `Use ${tool} to draft outreach for at-risk accounts: acknowledge the gap, offer a concrete next step, and avoid the "just checking in" trap. Test it on a real account before sending.`,
          minutes: 14,
          kind: 'lesson',
        },
        {
          title: () => 'Project: customer health review workflow',
          summary: ({ goal }) =>
            `Build a monthly customer health review workflow: a prompt that turns account data into a one-page health summary with risk flags and recommended actions. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    {
      title: 'QBRs, expansion & advocacy',
      templates: [
        {
          title: () => 'Preparing QBR materials in half the time',
          summary: ({ tool }) =>
            `Use ${tool} to draft the QBR narrative: what happened, what it means for the customer's goals, and what you recommend next — structured and editable before the meeting.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Identifying expansion opportunities in account data',
          summary: ({ tool }) =>
            `Use ${tool} to scan your account notes and identify gaps between what the customer is using and what they could be using — surfacing natural expansion conversations.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: QBR pack for one strategic account',
          summary: ({ goal }) =>
            `Build a full QBR pack for one account: executive summary, metrics narrative, risk and opportunity analysis, and the three things you want to leave the room having agreed on. Goal: ${goal}.`,
          minutes: 50,
          kind: 'project',
        },
      ],
    },
    GENERIC_WEEKS[3]!,
  ],

  'Finance': [
    {
      title: 'Analysis & modelling',
      templates: [
        {
          title: () => 'Using AI to build and stress-test financial models',
          summary: ({ tool }) =>
            `Use ${tool} to draft model structures, check formula logic, and document assumptions — so the model survives the next person who opens it, not just the person who built it.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'Turning raw data into executive-ready analysis',
          summary: ({ tool }) =>
            `Give ${tool} a table of numbers and a business question. Get back the three-sentence story, the table that supports it, and the caveat the CFO will ask about — drafted in minutes.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: AI-assisted financial model documentation',
          summary: ({ tool, goal }) =>
            `Take a live model and use ${tool} to write a model guide: assumptions, sensitivities, data sources, and version history. Goal: ${goal}.`,
          minutes: 35,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Reporting & forecasting',
      templates: [
        {
          title: () => 'Building a repeatable monthly close narrative',
          summary: ({ tool }) =>
            `Use ${tool} to generate the monthly close narrative from your actuals vs budget data. Define the template once, feed it numbers each month, and get a first draft in minutes.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'AI-assisted variance analysis',
          summary: ({ tool }) =>
            `Use ${tool} to draft variance commentary: what drove the delta, whether it is a timing issue or a real miss, and what it implies for the rest of the year. Edit for accuracy, not for words.`,
          minutes: 16,
          kind: 'lesson',
        },
        {
          title: () => 'Project: automated board reporting narrative',
          summary: ({ goal }) =>
            `Build a prompt that turns your monthly financial data into a board-ready narrative: headline performance, key variances, updated full-year outlook, and the one decision the board needs to make. Goal: ${goal}.`,
          minutes: 45,
          kind: 'project',
        },
      ],
    },
    {
      title: 'Risk, compliance & FP&A',
      templates: [
        {
          title: () => 'Using AI to flag risks in contracts and filings',
          summary: ({ tool }) =>
            `Use ${tool} to extract key obligations, risk clauses, and financial covenants from contracts or regulatory filings. Build a prompt that surfaces the items your team must act on.`,
          minutes: 18,
          kind: 'lesson',
        },
        {
          title: () => 'FP&A scenario modelling with AI',
          summary: ({ tool }) =>
            `Use ${tool} to generate and document multiple forecast scenarios: base, upside, and downside — each with the assumptions and the metric impacts written in language leadership can read.`,
          minutes: 20,
          kind: 'lesson',
        },
        {
          title: () => 'Project: scenario analysis package',
          summary: ({ goal }) =>
            `Build a scenario analysis package for a live business decision: three scenarios, key assumptions, financial impact, and a recommendation memo — drafted with AI, validated by you. Goal: ${goal}.`,
          minutes: 50,
          kind: 'project',
        },
      ],
    },
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
// Company context parsing
// ---------------------------------------------------------------------------

const STACK_KEYWORDS = [
  'react', 'vue', 'angular', 'svelte', 'next.js', 'nextjs',
  'typescript', 'javascript', 'python', 'go', 'rust', 'java', 'kotlin', 'swift',
  'node', 'django', 'rails', 'laravel', 'fastapi',
] as const;

interface ParsedContext {
  stackHint: string | null;
  paceHint: string | null;
  teamHint: string | null;
}

function parseCompanyContext(ctx: string): ParsedContext {
  const lower = ctx.toLowerCase();

  // Stack: find first two recognisable tech keywords
  const found = STACK_KEYWORDS.filter((k) => lower.includes(k));
  const stackHint = found.length > 0
    ? `your ${found.slice(0, 2).join('/')} stack`
    : null;

  // Pace: keyword scan
  const paceHint = lower.includes('daily') || lower.includes('ships daily')
    ? 'shipping daily'
    : lower.includes('weekly') || lower.includes('week')
      ? 'shipping weekly'
      : lower.includes('quarterly')
        ? 'quarterly releases'
        : null;

  // Team size: first number followed by "person", "people", "member", "engineer", "developer"
  const sizeMatch = lower.match(/(\d+)[- ](?:person|people|member|engineer|developer)/);
  const sizeStr = sizeMatch?.[1];
  const size = sizeStr != null ? parseInt(sizeStr, 10) : null;
  const teamHint = size !== null
    ? size <= 5
      ? 'a small team'
      : size <= 20
        ? `a ${size}-person team`
        : `a ${size}-person org`
    : null;

  return { stackHint, paceHint, teamHint };
}

function buildContextSuffix(parsed: ParsedContext): string {
  const parts: string[] = [];
  if (parsed.stackHint) parts.push(`Adapt this for ${parsed.stackHint}.`);
  if (parsed.paceHint) parts.push(`Your cadence (${parsed.paceHint}) means you can validate in one sprint.`);
  if (parsed.teamHint) parts.push(`Scope the deliverable for ${parsed.teamHint}.`);
  return parts.length > 0 ? ' ' + parts.join(' ') : '';
}

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

  const stableSeed = `${role}|${normalizedTools.join(',')}|${input.goal}|${input.level}|${input.companyContext ?? ''}`;

  const parsedCtx = input.companyContext ? parseCompanyContext(input.companyContext) : null;
  const ctxSuffix = parsedCtx ? buildContextSuffix(parsedCtx) : '';

  const weekDefs = ROLE_WEEKS[role] ?? GENERIC_WEEKS;

  const weeks = weekDefs.map((w, wi) => {
    const tool = wi % 2 === 0 ? primaryTool : secondaryTool;
    const lessons: Lesson[] = w.templates.map((template, li) => {
      const dayBase = wi * 7 + li * 2 + 1;
      const minutesAdjusted = Math.max(8, template.minutes + LEVEL_BIAS[input.level]);
      const baseSummary = template.summary({ tool, role, goal: input.goal });

      let prerequisiteIds: string[] = [];
      if (wi === 0 && li === 0) {
        prerequisiteIds = [];
      } else if (li === 0) {
        const prevTemplates = weekDefs[wi - 1]!.templates;
        prerequisiteIds = [hashId('l', stableSeed, wi - 1, prevTemplates.length - 1)];
      } else {
        prerequisiteIds = [hashId('l', stableSeed, wi, li - 1)];
      }

      return {
        id: hashId('l', stableSeed, wi, li),
        day: dayBase,
        title: template.title({ tool, role }),
        summary: template.kind === 'project' ? baseSummary + ctxSuffix : baseSummary,
        tool,
        minutes: minutesAdjusted,
        kind: template.kind,
        prerequisiteIds,
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
