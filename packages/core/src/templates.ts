import type { LearningPathInput, Lesson } from '@learnkit-ai/schemas'

type TemplateOutput = {
  title: string
  summary: string
  durationDays: number
  lessons: Omit<Lesson, 'id'>[]
  outcomes: string[]
}

type TemplateBuilder = (input: LearningPathInput) => TemplateOutput

const toolList = (tools: string[]) => tools.slice(0, 3).join(', ')

const difficultyFor = (level: LearningPathInput['level']): Lesson['difficulty'] => {
  if (level === 'advanced') return 'Advanced'
  if (level === 'intermediate') return 'Intermediate'
  return 'Beginner'
}

const productManagerTemplate: TemplateBuilder = (input) => ({
  title: `AI for ${input.role}s: ${input.goal}`,
  summary: `A practical ${input.level} path for product managers using ${toolList(input.tools)} to ${input.goal}.`,
  durationDays: 21,
  outcomes: [
    `Write effective prompts using ${input.tools[0] ?? 'AI tools'} for product work`,
    'Turn user research into structured specs with AI assistance',
    'Prototype and validate features faster',
    'Communicate AI capabilities clearly to your team',
  ],
  lessons: [
    {
      title: 'What AI can and cannot do for product work',
      duration: '10 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: `Before using ${toolList(input.tools)}, you need a clear mental model of where AI helps and where it fails so you set the right expectations with your team.`,
      practice: `List 5 repetitive tasks in your current sprint. Mark which ones are good AI candidates and which are not. Explain your reasoning.`,
      expectedOutcome: 'You can identify high-ROI AI use cases in your daily PM workflow.',
    },
    {
      title: `Writing prompts that get useful output from ${input.tools[0] ?? 'AI'}`,
      duration: '12 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: `Vague prompts produce vague output. Learning prompt structure is the highest-leverage skill for ${input.goal}.`,
      practice: `Take a real user story from your backlog. Write three versions of a prompt asking ${input.tools[0] ?? 'an AI'} to help refine it. Compare the outputs.`,
      expectedOutcome: 'You can write structured prompts that produce consistently useful output.',
    },
    {
      title: 'Turning customer interviews into structured insights with AI',
      duration: '14 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: `Synthesizing qualitative research is time-consuming. ${toolList(input.tools)} can dramatically speed up the analysis step.`,
      practice: `Take a recent customer interview transcript. Use ${input.tools[0] ?? 'AI'} to extract the top 3 pain points, recurring themes, and one product opportunity. Review and refine the output.`,
      expectedOutcome: 'You can process a customer interview in under 10 minutes with AI support.',
    },
    {
      title: 'Drafting and refining PRDs with AI assistance',
      duration: '15 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Writing PRDs from scratch is slow. AI can scaffold the structure so you focus on the decisions, not the formatting.',
      practice: `Pick a feature you are planning. Use ${toolList(input.tools)} to generate a PRD outline, then fill in the context and constraints that AI cannot know.`,
      expectedOutcome: 'You can produce a first-draft PRD in under 20 minutes.',
    },
    {
      title: 'Evaluating AI-generated output — what to trust and what to verify',
      duration: '10 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'AI output can be confident and wrong. Building a review habit protects your credibility with stakeholders.',
      practice: 'Take an AI-generated spec section. Identify three claims that require verification. Find the sources.',
      expectedOutcome: 'You have a repeatable review checklist for AI-generated product content.',
    },
  ],
})

