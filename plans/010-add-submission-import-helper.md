# Plan 010: Add a helper for turning library submission issues into draft entries

> **Executor instructions**: Follow this plan step by step. Run verification commands. Stop on STOP conditions. When done, update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c356011..HEAD -- .github/ISSUE_TEMPLATE/library-submission.yml scripts scripts/templates package.json docs README.md tests`

## Status

- **Priority**: P3
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/003-standardize-package-manager.md, plans/004-add-content-quality-validation.md
- **Category**: direction
- **Planned at**: commit `c356011`, 2026-07-07

## Why this matters

PreactHub already has a GitHub issue template for library submissions and a script for scaffolding entries, but there is no bridge between the two. Maintainers still need to manually copy fields from issues into frontmatter. A dry-run import helper reduces review friction while keeping curation decisions human-controlled.

## Current state

Relevant files:
- `.github/ISSUE_TEMPLATE/library-submission.yml` — submission fields.
- `scripts/new-library.mjs` — creates a new entry from CLI args.
- `scripts/templates/library.md` — entry template.
- `README.md` and `docs/library-directory.md` — contributor workflow docs.

Current excerpts:

```yaml
# .github/ISSUE_TEMPLATE/library-submission.yml:5-23
- type: input
  id: library-name
  attributes:
    label: Library name
- type: input
  id: package-name
  attributes:
    label: Package name
- type: input
  id: repository
  attributes:
    label: Repository
```

```js
// scripts/new-library.mjs:39-45
const args = parseArgs(process.argv.slice(2));
const name = String(args.name ?? "New Library").trim();
const slug = slugify(args.slug ?? name);
const file = path.join(outputDir, `${slug}.md`);

if (!fs.existsSync(templatePath)) fail(`missing template: ${path.relative(root, templatePath)}`);
if (fs.existsSync(file)) fail(`file already exists: ${path.relative(root, file)}`);
```

```js
// scripts/new-library.mjs:48-64
const content = template
  .replaceAll("__NAME__", name)
  .replaceAll("__SLUG__", slug)
  .replaceAll("__DESCRIPTION__", String(args.description ?? "Short description."))
  .replaceAll("__CATEGORY__", String(args.category ?? "ui"))
```

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Dry run | `npm run import:submission -- --file <fixture> --dry-run` | exit 0, prints draft frontmatter/path |
| Typecheck | `npm run typecheck` | exit 0 |
| Tests | `npm run test` | exit 0 |
| Check routes | `npm run check` | exit 0 |

## Scope

**In scope**:
- New script under `scripts/`, e.g. `scripts/import-submission.mjs`
- `package.json` script entry
- `scripts/new-library.mjs` only to share safe utilities if needed
- Test fixture under `tests/fixtures/` (create)
- Tests for parsing a submission fixture if practical
- `README.md` and/or `docs/library-directory.md`

**Out of scope**:
- Calling the GitHub API directly.
- Auto-committing or opening PRs.
- Trusting issue content as verified compatibility evidence.
- Changing issue template fields unless strictly needed.

## Git workflow

- Branch: `advisor/010-add-submission-import-helper`.
- Commit message: `add submission import helper`.
- Do not push unless instructed.

## Steps

### Step 1: Decide input format and keep it local

Implement the helper to read a local Markdown or text file exported/copied from a GitHub issue, not to call GitHub. Accept:
- `--file path/to/submission.md`;
- `--dry-run` defaulting to true or required for first version;
- optional `--write` only if the maintainer wants file creation.

The parser can be simple: recognize labels from the issue template (`Library name`, `Package name`, `Repository`, etc.) and map them to existing `new-library` args/frontmatter fields.

**Verify**: running the script without `--file` prints usage and exits non-zero.

### Step 2: Add a fixture and parser test

Create a small fixture representing a filled submission. Add a test that verifies it maps fields correctly:
- name → frontmatter `name` and slug;
- package name → `packageName`;
- repository/documentation URLs;
- category and compatibility;
- SSR/islands yes/no/unknown mapped conservatively to booleans or draft notes.

Unknown support values should not be converted to confident `true`.

**Verify**: `npm run test` → all tests pass.

### Step 3: Generate draft output in dry-run mode

In dry-run mode, print:
- target file path under `content/libraries/entries/<slug>.md`;
- generated frontmatter/body preview;
- warnings for missing required fields or fields that require human verification.

If `--write` is implemented, reuse the same duplicate-file protection pattern as `scripts/new-library.mjs`.

**Verify**: `npm run import:submission -- --file tests/fixtures/library-submission.md --dry-run` → exits 0 and prints a draft without writing files.

### Step 4: Document maintainer workflow

Update docs to say:
1. copy issue body into a local file;
2. run the import helper dry-run;
3. review claims manually;
4. run content/test/check commands before committing.

**Verify**: `npm run check` → exit 0.

## Test plan

- Parser fixture test for a complete issue.
- Unknown/missing field test that emits warnings or fails clearly.
- Existing `new-library` behavior remains unchanged unless shared utilities were extracted.

## Done criteria

- [ ] `npm run import:submission -- --file <fixture> --dry-run` works and does not write files.
- [ ] Parser tests cover field mapping and conservative unknown support handling.
- [ ] Docs describe the manual review workflow.
- [ ] `npm run typecheck`, `npm run test`, and `npm run check` exit 0.
- [ ] `plans/README.md` status row for Plan 010 is updated.

## STOP conditions

Stop and report if:
- GitHub issue bodies are not structured enough to parse reliably.
- The helper would need network/API credentials.
- Mapping submission answers would create unverified `lastVerified` or overconfident compatibility claims.

## Maintenance notes

Keep the helper conservative. It should accelerate draft creation, not bypass curation. If the issue template changes, update parser fixtures in the same PR.
