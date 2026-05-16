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
];
