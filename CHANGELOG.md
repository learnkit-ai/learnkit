# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `/teams` page - OSS-framed guide for embedding LearnKit AI across an org: role-mapped embed pattern, before/after comparison, 3-step quickstart
- `/docs` page - full API reference with sticky sidebar, active-section highlighting, quickstart, theming, and self-hosting guide
- `DocsSidebar` client component - `IntersectionObserver`-based active section tracking for the docs page
- 3 new engineering blog posts: "Why generateLearningPath() makes zero LLM calls", "How to fork and customize LearnKit AI", "Embedding AI learning paths in your SaaS onboarding flow"
- `tsup` build for all packages - ESM + CJS + `.d.ts` output; conditional exports map (`"source"` for monorepo dev, `"import"` for npm consumers)
- 21 React component tests - `<LearningPath />`, `<LessonCard />`, `<AIGuide />`, `useLearnKit()` using `@testing-library/react` and `happy-dom`
- Per-role lesson curricula for Software Engineer, Product Manager, Designer, and Data Analyst - distinct week titles and lesson content per role
- `vitest.config.ts` with `resolve.alias` in core and react packages - resolves workspace deps to TypeScript source without requiring a pre-build
- `"source"` custom export condition across all packages - prevents vitest from resolving to non-existent dist files in CI

### Changed
- `/developers` page - rewrote to show the real package API surface (`generateLearningPath()`, `getSupportedRoles()`, `getSupportedTools()`, React components) instead of fabricated REST endpoints
- `UseItYourWay` section - replaced pricing cards with OSS install/embed/self-host options; no dollar amounts anywhere
- `Proof` section - replaced fake testimonials and social proof with real OSS facts (Apache-2.0, TypeScript strict, 0 tracking pixels)
- Nav - updated links: "For teams" → `/teams`, added "Docs" → `/docs`
- CI - added `@learnkit-ai/react` to the test step; added package build step (schemas → core → react) before web build
- `packageManager` field added to root `package.json` - fixes `turbo dev` workspace resolution

### Fixed
- `getSupportedRoles()` comment in docs now shows the actual return value
- `next-env.d.ts` added to `.gitignore`
- CI pnpm version conflict - removed hardcoded `version: 10` from `pnpm/action-setup@v4`; version read from `packageManager` field only

---

## [0.0.1] - 2026-05-01 (initial scaffold)

### Added
- `@learnkit-ai/schemas` - Zod schemas for `LearningPathInput`, `LearningPath`, `Lesson`, `Week`, and `Level`, with inferred TypeScript types
- `@learnkit-ai/core` - deterministic `generateLearningPath()` engine with 9 covered tests, plus role/tool normalization helpers
- `@learnkit-ai/react` - `<LearningPath />`, `<LessonCard />`, `<AIGuide />`, and the `useLearnKit()` hook with three built-in themes
- `apps/web` - full marketing site with landing, demo flow, developers, tools, roles, and blog routes
- Programmatic SEO surface - 8 tool pages, 8 role pages, sitemap, robots, OG image
- Responsive layer covering desktop, tablet, and mobile breakpoints
- OSS hygiene - LICENSE (Apache-2.0), CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, issue/PR templates
- CI workflow on GitHub Actions running lint, typecheck, and test on every PR
