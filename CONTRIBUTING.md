# Contributing to LearnKit AI

Thanks for considering a contribution. LearnKit AI is built in the open under Apache-2.0, and the project is genuinely better when more people shape it.

## Quick start

```bash
git clone https://github.com/learnkit-ai/learnkit.git
cd learnkit
pnpm install
pnpm dev
```

Open [`http://localhost:3000`](http://localhost:3000) to see the marketing site, demo, and docs.

## What we welcome

- **Tool tracks.** Add a new tool to `packages/core/src/tools.ts` with a curriculum template in `packages/core/src/generate.ts`.
- **Lesson improvements.** Edit `packages/core/src/generate.ts` — make the lessons sharper, more honest, more useful for the work people actually do.
- **Themes for `<LearningPath />`.** Add a new theme to `packages/react/src/LearningPath.tsx`.
- **Components.** Extend `@learnkit-ai/react` with new primitives that fit the warm-academic + modern-product feel.
- **Documentation.** Both the README and inline JSDoc.
- **Tests.** Vitest. Co-located with the source: `foo.ts` → `__tests__/foo.test.ts`.
- **Blog posts.** Add to `apps/web/src/lib/blog-posts.ts`.

## What we are cautious about

- **Public API changes.** `LearningPathInput` and exported types from `@learnkit-ai/schemas` are a contract. Backward-incompatible changes need a major version bump and discussion in an issue first.
- **Dependencies.** We keep `@learnkit-ai/react` Tailwind-free and `@learnkit-ai/core` dependency-light. Open an issue before adding new runtime dependencies.
- **Tracking, analytics, telemetry.** No silent telemetry. Anything that phones home is opt-in and explicit.

## Workflow

1. **Open an issue first** for anything bigger than a typo, especially API or UX changes. A 2-line proposal saves a 200-line rewrite later.
2. **Fork** and create a feature branch from `main`: `git checkout -b feat/your-thing`.
3. **Make focused commits.** One logical change per commit. Imperative subject lines: `Add X`, `Fix Y`, `Update Z`, `Remove A`, `Refactor B`.
4. **Run the checks:**
   ```bash
   pnpm typecheck
   pnpm test
   pnpm lint
   ```
5. **Open a PR.** Keep the description short and concrete — what changed and why. Link the issue.
6. **Be patient and kind in review.** We will be.

## Code style

- **TypeScript strict mode.** No `any` without a comment explaining why.
- **Named exports only** from packages — no `export default`.
- **Zod schemas live in `packages/schemas`.** Types in packages are inferred from those schemas — no manual type duplication.
- **No mocking internal packages** in tests — only mock at system boundaries.
- **No comments that describe what the code does.** Only comments that explain *why* a non-obvious choice was made.
- **Imperative commit messages**, no AI co-author trailers, no file lists in commit bodies.

## Tests

Vitest, co-located in `__tests__/` directories. We aim to test:

- Pure functions in `@learnkit-ai/core` exhaustively
- Schema validation behavior in `@learnkit-ai/schemas` for boundary cases
- React component prop contracts in `@learnkit-ai/react`

```bash
pnpm --filter @learnkit-ai/core test
pnpm --filter @learnkit-ai/schemas test
```

## Releasing

Releases are tagged with semver. Patch releases need only a passing CI; minor and major need a PR review from a maintainer.

## Code of conduct

By participating you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Short version: be kind, assume good intent, give credit, take feedback gracefully.

## Security

Found a vulnerability? Please do not open a public issue. See [SECURITY.md](SECURITY.md).

---

Questions? Open a [discussion](https://github.com/learnkit-ai/learnkit/discussions) or an issue.