const softwareEngineerTemplate: TemplateBuilder = (input) => ({
  title: `AI-Assisted Development: ${input.goal}`,
  summary: `A ${input.level} engineering path using ${toolList(input.tools)} to ${input.goal}.`,
  durationDays: 21,
  outcomes: [
    `Use ${input.tools[0] ?? 'AI tools'} to accelerate code review and refactoring`,
    'Write better prompts for code generation tasks',
    'Build and evaluate AI-assisted test suites',
    'Integrate AI tooling into your development workflow',
  ],
  lessons: [
    {
      title: `Setting up ${input.tools[0] ?? 'your AI tool'} for daily development`,
      duration: '8 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Configuration determines output quality. Spending 30 minutes on setup saves hours per week.',
      practice: `Configure ${input.tools[0] ?? 'your AI tool'} with a system prompt scoped to your current codebase. Test it on a real bug.`,
      expectedOutcome: 'Your AI tool is configured and producing relevant output for your stack.',
    },
    {
      title: 'Code review acceleration with AI',
      duration: '12 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Manual code review misses patterns that AI catches consistently — and AI review frees you to focus on architecture decisions.',
      practice: `Take a recent PR diff. Run it through ${toolList(input.tools)} with a review prompt. Compare AI findings to your own review notes.`,
      expectedOutcome: 'You can use AI to surface issues in a PR diff in under 2 minutes.',
    },
    {
      title: 'Generating and evaluating tests with AI',
      duration: '15 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'AI generates test cases for edge conditions humans routinely miss, especially for input validation and error paths.',
      practice: `Pick a function with low test coverage. Ask ${input.tools[0] ?? 'AI'} to generate edge-case tests. Evaluate: which would have caught a real bug?`,
      expectedOutcome: 'You can use AI to increase test coverage on existing code in under 15 minutes.',
    },
    {
      title: 'Refactoring legacy code with AI guidance',
      duration: '18 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Refactoring requires understanding intent. AI can help explain unclear code before you change it.',
      practice: `Find a function that is hard to understand. Use ${toolList(input.tools)} to explain it, then ask for a refactored version. Review the output carefully before accepting.`,
      expectedOutcome: 'You can safely refactor unfamiliar code with AI as a guide.',
    },
    {
      title: 'Debugging with AI: root cause faster',
      duration: '12 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Rubber-duck debugging works — AI is a very fast rubber duck that also knows your stack.',
      practice: 'Take an open bug. Paste the stack trace and relevant code into your AI tool. Follow its hypothesis. Document whether it was correct.',
      expectedOutcome: 'You have a repeatable AI-assisted debugging pattern for your workflow.',
    },
  ],
})

const designerTemplate: TemplateBuilder = (input) => ({
  title: `AI for Designers: ${input.goal}`,
  summary: `A ${input.level} path for designers using ${toolList(input.tools)} to ${input.goal}.`,
  durationDays: 18,
  outcomes: [
    'Use AI to accelerate user research synthesis',
    'Generate and iterate on copy with AI assistance',
    `Integrate ${input.tools[0] ?? 'AI tools'} into your design workflow`,
    'Evaluate AI-generated design content critically',
  ],
  lessons: [
    {
      title: 'AI as a research synthesis partner',
      duration: '10 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Affinity mapping takes hours. AI can produce a first-pass synthesis in minutes, letting you focus on interpretation.',
      practice: `Take notes from 3 user sessions. Use ${input.tools[0] ?? 'AI'} to cluster them into themes and identify the strongest signal. Validate against your own reading.`,
      expectedOutcome: 'You can synthesize a small research set with AI in under 20 minutes.',
    },
    {
      title: 'Generating UX copy variations with AI',
      duration: '10 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Copy is part of the design. Getting 10 variations in 2 minutes changes how you test and iterate.',
      practice: `Take an onboarding screen. Use ${toolList(input.tools)} to generate 5 microcopy variations for the primary CTA. Evaluate them against your tone guidelines.`,
      expectedOutcome: 'You can generate and filter copy variations in a single working session.',
    },
    {
      title: 'Writing design briefs and specs with AI',
      duration: '12 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'A well-structured brief saves back-and-forth with engineers. AI can scaffold the structure from your rough notes.',
      practice: `Describe a feature you are designing in rough bullet points. Use ${input.tools[0] ?? 'AI'} to turn it into a structured design brief. Edit what only you can know.`,
      expectedOutcome: 'You can produce a structured design brief from rough notes in under 15 minutes.',
    },
    {
      title: 'Critiquing AI output — keeping the human eye',
      duration: '8 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'AI-generated copy and specs can be plausible but off-brand. Building a critique habit protects design quality.',
      practice: 'Review 3 AI-generated outputs from your practice sessions. Identify one failure mode in each. Write a rule to add to your prompts.',
      expectedOutcome: 'You have a personal prompt rulebook for your design work.',
    },
  ],
})

