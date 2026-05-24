export const SITE_URL = 'https://learnkit-ai.com';
export const SITE_NAME = 'LearnKit AI';

export const TOOLS = [
  {
    slug: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    tagline: 'Master Anthropic Claude — prompting, agents, evals',
    blurb:
      'A 30-day project-based path through Claude\'s prompting model, tool use, structured output, and production evals. Reviewed by the AI Guide.',
    modules: 8,
    hours: 14,
    color: '#D97757',
    keywords: ['claude tutorial', 'anthropic claude training', 'learn claude ai', 'claude prompting course'],
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    vendor: 'Anysphere',
    tagline: 'Cursor for engineers shipping alone',
    blurb:
      'Build a complete Cursor workflow — composer, agents, rules files, and codebase indexing — through real refactors of real code.',
    modules: 5,
    hours: 9,
    color: '#000000',
    keywords: ['cursor ide tutorial', 'cursor ai editor', 'learn cursor', 'cursor composer training'],
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    tagline: 'ChatGPT for serious work, not just chat',
    blurb:
      'Move past prompt copy-paste. Build custom GPTs, use Code Interpreter, and run multi-step workflows that ship.',
    modules: 6,
    hours: 11,
    color: '#10A37F',
    keywords: ['chatgpt tutorial', 'learn chatgpt', 'chatgpt for work', 'custom gpt training'],
  },
  {
    slug: 'copilot',
    name: 'GitHub Copilot',
    vendor: 'GitHub',
    tagline: 'GitHub Copilot for pull requests, not just autocomplete',
    blurb:
      'Treat Copilot like a pair programmer. Use Copilot Chat, edits, and workspace context to ship features faster without losing control.',
    modules: 4,
    hours: 7,
    color: '#1F2937',
    keywords: ['github copilot tutorial', 'learn copilot', 'copilot chat training'],
  },
  {
    slug: 'midjourney',
    name: 'Midjourney',
    vendor: 'Midjourney',
    tagline: 'Midjourney for designers who ship images',
    blurb:
      'Prompt structure, style references, weights, parameters, and a repeatable pipeline for production-quality images.',
    modules: 4,
    hours: 6,
    color: '#3B2F6B',
    keywords: ['midjourney tutorial', 'learn midjourney', 'midjourney prompting course'],
  },
  {
    slug: 'notion-ai',
    name: 'Notion AI',
    vendor: 'Notion',
    tagline: 'Notion AI for teams that document the work',
    blurb:
      'Notion AI Q&A, AI blocks, custom autofill, and how to actually use them in your team\'s knowledge graph.',
    modules: 3,
    hours: 5,
    color: '#111111',
    keywords: ['notion ai tutorial', 'learn notion ai', 'notion ai training'],
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    vendor: 'Perplexity AI',
    tagline: 'Perplexity for research that cites its sources',
    blurb:
      'Focus modes, Pro Search, collections, and Spaces — set up Perplexity as your research workbench, not just a search box.',
    modules: 3,
    hours: 4,
    color: '#1FB8CD',
    keywords: ['perplexity tutorial', 'learn perplexity ai', 'perplexity pro training'],
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    tagline: 'Gemini across Workspace and the API',
    blurb:
      'Gemini in Docs, Sheets, and Gmail, plus the API for builders. Long-context analysis, grounded answers, and multimodal pipelines.',
    modules: 4,
    hours: 7,
    color: '#4285F4',
    keywords: ['gemini tutorial', 'learn google gemini', 'gemini api training'],
  },
  {
    slug: 'windsurf',
    name: 'Windsurf',
    vendor: 'Codeium',
    tagline: 'Windsurf: the AI IDE that writes and reasons',
    blurb:
      'Flows, Cascade, and multi-file reasoning — Windsurf goes beyond autocomplete to understand your codebase and make decisions across files.',
    modules: 5,
    hours: 9,
    color: '#0E7C7B',
    keywords: ['windsurf ai ide', 'codeium windsurf tutorial', 'learn windsurf', 'windsurf cascade'],
  },
  {
    slug: 'replit',
    name: 'Replit',
    vendor: 'Replit',
    tagline: 'Replit AI: build and ship from the browser',
    blurb:
      'Replit Agent, Ghostwriter, and deployments — prototype, iterate, and ship full-stack apps without a local environment.',
    modules: 4,
    hours: 7,
    color: '#F26207',
    keywords: ['replit ai tutorial', 'replit agent training', 'learn replit', 'replit ghostwriter'],
  },
  {
    slug: 'linear',
    name: 'Linear',
    vendor: 'Linear',
    tagline: 'Linear with AI: ship faster without process overhead',
    blurb:
      'Linear\'s AI issue creation, triage, and workflow automation — so your team spends time building, not managing tickets.',
    modules: 3,
    hours: 5,
    color: '#5E6AD2',
    keywords: ['linear ai tutorial', 'linear project management ai', 'learn linear', 'linear automation'],
  },
  {
    slug: 'figma-ai',
    name: 'Figma AI',
    vendor: 'Figma',
    tagline: 'Figma AI for design teams that move fast',
    blurb:
      'First Draft, Auto Layout with AI, and Make Designs — use Figma\'s built-in AI features to explore more, polish faster, and stay in the file.',
    modules: 4,
    hours: 6,
    color: '#A259FF',
    keywords: ['figma ai tutorial', 'figma first draft', 'learn figma ai', 'figma make designs'],
  },
  {
    slug: 'v0',
    name: 'v0',
    vendor: 'Vercel',
    tagline: 'v0 by Vercel: generate production UI in seconds',
    blurb:
      'From text prompt to deployable React component — v0 turns design intent into working code you can edit, deploy, and own.',
    modules: 3,
    hours: 5,
    color: '#000000',
    keywords: ['v0 vercel tutorial', 'v0 ai ui generator', 'learn v0', 'vercel v0 components'],
  },
] as const;

