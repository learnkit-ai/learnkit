# API Conventions

## What counts as public API

Everything exported from `packages/*/src/index.ts`:
- All exported functions and their signatures
- All exported types and their shapes
- All React component prop types
- All Zod schema exports

Internal helpers not re-exported from `index.ts` are not public API and
may change freely.

## Stability contract

`LearningPathInput` is locked for v0:

- Do not add required fields — it is a breaking change
- Optional fields (`companyContext?`) may be added in minor versions
- Renaming, removing, or changing the type of any field is a major version bump
- Do not change the output shape of `generateLearningPath()` without a major bump

Before any shape change: open a GitHub issue, get agreement, then implement.

## Exports

Named exports only. No `export default` from any file inside `packages/`.

```typescript
// Correct
export function generateLearningPath(input: LearningPathInput): LearningPath
export type { LearningPath, LearningPathInput, Lesson }

// Wrong
export default function generateLearningPath(...)
```

Exception: Next.js App Router page components require `export default` — this
applies only inside `apps/web/app/`.

## Zod schemas

- All schemas live in `@learnkit-ai/schemas`
- Types are always inferred: `export type Foo = z.infer<typeof fooSchema>`
- Never write a `type Foo = { ... }` manually if a schema exists for it
- Schema naming: `camelCase` + `Schema` suffix: `learningPathSchema`, `lessonSchema`
- Export both the schema and the inferred type from `packages/schemas/src/index.ts`

## Error handling

- `generateLearningPath()` never throws for input that passes Zod validation
- Unknown or unsupported roles return a valid generic LearningPath — documented fallback,
  not an exception
- Invalid input that fails Zod parse surfaces as `ZodError` — callers can catch it
- No `console.error` in packages — surface errors to the caller

## Versioning

- Follow semver: `MAJOR.MINOR.PATCH`
- v0.x is pre-stable: breaking changes are allowed across minor versions
  but must be documented in `CHANGELOG.md`
- Once v1.0.0 is tagged, breaking changes require a major bump
