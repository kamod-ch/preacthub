# Plan 005: Cache library directory data during page metadata generation

> **Executor instructions**: Follow this plan step by step. Run every verification command. Stop on STOP conditions. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- src/lib/theme-data.ts src/lib/library-node.ts .preactpress/config.ts tests/libraries.test.ts`

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/001-validate-route-collisions.md
- **Category**: perf
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

Each PreactPress route asks for page metadata and head tags. Today both paths reload and parse the complete library directory from disk. With 126 routes and growing content, that creates avoidable filesystem work during checks and builds. A small per-root cache keeps behavior the same while making route generation scale better.

## Current state

Relevant files:
- `src/lib/theme-data.ts` — route metadata and structured data.
- `src/lib/library-node.ts` — reads markdown files and builds `LibraryDirectory`.
- `.preactpress/config.ts` — calls metadata/head transforms.
- `tests/libraries.test.ts` — current tests for loading and rewrites.

Current excerpts:

```ts
// src/lib/theme-data.ts:28-36
export function getRouteLibraryData(root: string, route: string): RouteLibraryData {
  const directory = loadLibraryDirectory(root);
  const normalizedRoute = normalizeLibraryRoute(route);
  const currentLibrary = directory.bySlug.get(normalizedRoute.replace(/^\/libraries\//, ""));
  const currentCategory = categories.find((category) => normalizedRoute === `/libraries/${category.slug}`);
  const categoryLibraries = currentCategory
    ? directory.libraries.filter((library) => library.category === currentCategory.slug)
    : undefined;
  return { directory, currentLibrary, currentCategory, categoryLibraries };
}
```

```ts
// .preactpress/config.ts:37-41
async transformPageData(page: PageView, { route, site }) {
  return attachLibraryPageMeta(site.base === "/" ? process.cwd() : process.cwd(), route, page);
},
async transformHead({ route }) {
  return structuredDataHead(process.cwd(), route);
},
```

Repo conventions: small pure helper functions in `src/lib`; no global framework-specific state except build-time module state.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0 |
| Check routes | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0 |

## Scope

**In scope**:
- `src/lib/theme-data.ts`
- `src/lib/library-node.ts` only if cache helper belongs there
- `tests/libraries.test.ts` or a new test file for cache behavior
- `.preactpress/config.ts` only to simplify the redundant root expression

**Out of scope**:
- Runtime client-side caching.
- Changing generated page metadata or structured data content.
- Reworking PreactPress internals.

## Git workflow

- Branch: `advisor/005-cache-library-directory-build-data`.
- Commit message: `cache library directory metadata`.
- Do not push unless instructed.

## Steps

### Step 1: Add a per-root cached loader

Implement a helper, for example in `src/lib/library-node.ts`:

```ts
const directoryCache = new Map<string, LibraryDirectory>();

export function loadCachedLibraryDirectory(root: string): LibraryDirectory {
  const key = path.resolve(root);
  const cached = directoryCache.get(key);
  if (cached) return cached;
  const directory = loadLibraryDirectory(key);
  directoryCache.set(key, directory);
  return directory;
}

export function clearLibraryDirectoryCache(): void {
  directoryCache.clear();
}
```

Use `path.resolve` so equivalent roots share a key. Keep `loadLibraryDirectory` uncached for tests and scripts that need fresh reads.

**Verify**: `npm run typecheck` → exit 0.

### Step 2: Use the cached loader in route metadata

In `src/lib/theme-data.ts`, replace `loadLibraryDirectory(root)` in `getRouteLibraryData` with the cached helper. Do not change the returned data shape.

Optionally simplify `.preactpress/config.ts:38` from `site.base === "/" ? process.cwd() : process.cwd()` to `process.cwd()` because both branches are identical.

**Verify**: `npm run test` → existing tests pass.

### Step 3: Add a cache behavior test

Add a focused test that proves:
- `loadLibraryDirectory(root)` remains fresh/uncached when used directly;
- `loadCachedLibraryDirectory(root)` returns the cached value until `clearLibraryDirectoryCache()` is called.

Use a temporary directory like the existing `directory loading` test. Keep assertions simple, e.g. create one library, load cached, add a second library, confirm cached count remains 1, clear cache, confirm count becomes 2.

**Verify**: `npm run test` → all tests pass.

### Step 4: Validate route output still works

Run route checks and build.

**Verify**:
- `npm run check` → exit 0 and `No issues found.`
- `npm run build` → exit 0.

## Test plan

- New cache test using a temp content root.
- Existing route rewrite and directory loading tests continue to pass.
- Full route check validates metadata/head generation did not break.

## Done criteria

- [ ] `getRouteLibraryData` uses a cached directory loader.
- [ ] Direct `loadLibraryDirectory` remains uncached.
- [ ] Cache can be cleared in tests.
- [ ] `npm run typecheck`, `npm run test`, `npm run check`, and `npm run build` exit 0.
- [ ] `plans/README.md` status row for Plan 005 is updated.

## STOP conditions

Stop and report if:
- PreactPress dev mode needs live content reload in the same Node process and the cache makes edits invisible.
- There is already a framework-level cache/invalidation API that should be used instead.
- The cache causes tests or build to observe stale data after explicit clear.

## Maintenance notes

If dev-mode hot reload is affected, add an environment guard so caching only applies during check/build, or expose cache clearing to the PreactPress integration. Reviewers should verify no public metadata fields changed.
