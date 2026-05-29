# Security

## Secrets

- No API keys, tokens, passwords, or secrets in source code - ever
- `.env.example` must contain only placeholder values: `SOME_KEY=your_key_here`
- `.env` and `.env.local` are gitignored - verify before every commit
- Run `git diff --staged` and scan for secrets before committing

## Input validation

- All external input into `generateLearningPath()` must pass Zod schema validation
  before any processing
- `companyContext` is user-supplied text: trim and enforce the 500-char max in schema,
  not in application logic
- No `eval()`, no `new Function()`, no dynamic `require()`/`import()` with user data

## React output

- No `dangerouslySetInnerHTML` - render all text as React children
- No user-supplied strings injected into CSS custom properties at runtime
- All external links (`<a href>` to third-party domains): add `rel="noopener noreferrer"`
- Images from external URLs: validate domain allowlist if added in future

## Dependencies

- Review every new dependency before adding - prefer small, audited, well-maintained packages
- Run `pnpm audit` before merging any PR that changes `pnpm-lock.yaml`
- Do not add packages with known critical CVEs
- Prefer packages with TypeScript types built-in or `@types/*` available

## v0 attack surface

v0 has no backend, no auth, no database, no user accounts.
Main risks in scope:

1. **Supply chain** - malicious or compromised npm packages
2. **XSS** - unsafe React rendering of user-supplied content
3. **Secret leakage** - accidentally committed `.env` or API keys

Do not add attack surface in v0. If a feature requires auth, a server,
or data persistence - it belongs in v1, not here.
