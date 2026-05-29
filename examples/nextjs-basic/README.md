# LearnKit AI · Next.js basic example

The smallest working integration of `@learnkit-ai/react` in a Next.js 15 App Router app.

## Run it

From the repo root:

```bash
pnpm install
pnpm --filter @learnkit-ai/example-nextjs-basic dev
```

Open [http://localhost:3001](http://localhost:3001).

## What it shows

- `<LearningPath input={...} />` from `@learnkit-ai/react`
- The `<AIGuide />` tip card
- Zero backend, zero API key, zero LLM call - the path is computed deterministically from the input

Edit `src/app/page.tsx` to change the role, tools, or goal and watch the path update.

## When to use this as a starting point

If you want to embed LearnKit AI in an existing app and you are not sure where to start, copy `src/app/page.tsx` and adapt it. The component takes one `LearningPathInput` and renders a 30-day path. Style it however you like via CSS custom properties.
