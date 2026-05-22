export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMin: number;
  category: 'Engineering' | 'Pedagogy' | 'Launches';
  excerpt: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-ai-training-fails-at-most-companies',
    title: 'Why AI training fails at most companies (and what to do instead)',
    description:
      'Most enterprise AI training is a video library nobody finishes. The fix is not better videos — it is project-based learning with real review.',
    date: '2026-05-12',
    readMin: 6,
    category: 'Pedagogy',
    excerpt:
      'Most enterprise AI training is a video library nobody finishes. The completion-rate metric is a lie. Here is why, and what to do instead.',
    body: [
      'A new wave of AI training programs has launched in the last 18 months. Almost all of them have the same structure: pre-recorded videos, a quiz, a certificate. They report 70-80% completion rates. They also report almost no measurable change in what their learners can actually build.',
      'Why? Because completion is the wrong metric. Watching a 12-minute video on prompt engineering does not teach you to write a prompt that survives contact with your job. It teaches you to recognize the right answer on a multiple-choice quiz.',
      'The fix is project-based learning with real review. Every lesson should end with something you build — a prompt, an agent, a workflow — that gets read and critiqued by an evaluator who knows what bad output looks like. That evaluator can be an LLM (it scales) or a human (it does not), but it has to give you the kind of feedback that changes the next version of your work.',
      'This is what LearnKit AI does. Lessons end in the workbench, not the quiz. The AI Guide reads your prompts, flags missing refusal clauses, catches under-specified personas, and tells you where your agent will invent a citation. You graduate with a portfolio, not a certificate.',
    ],
  },
  {
    slug: 'embedding-an-ai-tutor-in-three-lines',
    title: 'Embedding an AI tutor in three lines of JavaScript',
    description:
      'A walkthrough of dropping the LearnKit AI Guide into any React app — with custom system prompts, route-aware context, and white-label theming.',
    date: '2026-05-08',
    readMin: 5,
    category: 'Engineering',
    excerpt:
      'A walkthrough of dropping the LearnKit AI Guide into any React app — three lines, plus custom system prompts and white-label theming.',
    body: [
      'The pitch for embedded AI tutors is simple: when a user is about to do something they have not done before, a small floating widget appears and offers a 2-minute refresher. Most teams build this from scratch and burn months on the pedagogy.',
      'LearnKit AI Guide is a drop-in React component. Install @learnkit-ai/react, pass an API key and a user ID, and you have a route-aware AI tutor in production. The system prompts are versioned, the lesson library is white-labeled, and the evaluation rubrics are open source.',
      'Under the hood, the AI Guide is just a React component that wraps a streaming endpoint. The interesting work is in the pedagogy layer: choosing when to interrupt, how much context to load, and which lessons to surface for which routes. We open-sourced all of it under Apache-2.0.',
      'In future posts we will go deep on the eval rubrics, the route-context system, and how to fork the lesson library for your own product.',
    ],
  },
  {
    slug: 'launching-learnkit-ai',
    title: 'Launching LearnKit AI',
    description:
      'After two years of building internal AI training at three companies, we are launching LearnKit AI — an open-source workbench and tutor for teams that ship.',
    date: '2026-05-01',
    readMin: 4,
    category: 'Launches',
    excerpt:
      'After two years of building internal AI training at three companies, we are launching LearnKit AI — an open-source workbench and tutor for teams that ship.',
    body: [
      'Today we are launching LearnKit AI: an open-source TypeScript engine and React component for embedding personalized, role-aware AI learning paths inside SaaS products.',
      'The team behind LearnKit spent the last two years building internal AI training programs at three companies. The pattern was always the same: a few hundred engineers and PMs, a few weeks of video, a quiz, and almost no measurable change. Meanwhile the actual builders on the team — the ones shipping AI features — learned by doing, with feedback, over months.',
      'So we built the thing the builders had. A workbench where the lesson is the work. An AI tutor that reads your prompts. A 30-day path tuned to your role and your stack. And we open-sourced it under Apache-2.0 so any team can fork it.',
      'You can try the demo at /demo, read the docs at /developers, or star the repo at github.com/learnkit-ai/learnkit.',
    ],
  },
  {
    slug: 'why-we-chose-zero-llm-calls',
    title: 'Why generateLearningPath() makes zero LLM calls',
    description:
      'A deterministic pure function is more trustworthy than a stochastic AI call for generating a learning curriculum. Here is why we designed it that way.',
    date: '2026-05-15',
    readMin: 5,
    category: 'Engineering',
    excerpt:
      'A deterministic pure function is more trustworthy than a stochastic AI call for generating a learning curriculum — same input, same path, every time.',
    body: [
      'The obvious design for a "AI-powered learning path generator" is to call an LLM. Pass the user\'s role, tools, and goal to Claude or GPT-4, prompt it to generate a 4-week curriculum, and stream the response. We seriously considered this. We did not build it.',
      'The core problem is trust. A stochastic function cannot be unit-tested, cannot be audited, cannot be reproduced. Every time a PM at a company configures a learning path for their team, they need to know what they are getting. Not "roughly this". Exactly this. If the same input produces different output on Tuesday than it did on Monday, something went wrong — even if both outputs are technically good.',
      'So generateLearningPath() is a pure function. A djb2 hash of the input produces stable lesson IDs across runs. The week structure, lesson count, and durations are computed deterministically from the role, level, and tools. You can test it with Vitest. You can snapshot it. You can pin a version and know that every engineer who joins your team will get the same week one as the engineer who joined six months ago.',
      'The tradeoff is expressiveness. A pure function cannot write prose as varied as GPT-4, cannot adapt to a user\'s previous session history, cannot interpolate from a corpus of real practitioners\' notes. We accepted that tradeoff. Version 0 of LearnKit AI ships zero LLM calls and zero API keys. The AI Guide component is a UI primitive, not a live model. If you want LLM personalization on top, the hook-based API makes it easy to swap in your own inference layer.',
      'This is the right first trade. Build the substrate deterministic and testable, then add stochasticity where the variance is a feature, not a bug.',
    ],
  },
  {
    slug: 'how-to-fork-and-customize-learnkit',
    title: 'How to fork LearnKit AI and add your own lesson templates',
    description:
      'A step-by-step guide to cloning the monorepo, editing the core lesson generator, and shipping a white-labeled learning path for your own product.',
    date: '2026-05-19',
    readMin: 7,
    category: 'Engineering',
    excerpt:
      'Clone the repo, edit packages/core/src/generate.ts, and ship a white-labeled learning path in an afternoon. Here is the full walkthrough.',
    body: [
      'LearnKit AI ships as a monorepo under Apache-2.0. Everything is editable. The lesson templates are plain TypeScript objects in packages/core/src/generate.ts. Forking the whole stack and adding your company\'s specific tools, terminology, and focus areas takes about an afternoon.',
      'Start by cloning and installing: git clone https://github.com/learnkit-ai/learnkit && cd learnkit && pnpm install. The dev server starts with pnpm dev. You will see the full landing page at localhost:3000 and the interactive demo at /demo.',
      'The lesson generator is in packages/core/src/generate.ts. The function buildLessonsForWeek() accepts a week number and returns three Lesson objects. The lesson titles, descriptions, and tool assignments are plain strings — search for "week === 1" to find week one, edit the title and description fields to match your stack. Run pnpm test after every change to catch regressions in the schema.',
      'To add a new role, append a string to the SUPPORTED_ROLES array in packages/core/src/data.ts. To add a new tool, append to SUPPORTED_TOOLS. Both are just string arrays — no type changes required, because the schemas are Zod-validated at runtime.',
      'For white-labeling the React components, the easiest path is to override CSS custom properties. Drop :root { --accent: #7C3AED; --paper: #FAFAF8; } into your global stylesheet and the warm theme will inherit your brand colors. For deeper changes, the component source is in packages/react/src/ — no Tailwind dependency, just inline styles and CSS custom properties.',
      'The whole stack — schemas, core, react, and the Next.js demo app — is under Apache-2.0. Fork it, ship it commercially, embed it in a closed-source product. The only requirement is preserving the license notice. PRs back to main welcome.',
    ],
  },
  {
    slug: 'embedding-learnkit-in-a-saas-product',
    title: 'Embedding AI learning paths in your SaaS onboarding flow',
    description:
      'How to use @learnkit-ai/react to drop a personalized 30-day learning path into a SaaS onboarding modal — with role detection, theme matching, and lesson-click callbacks.',
    date: '2026-05-21',
    readMin: 6,
    category: 'Engineering',
    excerpt:
      'Use @learnkit-ai/react to drop a personalized 30-day learning path into any SaaS onboarding modal. Role detection, theme matching, and callbacks included.',
    body: [
      'SaaS products that sell AI features have a new cold-start problem: users sign up, land in the product, and have no idea how to build a prompt that actually works. The standard fix is a tooltip tour. That is not enough.',
      'LearnKit AI is designed to sit inside your product and give each user a personalized 30-day curriculum tuned to their role and the specific AI tools your product exposes. The React component takes a role, a set of tools, and a goal, and renders a full path with no backend required.',
      'The implementation is three steps. First, detect or ask for the user\'s role at signup — store it in your user record. Second, install @learnkit-ai/react and drop <LearningPath input={{ role: user.role, tools: yourProductTools, goal: yourDefaultGoal, level: user.level }} theme="warm" onLessonClick={openWorkbench} /> into your onboarding modal or help sidebar. Third, wire the onLessonClick callback to open whatever lesson viewer you want — the component just fires the Lesson object.',
      'The useLearnKit() hook gives you a headless alternative if your design system does not match the built-in themes. It returns { path, error } and memoizes the result, so re-renders are safe.',
      'One detail worth knowing: the path is fully generated client-side. There is no network call in generateLearningPath(). That means it works in SSR, in edge functions, in offline mode. It also means you can pregenerate paths for your most common role/level combinations and cache them at build time — a pattern we use on /demo to make the initial render instant.',
    ],
  },
  {
    slug: 'theming-learnkit-css-custom-properties',
    title: 'Theming LearnKit AI: CSS custom properties as a first-class API',
    description:
      'How @learnkit-ai/react ships three themes with zero Tailwind dependency — and how to drop in your own brand colors in four lines of CSS.',
    date: '2026-05-22',
    readMin: 5,
    category: 'Engineering',
    excerpt:
      'No Tailwind in @learnkit-ai/react — just CSS custom properties. Override four variables and the entire component tree picks up your brand colors.',
    body: [
      'Most component libraries that ship theming require you to configure a design token system, install a CSS preprocessor, or wrap your app in a theme provider. We wanted something simpler: drop in four lines of CSS and your product\'s colors work everywhere.',
      '@learnkit-ai/react has no Tailwind dependency. Every style is expressed as an inline CSS value or a CSS custom property reference — things like var(--accent), var(--paper), var(--ink). The three built-in themes (warm, midnight, technical) are just different values for those same twelve variables, applied as inline styles on the root component element.',
      'To match your brand, you do not need to fork the package. Pass theme="warm" and add a stylesheet that overrides the root variables: :root { --accent: #7C3AED; --paper: #FAFAF9; --ink: #1A1523; --ink-soft: #5B5070; }. The full component tree — cards, progress bars, the AI Guide widget — inherits your values immediately.',
      'The decision to avoid Tailwind was deliberate. Tailwind requires a build step tuned to the host project\'s content paths. A library that ships Tailwind classes leaks its build config into every project that installs it. CSS custom properties are a browser primitive — they compose without configuration.',
      'If you want to ship your own named theme, the pattern is simple: export a theme object that maps the twelve variable names to your values, pass it as the theme prop, and the component applies them as a style attribute. We will document the full theme object shape in the v1 docs.',
    ],
  },
  {
    slug: 'role-based-learning-paths-the-design-decisions',
    title: 'Role-based learning paths: the design decisions behind the curricula',
    description:
      'Why we built eight role-specific 4-week curricula instead of a generic AI training track, and what we learned from the first iteration of each.',
    date: '2026-05-22',
    readMin: 7,
    category: 'Pedagogy',
    excerpt:
      'Eight roles, eight 4-week curricula, zero shared lessons between them. Here is why role specificity matters and what we got wrong in the first draft.',
    body: [
      'The initial design for LearnKit AI was a single shared curriculum: four weeks of foundational AI skills that any professional could follow. We scrapped it after the second pilot. The problem was not quality — the content was fine. The problem was relevance. A PM and a software engineer sitting through the same "building a research agent" lesson are in completely different contexts. The PM needs to scope the agent to a workflow they own. The engineer needs to write the eval harness. A single lesson cannot do both well.',
      'So we built eight curricula — one for each supported role — with no shared lessons. Product Managers start with discovery briefs and PRDs before ever writing an agent. Software Engineers start with prompt architecture and eval patterns on day one. Designers start with generating and critiquing copy, not writing code.',
      'The lesson structure is consistent: three lessons per week, with the third always a project. Projects are the unit of completion that actually matters. They are not exercises — they are deliverables your team could use. The week-three project for a PM is a go-to-market brief. For an Operations specialist, it is a weekly reporting prompt they can run every Monday. For a Researcher, it is a literature synthesis they would file in their research archive.',
      'The hardest role to design for was Founder. Founders span every function — they are their own PM, their own engineer, their own marketer in the early days. We resisted the temptation to build a generalist curriculum. Instead, the Founder track focuses on the three AI use cases that are most asymmetric for a solo operator: strategic stress-testing (using AI to argue against your own plan), voice-consistent writing at scale, and rapid market validation from public signals.',
      'None of the eight curricula are finished. They will not be in v1 either. The right approach is to ship opinionated first drafts, collect signal from what people actually build in week-three projects, and iterate. If you fork the repo and find that one role\'s curriculum is weak, a PR is exactly the right response.',
    ],
  },
  {
    slug: 'the-companycontext-field',
    title: 'The companyContext field: personalising learning paths for your stack',
    description:
      'An explanation of the optional companyContext input field, why it exists, and how it will be used to personalise lesson summaries in v1.',
    date: '2026-05-22',
    readMin: 4,
    category: 'Engineering',
    excerpt:
      'companyContext is in the public API schema today but does not yet change the output. Here is what it will do in v1 and why we shipped the field first.',
    body: [
      'LearningPathInput has an optional companyContext field: a string of up to 500 characters describing the learner\'s team, stack, and context. You can pass it today — the schema accepts it and validates it. It does not yet change the generated path. That is intentional, and this post explains why.',
      'We shipped the field before the feature for two reasons. First, it locks in the API shape before any consuming code depends on a version without it. If we added it in v1, every product that had already shipped LearnKit AI would need to handle a schema change. By shipping it in v0, all valid v0 inputs are valid v1 inputs — the only change is that the engine starts doing something with a field it was already accepting.',
      'Second, we needed to decide what "using companyContext" actually means before we built it. The obvious design is string interpolation: embed the context into lesson summary templates wherever there is a gap. The better design is semantic: parse the context for signals (team size, stack, industry, pace) and use those signals to weight lesson selection, adjust project scope, and tune the language of summaries.',
      'In v1, companyContext will be parsed for four signals: tech stack keywords (to prefer lessons that use tools the team already has), pace signals ("ships weekly" versus "quarterly releases"), industry signals (regulated industries get different compliance framing), and team size signals ("40-person team" versus "solo founder"). The lesson templates will expose hooks for each signal so the interpolation is structured, not arbitrary.',
      'If you are building on LearnKit AI today, pass companyContext. It will be silently ignored for now. In v1, it will start doing something useful — and your integration will not need to change.',
    ],
  },
];
