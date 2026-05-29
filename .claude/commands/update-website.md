---
name: update-website
description: Sync apps/web with the latest package versions - update install snippets, version numbers in docs, and any copy that references the CLI or packages.
---

# Update learnkit-ai.com

Keeps `apps/web` in sync with the current state of the packages.
Run this after every release to make sure the site reflects what is actually shipped.

## Step 1 - Read the current version

```bash
node -p "require('./packages/core/package.json').version"
```

Note the version. All install snippets and version references on the site should match.

## Step 2 - Check what changed since last release

```bash
git log --oneline $(git describe --tags --abbrev=0 HEAD^)..HEAD
```

Skim the log for:
- New roles or tools added -> update DemoFlow options
- New API surface -> update /developers page and code examples
- Breaking changes -> update install/getting-started copy
- Bug fixes worth calling out -> consider a blog post

## Step 3 - Update install snippets

Search for any hardcoded version numbers or install commands:

```bash
grep -r "@learnkit-ai" apps/web/src --include="*.tsx" --include="*.ts" --include="*.mdx" -l
```

For each file found, update:
- `pnpm add @learnkit-ai/core @learnkit-ai/react` (no version pin needed - latest is fine)
- Any hardcoded version strings like `@0.1.1` -> `@X.Y.Z`

## Step 4 - Update the developers page

File: `apps/web/src/app/developers/page.tsx` (or `components/developers/`)

Check:
- Code block in `CodeBlock.tsx` - does the import example match current API?
- `DeveloperHero.tsx` - version badge shows correct version

## Step 5 - Update roles and tools if new ones shipped

Source of truth:
```bash
node -e "const {getSupportedRoles, getSupportedTools} = require('./packages/core/dist/index.cjs'); console.log(getSupportedRoles()); console.log(getSupportedTools());"
```

Check against `apps/web/src/components/demo/DemoFlow.tsx` - the role/tool dropdowns should list all supported values.

## Step 6 - Verify the build

```bash
pnpm --filter @learnkit-ai/web build 2>&1 | tail -20
```

Fix any TypeScript or missing import errors before committing.

## Step 7 - Commit and push via PR

```bash
git checkout -b chore/sync-website-vX.Y.Z
git add apps/web/src/
git commit -m "Sync website with vX.Y.Z"
git push -u origin chore/sync-website-vX.Y.Z
gh pr create --title "Sync website with vX.Y.Z" --body "Updates install snippets, version references, and any copy that changed in this release."
```

---

## Quick reference - what lives where

| What | Source of truth | Website file |
|------|----------------|--------------|
| Supported roles | `packages/core/src/roles.ts` | `apps/web/src/components/demo/DemoFlow.tsx` |
| Supported tools | `packages/core/src/tools.ts` | `apps/web/src/components/demo/DemoFlow.tsx` |
| Install command | `packages/core/package.json` version | `apps/web/src/components/developers/CodeBlock.tsx` |
| API surface | `packages/core/src/index.ts` | `apps/web/src/app/developers/page.tsx` |
| React API | `packages/react/src/index.ts` | `apps/web/src/components/developers/CodeBlock.tsx` |
