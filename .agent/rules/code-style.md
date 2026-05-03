# Code Style

## TypeScript

- Strict mode everywhere — `tsconfig.base.json` sets `"strict": true`
- No `any` without a comment explaining why it cannot be avoided
- Named exports only from packages — no `export default` inside `packages/`
- Prefer `type` over `interface` for data shapes; use `interface` only for
  extension points that consumers are expected to augment
- Infer types from Zod schemas — do not write matching manual types alongside them
- `const` over `let`, never `var`
- Arrow functions for callbacks and inline expressions
- `async`/`await` over `.then()` chains
- `undefined` over `null` for absent optional values

## Naming

- Files: `kebab-case.ts`, `PascalCase.tsx` for React components
- Exported functions/constants: `camelCase`
- Exported types/components: `PascalCase`
- Zod schemas: `fooSchema` → inferred type named `Foo`
- Test files: `__tests__/foo.test.ts` co-located with `foo.ts`

## File size

- Aim for ~100 lines per file — split when longer
- One primary export per file
- No barrel re-export chains deeper than one level (`index.ts` re-exports direct sources)
- No circular imports — dependency graph must be a DAG

## Comments

- No comments explaining what the code does — use clear names instead
- Comments only for: non-obvious constraints, invariants, or bug workarounds
- No `// TODO` committed to main — open a GitHub issue instead

## React

- Functional components only
- Props typed with `type`, not `interface`, unless explicitly designed for extension
- No prop spreading except when forwarding to a native HTML element
- No inline `style` objects — use CSS custom properties (`--lk-*`) or Tailwind classes
- `packages/react` must not import Tailwind — CSS custom properties only

## Formatting

Prettier handles all whitespace. Do not manually adjust spacing or quotes.
Config: 2-space indent, single quotes, no semicolons, trailing commas in
multi-line structures.
