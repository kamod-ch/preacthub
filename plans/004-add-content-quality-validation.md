# Plan 004: Add automated content quality validation for library entries

> **Executor instructions**: Follow this plan step by step. Run every verification command. Stop on STOP conditions. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- content/libraries/entries tests src/lib docs/qa-review.md docs/library-directory.md`

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/001-validate-route-collisions.md
- **Category**: docs
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

PreactHub's value is curated, consistent library guidance. The docs describe an ideal article shape, but there is no automated check that library entries include the important sections or avoid scaffold leftovers. As content grows, a content QA test will prevent thin or inconsistent pages from entering the directory.

## Current state

Relevant files:
- `content/libraries/entries/*.md` — 24 current library articles.
- `tests/libraries.test.ts` — existing content/parser test file.
- `docs/qa-review.md` — lists ideal detail-page sections.
- `docs/library-directory.md` — authoring workflow.

Current excerpts:

```md
<!-- docs/qa-review.md: Detail page content guidance -->
For the best detail-page consistency, each library markdown file should ideally contain:
- introduction
- installation
- Preact configuration
- example
- SSR notes
- islands notes
- known limitations
- alternatives
```

Observed during audit:
- `content/libraries/entries/*.md` count: 24.
- `lastVerified:` appears in 0 of 24 entries. This is allowed by docs, so do not make it mandatory.
- Several entries stop after `## SSR notes` and do not include all recommended sections.
- `scripts/templates/library.md` contains scaffold placeholder phrases like `Add limitations here.`; current entries do not, but tests should prevent future leftovers.

Repo conventions: tests use Vitest; parser tests already create temporary markdown content and load it through `loadLibraryDirectory`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0 |
| Check routes | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0; may update ignored/generated `dist/` locally |

## Scope

**In scope**:
- `tests/libraries.test.ts` or `tests/library-content-quality.test.ts` (create)
- `content/libraries/entries/*.md` only where needed to satisfy the new content quality rules
- `docs/library-directory.md`
- `docs/qa-review.md` if the documented standard needs precise wording

**Out of scope**:
- Re-verifying all library compatibility claims.
- Making `lastVerified` mandatory.
- Changing frontmatter schema semantics beyond tests.
- Editing generated `dist/` in the final commit.

## Git workflow

- Branch: `advisor/004-add-content-quality-validation`.
- Commit message: `add library content quality checks`.
- Do not push unless instructed.

## Steps

### Step 1: Define enforceable content rules

Create a content quality test file or add a new `describe("library content quality", ...)` block. The minimum enforceable rules should be:
- every `content/libraries/entries/*.md` with `entryType: library` has headings for `Introduction`, `Installation`, `Preact configuration`, `Example`, and `SSR notes`;
- entries that claim `islands: true` should have an `## Islands notes` section;
- no entry contains scaffold placeholders from `scripts/templates/library.md` such as `Add any setup notes here`, `Document SSR behavior here`, `Add limitations here`, or `https://example.com`;
- frontmatter `alternatives` values, if present, refer to existing library slugs. If Plan 001 added this in source validation already, keep one regression test here or in parser tests.

Do not require `lastVerified`; docs say it is intentionally optional.

**Verify**: `npm run test` → expect failures if current content lacks required headings. Note the exact failing files.

### Step 2: Fix existing content to meet the rules

For each failing entry under `content/libraries/entries/`, add concise missing sections. Keep claims conservative. If you do not know a limitation or alternative, write a useful neutral section such as `No Preact-specific limitation is documented yet; verify project-specific constraints before production use.` Do not invent verification dates or compatibility evidence.

**Verify**: `npm run test` → all tests pass.

### Step 3: Update authoring docs

In `docs/library-directory.md`, clarify which sections are required by tests and which metadata is optional. Mention that `lastVerified` remains optional and should only be used with reproducible verification.

**Verify**: `npm run check` → exit 0 and `No issues found.`

### Step 4: Final validation

Run all lightweight checks.

**Verify**:
- `npm run typecheck` → exit 0.
- `npm run test` → exit 0.
- `npm run check` → exit 0.

## Test plan

- New content quality tests reading real `content/libraries/entries/*.md` files.
- Test failures should name the file and missing section/placeholder.
- Existing parser and routing tests remain passing.

## Done criteria

- [ ] Content quality tests exist and fail on missing required headings/placeholders.
- [ ] All current library entries satisfy the new tests.
- [ ] `lastVerified` remains optional.
- [ ] `npm run typecheck`, `npm run test`, and `npm run check` exit 0.
- [ ] `plans/README.md` status row for Plan 004 is updated.

## STOP conditions

Stop and report if:
- More than 10 entries require substantive content research rather than adding neutral missing sections.
- A content claim cannot be made without external verification.
- The maintainer wants the recommended sections to remain advisory only.

## Maintenance notes

Reviewers should inspect added content for overclaiming. Future content submissions should fail fast in tests when scaffold placeholders or missing required sections are present.
