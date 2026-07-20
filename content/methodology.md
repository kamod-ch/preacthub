---
title: How PreactHub evaluates libraries
description: Transparent methodology for compatibility statuses, verification dates, maintenance signals and catalog corrections.
---

PreactHub is a curated directory, not an automated popularity ranking. This page explains how catalog entries are labeled, verified and updated.

## Compatibility statuses

Each library receives exactly one **compatibility status**. These labels describe Preact fit—not overall package quality.

| Status | Meaning |
| --- | --- |
| **Native Preact** | Built for Preact. Does not require a React compatibility layer. |
| **Works with preact/compat** | Works in Preact projects through `preact/compat` and the standard Vite alias setup. |
| **Community tested** | Compatibility notes come from community verification, maintainer reports or documented Preact examples—not necessarily from the core team. |
| **Experimental** | Early or partial compatibility. Useful to explore, but not yet treated as production-ready for Preact. |
| **Unverified** | Listed for discovery, but PreactHub has not confirmed compatibility yet. |
| **Inactive** | Not recommended for new Preact projects because maintenance, compatibility or upstream direction makes it a poor fit. |

Statuses are editorial judgments based on documentation, repository activity, issue history and reproducible checks—not on npm download counts alone.

## How Preact versions are recorded

Catalog entries store tested Preact versions in frontmatter as `testedPreactVersions` (or legacy `testedWith.preact`). Examples:

- `10.26.x`
- `10.24.0`

We prefer version ranges or exact versions that were actually exercised during verification. If no version has been tested yet, the detail page shows **Not documented**.

## What “Last verified” means

**Last verified** is the date a maintainer or PreactHub contributor last confirmed that the compatibility notes still match reality.

- It requires both `lastVerifiedAt` and `verificationSource` in the catalog entry.
- It is **not** the same as the latest npm publish date or the latest Git commit.
- If a library has not been explicitly verified, the UI shows **Not yet verified** instead of inventing a date.

Verification can come from manual testing, maintainer confirmation, CI reproduction or documented upstream guidance.

## How maintenance status is determined

Maintenance status reflects whether the upstream project appears suitable for new work:

| Status | Meaning |
| --- | --- |
| **Active** | Recent releases, responsive maintenance or clear ongoing development. |
| **Maintenance mode** | Accepts fixes but little active feature development. |
| **Inactive** | Little recent activity or uncertain long-term support. |
| **Archived** | Officially deprecated or archived upstream. |
| **Unknown** | Not enough public signals to judge confidently. |

We review repository activity, release cadence, issue response and official deprecation notices. GitHub stars alone are not a maintenance signal.

## External metrics and delayed data

PreactHub may reference npm, GitHub or audit tooling, but those metrics can be:

- **Delayed** — registry stats and CI audits reflect past snapshots, not live project health.
- **Incomplete** — downloads measure usage, not correctness with Preact.
- **Misleading in isolation** — a popular React-first package can still be a poor Preact choice.

Popularity is context, not a verdict.

## Reporting mistakes

Found outdated compatibility notes, a wrong category or a broken link?

1. Open the library detail page and choose **Report outdated info**, or
2. Use the [Correct library information](https://github.com/kamod-ch/preacthub/issues/new?template=library-correction.yml) issue template, or
3. Submit a general correction through [GitHub Issues](https://github.com/kamod-ch/preacthub/issues).

Include the library slug, what is wrong, what should change and any evidence (docs link, reproduction repo, maintainer statement).

## Why there is no opaque 0–100 quality score

PreactHub 0.1 deliberately avoids a single hidden “quality score” that ranks libraries on a 0–100 scale without context.

A composite number would imply precision we do not have, hide the underlying evidence and encourage gaming through stars or downloads. Instead, the catalog exposes structured facts—compatibility status, maintenance status, TypeScript support, SSR support, verification date and optional quality badges—so you can judge fit for your project.

Optional badges such as **Verified for Preact** or **SSR Ready** are awarded only when there is documented evidence. They are not inferred automatically from popularity metrics.

## Contributing to the catalog

- [Submit a library](/submit) through the structured form (no account required on PreactHub—GitHub handles the issue).
- Read [CONTRIBUTING.md](https://github.com/kamod-ch/preacthub/blob/main/CONTRIBUTING.md) for the maintainer review workflow.
