# Plan 001: Validate library, category, and route slug collisions

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the STOP conditions section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- src/lib/library-node.ts tests/libraries.test.ts docs/library-directory.md`
> If any in-scope file changed since this plan was written, compare the Current state excerpts against the live code before proceeding; on a mismatch, stop and report.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

The docs explicitly tell contributors to avoid category/library slug collisions, but the validator only checks duplicate library slugs. Because categories and libraries both rewrite to `/libraries/:slug`, a new library can silently shadow a category page or vice versa. This plan makes the invariant executable and prevents broken navigation during content growth.

## Current state

Relevant files:
- `src/lib/library-node.ts` — parses content and builds `/libraries/*` rewrites.
- `tests/libraries.test.ts` — existing parser/routing tests.
- `docs/library-directory.md` — contributor instructions that already mention slug collisions.

Current excerpts:

```ts
// src/lib/library-node.ts:54-62
export function validateLibraryCollection(libraries: PreactLibrary[]): void {
  const seen = new Map<string, string>();
  for (const library of libraries) {
    const duplicate = seen.get(library.slug);
    if (duplicate) {
      throw new Error(`Duplicate library slug "${library.slug}" in ${duplicate} and ${library.file}`);
    }
    seen.set(library.slug, library.file);
  }
}
```

```ts
// src/lib/library-node.ts:94-110
rewrites[`/libraries/${slug}`] = markdownFileToRoute(path.relative(path.join(root, "content"), file));
// ...
rewrites[library.route] = markdownFileToRoute(path.relative(path.join(root, "content"), file));
```

```md
<!-- docs/library-directory.md:61-64 -->
1. Run `pnpm run new:category -- --name "Category Name" --icon "◧"`
2. Ensure no library slug collides with the category slug
3. Re-run tests and build
```

Repo conventions: validation errors throw `Error` with file context; tests use Vitest in `tests/libraries.test.ts` and temporary content roots.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0, no TypeScript errors |
| Tests | `npm run test` | exit 0, all tests pass |
| Check routes | `npm run check` | exit 0, `No issues found.` |
| Lint | `npm run lint` | exit 0 or only pre-existing warnings if Plan 006 has not run |

## Scope

**In scope**:
- `src/lib/library-node.ts`
- `tests/libraries.test.ts`
- `docs/library-directory.md`

**Out of scope**:
- Renaming existing category or library slugs.
- Changing public route shapes such as `/libraries/:slug`.
- Editing generated `dist/` output.

## Git workflow

- Branch: `advisor/001-validate-route-collisions`.
- Commit message style is informal in this repo (`c356011 updates`, `b71ea21 init`); use a clear message like `validate library route collisions`.
- Do not push unless instructed.

## Steps

### Step 1: Extend collection validation

In `src/lib/library-node.ts`, update `validateLibraryCollection` so it also rejects:
- a library slug that equals any `categories` slug from `src/lib/categories.ts`;
- a library route that duplicates another generated route if you choose to centralize route checks.

Keep the existing duplicate library check and error context. Suggested shape:
- build `categorySlugs = new Map(categories.map(...))` or `new Set(categories.map(...))`;
- for each library, before/after duplicate-library check, throw an error like `Library slug "ui" in entries/foo.md collides with category "ui"`.

**Verify**: `npm run typecheck` → exit 0.

### Step 2: Add regression tests

In `tests/libraries.test.ts`, add at least one test near `detects duplicate slugs` that calls `validateLibraryCollection([sample({ slug: "ui", category: "ui", route: "/libraries/ui", file: "entries/ui.md" })])` and expects an error matching `/collides with category/i`.

If you add route-level validation, also test a duplicate generated route. Keep tests deterministic and avoid touching real content files.

**Verify**: `npm run test` → all tests pass, including the new collision test(s).

### Step 3: Align docs with actual command style

In `docs/library-directory.md`, update the category step to say the collision is now validated automatically. If Plan 003 has not run, do not change npm/pnpm wording here except where needed for this collision note.

**Verify**: `npm run check` → exit 0 and `No issues found.`

## Test plan

- New Vitest test in `tests/libraries.test.ts`: library slug colliding with `ui` category throws.
- Existing tests for duplicate library slugs and rewrites must continue to pass.
- Verification: `npm run test` → all tests pass.

## Done criteria

- [ ] Category/library slug collisions throw before rewrites are used.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run test` exits 0 with at least one new collision test.
- [ ] `npm run check` exits 0.
- [ ] No generated `dist/` files are modified.
- [ ] `plans/README.md` status row for Plan 001 is updated.

## STOP conditions

Stop and report if:
- `validateLibraryCollection` or rewrite generation has been substantially redesigned since `c356011`.
- Preventing collisions requires changing existing public URLs.
- Existing content already has a category/library collision; report the slug instead of renaming it.

## Maintenance notes

Reviewers should check that the error message names both the colliding slug and the file that introduced it. Future content features that add more `/libraries/:slug` route producers should register with the same validation path.
