# Task: v0-scaffold

Bootstrap the monorepo and implement `packages/schemas`, `packages/core`, and `packages/react`.

## Goal

`pnpm install && pnpm typecheck && pnpm test` all pass.
`generateLearningPath()` returns a fully typed `LearningPath` for all 5 supported roles.

## Context

Task 1 of 2. `v0-landing-demo` depends on this completing first.
Stabilize types in `packages/schemas` before writing `packages/core`.
The `LearningPathInput` shape is the public API contract — do not change it
after tests pass without opening a discussion.

Read `.agent/agent.md` and `.agent/rules/` before starting.

## Steps

### 1. Monorepo root

Create these files:

**`pnpm-workspace.yaml`**
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'examples/*'
```

**`turbo.json`** — pipelines for `dev`, `build`, `lint`, `typecheck`, `test`
with correct dependency ordering (`build` depends on upstream `build`, etc.)

**`tsconfig.base.json`**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "moduleResolution": "bundler",
    "module": "ESNext",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

**`package.json`** — root scripts:
```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test"
  }
}
```

**`.env.example`** — single comment: `# No environment variables required for v0`

### 2. packages/schemas

Package name: `@learnkit-ai/schemas`
Dependencies: `zod`

Export from `src/index.ts`:

```typescript
import { z } from 'zod'

export const levelSchema = z.enum(['beginner', 'intermediate', 'advanced'])
export type Level = z.infer<typeof levelSchema>

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),            // e.g. "8 min"
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  why: z.string(),
  practice: z.string(),
  expectedOutcome: z.string(),
  tools: z.array(z.string()),
  role: z.string(),
})
export type Lesson = z.infer<typeof lessonSchema>

export const learningPathSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  durationDays: z.number().int().positive(),
  lessons: z.array(lessonSchema),
  outcomes: z.array(z.string()),
})
export type LearningPath = z.infer<typeof learningPathSchema>

export const learningPathInputSchema = z.object({
  role: z.string().min(1),
  tools: z.array(z.string()).min(1),
  goal: z.string().min(1),
  level: levelSchema,
  companyContext: z.string().max(500).optional(),
})
export type LearningPathInput = z.infer<typeof learningPathInputSchema>
```

Add `src/__tests__/schemas.test.ts`:
- Each schema accepts a known-valid object
- Each schema rejects a known-invalid object with `ZodError`
- `LearningPathInput` rejects `companyContext` longer than 500 chars

### 3. packages/core

Package name: `@learnkit-ai/core`
Dependencies: `@learnkit-ai/schemas`

**`src/templates.ts`** — define 5 role templates.
Each template is a function `(input: LearningPathInput) => { title, summary, durationDays, lessons, outcomes }`.
Use `input.tools` to mention actual tools in lesson copy.
Use `input.level` to adjust difficulty labels and practice complexity.

Supported roles (case-insensitive match):
- `product manager`
- `software engineer`
- `designer`
- `marketer`
- `data analyst`

Each template must produce at least 4 lessons.
Fallback for unknown roles: return a generic "AI Fundamentals" path — no throw.

**`src/generator.ts`**

```typescript
import { learningPathInputSchema, LearningPathInput, LearningPath } from '@learnkit-ai/schemas'
import { getTemplate } from './templates'

export function generateLearningPath(input: LearningPathInput): LearningPath {
  const parsed = learningPathInputSchema.parse(input)  // throws ZodError on invalid input
  const template = getTemplate(parsed)
  return {
    id: deterministicId(parsed),
    ...template,
  }
}

export function getSupportedRoles(): string[] { ... }
export function getSupportedTools(): string[] { ... }
export function isRoleSupported(role: string): boolean { ... }
```

`deterministicId`: hash of `role + tools.sort().join() + goal + level` — no random, no uuid.
Use a simple deterministic hash (e.g. djb2) — no crypto dependency needed.