const marketerTemplate: TemplateBuilder = (input) => ({
  title: `AI-Powered Marketing: ${input.goal}`,
  summary: `A ${input.level} path for marketers using ${toolList(input.tools)} to ${input.goal}.`,
  durationDays: 21,
  outcomes: [
    'Use AI to accelerate content production without losing brand voice',
    `Build repeatable workflows in ${input.tools[0] ?? 'your AI tool'}`,
    'Generate and test audience-specific messaging with AI',
    'Evaluate AI output for accuracy and brand alignment',
  ],
  lessons: [
    {
      title: 'Training your AI tool on your brand voice',
      duration: '12 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Generic AI output sounds generic. Teaching your brand voice as a system prompt is a one-time investment that pays off on every run.',
      practice: `Write a brand voice prompt using 3 real examples of your best content. Test it in ${input.tools[0] ?? 'your AI tool'} by generating a short email. Refine until the voice is right.`,
      expectedOutcome: 'You have a brand voice prompt you can reuse across all marketing tasks.',
    },
    {
      title: 'Content repurposing workflows with AI',
      duration: '10 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'One piece of long-form content should produce 10+ assets. Manual repurposing is the bottleneck AI removes.',
      practice: `Take a recent blog post. Use ${toolList(input.tools)} to generate a LinkedIn post, a tweet thread, and an email subject line. Compare to your manual output.`,
      expectedOutcome: 'You can repurpose a piece of content into 3 formats in under 10 minutes.',
    },
    {
      title: 'AI-assisted audience segmentation and messaging',
      duration: '14 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Personalized messaging converts better. AI lets you generate segment-specific variations without quadrupling your writing time.',
      practice: `Pick a campaign. Define 3 audience segments. Use ${input.tools[0] ?? 'AI'} to generate distinct message angles for each. Test one in a real send.`,
      expectedOutcome: 'You can generate segment-specific copy variations in a single session.',
    },
    {
      title: 'Fact-checking and verifying AI-generated marketing content',
      duration: '8 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Publishing AI-generated claims without verification risks brand credibility. A simple review habit prevents costly corrections.',
      practice: 'Take 5 AI-generated claims from your practice content. Verify each one. Note which categories of claims AI gets wrong most often.',
      expectedOutcome: 'You have a pre-publish checklist for AI-generated marketing content.',
    },
    {
      title: 'Measuring AI workflow impact on your output',
      duration: '10 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Intuition about time saved is usually wrong. Measuring your before/after gives you data to advocate for AI adoption with your team.',
      practice: 'Pick one recurring task. Time yourself completing it the old way and the AI-assisted way. Record the delta.',
      expectedOutcome: 'You have a baseline metric to track your AI workflow improvement over time.',
    },
  ],
})

const dataAnalystTemplate: TemplateBuilder = (input) => ({
  title: `AI for Data Analysis: ${input.goal}`,
  summary: `A ${input.level} path for data analysts using ${toolList(input.tools)} to ${input.goal}.`,
  durationDays: 21,
  outcomes: [
    `Use ${input.tools[0] ?? 'AI tools'} to accelerate exploratory data analysis`,
    'Generate and validate data transformation code with AI',
    'Communicate findings faster with AI-assisted narrative writing',
    'Build repeatable AI-assisted analysis workflows',
  ],
  lessons: [
    {
      title: 'Using AI to understand an unfamiliar dataset',
      duration: '12 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'The first 30 minutes with a new dataset are the most disorienting. AI can surface structure, anomalies, and questions you would have missed.',
      practice: `Take a dataset you have not worked with before. Use ${input.tools[0] ?? 'AI'} to describe its structure, identify missing values, and suggest 3 analysis angles. Evaluate the suggestions.`,
      expectedOutcome: 'You can orient yourself in a new dataset with AI support in under 15 minutes.',
    },
    {
      title: 'Generating and validating data transformation code',
      duration: '15 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Writing boilerplate transformation code is slow. AI generates it; your job is to validate the logic and edge cases.',
      practice: `Describe a data cleaning task in plain language to ${toolList(input.tools)}. Review the generated code for correctness. Find at least one edge case it misses.`,
      expectedOutcome: 'You can generate, review, and fix data transformation code with AI in a fraction of the manual time.',
    },
    {
      title: 'Writing analysis narratives with AI assistance',
      duration: '10 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'The hardest part of analysis is often the write-up. AI can scaffold the narrative structure while you provide the interpretation.',
      practice: `Take a recent chart or table. Write 3 bullet-point observations. Use ${input.tools[0] ?? 'AI'} to turn them into a 150-word executive summary. Edit for accuracy.`,
      expectedOutcome: 'You can draft an analysis narrative from bullet points in under 10 minutes.',
    },
    {
      title: 'Validating AI-generated analysis — where it goes wrong',
      duration: '12 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'AI makes plausible-sounding statistical claims that are sometimes wrong. One bad number in a report erodes trust in all of them.',
      practice: 'Run a full AI-assisted analysis of a small dataset. Manually verify 3 key numbers. Document any discrepancy.',
      expectedOutcome: 'You have a validation checklist for AI-generated analytical content.',
    },
    {
      title: 'Building a repeatable AI analysis workflow',
      duration: '14 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Ad-hoc AI usage is inefficient. A documented workflow turns one-off wins into a durable team asset.',
      practice: `Document the AI-assisted steps you used in this path as a repeatable workflow. Include prompt templates, validation steps, and known failure modes for ${toolList(input.tools)}.`,
      expectedOutcome: 'You have a documented AI analysis workflow you can share with your team.',
    },
  ],
})

