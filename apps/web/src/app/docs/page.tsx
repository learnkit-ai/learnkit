import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow } from '@/components/ui/primitives';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { SITE_URL } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Docs — LearnKit AI',
  description:
    'API reference and quickstart for @learnkit-ai/core and @learnkit-ai/react. Install, generate a learning path, and render it in three steps.',
  alternates: { canonical: '/docs' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/docs`,
    title: 'LearnKit AI Docs — API reference and quickstart',
    description:
      'API reference and quickstart for @learnkit-ai/core and @learnkit-ai/react.',
  },
};

const mono: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 12.5,
  lineHeight: 1.7,
};

function CodePane({ children }: { children: React.ReactNode }) {
  return (
    <pre
      style={{
        ...mono,
        background: 'var(--paper-2)',
        border: '1px solid var(--rule)',
        borderRadius: 10,
        padding: '16px 18px',
        overflowX: 'auto',
        margin: '12px 0',
        color: 'var(--ink)',
      }}
    >
      {children}
    </pre>
  );
}

function Anchor({ id, label }: { id: string; label: string }) {
  return (
    <h2
      id={id}
      className="serif"
      style={{
        fontSize: 28,
        letterSpacing: '-0.02em',
        fontWeight: 400,
        margin: '48px 0 16px',
        scrollMarginTop: 80,
      }}
    >
      {label}
    </h2>
  );
}

function SubAnchor({ id, label }: { id: string; label: string }) {
  return (
    <h3
      id={id}
      style={{
        fontSize: 16,
        fontWeight: 600,
        margin: '32px 0 10px',
        scrollMarginTop: 80,
      }}
    >
      {label}
    </h3>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 12,
        background: 'var(--paper-2)',
        border: '1px solid var(--rule)',
        borderRadius: 5,
        padding: '1px 6px',
        color: 'var(--ink)',
      }}
    >
      {children}
    </code>
  );
}


export default function DocsPage() {
  return (
    <main
      className="paper-grain"
      style={{ background: 'var(--paper)', minHeight: '100vh', overflow: 'hidden' }}
    >
      <Nav />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '48px 56px 96px',
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        {/* Sidebar */}
        <DocsSidebar />

        {/* Content */}
        <article style={{ minWidth: 0 }}>
          <Eyebrow>Documentation</Eyebrow>
          <h1
            className="serif"
            style={{
              fontSize: 52,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              margin: '18px 0 12px',
              fontWeight: 400,
            }}
          >
            LearnKit AI
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              marginBottom: 0,
              maxWidth: 600,
            }}
          >
            Open-source TypeScript engine and React components for embedding
            personalized AI learning paths in any product. No API key. No backend.
            Apache-2.0.
          </p>

          {/* Quickstart */}
          <Anchor id="quickstart" label="Quickstart" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 16px' }}>
            Install both packages, call <Pill>generateLearningPath()</Pill>, and render the result.
          </p>

          <SubAnchor id="install" label="Install" />
          <CodePane>{`pnpm add @learnkit-ai/core @learnkit-ai/react
# or
npm install @learnkit-ai/core @learnkit-ai/react`}</CodePane>

          <SubAnchor id="generate" label="Generate a path" />
          <CodePane>{`import { generateLearningPath } from '@learnkit-ai/core';

const path = generateLearningPath({
  role:  'Software Engineer',
  tools: ['Claude', 'Cursor'],
  goal:  'ship a production agent',
  level: 'beginner',
});

console.log(path.weeks.length);              // 4
console.log(path.weeks[0].lessons[0].title); // "Your first system prompt"`}</CodePane>

          <SubAnchor id="render" label="Render it" />
          <CodePane>{`import { LearningPath } from '@learnkit-ai/react';

export default function OnboardingPage() {
  return (
    <LearningPath
      input={{
        role:  'Software Engineer',
        tools: ['Claude', 'Cursor'],
        goal:  'ship a production agent',
        level: 'beginner',
      }}
      theme="warm"
    />
  );
}`}</CodePane>

          <p
            style={{
              fontSize: 14,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 10,
              padding: '14px 18px',
              margin: '12px 0',
            }}
          >
            <strong>No network calls.</strong> <Pill>generateLearningPath()</Pill> is a pure
            function. Same input always produces the same path. Works in SSR, edge runtimes,
            or plain Node.js. No API key required.
          </p>

          {/* @learnkit-ai/core */}
          <Anchor id="core" label="@learnkit-ai/core" />

          <SubAnchor id="generate-fn" label="generateLearningPath(input)" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            The main export. Pure function. No async, no network, no side effects. Validates{' '}
            <Pill>input</Pill> with Zod before generating.
          </p>
          <CodePane>{`function generateLearningPath(input: LearningPathInput): LearningPath`}</CodePane>

          <SubAnchor id="get-roles" label="getSupportedRoles()" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            Returns the list of role labels you can pass as <Pill>input.role</Pill>.
          </p>
          <CodePane>{`import { getSupportedRoles } from '@learnkit-ai/core';

getSupportedRoles();
// ['Product Manager', 'Software Engineer', 'Designer',
//  'Data Analyst', 'Marketer', 'Founder',
//  'Operations', 'Researcher']`}</CodePane>

          <SubAnchor id="get-tools" label="getSupportedTools()" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            Returns the list of tool names you can include in <Pill>input.tools</Pill>.
          </p>
          <CodePane>{`import { getSupportedTools } from '@learnkit-ai/core';

getSupportedTools();
// ['Claude', 'ChatGPT', 'Cursor', 'Copilot',
//  'Gemini', 'Midjourney', 'Notion AI', 'Perplexity']`}</CodePane>

          <SubAnchor id="is-role" label="isRoleSupported(role)" />
          <CodePane>{`import { isRoleSupported } from '@learnkit-ai/core';

isRoleSupported('Software Engineer'); // true
isRoleSupported('Astronaut');         // false`}</CodePane>

          {/* @learnkit-ai/react */}
          <Anchor id="react" label="@learnkit-ai/react" />

          <SubAnchor id="learning-path-comp" label="<LearningPath />" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            Renders a full 4-week path. Calls <Pill>generateLearningPath()</Pill> internally from
            the provided <Pill>input</Pill>.
          </p>
          <CodePane>{`<LearningPath
  input={LearningPathInput}     // required
  onLessonClick={(lesson) => {}} // optional
  theme="warm"                   // "warm" | "midnight" | "technical"
  className="my-class"           // optional
/>`}</CodePane>

          <SubAnchor id="lesson-card" label="<LessonCard />" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            Renders a single lesson. Useful when you want to integrate individual lessons
            into your own layout.
          </p>
          <CodePane>{`<LessonCard
  lesson={Lesson}         // required
  status="completed"      // "not_started" | "in_progress" | "completed"
  onClick={() => {}}      // optional
  className="my-card"     // optional
/>`}</CodePane>

          <SubAnchor id="ai-guide-comp" label="<AIGuide />" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            Drop-in avatar + tip card. Embed anywhere you want contextual help.
            No configuration required beyond a <Pill>message</Pill>.
          </p>
          <CodePane>{`<AIGuide
  message="Need a hand with your first prompt?"
  animated={true}  // default true
  size={28}        // avatar size in px, default 28
/>`}</CodePane>

          <SubAnchor id="use-learnkit" label="useLearnKit(input)" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            Headless hook. Returns <Pill>{`{ path, error }`}</Pill>. Build your own UI on top —
            the hook handles input validation and memoizes the result.
          </p>
          <CodePane>{`import { useLearnKit } from '@learnkit-ai/react';

function MyCustomPath() {
  const { path, error } = useLearnKit({
    role:  'Product Manager',
    tools: ['ChatGPT', 'Notion AI'],
    goal:  'run an AI discovery sprint',
    level: 'intermediate',
  });

  if (error) return <p>{error.message}</p>;
  return (
    <ul>
      {path.weeks.map(week => (
        <li key={week.id}>{week.title}</li>
      ))}
    </ul>
  );
}`}</CodePane>

          {/* Types */}
          <Anchor id="schemas" label="Types & schemas" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            All types are inferred from Zod schemas in{' '}
            <Pill>@learnkit-ai/schemas</Pill>. No manual type duplication. Import from
            either the schemas package directly or from your consuming package.
          </p>
          <CodePane>{`// LearningPathInput — the contract. Will not change without a major version bump.
type LearningPathInput = {
  role:           string                              // from getSupportedRoles()
  tools:          string[]                            // from getSupportedTools()
  goal:           string
  level:          'beginner' | 'intermediate' | 'advanced'
  companyContext?: string                             // optional, max 500 chars
}

// LearningPath — the output
type LearningPath = {
  id:    string
  input: LearningPathInput
  weeks: Week[]
}

type Week = {
  id:      string
  title:   string
  lessons: Lesson[]
}

type Lesson = {
  id:          string
  title:       string
  description: string
  duration:    number  // minutes
  tools:       string[]
}`}</CodePane>

          {/* Theming */}
          <Anchor id="theming" label="Theming" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            <Pill>@learnkit-ai/react</Pill> uses CSS custom properties only — no Tailwind.
            Three built-in themes ship out of the box. Override any token in your own CSS.
          </p>
          <CodePane>{`/* Built-in themes — pass as the theme prop */
theme="warm"       // warm paper, terracotta accent (default)
theme="midnight"   // dark ink, blue accent
theme="technical"  // neutral gray, green accent

/* Override any token in your own CSS */
:root {
  --accent:    #7C3AED;  /* your brand color */
  --paper:     #FAFAF8;
  --mono:      'JetBrains Mono', monospace;
}`}</CodePane>

          {/* Self-hosting */}
          <Anchor id="self-hosting" label="Self-hosting" />
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 12px' }}>
            To fork and customize the lesson templates, clone the repo and edit{' '}
            <Pill>packages/core/src/generate.ts</Pill>.
          </p>
          <CodePane>{`git clone https://github.com/learnkit-ai/learnkit
cd learnkit
pnpm install

# Edit lesson templates
code packages/core/src/generate.ts

# Run tests after any changes
pnpm test

# Start the dev server
pnpm dev`}</CodePane>

          <p
            style={{
              fontSize: 14,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 10,
              padding: '14px 18px',
              margin: '12px 0',
            }}
          >
            Contributions welcome. See{' '}
            <Link
              href="https://github.com/learnkit-ai/learnkit/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              CONTRIBUTING.md
            </Link>{' '}
            for the commit and PR conventions. Apache-2.0 — use it, fork it, ship it.
          </p>
        </article>
      </div>

      <Footer />
    </main>
  );
}
