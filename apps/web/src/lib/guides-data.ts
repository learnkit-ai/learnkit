export interface GuideSection {
  heading: string;
  body: string;
  code?: string;
  lang?: string;
}

export interface GuidePage {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  readingMinutes: number;
  sections: GuideSection[];
  keywords: string[];
}

export const GUIDES: GuidePage[] = [
  {
    slug: 'embed-learnkit-in-nextjs',
    title: 'Embed LearnKit AI in a Next.js app',
    tagline: 'A step-by-step guide to adding role-aware learning paths to your Next.js product',
    intro:
      'LearnKit AI is designed to drop into any SaaS product. This guide shows you the minimal integration: install the packages, render a learning path, and wire up the interactive demo - in under 30 minutes.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Install the packages',
        body: 'Add the React package and its peer dependency to your project. The core engine is bundled inside @learnkit-ai/react, so you only need one install for components.',
        code: 'pnpm add @learnkit-ai/react @learnkit-ai/core',
        lang: 'bash',
      },
      {
        heading: 'Render your first learning path',
        body: 'The LearningPath component is a client component. Wrap it in a "use client" boundary if you are using the App Router, or render it inside a client component that already has the directive.',
        code: `'use client';
import { LearningPath } from '@learnkit-ai/react';

export function MyOnboarding() {
  return (
    <LearningPath
      input={{
        role: 'Product Manager',
        tools: ['Claude', 'Notion AI'],
        goal: 'Ship an internal research agent',
        level: 'beginner',
      }}
      theme="warm"
      onLessonClick={(lesson) => console.log('clicked', lesson.id)}
    />
  );
}`,
        lang: 'tsx',
      },
      {
        heading: 'Use the hook for custom rendering',
        body: 'If you want to build your own lesson UI, use the useLearnKit hook directly. It returns the full LearningPath object - all four weeks, every lesson, total minutes - which you can render however you like.',
        code: `import { useLearnKit } from '@learnkit-ai/react';

export function CustomPath({ role }: { role: string }) {
  const { path, error } = useLearnKit({
    role,
    tools: ['Claude'],
    goal: 'Automate my weekly report',
    level: 'intermediate',
  });

  if (error) return <div>Error: {error.message}</div>;
  if (!path) return null;

  return (
    <ul>
      {path.weeks.flatMap((w) => w.lessons).map((l) => (
        <li key={l.id}>{l.title} - {l.minutes}m</li>
      ))}
    </ul>
  );
}`,
        lang: 'tsx',
      },
      {
        heading: 'Add progress tracking',
        body: 'Drop in ProgressTracker instead of LearningPath when you want lessons to remember their completion state across page refreshes. Progress is stored in localStorage under lk-progress-{pathId}.',
        code: `import { ProgressTracker } from '@learnkit-ai/react';

export function OnboardingWithProgress() {
  return (
    <ProgressTracker
      input={{
        role: 'Software Engineer',
        tools: ['Cursor', 'Claude'],
        goal: 'Ship production agents',
        level: 'intermediate',
      }}
      theme="technical"
    />
  );
}`,
        lang: 'tsx',
      },
      {
        heading: 'Pass a companyContext for personalised paths',
        body: 'The optional companyContext field (max 500 chars) lets you inject stack and team information. The engine uses it to personalise project lesson summaries - no AI call required.',
        code: `<LearningPath
  input={{
    role: 'Software Engineer',
    tools: ['Cursor'],
    goal: 'Ship a customer-facing AI feature',
    level: 'advanced',
    companyContext: '12-person team, Next.js + TypeScript stack, shipping weekly',
  }}
/>`,
        lang: 'tsx',
      },
    ],
    keywords: [
      'learnkit ai nextjs integration',
      'embed learning path nextjs',
      'learnkit react tutorial',
      'ai learning path saas integration',
    ],
  },
  {
    slug: 'theming-and-custom-styles',
    title: 'Theming and custom styles',
    tagline: 'Use CSS custom properties to match LearnKit AI to any host design system',
    intro:
      'LearnKit AI components use CSS custom properties for every visual decision - colour, typography, spacing. This means you can override any part of the default theme by setting variables on a wrapper element, without writing component-specific CSS.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The built-in themes',
        body: 'The LearningPath and ProgressTracker components ship with three themes: warm (default), midnight, and technical. Pass the theme prop to switch between them.',
        code: `<LearningPath input={input} theme="midnight" />
<LearningPath input={input} theme="technical" />`,
        lang: 'tsx',
      },
      {
        heading: 'Override with CSS custom properties',
        body: 'Every colour token is a CSS custom property. Set them on the component or a parent wrapper to override the theme. All properties use the --lk- prefix.',
        code: `.my-wrapper {
  --lk-surface: #F7F5F0;
  --lk-ink: #1A1A1A;
  --lk-accent: #6B4EFF;
  --lk-accent-3: #2D9B6E;
  --lk-font-sans: 'Inter', system-ui, sans-serif;
  --lk-font-serif: 'Playfair Display', Georgia, serif;
  --lk-font-mono: 'JetBrains Mono', monospace;
}`,
        lang: 'css',
      },
      {
        heading: 'Full token reference',
        body: 'These are all the tokens the components read. Any unset token falls back to the default warm theme value.',
        code: `--lk-surface       /* card and component background */
--lk-ink           /* primary text */
--lk-ink-soft      /* secondary text */
--lk-muted         /* captions, labels */
--lk-accent        /* primary accent (in-progress indicator, CTA) */
--lk-accent-2      /* secondary accent */
--lk-accent-3      /* completed indicator */
--lk-rule          /* subtle borders */
--lk-rule-strong   /* prominent borders */
--lk-font-sans     /* body typeface */
--lk-font-serif    /* heading typeface */
--lk-font-mono     /* monospace / labels */`,
        lang: 'css',
      },
      {
        heading: 'Using inline styles for one-off overrides',
        body: 'You can also set variables via the style prop on the component itself. This is useful for per-instance theming without a CSS class.',
        code: `<LearningPath
  input={input}
  style={{
    ['--lk-accent' as string]: '#6B4EFF',
    ['--lk-surface' as string]: 'transparent',
  }}
/>`,
        lang: 'tsx',
      },
    ],
    keywords: [
      'learnkit ai theming',
      'learnkit css custom properties',
      'custom ui learning path',
      'learnkit design system integration',
    ],
  },
  {
    slug: 'building-with-the-cli',
    title: 'Building with the LearnKit AI CLI',
    tagline: 'Use the CLI to generate learning paths in scripts, pipelines, and development workflows',
    intro:
      'The @learnkit-ai/cli package gives you the full generateLearningPath engine on the command line. Use it to prototype paths, inspect curricula, and pipe structured JSON into your own tooling - all without writing any code.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Install globally or run with npx',
        body: 'You can install the CLI globally or run it on demand with npx. The CLI has no external dependencies beyond Node.js >=20.',
        code: `# install globally
pnpm add -g @learnkit-ai/cli

# or run without installing
npx @learnkit-ai/cli generate --role "Software Engineer" --tools Claude --goal "Build an agent"`,
        lang: 'bash',
      },
      {
        heading: 'Generate a learning path',
        body: 'The generate command takes role, tools, goal, and level. It prints a human-readable path by default.',
        code: `learnkit-ai generate \\
  --role "Product Manager" \\
  --tools "Claude,Notion AI" \\
  --goal "Ship a research agent" \\
  --level intermediate`,
        lang: 'bash',
      },
      {
        heading: 'Get JSON output',
        body: 'Add --output json to get the full LearningPath object as JSON. Pipe it into jq, store it in a file, or pass it to another script.',
        code: `learnkit-ai generate \\
  --role "Software Engineer" \\
  --tools Cursor \\
  --goal "Refactor a legacy codebase" \\
  --level advanced \\
  --output json | jq '.weeks[0].lessons[].title'`,
        lang: 'bash',
      },
      {
        heading: 'Pass company context',
        body: 'Use --company-context to personalise project lessons for a specific stack or team size.',
        code: `learnkit-ai generate \\
  --role "Founder" \\
  --tools "Claude,Cursor" \\
  --goal "Replace my ops team with agents" \\
  --level beginner \\
  --company-context "5-person team, shipping weekly, TypeScript"`,
        lang: 'bash',
      },
      {
        heading: 'List supported roles and tools',
        body: 'Use the roles and tools subcommands to see everything the engine supports.',
        code: `learnkit-ai roles
learnkit-ai tools`,
        lang: 'bash',
      },
    ],
    keywords: [
      'learnkit ai cli',
      'learnkit cli tutorial',
      'generate learning path cli',
      'npx learnkit ai',
    ],
  },
  {
    slug: 'generating-lesson-content',
    title: 'Generating full lesson content',
    tagline: 'Use generateLessonContent to produce exercises, rubrics, and lesson bodies',
    intro:
      'Every lesson in a LearnKit AI path includes a title, summary, tool, and duration. The generateLessonContent function expands any lesson into a full body text, two exercises, and a rubric - all deterministic, all pure, no API calls.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Import and call the function',
        body: 'generateLessonContent takes a Lesson object (from generateLearningPath) and returns a LessonContent object. It is synchronous and pure - the same lesson always returns the same content.',
        code: `import { generateLearningPath, generateLessonContent } from '@learnkit-ai/core';

const path = generateLearningPath({
  role: 'Software Engineer',
  tools: ['Claude'],
  goal: 'Ship an AI-assisted code review tool',
  level: 'intermediate',
});

const firstLesson = path.weeks[0]!.lessons[0]!;
const content = generateLessonContent(firstLesson);

console.log(content.body);
// → multi-paragraph lesson body
console.log(content.exercises[0]!.prompt);
// → exercise prompt text
console.log(content.rubric[0]!.criterion);
// → "Technique application"`,
        lang: 'ts',
      },
      {
        heading: 'The LessonContent shape',
        body: 'The return type is validated by the LessonContentSchema. You can import the type from either @learnkit-ai/core or @learnkit-ai/schemas.',
        code: `import type { LessonContent, Exercise, RubricItem } from '@learnkit-ai/core';

interface LessonContent {
  lessonId: string;          // matches lesson.id
  body: string;              // 2-paragraph lesson expansion
  exercises: Exercise[];     // 2 exercises
  rubric: RubricItem[];      // 2 rubric criteria
}

interface Exercise {
  prompt: string;            // what the learner should do
  expectedOutput: string;    // what a good response looks like
  rubricHint: string;        // evaluation tip for the reviewer
}

interface RubricItem {
  criterion: string;         // what is being evaluated
  excellent: string;         // description of excellent work
  acceptable: string;        // description of acceptable work
  needsWork: string;         // description of work that needs improvement
}`,
        lang: 'ts',
      },
      {
        heading: 'Render it in React',
        body: 'Combine generateLessonContent with the useLearnKit hook or LearningPath component to build a full lesson detail view.',
        code: `'use client';
import { useState } from 'react';
import { generateLessonContent } from '@learnkit-ai/core';
import { LearningPath } from '@learnkit-ai/react';
import type { Lesson } from '@learnkit-ai/schemas';

export function PathWithLessonDetail({ input }) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const content = activeLesson ? generateLessonContent(activeLesson) : null;

  return (
    <div>
      <LearningPath input={input} onLessonClick={setActiveLesson} />
      {content && (
        <div>
          <p>{content.body}</p>
          {content.exercises.map((ex, i) => (
            <div key={i}>
              <strong>Exercise {i + 1}:</strong> {ex.prompt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`,
        lang: 'tsx',
      },
    ],
    keywords: [
      'learnkit generate lesson content',
      'learnkit exercises rubric',
      'lesson content api learnkit',
      'generateLessonContent tutorial',
    ],
  },
];
