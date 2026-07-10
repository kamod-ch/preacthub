# Plan 006: Clean lint warnings and make lint failures actionable

> **Executor instructions**: Follow this plan step by step. Run verification commands. Stop on STOP conditions. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- .preactpress/theme/Layout.tsx .preactpress/theme/libraries/LibraryCard.tsx package.json`

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

`npm run lint` currently emits warnings for unused imports. Warnings are easy to ignore and make it harder to spot new lint regressions. Removing the current warnings and optionally enabling stricter lint behavior gives future agents and humans a cleaner signal.

## Current state

Relevant files:
- `.preactpress/theme/Layout.tsx` — imports `withBase` but does not use it.
- `.preactpress/theme/libraries/LibraryCard.tsx` — imports `Button` but does not use it.
- `package.json` — lint script.

Current lint output at audit time:

```text
.preactpress/theme/libraries/LibraryCard.tsx:1:10: warning eslint(no-unused-vars): Identifier 'Button' is imported but never used.
.preactpress/theme/Layout.tsx:13:10: warning eslint(no-unused-vars): Identifier 'withBase' is imported but never used.
```

Current excerpts:

```ts
// .preactpress/theme/Layout.tsx:13
import { withBase, type LayoutProps } from "@kamod-ch/preactpress/client";
```

```ts
// .preactpress/theme/libraries/LibraryCard.tsx:1
import { Button, Card, CardHeader, CardTitle } from "@kamod-ch/ui";
```

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Lint | `npm run lint` | exit 0, no warnings |
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0 |

## Scope

**In scope**:
- `.preactpress/theme/Layout.tsx`
- `.preactpress/theme/libraries/LibraryCard.tsx`
- `package.json` only if adding an oxlint flag to fail on warnings is supported and verified

**Out of scope**:
- Reformatting unrelated files.
- Changing UI behavior.
- Adding a different lint tool.

## Git workflow

- Branch: `advisor/006-clean-lint-warnings-and-tighten-lint`.
- Commit message: `clean lint warnings`.
- Do not push unless instructed.

## Steps

### Step 1: Remove unused imports

In `.preactpress/theme/Layout.tsx`, remove `withBase` from the import and keep `type LayoutProps`.

In `.preactpress/theme/libraries/LibraryCard.tsx`, remove `Button` from the import and keep `Card`, `CardHeader`, and `CardTitle`.

**Verify**: `npm run lint` → exit 0 and no warnings.

### Step 2: Consider warning-as-error lint mode

Check `npx oxlint --help` or package docs locally to confirm whether a stable flag exists to deny warnings. If supported, update `package.json` lint script to make warnings fail CI. If not supported, do not add a brittle flag.

**Verify**: `npm run lint` → exit 0 and no warnings.

### Step 3: Run baseline checks

**Verify**:
- `npm run typecheck` → exit 0.
- `npm run test` → exit 0.

## Test plan

No new tests are required; lint/typecheck/test are sufficient because behavior does not change.

## Done criteria

- [ ] `npm run lint` exits 0 with no warnings.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run test` exits 0.
- [ ] No UI behavior files changed beyond import cleanup unless the lint script was safely tightened.
- [ ] `plans/README.md` status row for Plan 006 is updated.

## STOP conditions

Stop and report if:
- `withBase` or `Button` became used since the plan was written.
- Tightening lint requires a new linter or broad config migration.
- `npm run lint` reports unrelated warnings introduced by another branch.

## Maintenance notes

Keep lint output clean. If warnings reappear, either fix them immediately or intentionally document why the lint rule is not appropriate for this repo.
