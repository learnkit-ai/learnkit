---
name: do-release
description: Cut a new release of all @learnkit-ai packages. Triggers the GitHub Actions release pipeline - bumps versions across all packages, opens a bump PR, then tags and publishes to npm after merge.
---

# Release @learnkit-ai packages

Run this whenever you want to cut a new version. Walks through every step and confirms each one.

## Step 1 - Determine bump type

If the user did not pass an argument, ask:

> What kind of release is this?
>
> - `patch` - bug fixes only (0.1.1 -> 0.1.2)
> - `minor` - new features, backward-compatible (0.1.1 -> 0.2.0)
> - `major` - breaking changes (0.1.1 -> 1.0.0)

Use the argument directly if provided: `/do-release patch`, `/do-release minor`, `/do-release major`.

## Step 2 - Verify you are on main and clean

```bash
git checkout main && git pull
git status
```

If there are uncommitted changes, stop and tell the user to commit or stash them first.

## Step 3 - Confirm current versions

```bash
node -p "require('./packages/core/package.json').version"
```

Show the user: "Current version is X.Y.Z - this will bump to A.B.C across all packages (schemas, core, react, cli). Proceed?"

Wait for confirmation before continuing.

## Step 4 - Trigger the Release workflow

```bash
gh workflow run release.yml --field bump=<patch|minor|major>
```

Then immediately check the run started:

```bash
sleep 3 && gh run list --workflow=release.yml --limit=1
```

## Step 5 - Watch the Release workflow

```bash
gh run watch <run-id>
```

The workflow will:
- Run typecheck and tests across all packages
- Bump version in all 4 package.json files (schemas, core, react, cli)
- Push branch `chore/bump-vX.Y.Z`
- Open a PR automatically

If the workflow fails at "Push branch and open PR" with a `createPullRequest` permission error:
- The branch was still pushed - create the PR manually:
  ```bash
  gh pr create --title "Bump version to X.Y.Z" \
    --body "Automated version bump. Merging triggers tag creation and npm publish." \
    --base main --head chore/bump-vX.Y.Z
  ```
- Ask user to enable: Settings -> Actions -> General -> "Allow GitHub Actions to create and approve pull requests"

## Step 6 - Show the bump PR

```bash
gh pr list --head chore/bump-v --limit=1
```

Show the PR URL and tell the user:

> PR is open. Once CI passes, merge it to trigger the tag and npm publish automatically.

## Step 7 - After the user merges the bump PR

Pull main and verify:

```bash
git checkout main && git pull
node -p "require('./packages/core/package.json').version"
```

Watch `tag-on-merge.yml` fire:

```bash
gh run list --workflow=tag-on-merge.yml --limit=1
gh run watch <run-id>
```

## Step 8 - Watch npm publish

Once `tag-on-merge.yml` creates the release, `publish.yml` fires automatically:

```bash
gh run list --workflow=publish.yml --limit=1
gh run watch <run-id>
```

## Step 9 - Confirm release is live

```bash
npm show @learnkit-ai/core version
gh release view vX.Y.Z
```

Tell the user:

> All packages published to npm at vX.Y.Z:
> - `@learnkit-ai/schemas@X.Y.Z`
> - `@learnkit-ai/core@X.Y.Z`
> - `@learnkit-ai/react@X.Y.Z`
> - `@learnkit-ai/cli@X.Y.Z`
>
> Release: https://github.com/learnkit-ai/learnkit/releases/tag/vX.Y.Z

---

## Known gotchas

| Problem | Cause | Fix |
|---------|-------|-----|
| `createPullRequest` error in workflow | Repo setting not enabled | Settings -> Actions -> General -> enable "Allow GitHub Actions to create and approve pull requests" |
| `tag-on-merge` skips tag creation | Merge commit message doesn't contain `chore/bump-v` | Check that the bump branch was named `chore/bump-vX.Y.Z` |
| `publish.yml` fails with 401 | NPM_TOKEN secret expired | Run `gh secret set NPM_TOKEN --body NEW_TOKEN --repo learnkit-ai/learnkit` |
| Orphaned tag pointing to wrong commit | Cancelled push | `git push origin --delete refs/tags/vX.Y.Z` then re-run |