**`src/__tests__/generator.test.ts`** must cover:
- `generateLearningPath()` returns a valid `LearningPath` for all 5 roles
- Output validates against `learningPathSchema`
- Same input called twice returns structurally equal output
- Unknown role returns valid fallback (no throw)
- `getSupportedRoles()` returns array of length >= 5
- `getSupportedTools()` returns non-empty array

### 4. packages/react

Package name: `@learnkit-ai/react`
Peer dependencies: `react >=18`, `react-dom >=18`
Dependencies: `@learnkit-ai/core`, `@learnkit-ai/schemas`

**`src/tokens.css`** — CSS custom properties, warm theme:

```css
:root {
  --lk-paper: #FAF7F0;
  --lk-paper-2: #F4EFE3;
  --lk-ink: #1A2547;
  --lk-ink-soft: #4A557A;
  --lk-muted: #6B7280;
  --lk-accent: #C8472A;
  --lk-accent-2: #E8B547;
  --lk-accent-3: #6B8F6E;
  --lk-accent-4: #2C5F8D;
  --lk-surface: #FFFFFF;
  --lk-border: rgba(26, 37, 71, 0.10);
  --lk-radius: 10px;
  --lk-radius-lg: 16px;
  --lk-shadow: 0 2px 6px rgba(26, 37, 71, 0.06);
  --lk-serif: 'Newsreader', Georgia, serif;
  --lk-sans: 'Inter', system-ui, sans-serif;
  --lk-mono: 'JetBrains Mono', ui-monospace, monospace;
}

[data-lk-theme="midnight"] {
  --lk-paper: #0F1428;
  --lk-ink: #F4EFE3;
  --lk-accent: #E8B547;
  --lk-surface: #161C36;
  --lk-border: rgba(244, 239, 227, 0.10);
}
```

**Components:**

`<LearningPath input theme? className? onLessonClick? />`
— calls `generateLearningPath(input)` internally, renders path title, summary,
outcomes list, and a `<LessonCard />` for each lesson.

`<LessonCard lesson status? onClick? className? />`
— renders lesson title, duration, difficulty badge, why, and practice prompt.
`status` controls a visual indicator: `pending` | `active` | `complete`.

`<AIGuide message animated? size? />`
— avatar + message bubble. Avatar is a small circle with warm gradient
and a subtle face glyph (SVG). No "Olé" text anywhere.

`useLearnKit(input: LearningPathInput)`
— calls `generateLearningPath(input)` synchronously, wraps in state.
Returns `{ path: LearningPath | null, loading: boolean, error: Error | null }`.
`loading` is always `false` in v0 (synchronous call).

**`src/index.ts`** exports:
```typescript
export { LearningPath } from './LearningPath'
export { LessonCard } from './LessonCard'
export { AIGuide } from './AIGuide'
export { useLearnKit } from './hooks'
export type { LearningPathInput, LearningPath as LearningPathType, Lesson, Level }
  from '@learnkit-ai/schemas'
```

Styling rules:
- No Tailwind import or class usage anywhere in `packages/react`
- All layout and color via `--lk-*` CSS custom properties
- `className` prop on all components passes through to root element

## Acceptance

- [ ] `pnpm install` completes without errors
- [ ] `pnpm typecheck` clean across all packages
- [ ] `pnpm test` passes — all Vitest tests green
- [ ] `generateLearningPath({ role: 'Product Manager', tools: ['Cursor'], goal: 'ship AI features', level: 'beginner' })` returns a typed `LearningPath` at runtime
- [ ] Output of above call validates against `learningPathSchema.parse()`
- [ ] `grep -r "any" packages/core/src packages/schemas/src` shows zero untagged `any` types
- [ ] `grep -r "Olé\|Ole\b" .` shows zero results
- [ ] No network calls or async functions in `packages/core`
- [ ] `packages/react` has no `import.*tailwind` or `import.*tw`

## Do not

- Add `async` to `generateLearningPath()`
- Add any LLM API calls
- Add Tailwind to `packages/react`
- Write manual TypeScript types — infer from Zod schemas only
- Use `uuid` or `crypto.randomUUID()` for IDs — use deterministic hash
- Change `LearningPathInput` shape after tests pass
