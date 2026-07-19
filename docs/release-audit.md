# PreactHub Release Audit (0.1)

**Audit date:** 2026-07-20  
**Repository:** `kamod-ch/preacthub` (local path: `preacthub/`)  
**Target:** Public release 0.1 at **preacthub.dev**  
**Positioning:** “PreactHub – Discover Preact libraries that actually work.”

---

## Executive Summary

PreactHub is a **mature static PreactPress prototype** with a strong visual direction, a validated content model (107 library entries, 11 categories), search/filter UX, detail pages, compare pages, and a GitHub submission flow. Typecheck, tests (26), lint, check (398 routes), and build all pass locally.

However, the project is **not release-ready** for `preacthub.dev` today. Three blockers dominate:

1. **Critical routing/build gap:** Clean library URLs (`/libraries/{slug}`) are registered via PreactPress rewrites and validated by `npm run check`, but **static build output does not emit HTML at those URLs**. Only internal paths like `/libraries/entries/{slug}` are built. Those pages set `noindex` and canonicalize to the missing clean URLs — a broken SEO and navigation state.
2. **No production deployment configuration:** `site.url` is unset (relative canonicals/OG URLs), there is **no `robots.txt` or sitemap**, and **no GitHub Pages / domain deploy workflow**.
3. **Trust model vs. data reality:** The product promise requires transparent compatibility tiers, but **0/107 entries have `lastVerified`**, **82/107 lack repository/documentation links**, and the UI still surfaces a “Verified entries” stat that reads **0** while implying editorial verification.

The codebase is closer to a polished beta than an awesome-list fork, but P0 work is primarily **infrastructure, routing correctness, domain/SEO setup, and honest trust signaling** — not new product features like accounts, comments, or AI chat.

### Verification baseline (this audit)

