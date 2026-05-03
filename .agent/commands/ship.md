Prepare this branch for merge.

Run each step in order. Stop and report the failure clearly if any step fails.

```bash
pnpm lint        # fix all lint errors before continuing
pnpm typecheck   # fix all type errors before continuing
pnpm test        # all tests must pass
pnpm build       # build must succeed for all packages and apps
```

Then verify manually:

- No "Olé" or "getlearnkit" in changed files
- No `.env` files or secrets staged
- No backend, database, or auth code added
- `LearningPathInput` shape unchanged (or a major version bump is documented)
- New public exports have matching Zod schemas in `packages/schemas`
- `packages/react` has no Tailwind import

Finally:

- Summarize what this PR changes in 2–3 sentences
- Flag anything that is a known limitation or follow-up for v1
