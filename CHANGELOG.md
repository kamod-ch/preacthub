# Changelog

All notable changes to PreactHub are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-20

### Added

- Public Preact library directory at `/libraries` with search, filters, sorting, and pagination
- 107 curated library entries across 11 categories with validated frontmatter schema
- Library detail pages at clean URLs `/libraries/{slug}` with compatibility badges, install snippets, SSR notes, and alternatives
- Category landing pages at `/libraries/{category}`
- Compare pages at `/compare/{a}-vs-{b}` for side-by-side evaluation
- GitHub submission flow at `/submit` with prefilled issue templates
- Methodology page explaining compatibility labels and verification policy
- Production SEO: absolute canonical URLs, `robots.txt`, `sitemap.xml`, default Open Graph image
- GitHub Actions CI (lint, typecheck, test, catalog validation, route check, build, site audit)
- All-Inkl FTPS deploy workflow for `preacthub.com` (GitHub Actions)
- Catalog validation script, SEO verification script, and dist route integrity tests
- Kamod AI Audit gate on home, directory, detail, compare, and submit pages

### Changed

- Hero and directory copy aligned with honest compatibility labeling (no implied blanket verification)
- Sitemap excludes internal alias routes, tag pages, duplicate compare URLs, and `noindex` paths

### Known limitations (0.1)

- No catalog entries include `lastVerifiedAt` yet; verification workflow is documented but not populated
- External repository/documentation URLs are incomplete for many entries
- Curated Stacks UI is present but stacks data is minimal in this release
- Client bundle includes PreactPress/Mermaid weight (~490 KB main JS); acceptable for 0.1
- External URL link checker (`npm run check:links`) is manual only — not run in CI (network-dependent)

[0.1.0]: https://github.com/kamod-ch/preacthub/releases/tag/v0.1.0