const generalTemplate: TemplateBuilder = (input) => ({
  title: `AI Fundamentals: ${input.goal}`,
  summary: `A practical ${input.level} introduction to AI tools for ${input.role.toLowerCase() || 'knowledge workers'} using ${toolList(input.tools)}.`,
  durationDays: 14,
  outcomes: [
    `Get practical value from ${input.tools[0] ?? 'AI tools'} in your daily work`,
    'Write prompts that produce consistently useful output',
    'Evaluate AI output critically before using it',
    'Build a personal AI workflow that saves time each week',
  ],
  lessons: [
    {
      title: `Getting started with ${input.tools[0] ?? 'AI tools'}`,
      duration: '8 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Knowing the basics of how your tool works prevents common mistakes and sets you up for faster learning.',
      practice: `Complete one real work task using ${input.tools[0] ?? 'your AI tool'}. Note what worked and what did not.`,
      expectedOutcome: `You can use ${input.tools[0] ?? 'your AI tool'} for at least one task in your daily workflow.`,
    },
    {
      title: 'Writing better prompts',
      duration: '10 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Prompt quality determines output quality. Small changes in how you ask produce dramatically different results.',
      practice: `Take a prompt that gave you a bad result. Rewrite it with more context, a specific format, and a clear constraint. Compare the outputs.`,
      expectedOutcome: 'You can diagnose and improve a weak prompt in under 5 minutes.',
    },
    {
      title: 'When to trust AI output — and when not to',
      duration: '8 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'AI is confidently wrong often enough that blind trust is dangerous. A simple verification habit prevents most problems.',
      practice: 'Ask your AI tool 5 questions you already know the answers to. Note confidence vs accuracy. Identify the pattern.',
      expectedOutcome: 'You know which categories of tasks require AI output verification.',
    },
    {
      title: 'Building your personal AI workflow',
      duration: '12 min',
      difficulty: difficultyFor(input.level),
      role: input.role,
      tools: input.tools,
      why: 'Sporadic AI use produces sporadic results. A documented workflow turns it into a reliable skill.',
      practice: `Identify 3 tasks you do every week. For each one, write a prompt template you can reuse in ${toolList(input.tools)}.`,
      expectedOutcome: 'You have 3 reusable prompt templates that save time every week.',
    },
  ],
})

const TEMPLATES: Record<string, TemplateBuilder> = {
  'product manager': productManagerTemplate,
  'software engineer': softwareEngineerTemplate,
  engineer: softwareEngineerTemplate,
  developer: softwareEngineerTemplate,
  designer: designerTemplate,
  'ux designer': designerTemplate,
  marketer: marketerTemplate,
  'marketing manager': marketerTemplate,
  'data analyst': dataAnalystTemplate,
  analyst: dataAnalystTemplate,
}

export const SUPPORTED_ROLES = [
  'Product Manager',
  'Software Engineer',
  'Designer',
  'Marketer',
  'Data Analyst',
]

export const SUPPORTED_TOOLS = [
  'Claude',
  'ChatGPT',
  'Cursor',
  'GitHub Copilot',
  'Figma',
  'Notion',
  'Slack',
  'HubSpot',
  'Perplexity',
  'Gemini',
]

export function getTemplate(input: LearningPathInput): TemplateOutput {
  const key = input.role.toLowerCase().trim()
  const builder = TEMPLATES[key] ?? generalTemplate
  return builder(input)
}
