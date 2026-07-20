# PreactHub

**PreactHub — Find Preact libraries that actually work.**

PreactHub is a curated, statically generated directory for discovering Preact-compatible libraries. Each entry documents compatibility status, SSR and TypeScript support, installation steps, and practical integration notes — so teams can evaluate tooling without guessing whether a package works with native Preact or `preact/compat`.

Production site: [preacthub.com](https://preacthub.com)

Hosting: automated **All-Inkl FTPS deploy** on push to `main` (see [domain and deployment](./docs/domain-and-deployment.md)).

## What PreactHub is

- A **curated catalog** of 107+ libraries across 11 categories
- **Compatibility-first** filters and badges (native, compat, community-tested, experimental, unverified)
- **Detail pages** with install snippets, SSR notes, limitations, and compare links
- A **GitHub-based submission flow** — no PreactHub account required

PreactHub 0.1 is an editorial directory, not a live npm/GitHub metrics dashboard.

## Development

Requirements: Node.js 22+, npm.

This repository depends on sibling packages in the Kamod monorepo during local development:

- `../preactpress` — `@kamod-ch/preactpress`
- `../kamod-ai-audit/packages/core` — site audit (optional locally)

```bash
npm install
npm run dev        # http://localhost:5173 (PreactPress dev server)
npm run check      # route and internal link validation
npm run build      # validate catalog, static build, SEO verify
npm run preview    # preview dist/
```

### Quality scripts

| Script | Purpose |
| --- | --- |
| `npm run typecheck` | TypeScript |
| `npm run test` | Vitest unit and integration tests |
| `npm run lint` | oxlint |
| `npm run validate:catalog` | Zod frontmatter and slug validation |
| `npm run verify:seo` | robots.txt, sitemap, canonical/OG checks on `dist/` |
| `npm run audit:site` | Kamod AI Audit on key static pages (local or optional CI job; requires private repo access) |
| `npm run deploy:all-inkl` | Manual rsync fallback to KAS (set `PREACTHUB_DEPLOY_*` env vars) |
| `npm run check:links` | Optional manual check of external catalog URLs (network) |

Set `PREACTHUB_SITE_URL=https://preacthub.com` when building for production SEO output (CI and deploy workflows set this automatically).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for submission, correction, and maintainer review workflows.

- **Submit a library:** [preacthub.com/submit](https://preacthub.com/submit)
- **Report outdated data:** [library correction issue](https://github.com/kamod-ch/preacthub/issues/new?template=library-correction.yml)
- **Methodology:** [preacthub.com/methodology](https://preacthub.com/methodology)

## Documentation

- [Domain and deployment](./docs/domain-and-deployment.md)
- [Library directory architecture](./docs/library-directory.md)
- [Release checklist](./docs/release-checklist.md)
- [Release audit (0.1 gap analysis)](./docs/release-audit.md)

## License

See repository license file. Catalog content is maintained in `content/` and published under the project’s contribution terms.
