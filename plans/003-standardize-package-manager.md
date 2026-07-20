# Plan 003: Standardize the repo on npm commands and lockfile

> **Executor instructions**: Follow this plan step by step. Run every verification command. Stop on any STOP condition. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- README.md docs/library-directory.md package.json package-lock.json pnpm-lock.yaml`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

The repo currently mixes npm and pnpm instructions and has both `package-lock.json` and `pnpm-lock.yaml`. That ambiguity creates inconsistent installs and noisy dependency diffs. Since README and verified audit commands use `npm run ...`, this plan makes npm the canonical package manager unless the maintainer explicitly chooses otherwise before execution.

## Current state

Relevant files:
- `README.md` — scripts documented with npm.
- `docs/library-directory.md` — some commands use pnpm.
- `package-lock.json` and `pnpm-lock.yaml` — two lockfiles exist.

Current excerpts:

```md
<!-- README.md:7-15 -->
- `npm run dev` — start local development
- `npm run check` — validate routes and links
- `npm run build` — generate the static site
- `npm run new:library -- --name "My Library" --category ui` — scaffold a library entry
```

```md
<!-- docs/library-directory.md:41 -->
1. Run `pnpm run new:library -- --name "Library Name" --category ui`
```

```md
<!-- docs/library-directory.md:61 -->
1. Run `pnpm run new:category -- --name "Category Name" --icon "◧"`
```

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install check | `npm install --package-lock-only` | exit 0, updates only npm lock metadata if needed |
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0 |
| Check routes | `npm run check` | exit 0 |

## Scope

**In scope**:
- `README.md`
- `docs/library-directory.md`
- `package-lock.json`
- `pnpm-lock.yaml` (remove if npm is chosen)
- Optional: `.npmrc` or `packageManager` field in `package.json` if used to document npm version

**Out of scope**:
- Changing dependency versions except lockfile metadata produced by npm.
- Reformatting docs unrelated to commands.
- Editing `node_modules/` or `dist/`.

## Git workflow

- Branch: `advisor/003-standardize-package-manager`.
- Commit message: `standardize package manager docs`.
- Do not push unless instructed.

## Steps

### Step 1: Confirm npm is the intended package manager

Use npm as the default because README and existing scripts are npm-based. If the maintainer has since added `packageManager: "pnpm@..."` or CI uses pnpm, STOP and report; do not force npm.

**Verify**: `grep -R "pnpm" -n README.md docs package.json .github || true` → should show only the known doc references before editing.

### Step 2: Update documentation to npm

Replace `pnpm run new:library` and `pnpm run new:category` in `docs/library-directory.md` with `npm run ...` so README and docs match. If other pnpm references exist in docs, update them too.

**Verify**: `grep -R "pnpm" -n README.md docs package.json .github || true` → no pnpm references remain unless they are intentionally explanatory.

### Step 3: Remove the non-canonical lockfile

Remove `pnpm-lock.yaml`. Keep `package-lock.json`. If `package-lock.json` appears stale, run `npm install --package-lock-only` and commit the resulting lockfile update.

**Verify**: `ls package-lock.json pnpm-lock.yaml` → `package-lock.json` exists and `pnpm-lock.yaml` does not.

### Step 4: Run verification commands

Run the normal npm checks.

**Verify**:
- `npm run typecheck` → exit 0.
- `npm run test` → exit 0.
- `npm run check` → exit 0 and `No issues found.`

## Test plan

No new tests are required; this is docs/tooling consistency. Existing test and check commands are the verification gates.

## Done criteria

- [ ] Docs use one package manager consistently.
- [ ] Only the canonical lockfile remains.
- [ ] `npm run typecheck`, `npm run test`, and `npm run check` exit 0.
- [ ] No dependency version changes beyond lockfile metadata.
- [ ] `plans/README.md` status row for Plan 003 is updated.

## STOP conditions

Stop and report if:
- CI config or `packageManager` declares pnpm as canonical.
- Removing `pnpm-lock.yaml` causes dependency resolution churn beyond lockfile format metadata.
- Maintainer instructs that pnpm is preferred; in that case rewrite this plan before executing.

## Maintenance notes

Future setup docs should copy commands from README. If the project later adopts pnpm, do it in one deliberate migration PR: add `packageManager`, update all docs, remove `package-lock.json`, and verify CI.
