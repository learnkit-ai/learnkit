# Testing

## Framework

Vitest. Each package has its own `vitest.config.ts`.

## File location

Co-locate tests with source:

```
packages/core/src/generator.ts
packages/core/src/__tests__/generator.test.ts
```

## Writing tests

- Test behavior, not implementation — assert what a function returns, not how it works internally
- One logical assertion per test where possible
- Test names describe the scenario in plain English:
  `it('returns a fallback path for an unsupported role')`
- No `describe` nesting deeper than two levels
- Prefer independent tests — avoid shared mutable state between tests
- No `beforeAll`/`afterAll` unless there is no reasonable alternative

## Mocking

- Mock only at system boundaries: HTTP, filesystem, clocks, external APIs
- Never mock internal packages — import and use the real implementation
- Never mock `@learnkit-ai/core` inside `@learnkit-ai/react` tests
- Never mock `@learnkit-ai/schemas` anywhere

## Required coverage — packages/core

These scenarios must have explicit tests:

- `generateLearningPath()` with each of the 5 supported roles
- Determinism: calling with identical input twice returns structurally equal output
- All supported tools appear in at least one lesson in the relevant template
- `getSupportedRoles()` returns a non-empty string array
- `getSupportedTools()` returns a non-empty string array
- Unknown/unsupported role returns a valid LearningPath (no throw, no undefined)
- Output validates against `learningPathSchema` from @learnkit-ai/schemas

## Required coverage — packages/schemas

- Each Zod schema accepts a known-valid object without error
- Each Zod schema rejects a known-invalid object with a ZodError
- `LearningPathInput` with `companyContext` longer than 500 chars fails validation

## CI gate

`pnpm test` must pass before any PR merges. A failing test is a merge blocker,
not a warning.