export type ToolSlug = (typeof TOOLS)[number]['slug'];

export const ROLES = [
  {
    slug: 'product-manager',
    name: 'Product Manager',
    tagline: 'AI training for Product Managers',
    blurb:
      'Spec faster, run user research at scale, prototype without engineers, and ship AI features that actually move metrics.',
    skills: [
      'Writing PRDs with AI without losing rigor',
      'Running 100 user interviews in a week',
      'Prototyping AI features before engineering touches them',
      'Evaluating model outputs the way you\'d evaluate a launch',
    ],
    tools: ['Claude', 'ChatGPT', 'Notion AI', 'Perplexity'],
  },
  {
    slug: 'software-engineer',
    name: 'Software Engineer',
    tagline: 'AI training for Software Engineers',
    blurb:
      'From Copilot autocomplete to shipping production agents — refactor faster, write better tests, and build agentic features your team can trust.',
    skills: [
      'Cursor workflows for shipping features alone',
      'Building agents with tool use and structured output',
      'Writing evals that catch real regressions',
      'Production patterns for LLM-powered features',
    ],
    tools: ['Claude', 'Cursor', 'Copilot', 'ChatGPT'],
  },
  {
    slug: 'designer',
    name: 'Designer',
    tagline: 'AI training for Designers',
    blurb:
      'Use AI to explore design space faster, generate production assets, and ship copy that doesn\'t need a content review.',
    skills: [
      'Midjourney pipelines for production assets',
      'Variations and exploration without burning hours',
      'Copy and microcopy that sounds like your brand',
      'AI-assisted research synthesis',
    ],
    tools: ['Midjourney', 'ChatGPT', 'Claude'],
  },
  {
    slug: 'data-analyst',
    name: 'Data Analyst',
    tagline: 'AI training for Data Analysts',
    blurb:
      'Code Interpreter, Claude with files, and Gemini for long-context analysis — move from ad-hoc queries to repeatable analytic pipelines.',
    skills: [
      'Building analyses with Code Interpreter',
      'Long-context PDF and CSV analysis with Claude',
      'SQL and dashboard generation from natural language',
      'Catching when AI lies about your numbers',
    ],
    tools: ['ChatGPT', 'Claude', 'Gemini'],
  },
  {
    slug: 'marketer',
    name: 'Marketer',
    tagline: 'AI training for Marketers',
    blurb:
      'Generate, test, and ship campaigns at 10x volume without sounding like every other AI-generated brand on the internet.',
    skills: [
      'Brand voice that survives AI generation',
      'A/B variant generation and scoring',
      'Programmatic SEO content pipelines',
      'Lifecycle email and notification copy at scale',
    ],
    tools: ['Claude', 'ChatGPT', 'Midjourney'],
  },
  {
    slug: 'founder',
    name: 'Founder',
    tagline: 'AI training for Founders',
    blurb:
      'Replace whole functions with AI workflows. Ship product, marketing, ops, and finance from one workbench — until you hire.',
    skills: [
      'Cursor for shipping product without engineers',
      'Investor updates and decks that take an hour',
      'Customer research and competitive intel at scale',
      'Building internal agents for sales and support',
    ],
    tools: ['Claude', 'Cursor', 'ChatGPT', 'Perplexity'],
  },
  {
    slug: 'operations',
    name: 'Operations',
    tagline: 'AI training for Operations',
    blurb:
      'Automate the boring parts of running the business — vendor management, contracts, reporting, onboarding — without buying ten SaaS tools.',
    skills: [
      'Document workflows with AI extraction',
      'Vendor and contract analysis pipelines',
      'Internal reporting agents on top of your data',
      'Onboarding flows that adapt to the new hire',
    ],
    tools: ['Claude', 'ChatGPT', 'Notion AI'],
  },
  {
    slug: 'researcher',
    name: 'Researcher',
    tagline: 'AI training for Researchers',
    blurb:
      'Run literature reviews in hours, not weeks. Build agents that cite sources, summarize PDFs, and survive peer review.',
    skills: [
      'Literature reviews with Perplexity and Claude',
      'PDF cross-referencing without hallucinations',
      'Citation-grounded summarization',
      'Reproducible research pipelines',
    ],
    tools: ['Claude', 'Perplexity', 'ChatGPT'],
  },
  {
    slug: 'sales',
    name: 'Sales',
    tagline: 'AI training for Sales professionals',
    blurb:
      'Research accounts in minutes, write outreach that gets replies, and cut proposal time in half — without losing the human touch that closes deals.',
    skills: [
      'Account research and call prep at scale',
      'Personalised outbound that does not sound like AI',
      'CRM notes and follow-ups in under two minutes',
      'Proposals and objection handling with AI drafts',
    ],
    tools: ['Claude', 'ChatGPT', 'Perplexity'],
  },
  {
    slug: 'customer-success',
    name: 'Customer Success',
    tagline: 'AI training for Customer Success managers',
    blurb:
      'Spot churn before it happens, build onboarding plans in minutes, and run QBRs that actually lead to expansion.',
    skills: [
      'AI-assisted onboarding plans that fit each customer',
      'Churn signal detection from account data and call notes',
      'QBR prep and narrative in half the usual time',
      'Expansion opportunity identification at scale',
    ],
    tools: ['Claude', 'ChatGPT', 'Notion AI'],
  },
  {
    slug: 'finance',
    name: 'Finance',
    tagline: 'AI training for Finance professionals',
    blurb:
      'Turn raw numbers into board-ready narratives, automate variance commentary, and stress-test models before the CFO does.',
    skills: [
      'Financial model documentation and assumption logging',
      'Variance commentary that writes itself from actuals',
      'Scenario analysis packages leadership can act on',
      'Risk and contract analysis without a legal review queue',
    ],
    tools: ['Claude', 'ChatGPT', 'Gemini'],
  },
] as const;

export type RoleSlug = (typeof ROLES)[number]['slug'];
