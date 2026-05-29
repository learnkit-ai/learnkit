# LearnKit AI

> The open-source AI workbench for teams that ship.
> Generate personalized, role-aware learning paths for Claude, Cursor, ChatGPT and 40+ tools - and embed them in your product in 3 lines.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-c8472a.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-2c5f8d.svg)](https://www.typescriptlang.org/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-1a2547.svg)](https://nextjs.org/)
[![CI](https://github.com/learnkit-ai/learnkit/actions/workflows/ci.yml/badge.svg)](https://github.com/learnkit-ai/learnkit/actions/workflows/ci.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-6b8f6e.svg)](CONTRIBUTING.md)

Most enterprise AI training is a video library nobody finishes. LearnKit AI is project-based: every lesson ends with a real prompt, agent, or workflow your team can ship that Friday - reviewed by the AI Guide.

```bash
pnpm add @learnkit-ai/core @learnkit-ai/react
```

```tsx
import { LearningPath } from '@learnkit-ai/react';

<LearningPath
  input={{
    role: 'Product Manager',
    tools: ['Claude', 'Cursor'],
    goal: 'Ship an internal research agent',
    level: 'beginner',
  }}
/>;
```

That renders a four-week, twelve-lesson curriculum tuned to that role + stack + goal. No backend, no LLM call, no API key. The engine is deterministic - the same input always produces the same path.

---

## Why LearnKit AI

| Most AI training | LearnKit AI |
|---|---|
| 10-hour video libraries | 30-day, project-based paths |
| Completion certificates | A portfolio of shipped projects |
| Generic content for everyone | Adaptive to your role, stack, and goal |
| Closed platform | Apache-2.0 source, embeddable in your product |
| Stale within a quarter | Tools tracked, updated every two weeks |

## Features

- **`generateLearningPath()`** - pure function, no network, fully deterministic
- **`<LearningPath />`** - drop-in React component with three built-in themes (warm, midnight, technical)
- **`<LessonCard />`** - primitive for custom layouts
- **`<AIGuide />`** - embeddable AI tutor avatar + tip card
- **`useLearnKit(input)`** - React hook for headless use
- **Zod schemas** for everything - strict input validation and inferred types
- **No Tailwind dependency** in `@learnkit-ai/react` - CSS custom properties only, drops into any host theme
- **Apache-2.0** - fork it, ship it

## Quick start

### 1. Use the engine standalone

```ts
import { generateLearningPath } from '@learnkit-ai/core';

const path = generateLearningPath({
  role: 'Software Engineer',
  tools: ['Cursor', 'Claude'],
  goal: 'Ship a feature without bothering anyone on the team',
  level: 'intermediate',
});

console.log(path.weeks.length);                // 4
console.log(path.weeks[0].lessons[0].title);   // "Your first system prompt"
console.log(path.totalMinutes);                // ~430
```

### 2. Render the path in any React app

```tsx
import { LearningPath } from '@learnkit-ai/react';

export default function MyPage() {
  return (
    <LearningPath
      input={{
        role: 'Designer',
        tools: ['Midjourney', 'ChatGPT'],
        goal: 'Generate a brand-faithful image library',
        level: 'beginner',
      }}
      theme="midnight"
      onLessonClick={(lesson) => console.log(lesson)}
    />
  );
}
```

### 3. Headless with the hook

```tsx
import { useLearnKit } from '@learnkit-ai/react';

function MyCustomUI({ input }) {
  const { path, error } = useLearnKit(input);
  if (error) return <Error error={error} />;
  if (!path) return null;
  return <pre>{JSON.stringify(path, null, 2)}</pre>;
}
```

### 4. Drop in the AI Guide

```tsx
import { AIGuide } from '@learnkit-ai/react';

<AIGuide
  message="Looks like you're about to write a system prompt. Want a 2-minute refresher?"
  animated
/>;
```

## Packages

This is a pnpm + Turborepo monorepo.

| Package | Description |
|---|---|
| [`@learnkit-ai/schemas`](./packages/schemas) | Zod schemas + inferred TypeScript types. No logic. |
| [`@learnkit-ai/core`](./packages/core) | `generateLearningPath()` and role/tool helpers. Pure, no network. |
| [`@learnkit-ai/react`](./packages/react) | React components: `<LearningPath />`, `<LessonCard />`, `<AIGuide />`. |
| [`apps/web`](./apps/web) | Marketing site, demo, docs at [learnkit-ai.com](https://learnkit-ai.com). |
| [`examples/nextjs-basic`](./examples/nextjs-basic) | Minimal Next.js integration. |

```
schemas ← core ← react ← apps/web
```

## Public API

```ts
// @learnkit-ai/core
function generateLearningPath(input: LearningPathInput): LearningPath;
function getSupportedRoles(): string[];
function getSupportedTools(): string[];
function isRoleSupported(role: string): boolean;

// @learnkit-ai/schemas
type LearningPathInput = {
  role: string;
  tools: string[];
  goal: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  companyContext?: string; // max 500 chars
};

// @learnkit-ai/react
<LearningPath input={LearningPathInput} onLessonClick? theme? />
<LessonCard lesson={Lesson} status? onClick? />
<AIGuide message={string} animated? size? />
useLearnKit(input): { path, loading, error }
```

The `LearningPathInput` shape is the public API contract. It will not change without a major version bump.

## Development

Requirements: Node ≥ 20, pnpm ≥ 9.

```bash
git clone https://github.com/learnkit-ai/learnkit.git
cd learnkit
pnpm install

pnpm dev          # apps/web at localhost:3000
pnpm test         # vitest across all packages
pnpm typecheck    # tsc across all packages
pnpm build        # build all packages and apps
pnpm lint         # lint all workspaces
```

## How to contribute

Issues, PRs, and discussions are welcome. Some great first contributions:

- **Add a tool** - pick a tool from the [tracker issue](https://github.com/learnkit-ai/learnkit/issues), open a PR to `packages/core/src/tools.ts` with a curriculum template
- **Improve a lesson template** in `packages/core/src/generate.ts`
- **Add a theme** to `<LearningPath />` in `packages/react/src/LearningPath.tsx`
- **Write a blog post** in `apps/web/src/lib/blog-posts.ts`
- **Translate the UI** - locales are wide open

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations. Security issues: please follow [SECURITY.md](SECURITY.md).

## Roadmap

- [x] v0: schemas, core, react packages, marketing site
- [ ] v0.2: SSR-safe streaming for `<AIGuide />`
- [ ] v0.3: Eval rubrics in `@learnkit-ai/evals`
- [ ] v0.4: 40-tool curriculum library (currently 8)
- [ ] v1: stable public API, full docs site, deployment recipes

Nothing on the roadmap will be paid-only. The license is Apache-2.0 for the long haul - fork it, ship it, run it without us.

## License

[Apache-2.0](LICENSE). Use it, fork it, ship it - including commercially.

## Acknowledgements

LearnKit AI is built on top of years of work by the open-source community. Particular thanks to the maintainers of Zod, Next.js, React, and TypeScript.

---

**LearnKit AI · [learnkit-ai.com](https://learnkit-ai.com) · [@learnkit-ai](https://github.com/learnkit-ai)**
