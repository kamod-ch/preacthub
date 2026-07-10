# Plan 002: Add tests for library filters and URL state

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in STOP conditions occurs, stop and report. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- .preactpress/theme/libraries/LibraryFilters.tsx src/lib/libraries.ts tests/libraries.test.ts package.json tsconfig.json`

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: tests
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

The directory UI is the core interaction on PreactHub. Pure filtering/sorting has some coverage, but the client component that syncs filters to the URL, handles search events, and renders mobile/desktop controls has no component-level regression tests. A small jsdom-based test layer will catch broken query params and event handling before shipping.

## Current state

Relevant files:
- `.preactpress/theme/libraries/LibraryFilters.tsx` — UI component with browser state.
- `src/lib/libraries.ts` — pure filter/sort helpers already tested.
- `tests/libraries.test.ts` — current Vitest suite.
- `package.json` / `tsconfig.json` — test tooling configuration.

Current excerpts:

```ts
// .preactpress/theme/libraries/LibraryFilters.tsx:36-48
function readFilters(): LibraryFilterState {
  if (typeof window === "undefined") return { sort: "recommended" };
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") ?? undefined,
    category: params.get("category") ?? undefined,
    compatibility: (params.get("compatibility") as LibraryFilterState["compatibility"]) ?? "all",
    status: (params.get("status") as LibraryFilterState["status"]) ?? "all",
    sort: (params.get("sort") as LibraryFilterState["sort"]) ?? "recommended",
```

```ts
// .preactpress/theme/libraries/LibraryFilters.tsx:184-197
function onDirectorySearch(event: Event): void {
  const detail = (event as CustomEvent<{ q: string }>).detail;
  setFilters((current) => ({ ...current, q: detail.q || undefined }));
}
window.addEventListener(DIRECTORY_SEARCH_EVENT, onDirectorySearch);
window.addEventListener("popstate", onPopState);
```

```ts
// tests/libraries.test.ts:142-155
it("filters by category and query", () => {
  const result = filterLibraries(libraries, { category: "routing", q: "router" });
  expect(result).toHaveLength(1);
});
```

Repo conventions: Vitest is the test runner; tests currently live in `tests/*.test.ts` and import source modules directly.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0, all tests pass |
| Lint | `npm run lint` | exit 0 or only pre-existing warnings if Plan 006 has not run |

## Scope

**In scope**:
- `.preactpress/theme/libraries/LibraryFilters.tsx`
- `tests/library-filters.test.tsx` (create) or equivalent test file under `tests/`
- `package.json`, `package-lock.json`, `tsconfig.json` only if a test dependency/environment is required

**Out of scope**:
- Visual redesign of filters.
- Changing URL parameter names.
- Adding E2E/browser automation.

## Git workflow

- Branch: `advisor/002-add-library-filter-tests`.
- Use one logical commit.
- Do not push unless instructed.

## Steps

### Step 1: Expose testable helpers without changing behavior

If testing the component directly is too heavy, export `readFilters` and `writeFilters` from `LibraryFilters.tsx` or move them to a small helper module such as `.preactpress/theme/libraries/filter-url-state.ts`. Preserve their behavior exactly. Prefer a helper module if component tests require many UI mocks.

**Verify**: `npm run typecheck` → exit 0.

### Step 2: Add browser-environment tests

Add tests that cover at least:
- reading `?q=router&category=routing&compatibility=native&status=stable&sort=name&typescript=true&ssr=true&islands=true` into the expected filter object;
- writing a filter object back to `window.location.search`, omitting default values;
- invalid/missing values falling back to current behavior or documented defaults.

If Vitest needs jsdom/happy-dom, add the minimal dev dependency and configure only this test file via `// @vitest-environment jsdom` (or equivalent). Update lockfile consistently.

**Verify**: `npm run test` → all tests pass.

### Step 3: Optionally add a component smoke test

If feasible with current Preact tooling, render `LibraryFilters` with a two-library fixture and assert:
- initial query `?q=router` shows one result;
- dispatching `DIRECTORY_SEARCH_EVENT` updates results.

If this requires large new testing infrastructure, skip this step and document the reason in the plan status update; helper-level URL tests are the minimum target.

**Verify**: `npm run test` → all tests pass.

## Test plan

- New tests in `tests/library-filters.test.tsx` or `tests/library-filter-url-state.test.ts`.
- Existing `tests/libraries.test.ts` remains passing.
- Verification: `npm run test` → all tests pass and includes the new file.

## Done criteria

- [ ] URL filter read/write behavior is covered by tests.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run test` exits 0.
- [ ] No route names or query parameter names changed.
- [ ] `plans/README.md` status row for Plan 002 is updated.

## STOP conditions

Stop and report if:
- PreactPress or Kamod UI components cannot be rendered in Vitest without substantial mocking.
- Adding a DOM test environment causes unrelated tests to fail or slows the suite substantially.
- The current URL behavior is intentionally changed by another in-flight branch.

## Maintenance notes

Keep the test layer focused on behavior, not CSS or markup snapshots. If future filters are added, require a read/write test and one pure filter helper test before merging.
