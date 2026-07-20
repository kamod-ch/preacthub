# Plan 008: Design and implement first-class library compare pages

> **Executor instructions**: Follow this plan step by step. Run verification commands. Stop on STOP conditions. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- src/lib/libraries.ts src/lib/theme-data.ts .preactpress/theme content docs tests .preactpress/config.ts`

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/001-validate-route-collisions.md, plans/005-cache-library-directory-build-data.md
- **Category**: direction
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

The code and docs already point toward `/compare/*` pages, but the feature is not implemented. Compare pages are highly aligned with PreactHub's purpose: helping users choose between libraries by compatibility, SSR, TypeScript, maintenance, and limitations. This plan turns the existing URL helper into a real, tested product surface.

## Current state

Relevant files:
- `src/lib/libraries.ts` — includes `compareUrl(a, b)`.
- `docs/library-directory.md` — states compare pages are future architecture.
- `.preactpress/theme/Layout.tsx` and library components — render directory/detail UI.
- `src/lib/theme-data.ts` — attaches route-specific metadata.
- `content/libraries/entries/*.md` — source metadata for comparison.

Current excerpts:

```ts
// src/lib/libraries.ts:118-120
export function compareUrl(a: string, b: string): string {
  return `/compare/${a}-vs-${b}`;
}
```

```md
<!-- docs/library-directory.md:113-115 -->
## Compare page architecture

The initial release does not implement `/compare/*` pages, but `compareUrl()` and normalized slug utilities already provide a stable path format for future comparison routes.
```

Current route checks list no `/compare/*` pages. PreactPress content routes come from Markdown under `content/`, with rewrites added in `.preactpress/config.ts`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0 |
| Check routes | `npm run check` | exit 0; compare routes valid |
| Build | `npm run build` | exit 0 |

## Scope

**In scope**:
- `src/lib/libraries.ts`
- `src/lib/theme-data.ts`
- `.preactpress/config.ts`
- `.preactpress/theme/Layout.tsx`
- New compare component(s) under `.preactpress/theme/libraries/`
- `tests/libraries.test.ts` or new tests
- `docs/library-directory.md`
- Optional content file(s) under `content/compare/` if PreactPress requires physical route entries

**Out of scope**:
- Multi-library comparison beyond two libraries.
- User-authored saved comparisons.
- Fetching live npm/GitHub metrics.
- Redesigning existing directory/detail pages.

## Git workflow

- Branch: `advisor/008-design-compare-pages`.
- Commit message: `add library compare pages`.
- Do not push unless instructed.

## Steps

### Step 1: Specify compare route parsing

Add a pure helper in `src/lib/libraries.ts`, for example `parseCompareSlug(value: string): [string, string] | undefined`, that parses `a-vs-b` into two slugs. Define behavior for invalid cases:
- missing `-vs-` returns `undefined`;
- identical slugs returns `undefined`;
- unknown libraries handled later by route data.

Add tests for `compareUrl` and parsing edge cases.

**Verify**: `npm run test` → all tests pass.

### Step 2: Attach compare data in theme metadata

Extend `RouteLibraryData` in `src/lib/theme-data.ts` with optional `compareLibraries?: [PreactLibrary, PreactLibrary]`. In `getRouteLibraryData`, when route starts with `/compare/`, parse the slug and resolve both libraries from `directory.bySlug`.

Add metadata in `attachLibraryPageMeta` for compare pages, including title and description like `Compare TanStack Query and SWR for Preact`.

**Verify**: `npm run typecheck` → exit 0.

### Step 3: Make compare pages routable

Determine the least invasive PreactPress route approach:
- If dynamic routes are supported by PreactPress, configure `/compare/:pair` accordingly.
- If not, generate rewrites/routes for a curated set of compare URLs or add a generic `content/compare/index.md` style route only if PreactPress supports it.

Minimum acceptable implementation: compare pages must work for at least library pairs linked from the UI and pass `npm run check`.

**Verify**: `npm run check` → compare routes do not produce broken links.

### Step 4: Render a compare UI

Add a focused compare component under `.preactpress/theme/libraries/`, matching existing conventions (`Card`, `Badge`, `CompatibilityBadge`, `StatusBadge`). Render:
- names, descriptions, category, package name;
- compatibility/status badges;
- TypeScript, SSR, islands, ESM booleans;
- tested versions and last verified text;
- limitations and alternatives if present;
- links to both detail pages.

In `Layout.tsx`, branch on compare metadata before generic page rendering.

**Verify**: `npm run typecheck` → exit 0.

### Step 5: Add entry points from detail pages

On a library detail page, where alternatives are rendered, add compare links for alternatives using `compareUrl(currentLibrary.slug, alternative.slug)`. Keep link text clear, e.g. `Compare with Nanostores`.

**Verify**: `npm run check` → no broken compare links.

### Step 6: Document the feature

Update `docs/library-directory.md` compare section to describe the implemented route format and limitations.

**Verify**:
- `npm run test` → exit 0.
- `npm run check` → exit 0.
- `npm run build` → exit 0.

## Test plan

- Unit tests for compare URL parsing and invalid values.
- Metadata test if practical: resolving two known sample libraries into compare data.
- Route check must validate all emitted compare links.

## Done criteria

- [ ] At least linked `/compare/<a>-vs-<b>` pages render useful comparisons.
- [ ] Invalid or unknown compare pairs do not crash builds.
- [ ] Detail pages link to compare pages for alternatives.
- [ ] `npm run typecheck`, `npm run test`, `npm run check`, and `npm run build` exit 0.
- [ ] `plans/README.md` status row for Plan 008 is updated.

## STOP conditions

Stop and report if:
- PreactPress cannot support the needed route shape without framework changes.
- Compare links would require generating hundreds of routes unexpectedly.
- The implementation needs live external package metrics.

## Maintenance notes

Keep compare pages metadata-driven. If npm/GitHub metrics are added later, introduce them as optional fields with cached/static data, not live client fetches in the initial compare UI.
