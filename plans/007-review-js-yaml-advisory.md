# Plan 007: Review and resolve the transitive js-yaml advisory

> **Executor instructions**: Follow this plan step by step. Run verification commands. Stop on STOP conditions. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- package.json package-lock.json pnpm-lock.yaml`

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/003-standardize-package-manager.md
- **Category**: security
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

`npm audit` reports a moderate transitive advisory in `js-yaml <3.15.0`. It is not high/critical, but this project parses Markdown/YAML frontmatter, so the dependency path deserves a deliberate review. The goal is either to update safely or document why the risk is not exploitable in this project.

## Current state

Relevant files:
- `package.json` — top-level dependencies include `gray-matter`.
- `package-lock.json` — npm dependency graph.
- `pnpm-lock.yaml` — may be removed by Plan 003.

Current audit output:

```text
js-yaml  <3.15.0
Severity: moderate
JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases
fix available via `npm audit fix`
node_modules/js-yaml
```

Current manifest excerpt:

```json
// package.json:17-22
"dependencies": {
  "@kamod-ch/ui": "^0.2.1",
  "@preact/signals": "^2.9.1",
  "gray-matter": "^4.0.3",
  "preact": "^10.29.2",
  "zod": "^4.1.12"
}
```

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Audit | `npm audit --audit-level=moderate` | exit 0 after fix, or documented accepted moderate advisory |
| Dependency tree | `npm ls js-yaml` | shows path to dependency |
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0 |
| Check routes | `npm run check` | exit 0 |

## Scope

**In scope**:
- `package.json` if a direct dependency bump is needed
- `package-lock.json`
- `docs/qa-review.md` or `plans/README.md` note only if risk is accepted rather than fixed

**Out of scope**:
- Replacing `gray-matter` unless no safe update path exists.
- Changing Markdown parsing behavior.
- Editing content files.

## Git workflow

- Branch: `advisor/007-review-js-yaml-advisory`.
- Commit message: `resolve js-yaml advisory` or `document js-yaml advisory assessment`.
- Do not push unless instructed.

## Steps

### Step 1: Identify dependency path

Run `npm ls js-yaml` and note which package brings in vulnerable `js-yaml`. If Plan 003 removed pnpm, ignore `pnpm-lock.yaml`; otherwise keep both lockfiles consistent.

**Verify**: `npm ls js-yaml` → exits 0 or prints the dependency path clearly.

### Step 2: Attempt the least invasive update

Run `npm audit fix` only if it changes lockfile transitive versions without upgrading major top-level packages. Inspect the diff. If it updates unrelated major dependencies or changes many packages, revert that attempt and proceed to Step 3.

**Verify**: `npm audit --audit-level=moderate` → ideally exit 0.

### Step 3: If not fixable, document accepted risk

If the advisory cannot be fixed without a disruptive migration, document in `plans/README.md` status reason or a short repo note that:
- severity is moderate;
- input source is committed repository content, not arbitrary public user uploads at runtime;
- revisit when `gray-matter` or its YAML parser path updates.

Do not suppress audit globally.

**Verify**: `npm audit --audit-level=high` → exit 0, confirming no high/critical advisories.

### Step 4: Run normal checks

**Verify**:
- `npm run typecheck` → exit 0.
- `npm run test` → exit 0.
- `npm run check` → exit 0.

## Test plan

No new tests are required unless dependency updates break parser behavior. Existing parser tests in `tests/libraries.test.ts` validate frontmatter loading.

## Done criteria

- [ ] Dependency path for `js-yaml` is known.
- [ ] Advisory is fixed, or accepted risk is documented with rationale.
- [ ] `npm audit --audit-level=high` exits 0.
- [ ] `npm run typecheck`, `npm run test`, and `npm run check` exit 0.
- [ ] `plans/README.md` status row for Plan 007 is updated.

## STOP conditions

Stop and report if:
- Fixing the advisory requires replacing `gray-matter` or changing frontmatter semantics.
- `npm audit fix` proposes broad major-version upgrades.
- A high/critical advisory appears during re-audit.

## Maintenance notes

Re-run audit after dependency updates. Because content is local repo content, this is lower urgency than runtime user-input vulnerabilities, but it should not be forgotten.