| Command | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run test` | Pass (26 tests, 3 files) |
| `npm run lint` | Pass with 2 unused-import warnings |
| `npm run check` | Pass (398 routes, no issues) |
| `npm run build` | Pass (~53 MB `dist/`, 398 routes in manifest) |
| `npm run audit:site` | Not run (requires sibling `kamod-ai-audit` build; CI runs it) |

---

## Ist-Architektur

### Stack

| Layer | Choice | Version / notes |
|---|---|---|
| Framework | Preact | `^10.29.2` |
| Site generator | PreactPress (`@kamod-ch/preactpress`) | `^2.0.0` |
| Language | TypeScript | `^6.0.3` |
| Styling | Tailwind CSS v4 + custom `--ph-*` tokens | `@tailwindcss/vite ^4.3.0` |
| UI components | `@kamod-ch/ui` only | `^0.2.1` |
| Content parsing | gray-matter + zod | Frontmatter validation in `src/lib/library-node.ts` |
| Tests | Vitest | Parser, filters, content quality |
| Lint | oxlint | 2 warnings in `LibraryFilters.tsx` |
| Package manager | npm | `package-lock.json` present |

**Not used in application code:** `kamod-icons`, `kamod-hooks`, `kamod-signals`, `kamod-state` (listed only as directory entries). `@preact/signals` is a dependency but unused outside a form placeholder.

### Directory layout

```
content/                     # Markdown source of truth
  index.md                   # Home page copy
  libraries/
    index.md                 # /libraries landing intro
    submit.md                # Submission page
    entries/*.md             # 107 library profiles (entryType: library)
    categories/*.md          # 11 category intros
  compare/[pair].md          # Compare page template + paths generator
  public/llms.txt            # LLM discovery file
.preactpress/
  config.ts                  # Site config, rewrites, SEO hooks
  theme/                     # Layout, sections, library UI
src/lib/                     # Parser, categories, theme-data, health score
scripts/                     # Scaffolding, verify, site audit
tests/                       # Unit + content quality tests
docs/                        # Authoring and design docs
.github/workflows/ci.yml     # CI only (no deploy)
dist/                        # Static build output (gitignored pattern)
```

### Build & deployment process

- **Dev:** `preactpress dev` — Vite dev server with SSR middleware; rewrites applied in plugin scan.
- **Build:** `preactpress build` — Vite client (~397 KB main JS) + SSR prerender to `dist/`.
- **Preview:** `preactpress preview`
- **CI:** `.github/workflows/ci.yml` — typecheck, test, check, build, Kamod AI Audit on key pages.
- **Deploy:** **Not configured.** No GitHub Pages workflow, no `CNAME` for `preacthub.dev`, no `site.url` in config.
- **Search index:** `dist/preactpress-search.json` generated client-side search payload.

### Routing & content system

- Library entries live at content path `/libraries/entries/{slug}`.
- `getLibraryContentRewrites()` maps **118 aliases** to clean routes `/libraries/{slug}` and category routes `/libraries/{category}`.
- `transformPageData()` / `transformHead()` inject directory metadata and JSON-LD.
- Tag pages (`/tags/*`, ~127 routes) are auto-generated by PreactPress from frontmatter tags.
- Compare pages (`/compare/{a}-vs-{b}`, 32 routes) generated from `alternatives` frontmatter via `[pair].paths.ts`.

**Known PreactPress integration gap:** `npm run check` applies rewrites to the route set; `preactpress build` uses `listMarkdownRoutes()` which scans files only and **does not include rewrite aliases**. Result: clean URLs exist in dev/check but not in static output.

### Data model (compatibility & status)

Current schema (`src/lib/libraries.ts`):

**Compatibility:** `native` | `compat` | `partial` | `incompatible` | `unknown`  
**Status:** `recommended` | `stable` | `experimental` | `deprecated`  
**Quality badges:** `verified-for-preact`, `ssr-ready`, `signals-compatible`, `tree-shakeable`, `docs-complete`, `ai-ready` (requires audit score ≥ 80)

**Product brief mapping (gap):**

| Desired label | Current equivalent | Gap |
|---|---|---|
| Native Preact | `compatibility: native` | Aligned |
| preact/compat | `compatibility: compat` | Aligned |
| Community tested | No field | Missing; `lastVerified` + `testedWith` intended but empty |
| Experimental | `status: experimental` | Aligned |
| Unverified | `compatibility: unknown` | Partial; also need explicit “unverified” UX for entries without verification |
| Inactive | `status: deprecated` only | No maintenance/inactivity signal (last release, archive status) |

---

## Bereits fertige Funktionen

### Product surfaces

- [x] **Home page** — Hero (“Discover libraries that actually work with Preact”), stats, featured libraries, categories, embedded directory CTA, about copy.
- [x] **Library directory** (`/libraries`) — Search, category/compatibility/status filters, TypeScript/SSR/islands toggles, AI-ready filter, sort options, pagination (24/page), desktop table + mobile cards, active filter chips with URL state.
- [x] **Category pages** (`/libraries/{category}`) — 11 categories with filtered directory.
- [x] **Library detail pages** — Compatibility/status badges, health score, install snippet, compat alias block, markdown guide sections, sidebar metadata, tags, limitations, alternatives with compare links.
- [x] **Compare pages** (`/compare/*`) — Side-by-side cards with compatibility, runtime flags, health scores, limitations (implemented; docs partially stale).
- [x] **Submit flow** — `/libraries/submit` page, prefilled GitHub issue form, issue template.
- [x] **Tag index routes** — PreactPress-generated `/tags/{tag}` pages (127 tags).

### Content & validation

- [x] **107 library entries** across 11 categories with required markdown sections enforced by tests.
- [x] **Scaffolding scripts** — `new:library`, `new:category`, `verify:library`.
- [x] **Zod frontmatter validation** — Categories, slugs, ai-ready audit evidence.
- [x] **Content quality tests** — Required headings, islands notes, no scaffold placeholders, valid alternatives.
- [x] **Slug collision guards** — Library vs. category slug conflicts fail build/tests.

### Design & UX

- [x] **Figma-aligned visual system** — Documented in `docs/design-notes.md`, implemented with Kamod UI + `--ph-*` tokens.
- [x] **Light/dark theme** — Toggle with keyboard-accessible button, SSR-safe inline SVG approach.
- [x] **Responsive layout** — Mobile nav, stacked detail pages, card fallback for directory.
- [x] **Accessibility basics** — Skip link, aria labels on search/nav/toggles, breadcrumb navigation.

### Engineering

- [x] **CI pipeline** with Kamod AI Audit gate on home, libraries, detail, compare, submit.
- [x] **Structured data** — CollectionPage / SoftwareApplication JSON-LD via `structuredDataHead()`.
- [x] **Internal route dedup hints** — `noindex` + canonical for `/libraries/entries/*` and `/libraries/categories/*` (when clean route exists).

---

## Fehlende Funktionen

### P0 — Required for credible public 0.1

| ID | Item | Why P0 |
|---|---|---|
| P0-1 | **Fix static output for clean library/category URLs** | All internal links use `/libraries/{slug}`; static build only emits `/libraries/entries/{slug}`. Deployed site would 404 on every library link. |
| P0-2 | **Configure production site URL (`preacthub.dev`)** | Canonical, OG, Twitter, JSON-LD `url`, sitemap, and robots require absolute URLs. Currently relative (`href="/"`). |
| P0-3 | **Add deploy workflow + domain** | No GitHub Pages / CDN pipeline; `private: true` in package.json; no CNAME. |
| P0-4 | **Enable sitemap + robots.txt** | PreactPress generates these only when `site.url` is set. Neither exists today. |
| P0-5 | **Align public messaging with positioning** | Update site title/description, hero, README, and `llms.txt` to the 0.1 tagline; remove misleading “verified” stat or define honest baseline. |
| P0-6 | **Pre-release link smoke test on built `dist/`** | Automated check that every linked route in HTML exists as a file (rewrite-aware). |

### P1 — High value shortly after launch

| ID | Item |
|---|---|
| P1-1 | Populate `repository` and `documentation` for entries missing links (82/107 today). |
| P1-2 | Introduce a minimal **verification baseline** — even 10–15 flagship entries with `lastVerified` + `testedWith`. |
| P1-3 | Map product trust labels explicitly in UI (Community tested / Unverified / Inactive). |
| P1-4 | Deduplicate compare routes (both `a-vs-b` and `b-vs-a` are built — 32 pages, redundant SEO). |
| P1-5 | Wire tag links to `/tags/{tag}` instead of search query params for consistency. |
| P1-6 | Add `site.image` / default OG image for social previews. |
| P1-7 | Cache library directory during build (`plans/005`) — performance at 107+ entries. |
| P1-8 | Update stale docs (`docs/library-directory.md` still claims compare pages are future). |

### P2 — Post-0.1 enhancements

| ID | Item |
|---|---|
| P2-1 | Verification workflow CLI (`plans/009`) |
| P2-2 | Submission import helper (`plans/010`) |
| P2-3 | Visual regression tests vs. Figma reference |
| P2-4 | Self-host fonts (currently Google Fonts CDN in `theme.css`) |
| P2-5 | Remove unused deps (`@preact/signals`) or use them purposefully |
| P2-6 | Resolve transitive `js-yaml` advisory (`plans/007`) |
| P2-7 | Collections / curated lists beyond `featured` |
| P2-8 | RSS/Atom feed (PreactPress supports when `site.url` configured) |

**Explicitly out of scope for 0.1:** user accounts, comments, payments, AI chat, live npm/GitHub metrics, complex quality scoring dashboards.

---

## Technische Schulden

| Area | Issue | Severity |
|---|---|---|
| PreactPress rewrites | Check/build route set mismatch — rewrites validated but not prerendered | **Critical** |
| SEO head | Relative canonical/OG URLs without `site.url` | **High** |
| Duplicate routes | Internal content paths + alias paths in check (398 routes); stale empty dirs in `dist/libraries/` from old builds | Medium |
| Directory loading | `loadLibraryDirectory()` reads all markdown on every `transformPageData` call — O(n) per page at build | Medium |
| Documentation drift | `docs/library-directory.md`, `plans/README.md` stats outdated vs. reality | Low |
| Lint hygiene | Unused imports in `LibraryFilters.tsx` | Low |
| Dependencies | `@preact/signals` declared but unused | Low |
| Monorepo CI | Requires checkout of `kamod-ai-audit` sibling repo | Medium (ops) |
| Branch state | Local branch `advisor/004-add-content-quality-validation` with uncommitted theme changes | Process |

---

## Datenqualitätsprobleme

### Quantitative snapshot (107 library entries)

| Metric | Count | Notes |
|---|---:|---|
| `lastVerified` set | **0** | Stats UI still shows “Verified entries” |
| `testedWith` set | **0** | Compare/detail show “Not yet verified” / “Not documented” |
| `repository` missing | **82** | Sidebar and external links incomplete |
| `documentation` missing | **82** | Same |
| `compatibility: unknown` | **13** | chart-js, echarts, i18next, lingui, motion, etc. |
| `compatibility: partial` | **8** | Needs visible limitations (some have them) |
| `status: deprecated` | **3** | preact-cli, preact-redux, unistore |
| `status: experimental` | **3** | kamod-ai-audit, million, preacthub |
| Quality badges total | **5** across 2 entries | Very conservative (good) but sparse |
| Duplicate slugs | **0** | Validated |
| Duplicate names | **0** | Validated |
| Invalid alternatives | **0** | Content quality test passes |
| Scaffold placeholders | **0** | Content quality test passes |

### Qualitative issues

1. **Verification vacuum:** Compatibility and SSR/islands flags are editorial but not backed by recorded verification dates — undermines “actually work” positioning.
2. **Thin entries for Kamod ecosystem packages:** Several Kamod entries use generic scaffold-style body text rather than project-specific guidance.
3. **Compat libraries without consistent limitation notes:** React-ecosystem entries (Radix, React Aria, etc.) vary in depth of compat caveats.
4. **Health score on unverified data:** `computeHealthScore()` can yield high scores from boolean flags alone, which may overstate trust before verification workflow exists.
5. **Featured set (10)** is reasonable but not documented with selection criteria on-site.

---

## SEO- und Accessibility-Lücken

### SEO

| Item | Status | Gap |
|---|---|---|
| Page titles | Implemented per route via `attachLibraryPageMeta` | Good |
| Meta descriptions | Implemented | Good |
| Canonical URLs | Partial | Relative without `site.url`; clean URLs missing from build |
| Open Graph / Twitter | PreactPress defaults exist | `og:url` is `/`, not absolute; no default OG image configured |
| JSON-LD | Custom + PreactPress WebPage schema | `url` fields relative; SoftwareApplication `sameAs` may include undefined |
| `robots.txt` | **Missing** | Needs `site.url` + `build.robots` |
| `sitemap.xml` | **Missing** | Needs `site.url` + `build.sitemap` |
| `llms.txt` | Present | Good for AI discovery |
| Duplicate content | Risk | `/libraries/entries/*` built with `noindex` but canonical targets 404; compare pairs duplicated |
| Tag pages | Built | Not linked from UI; thin content |
| Performance (fonts) | Google Fonts remote import | Render-blocking external CSS |

### Accessibility

| Item | Status | Notes |
|---|---|---|
| Skip link | Present | Good |
| Keyboard nav / Escape closes mobile menu | Present | Good |
| Theme toggle | `aria-label`, `aria-pressed` | Good |
| Search | `aria-label` on hero input | Good |
| Color/contrast | Token-based light/dark | QA doc reports acceptable; no automated a11y CI except Kamod audit |
| Focus management | Mobile menu doesn't trap focus | Acceptable for 0.1 but improvable |
| Table responsiveness | Desktop table may be dense | Mobile card fallback exists |
| Badge/icon reliance | Glyphs marked `aria-hidden` with text | Good |

---

## Risiken für einen öffentlichen Release

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Library URLs 404 on static host | **Certain** if deployed today | **Critical** | P0-1 before any public traffic |
| SEO penalty from broken canonicals/noindex | High | High | Fix routing + set `site.url` |
| Trust backlash (“verified” claims without data) | Medium | High | P0-5, P1-2, honest copy |
| Stale/incorrect compat guidance | Medium | Medium | Verification workflow + conservative badges |
| Large client JS for a directory site (~397 KB) | Low | Medium | Accept for 0.1; monitor |
| CI fragility (sibling repo checkout) | Medium | Medium | Document fork CI or publish audit package |
| Domain misconfiguration | Medium | High | Test preacthub.dev end-to-end before announcement |

---

## Priorisierte Aufgaben (Impact × Aufwand)

### Wave 1 — Release blockers (P0)

1. **Fix rewrite prerendering** — Ensure `/libraries/{slug}` and `/libraries/{category}` HTML exists in `dist/`. Options: upstream PreactPress fix, post-build alias copy, or move entries to flat routes. **(S–M, highest impact)**
2. **Set `site.url: 'https://preacthub.dev'`** (+ `base` if needed) in `.preactpress/config.ts`. **(S)**
3. **Enable `build.sitemap` and `build.robots`** once URL is set. **(S)**
4. **Add GitHub Pages deploy workflow** — build, upload `dist`, CNAME to `preacthub.dev`. **(M)**
5. **Add dist link integrity test** — Fail CI if any `href="/libraries/..."` target lacks `index.html`. **(S)**
6. **Update positioning copy** — Config site description, hero, README, llms.txt; fix “Verified entries” stat honesty. **(S)**

### Wave 2 — Trust & polish (P1)

7. Backfill repository/documentation URLs for top 30 entries. **(M)**
8. Verify 10–15 flagship libraries with `lastVerified` + `testedWith`. **(M)**
9. Normalize compare routes to canonical pair ordering only. **(S)**
10. Add default OG image asset. **(S)**
11. Implement explicit trust tier labels in badges/filters. **(M)**
12. Refresh outdated docs and plans README. **(S)**

### Wave 3 — Post-release (P2)

13. Directory metadata caching at build time. **(M)**
14. Verification CLI + contributor docs. **(M)**
15. Self-host fonts; trim unused dependencies. **(S)**
16. Visual regression / screenshot tests. **(L)**

---

## Empfohlene Commit-Reihenfolge für Release 0.1

Each phase should be a separate commit (per project prompt package):

| Phase | Commit focus | Key files |
|---|---|---|
| **1** | `docs(release): add 0.1 audit and gap analysis` | `docs/release-audit.md` |
| **2** | `fix(build): emit static pages for library URL rewrites` | `.preactpress/config.ts`, possibly PreactPress upgrade or build script |
| **3** | `feat(seo): configure preacthub.dev site URL, sitemap, robots` | `.preactpress/config.ts`, `content/public/` |
| **4** | `ci(deploy): add GitHub Pages workflow and CNAME` | `.github/workflows/deploy.yml`, `content/public/CNAME` |
| **5** | `test(seo): assert dist link integrity for library routes` | `tests/` or CI step |
| **6** | `fix(content): honest stats and positioning copy` | theme sections, `config.ts`, `content/index.md`, `content/public/llms.txt` |
| **7** | `chore(content): backfill links and verify flagship entries` | `content/libraries/entries/*.md` |
| **8** | `docs: sync library-directory and plans with implemented features` | `docs/library-directory.md`, `plans/README.md` |

---

## Definition of Done — Release 0.1

A release candidate is **done** when all of the following are true:

### Functional

- [ ] Every linked library URL (`/libraries/{slug}`) returns 200 on the production static host.
- [ ] Category, compare, submit, home, and directory pages load correctly on `preacthub.dev`.
- [ ] Search and filters work client-side with URL state preserved.
- [ ] GitHub submission flow opens a correctly prefilled issue.

### SEO & discovery

- [ ] Absolute canonical URLs use `https://preacthub.dev`.
- [ ] `robots.txt` and `sitemap.xml` are published and list primary routes (excluding intentional `noindex` internals).
- [ ] OG/Twitter tags render with absolute URLs and a default share image.
- [ ] `llms.txt` reflects final positioning and key URLs.

### Trust & content

- [ ] No UI copy implies verification that is not backed by data.
- [ ] At least **10** flagship entries include `lastVerified`, `testedWith`, and working repository/documentation links.
- [ ] Compatibility tiers are visible and understandable without opening detail pages (filters/badges).
- [ ] No placeholder or scaffold text in production entries (test continues to pass).

### Quality gates

- [ ] `npm run typecheck`, `test`, `lint`, `check`, `build` pass in CI.
- [ ] `npm run audit:site` passes on built pages (or documented waiver with issue link).
- [ ] Manual smoke test on mobile and desktop (home → directory → detail → compare → submit).

### Operations

- [ ] Deploy workflow publishes to `preacthub.dev` on merge to `main`.
- [ ] README documents local dev, content contribution, and release process.
- [ ] `package.json` visibility/deployment settings reviewed (`private` flag intentional for npm, not for site).

---

## Aufgaben-Tabelle (kompakt)

| Aufgabe | Priorität | Abhängigkeiten | Aufwand | Akzeptanzkriterium |
|---|---|---|---|---|
| Static HTML für `/libraries/{slug}` Rewrites | P0 | — | M | `dist/libraries/{slug}/index.html` existiert für alle 107 Einträge; keine 404 auf internen Links |
| `site.url` + absolute canonical/OG | P0 | Domain DNS | S | View-source zeigt `https://preacthub.dev/...` in canonical und `og:url` |
| GitHub Pages Deploy + CNAME | P0 | site.url | M | Push auf `main` veröffentlicht nach preacthub.dev |
| robots.txt + sitemap.xml | P0 | site.url | S | Beide unter Production-Root erreichbar; sitemap listet Kernrouten |
| Positioning & ehrliche Stats | P0 | — | S | Tagline konsistent; “Verified” nicht irreführend bei 0 verifizierten Einträgen |
| Dist link integrity CI check | P0 | Rewrite fix | S | CI failt bei fehlenden Link-Zielen im Build |
| Repository/Docs Links backfill | P1 | — | M | ≥80% Einträge mit `repository` und `documentation` |
| Flagship verification (10–15) | P1 | — | M | Einträge mit `lastVerified` + `testedWith`; Compare/Detail zeigen Datum |
| Trust-Label Mapping in UI | P1 | — | M | Filter/Badges spiegeln Native/Compat/Community tested/Unverified/Inactive |
| Compare route deduplication | P1 | — | S | Nur eine URL pro Paar; keine doppelten indexierbaren Seiten |
| Tag page linking | P1 | — | S | Tag-Klicks führen zu `/tags/{tag}` |
| Default OG image | P1 | site.url | S | Social preview zeigt Branding-Bild |
| Directory build cache | P2 | Rewrite fix | M | Build-Zeit sinkt messbar; keine Metadata-Regression |
| Verification workflow CLI | P2 | Content QA | M | Dokumentierter Befehl setzt prüfbare Verification-Felder |
| Self-host fonts | P2 | — | S | Kein fonts.googleapis.com in Production-CSP |
| Docs sync (compare, plans) | P2 | — | S | Docs beschreiben implementierten Stand korrekt |

---

## Nächster sinnvoller Schritt

**Prompt 2 / Phase 2:** Fix the rewrite prerendering gap so static build output matches the routes already validated by `npm run check`. Until this is resolved, do not configure DNS or announce the site publicly.

After routing is fixed, configure `preacthub.dev`, add deploy + sitemap, then run a full production smoke test before content expansion.
