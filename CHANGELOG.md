# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `@learnkit-ai/schemas` — Zod schemas for `LearningPathInput`, `LearningPath`, `Lesson`, `Week`, and `Level`, with inferred TypeScript types
- `@learnkit-ai/core` — deterministic `generateLearningPath()` engine with 9 covered tests, plus role/tool normalization helpers
- `@learnkit-ai/react` — `<LearningPath />`, `<LessonCard />`, `<AIGuide />`, and the `useLearnKit()` hook with three built-in themes
- `apps/web` — full marketing site with landing, demo flow, developers, tools, roles, and blog routes
- Programmatic SEO surface — 8 tool pages, 8 role pages, sitemap, robots, OG image
- Responsive layer covering desktop, tablet, and mobile breakpoints
- OSS hygiene — LICENSE (Apache-2.0), CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, issue/PR templates
- CI workflow on GitHub Actions running lint, typecheck, and test on every PR

This is the initial public release. No prior versions.
