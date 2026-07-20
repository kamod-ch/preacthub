# PreactHub catalog data model

PreactHub stores curated library profiles as Markdown files with YAML frontmatter under `content/libraries/entries/*.md`.

The **canonical TypeScript source of truth** lives in:

- `src/lib/library-schema.ts` — enums, Zod schema, normalization
- `src/lib/libraries.ts` — directory helpers, filters, labels, legacy view adapters
- `src/lib/library-node.ts` — filesystem loading, collection validation, build integration

## Why Markdown frontmatter

The repository already used Markdown as the content source for PreactPress. Prompt 2 extends that model instead of introducing a parallel JSON or TypeScript catalog. This keeps authoring, review and static generation aligned.

Legacy field names (`description`, `compatibility`, `status`, `typescript`, `ssr`, `repository`, …) are still accepted at parse time and normalized into the 0.1 schema.

## Required frontmatter

| Field | Type | Notes |
|---|---|---|
| `entryType` | `library` | Required marker |
| `name` | string | Display name |
| `slug` | string | Stable ID; must match filename |
| `shortDescription` | string | One-line summary (`description` alias accepted) |
| `category` | category slug | Primary category |
| `compatibilityStatus` | enum | See below |
| `typescriptSupport` | enum | See below |
| `ssrSupport` | enum | See below |
| `maintenanceStatus` | enum | See below |
| `tags` | string[] | May be empty |

## Optional frontmatter

| Field | Type |
|---|---|
| `longDescription` | string |
| `categories` | string[] | Additional category slugs |
| `packageName` | string |
| `repositoryUrl` | URL |
| `npmUrl` | URL | Derived from `packageName` when omitted |
| `documentationUrl` | URL |
| `homepageUrl` | URL |
| `license` | string |
| `testedPreactVersions` | string[] |
| `lastVerifiedAt` | `YYYY-MM-DD` |
| `verificationSource` | string | Required together with `lastVerifiedAt` |
| `installCommand` | string | Derived from `packageName` when omitted |
| `minimalExample` | string |
| `limitations` | string[] |
| `alternatives` | slug[] | Must reference existing library slugs |
| `featured` | boolean |
| `islands`, `esm` | boolean | Runtime flags retained from earlier schema |
| `qualityBadges`, `auditScore`, `auditDate`, `auditUrl` | audit metadata |

## Enums

### `compatibilityStatus`

- `native`
- `compat`
- `community-tested`
- `experimental`
- `unverified`
- `inactive`

### `typescriptSupport`

- `native`
- `bundled-types`
- `external-types`
- `none`
- `unknown`

### `ssrSupport`

- `supported`
- `limited`
- `unsupported`
- `unknown`

### `maintenanceStatus`

- `active`
- `maintenance`
- `inactive`
- `archived`
- `unknown`

## Validation

Build-time validation runs through:

```bash
npm run validate:catalog
```

This is also invoked automatically by `npm run build`.

Validation checks:

- required fields and enum values
- slug/file alignment
- unique slugs
- known categories
- valid URLs when present
- valid ISO dates
- alternative slug references
- paired `lastVerifiedAt` + `verificationSource`
- `ai-ready` audit evidence rules

Invalid catalog data fails the command with a message that includes the file path and slug.

## Optional external link checks

Network checks are intentionally separate so local builds do not depend on third-party uptime:

```bash
npm run check:links
```

Environment variables:

- `LINK_CHECK_TIMEOUT_MS` (default `8000`)
- `LINK_CHECK_CONCURRENCY` (default `6`)

## Add a new library

1. Scaffold:

```bash
npm run new:library -- --name "Library Name" --category ui
```

2. Edit `content/libraries/entries/<slug>.md`
3. Keep the required markdown sections enforced by tests:
   - Introduction
   - Installation
   - Preact configuration
   - Example
   - SSR notes
   - Islands notes when `islands: true`
4. Run:

```bash
npm run validate:catalog
npm run typecheck
npm run test
npm run check
npm run build
```

## Verify a library honestly

Do **not** invent verification metadata.

Only set:

```yaml
lastVerifiedAt: "2026-07-20"
verificationSource: "Verified against Preact 10.27.0 using the docs example on macOS/Ubuntu"
testedPreactVersions:
  - "10.27.0"
```

when you have a reproducible check on file.

Use:

- `compatibilityStatus: unverified` when compatibility has not been checked
- `maintenanceStatus: unknown` when upstream maintenance is unclear
- `typescriptSupport: unknown` / `ssrSupport: unknown` when not assessed

For community evidence without a PreactHub maintainer rerun, use `compatibilityStatus: community-tested` and describe the source in `verificationSource`.

## Migrate legacy entries

Existing entries were migrated with:

```bash
npm run migrate:catalog
```

Legacy mapping used during migration:

| Legacy | New |
|---|---|
| `description` | `shortDescription` |
| `compatibility: native` | `compatibilityStatus: native` |
| `compatibility: compat` | `compat` |
| `compatibility: partial` | `experimental` |
| `compatibility: incompatible` | `inactive` |
| `compatibility: unknown` | `unverified` |
| `status: deprecated` | `maintenanceStatus: archived` |
| `status: experimental` | `compatibilityStatus: experimental` when applicable |
| `typescript: true/false` | `native` / `none` |
| `ssr: true/false` | `supported` / `unsupported` |
| `repository` | `repositoryUrl` |
| `documentation` | `documentationUrl` |
| `homepage` | `homepageUrl` |

No `lastVerifiedAt` values were invented during migration.

## Related commands

| Command | Purpose |
|---|---|
| `npm run validate:catalog` | Structural catalog validation |
| `npm run check:links` | Optional external URL reachability |
| `npm run migrate:catalog` | Rewrite legacy frontmatter to canonical fields |
| `npm run verify:library -- --slug <slug>` | Human verification checklist |
