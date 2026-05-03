<!-- Generated from .agent/agent.md — do not edit directly.
     Run `npx @agent-anatomy/agent` to regenerate. -->

# LearnKit AI

Open-source TypeScript engine and React component for embedding personalized,
role-aware learning paths inside SaaS products.

Repo:    https://github.com/learnkit-ai/learnkit
Domain:  learnkit-ai.com
NPM:     @learnkit-ai
License: Apache-2.0

## Stack

- Language:        TypeScript 5, strict mode
- Package manager: pnpm workspaces
- Build:           Turborepo
- Frontend:        Next.js 15 App Router (apps/web)
- Styling:         Tailwind CSS (apps/web only) + CSS custom properties (packages/react)
- Validation:      Zod 3
- Testing:         Vitest
- Node:            >=20

## Commands

```bash
pnpm install               # install all workspaces
pnpm dev                   # start apps/web at localhost:3000
pnpm build                 # build all packages + apps
pnpm lint                  # lint all workspaces
pnpm typecheck             # tsc across all packages
pnpm test                  # run all Vitest tests
npx @agent-anatomy/agent   # sync .agent/agent.md → all agent config files
```

## Architecture

```
packages/schemas   @learnkit-ai/schemas   Zod schemas + inferred TS types. No logic.
packages/core      @learnkit-ai/core      generateLearningPath(). Deterministic, no LLM.
packages/react     @learnkit-ai/react     <LearningPath />, <LessonCard />, <AIGuide />, useLearnKit()
apps/web                                  Next.js landing, /demo, /docs
examples/nextjs-basic                     Minimal standalone integration
```

Dependency graph (no cycles allowed):

```
schemas ← core ← react ← apps/web
```

## Key invariants

- `generateLearningPath()` is pure: no async, no network, no side effects
- `LearningPathInput` shape is the public API contract — do not change without a major version bump
- `packages/react` has no Tailwind dependency — CSS custom properties only
- All TypeScript types in packages are inferred from Zod schemas — no manual type duplication
- The demo at /demo runs entirely on @learnkit-ai/core — zero backend required

## Public API — @learnkit-ai/core

```typescript
function generateLearningPath(input: LearningPathInput): LearningPath
function getSupportedRoles(): string[]
function getSupportedTools(): string[]
function isRoleSupported(role: string): boolean
```

Input type (LearningPathInput):

```typescript
{
  role: string
  tools: string[]
  goal: string
  level: 'beginner' | 'intermediate' | 'advanced'
  companyContext?: string   // optional, max 500 chars
}
```

## Component API — @learnkit-ai/react

```tsx
<LearningPath input={LearningPathInput} onLessonClick? theme? className? />
<LessonCard lesson={Lesson} status? onClick? className? />
<AIGuide message={string} animated? size? />
useLearnKit(input: LearningPathInput): { path, loading, error }
```

## Brand rules

| What         | Correct           | Never use                  |
|--------------|-------------------|----------------------------|
| Product name | LearnKit AI       | LearnKit, learnkit         |
| Domain       | learnkit-ai.com   | getlearnkit.com            |
| NPM scope    | @learnkit-ai      | @learnkit, @getlearnkit    |
| AI tutor     | AI Guide          | Olé, Ole, ole              |

No fake social proof: no customer logos, no testimonials, no GitHub star counts,
no compliance badges (SOC 2, HIPAA, GDPR), no user or revenue metrics.

## Do not build in v0

- Any backend server (NestJS, Express, Hono, or any HTTP server)
- Any database (Prisma, Postgres, SQLite, or any persistence layer)
- Authentication of any kind
- Billing of any kind
- Real LLM API calls (Anthropic, OpenAI, Gemini, or any LLM provider)
- Docker or docker-compose
- Team dashboard, HR analytics, SSO, SCIM
- apps/api (planned for v1)

## Rules

- No `any` without an explanatory comment
- Named exports only from packages — no `export default` in packages/
- Co-locate tests: `foo.ts` → `__tests__/foo.test.ts`
- No mocking internal packages in tests — only mock at system boundaries
- All Zod schemas live in packages/schemas
- Stage files by name — never `git add .` or `git add -A`
- Commit messages: imperative mood, no AI co-author lines, no file lists

## Do not touch

- `pnpm-lock.yaml`
- `packages/schemas/src/index.ts` types once stabilized — public API contract
- `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.windsurfrules`, `GEMINI.md`, `CONVENTIONS.md`
  — generated from `.agent/agent.md`; edit there and re-sync
