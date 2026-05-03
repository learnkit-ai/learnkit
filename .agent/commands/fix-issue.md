Fix the issue: $ARGUMENTS

1. **Understand** — restate the problem in one sentence before touching any code
2. **Locate** — find the relevant code by searching for symbols, not by guessing paths
3. **Reproduce** — write a failing Vitest test that demonstrates the bug
4. **Fix** — change only what is needed to make the test pass
5. **Verify** — run `pnpm test` and `pnpm typecheck` — both must be clean
6. **Check scope** — confirm the fix does not add backend, database, auth, or LLM calls
7. **Stage** — add only the changed files by name: `git add path/to/file.ts`
8. **Commit message** — imperative mood, one sentence, no AI co-author lines

Do not refactor unrelated code while fixing. Do not change `LearningPathInput`
shape unless the issue explicitly requires it.
