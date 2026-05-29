# LearnKit AI v0 - Implementation Status

Last updated: 2026-05-03

## Done

- [x] `.agent/` - Agent Anatomy universal config
  - `agent.md` (source of truth)
  - `commands/` - review, fix-issue, ship
  - `rules/` - code-style, testing, security, api-conventions
  - `agents/` - code-reviewer, security-auditor
  - `tasks/` - v0-scaffold.md, v0-landing-demo.md, v0.txt
  - `settings.json`, local override examples
- [x] `CLAUDE.md` - generated from agent.md
- [x] `AGENTS.md` - generated from agent.md
- [x] `.github/copilot-instructions.md` - generated from agent.md
- [x] `.gitignore`

## In progress

- [ ] Monorepo scaffold (pnpm + Turborepo + TypeScript)

## Next - implement in this order

### 1. Monorepo root
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- root `package.json` with `dev/build/lint/typecheck/test` scripts
- `.env.example`
- `.eslintrc.js` (root, shared)
- `prettier.config.js`

### 2. packages/schemas - `@learnkit-ai/schemas`
- Zod schemas: `levelSchema`, `lessonSchema`, `learningPathSchema`, `learningPathInputSchema`
- Inferred TS types (no manual types)
- Vitest tests

### 3. packages/core - `@learnkit-ai/core`
- `generateLearningPath()` - pure, deterministic, no LLM
- 5 role templates: Product Manager, Software Engineer, Designer, Marketer, Data Analyst
- `getSupportedRoles()`, `getSupportedTools()`, `isRoleSupported()`
- Vitest tests (all roles, determinism, fallback)

### 4. packages/react - `@learnkit-ai/react`
- `tokens.css` - CSS custom properties, warm theme + midnight theme
- `<LearningPath />` component
- `<LessonCard />` component
- `<AIGuide />` component
- `useLearnKit()` hook
- Named exports from `src/index.ts`

### 5. apps/web - Next.js App Router
- Landing page (`/`) - 7 sections, no fake proof
- Demo page (`/demo`) - role → tools → goal → path, zero backend
- Docs page (`/docs`) - placeholder with API reference

### 6. examples/nextjs-basic
- Standalone Next.js app
- 3-command setup

### 7. Root docs
- `README.md`
- `CONTRIBUTING.md`
- `ROADMAP.md`
- `LICENSE` (Apache-2.0)

### 8. CI
- `.github/workflows/ci.yml`
- `.github/dependabot.yml`
- `.github/pull_request_template.md`

## Acceptance gates

```bash
pnpm install    # no errors
pnpm dev        # apps/web at localhost:3000
pnpm lint       # clean
pnpm typecheck  # clean
pnpm test       # all Vitest tests pass
pnpm build      # all packages + apps build
```

Plus:
- `grep -r "Olé\|getlearnkit\|SOC 2" . --exclude-dir=node_modules` → zero results
- Demo generates path for "Product Manager + Cursor + beginner" with no backend call
- `examples/nextjs-basic`: `pnpm install && pnpm dev` works

## What is explicitly out of scope for v0

- NestJS / Express / any backend
- Prisma / Postgres / any database
- Auth, billing, Docker
- Real LLM API calls
- Team dashboard, HR analytics
- apps/api
- Fake social proof
