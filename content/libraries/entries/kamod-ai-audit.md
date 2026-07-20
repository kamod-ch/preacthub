---
entryType: library
name: Kamod AI Audit
slug: kamod-ai-audit
shortDescription: >-
  Open-source audit engine for AI-agent readiness, semantic HTML, SEO,
  accessibility and structured data.
category: developer-tools
compatibilityStatus: experimental
typescriptSupport: native
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - audit
  - seo
  - accessibility
  - ai
  - cli
packageName: kamod-ai-audit
repositoryUrl: 'https://github.com/kamod-ch/kamod-ai-audit'
npmUrl: 'https://www.npmjs.com/package/kamod-ai-audit'
documentationUrl: 'https://github.com/kamod-ch/kamod-ai-audit#readme'
homepageUrl: 'https://github.com/kamod-ch/kamod-ai-audit'
license: MIT
installCommand: npm install kamod-ai-audit
alternatives:
  - preacthub
esm: true
qualityBadges:
  - docs-complete
---

## Introduction

Kamod AI Audit checks whether a website is ready for humans, search engines and AI agents. It complements Lighthouse and axe with practical checks for semantic HTML, unambiguous CTAs, form intent, JSON-LD structured data, llms.txt and MCP/API readiness hints.

PreactHub uses Kamod AI Audit in CI to guard the static site against regressions in agent readiness and accessibility.

## Installation

```bash
git clone https://github.com/kamod-ch/kamod-ai-audit.git
cd kamod-ai-audit
npm install
npm run build
```

When published:

```bash
npx kamod-ai-audit audit https://docs.example.org
```

## Preact configuration

Kamod AI Audit is a Node.js CLI and library — it does not require Preact or `preact/compat`. Use it from scripts, CI or a small admin dashboard.

## Example

```bash
# Audit a live URL
npm run audit -- https://docs.example.org --json

# Audit a built static HTML file
npm run audit -- ./dist/index.html --output ./reports/example
```

Programmatic usage:

```ts
import { audit } from "@kamod-ai-audit/core";

const report = await audit("https://docs.example.com");
console.log(report.overallScore, report.topFixes);
```

## SSR notes

Not applicable — Kamod AI Audit is a build-time or CLI tool, not a UI runtime dependency.

## Known limitations

The project is experimental (v0.1). URL audits work best with Playwright installed for rendered pages. Scoring heuristics may change between minor releases.

## Alternatives

PreactHub focuses on library discovery and compatibility; Kamod AI Audit focuses on website quality. Use both when evaluating whether a library's documentation site is trustworthy and agent-friendly.
