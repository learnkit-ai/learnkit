# LearnKit AI — Roadmap

LearnKit AI is an open-source TypeScript engine for embedding role-aware AI learning paths in any product. Apache-2.0, no hosted SaaS, no paid tier.

---

## v0 — Foundation ✅

Core engine, React component, and public website shipped.

### Packages
- [x] `@learnkit-ai/schemas` — Zod schemas and inferred TypeScript types
- [x] `@learnkit-ai/core` — `generateLearningPath()`, pure deterministic, no LLM
- [x] `@learnkit-ai/react` — `<LearningPath />`, `<LessonCard />`, `<AIGuide />`, `useLearnKit()`

### Content
- [x] Role-specific 4-week curricula: Product Manager, Software Engineer, Designer, Data Analyst, Marketer, Founder, Operations, Researcher
- [x] 8 supported tools: Claude, ChatGPT, Cursor, Copilot, Midjourney, Notion AI, Perplexity, Gemini
- [x] `level` field (`beginner` / `intermediate` / `advanced`) adjusts lesson pacing

### Web
- [x] Landing page (`/`)
- [x] Interactive demo (`/demo`) with role, tools, goal, level, and optional company context
- [x] Docs (`/docs`) with full API reference
- [x] `/roles/[slug]` and `/tools/[slug]` SEO pages
- [x] `/teams` page (OSS integration guide)
- [x] Blog (`/blog`) — pedagogy and engineering posts
- [x] Custom 404, OG image, sitemap, robots.txt

### Infrastructure
- [x] pnpm workspaces + Turborepo
- [x] tsup: ESM + CJS + `.d.ts` for all packages
- [x] Vitest: unit tests for core + React components
- [x] GitHub Actions CI
- [x] `examples/nextjs-basic`

---

## v1 — Depth (in progress)

### Engine
- [x] `companyContext` field personalises project lesson summaries (stack, pace, team-size hints)
- [x] More supported tools: Windsurf, Replit, Linear, Figma AI, v0 (13 total)
- [x] More roles: Sales, Customer Success, Finance (11 total)
- [x] `generateLessonContent(lesson)` — returns full lesson body, exercises, and rubric
- [ ] `progress` field in `LearningPath` to track completed lessons
- [ ] Lesson prerequisite graph — reorder-aware sequencing

### React package
- [x] `<ProgressTracker />` component — persists lesson completion state to localStorage
- [ ] `<LessonDetail />` — renders full lesson body returned by `generateLessonContent()`
- [ ] `light` theme variant (in addition to `warm`, `midnight`, `technical`)
- [ ] Headless mode: all components accept `renderItem` render-prop overrides

### Web
- [x] `/changelog` page — versioned release notes
- [x] `/compare/[slug]` pages — Claude vs ChatGPT, Cursor vs Copilot, Windsurf vs Cursor, and more
- [x] `/guides/[slug]` — Next.js integration, theming, CLI, generateLessonContent guides
- [ ] Per-role `opengraph-image` for `/roles/[slug]` pages

### Developer experience
- [x] `@learnkit-ai/cli` — `npx @learnkit-ai/cli generate` outputs a JSON learning path
- [ ] VS Code extension — sidebar learning path panel
- [ ] Storybook for `@learnkit-ai/react` components

---

## v2 — Scale (exploratory)

These are directions worth exploring, not commitments.

- Multi-language support: lessons in Spanish, French, German, Portuguese
- Team progress aggregation: local-first, no server required (IndexedDB + export)
- Embeddable widget (`<script>` tag, no build step required)
- Plugin API: third-party lesson packs and tool definitions

---

## What will never be in LearnKit AI

- A hosted SaaS platform or paid tier
- A backend server, database, or auth system
- Real LLM API calls inside the engine
- Telemetry, analytics, or phone-home behaviour
- Team dashboards, HR reporting, SSO, or SCIM

The engine is a library. Embedding it in a SaaS product is the point — but that SaaS is yours to build, not ours to host.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). The best first issues are tagged [`good first issue`](https://github.com/learnkit-ai/learnkit/labels/good%20first%20issue) on GitHub.
