# Plan 009: Add a reproducible library verification workflow

> **Executor instructions**: Follow this plan step by step. Run verification commands. Stop on STOP conditions. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- content/libraries/entries src/lib scripts tests docs package.json`

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/004-add-content-quality-validation.md
- **Category**: direction
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

The directory distinguishes verified and unverified libraries, but there is no repeatable workflow for recording verification. At audit time, all 24 entries omitted `lastVerified`, which is allowed but limits trust in compatibility claims. A lightweight verification command and docs will make future verification consistent without forcing false dates.

## Current state

Relevant files:
- `src/lib/library-node.ts` — frontmatter schema includes `testedWith` and optional `lastVerified`.
- `docs/library-directory.md` — says `lastVerified` is intentionally optional and should be used only with evidence.
- `content/libraries/entries/*.md` — current library metadata.
- `scripts/` — existing scaffolding commands.

Current excerpts:

```ts
// src/lib/library-node.ts:25-33
testedWith: testedWithSchema.optional(),
typescript: z.boolean().default(false),
ssr: z.boolean().default(false),
islands: z.boolean().default(false),
esm: z.boolean().default(false),
license: z.string().min(1).optional(),
bundleSize: z.string().min(1).optional(),
lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
```

```md
<!-- docs/library-directory.md:37 -->
`lastVerified` is intentionally optional. When a library has not been explicitly verified, the UI shows **Not yet verified** instead of a date.
```

Observed at audit time: `grep -R "^lastVerified:" content/libraries/entries` returned no entries.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0 |
| Check routes | `npm run check` | exit 0 |
| Optional script | `npm run verify:library -- --slug preact-signals --dry-run` | exits 0 and reports what would be checked |

## Scope

**In scope**:
- New script under `scripts/`, e.g. `scripts/verify-library.mjs`
- `package.json` script entry
- Tests for verification metadata helper if logic is in TypeScript
- `docs/library-directory.md`
- Optional `docs/verification.md` (create)

**Out of scope**:
- Actually verifying all 24 libraries.
- Adding live network checks to CI.
- Automatically editing `lastVerified` without explicit operator action.
- Claiming a library is verified without evidence.

## Git workflow

- Branch: `advisor/009-add-verification-workflow`.
- Commit message: `add library verification workflow`.
- Do not push unless instructed.

## Steps

### Step 1: Define the workflow contract

Document a conservative workflow in `docs/library-directory.md` or `docs/verification.md`:
- choose a library slug;
- create a small local Preact/Vite reproduction or use documented examples;
- test installation, TypeScript import, SSR if claimed, and islands if claimed;
- record `testedWith.preact`, `testedWith.library`, and `lastVerified` only after completing checks;
- record limitations instead of forcing green status.

**Verify**: `npm run check` → exit 0.

### Step 2: Add a dry-run verification helper

Create `scripts/verify-library.mjs` and `npm run verify:library`. The initial helper should be intentionally modest:
- parse `--slug <slug>` and optional `--dry-run`;
- load the directory via existing source modules if feasible, or parse the matching markdown frontmatter;
- print package name, current compatibility flags, testedWith, lastVerified, and a checklist of manual commands to run;
- exit non-zero if slug is unknown.

Do not make the script mutate content in this plan unless explicitly requested later.

**Verify**: `npm run verify:library -- --slug preact-signals --dry-run` → exits 0 and prints a checklist.

### Step 3: Add tests for script behavior if practical

If the script logic can be factored into a TypeScript helper, add tests. If not, add a minimal Vitest or Node child-process test for unknown slug and known slug dry-run. Avoid network access.

**Verify**: `npm run test` → all tests pass.

### Step 4: Run full validation

**Verify**:
- `npm run typecheck` → exit 0.
- `npm run test` → exit 0.
- `npm run check` → exit 0.

## Test plan

- Script dry-run known slug succeeds.
- Unknown slug fails with a helpful message.
- Existing parser tests remain passing.

## Done criteria

- [ ] Verification workflow is documented.
- [ ] `npm run verify:library -- --slug <existing> --dry-run` works without network access.
- [ ] Script does not mutate content by default.
- [ ] `npm run typecheck`, `npm run test`, and `npm run check` exit 0.
- [ ] `plans/README.md` status row for Plan 009 is updated.

## STOP conditions

Stop and report if:
- Implementing useful verification requires network access in CI.
- The maintainer wants automatic content mutation rather than a dry-run helper.
- Existing source modules cannot be imported from an `.mjs` script without a build step; in that case propose a TypeScript script runner before proceeding.

## Maintenance notes

This plan creates workflow infrastructure, not verified claims. Future PRs can verify individual libraries one at a time and include reproduction notes in the entry body.
