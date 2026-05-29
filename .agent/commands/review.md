Review staged changes: `git diff --staged`

Check each category. Reference exact file paths and line numbers.

**1. Correctness**
- Does the code do what it claims?
- Are edge cases handled (empty arrays, undefined inputs, unsupported roles)?
- Does `generateLearningPath()` remain pure - no async, no side effects?

**2. Types**
- No `any` without an explanatory comment
- All types inferred from Zod schemas - no manual duplicates
- No type assertions (`as Foo`) that could hide runtime errors

**3. Brand**
- No "Olé", "Ole", or "ole" in code, copy, or comments
- No "getlearnkit.com" anywhere
- No fake logos, testimonials, star counts, or compliance badges in UI copy

**4. Scope**
- No backend server code added
- No database calls or ORM imports
- No auth logic
- No real LLM API calls
- No Docker config added

**5. Tests**
- New logic in `packages/core` has a matching Vitest test
- Tests assert behavior, not implementation
- No internal packages mocked

**6. Security**
- No secrets or API keys in code
- No `dangerouslySetInnerHTML`
- No `eval()` or dynamic code execution
- External links have `rel="noopener noreferrer"`

**7. API contract**
- `LearningPathInput` shape unchanged
- No breaking changes to exported types without discussion
- Named exports only from packages

**8. Style**
- No `export default` from `packages/`
- Files co-located with their tests

Output format - one line per finding:

```
[BLOCKING]  path/to/file.ts:42  - problem description. required action.
[WARNING]   path/to/file.ts:88  - problem description. should fix before merge.
[NITPICK]   path/to/file.ts:101 - optional suggestion.
```

Do not summarize what the code does. Do not praise. Be specific.
