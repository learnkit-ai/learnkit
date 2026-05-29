# Task: v0-landing-demo

Build `apps/web` (landing page + /demo + /docs) and `examples/nextjs-basic`.

## Goal

`pnpm dev` starts `apps/web` at `localhost:3000`. Landing page renders on
mobile (390px) and desktop (1280px). `/demo` generates a learning path from
user input with zero backend. `examples/nextjs-basic` runs standalone.

## Context

Task 2 of 2. Depends on `v0-scaffold` completing first.
`apps/web` imports `@learnkit-ai/react` and `@learnkit-ai/core` from the workspace.
The demo runs entirely on `generateLearningPath()` - no API routes, no fetch calls.

Read `.agent/agent.md` and `.agent/rules/` before starting.

## Steps

### 1. apps/web project setup

```
apps/web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx           # landing
│   ├── demo/page.tsx
│   └── docs/page.tsx
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   └── HeroDemo.tsx       # embedded demo widget on landing
├── public/
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
└── package.json
```

**`next.config.ts`**
```typescript
const config = {
  transpilePackages: ['@learnkit-ai/react', '@learnkit-ai/core', '@learnkit-ai/schemas'],
}
export default config
```

**`app/layout.tsx`** - import Google Fonts (Newsreader, Inter, JetBrains Mono),
import `@learnkit-ai/react/tokens.css`, import `globals.css`.

**`tailwind.config.ts`** - content includes `./app/**/*.tsx`, `./components/**/*.tsx`,
and `../../packages/react/src/**/*.tsx`.

### 2. Landing page - app/page.tsx

Section order:

**Nav**
- LearnKit AI wordmark (serif "Learn" + italic accent "K" + "it")
- Links: Demo, Docs, GitHub (github.com/learnkit-ai/learnkit)
- CTA: "Try the demo" → /demo

**Hero**
- Headline (serif, large): e.g. "Learning paths for your product, in minutes."
- Sub-headline: one sentence describing what `generateLearningPath()` does
- Embedded `<HeroDemo />` component - live path preview, no interaction required

**What it is**
- Two-column layout
- Left: "A typed function" - code block showing `generateLearningPath()` call + return shape
- Right: "A React component" - code block showing `<LearningPath input={...} />` usage

**How it works**
- 3-step grid: "Define the learner" → "Engine generates a path" → "Render with one component"
- Each step has a short description, no icons required

**Who it's for**
- 3 cards: SaaS onboarding, AI feature education, internal enablement
- Each card: title, one sentence, no metric claims

**Open source**
- Apache-2.0 license
- GitHub CTA button
- One sentence: honest early-stage positioning
- No star count, no contributor count

**Footer**
- Copyright: "© 2026 LearnKit AI contributors"
- Links: GitHub, Docs, License
- No social proof of any kind

Brand rules to enforce:
- "LearnKit AI" not "LearnKit" in nav, headings, and footer
- "AI Guide" not "Olé" if the AI feedback component is mentioned
- No fake logos, testimonials, compliance badges, or metric claims

### 3. Demo page - app/demo/page.tsx

Three-step interactive flow. All state is client-side (`'use client'`).
No API routes. No fetch calls. Result is instant.

**Step 1 - Role**
Five clickable cards:
- Product Manager
- Software Engineer
- Designer
- Marketer
- Data Analyst

**Step 2 - Tools**
Multi-select chips (at least one required):
- Cursor, Claude, ChatGPT, GitHub Copilot, Figma, Notion, Slack, HubSpot

**Step 3 - Goal**
Single text input: "What do you want to achieve?"
Placeholder: "e.g. ship AI features faster"

**Submit**
Button: "Generate my path" - calls `generateLearningPath()` from `@learnkit-ai/core`
and renders `<LearningPath />` from `@learnkit-ai/react` directly below.

No fake loading state. The call is synchronous - render the result immediately.
Show a "Start over" button after the result renders.

### 4. Docs page - app/docs/page.tsx

Placeholder only. Static content:

- Install section:
  ```bash
  npm install @learnkit-ai/react @learnkit-ai/core
  ```

- `generateLearningPath()` signature block

- `<LearningPath />` prop table:
  | Prop | Type | Required | Description |
  |------|------|----------|-------------|
  | input | LearningPathInput | yes | Role, tools, goal, level |
  | theme | 'warm' \| 'midnight' | no | Color theme |
  | onLessonClick | (lesson: Lesson) => void | no | Click handler |
  | className | string | no | Root element class |

- Link to GitHub for full documentation

### 5. examples/nextjs-basic

Standalone Next.js 15 app. **Not part of the pnpm workspace.**
Install `@learnkit-ai/react` and `@learnkit-ai/core` as normal npm dependencies.

**`app/page.tsx`**

```tsx
import { LearningPath } from '@learnkit-ai/react'
import '@learnkit-ai/react/tokens.css'

export default function Page() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <LearningPath
        input={{
          role: 'Product Manager',
          tools: ['Cursor', 'Claude'],
          goal: 'ship AI features faster',
          level: 'beginner',
        }}
      />
    </main>
  )
}
```

**`examples/nextjs-basic/README.md`** must contain exactly:

```markdown
# LearnKit AI - Next.js basic example

Minimal integration showing `<LearningPath />` in a Next.js app.

## Setup

\`\`\`bash
git clone https://github.com/learnkit-ai/learnkit
cd examples/nextjs-basic
pnpm install && pnpm dev
\`\`\`

Open http://localhost:3000
```

## Acceptance

- [ ] `pnpm dev` starts `apps/web` without errors
- [ ] Landing renders at 390px (mobile) without horizontal overflow
- [ ] Landing renders at 1280px (desktop) without layout breaks
- [ ] `/demo` completes full role → tools → goal → path flow with no backend calls
- [ ] `/demo` result renders `<LearningPath />` component from `@learnkit-ai/react`
- [ ] `/docs` renders without errors
- [ ] `examples/nextjs-basic` starts with `pnpm install && pnpm dev`
- [ ] No "Olé" in any copy, alt text, or component label
- [ ] No fake logos, testimonials, star counts, or compliance badges in landing
- [ ] No `fetch()` or API calls in demo page
- [ ] No loading spinner that fakes an async call

## Do not

- Add any Next.js API routes (`app/api/`)
- Make `fetch()` calls from the demo page
- Add a fake loading delay
- Add fake social proof to the landing
- Use `export default` in `packages/` (Next.js page components are the exception)
- Reference "Olé" anywhere in copy or code
