---
entryType: library
name: Preact Feather
slug: preact-feather
shortDescription: Feather icon set exposed as individually importable Preact SVG components with bundled TypeScript declarations.
category: ui
packageName: preact-feather
repositoryUrl: 'https://github.com/ForsakenHarmony/preact-feather'
npmUrl: 'https://www.npmjs.com/package/preact-feather'
documentationUrl: 'https://github.com/ForsakenHarmony/preact-feather#readme'
homepageUrl: 'https://github.com/ForsakenHarmony/preact-feather'
license: MIT
compatibilityStatus: native
typescriptSupport: bundled-types
ssrSupport: supported
maintenanceStatus: active
installCommand: npm install preact-feather
tags:
  - icons
  - svg
  - feather
  - components
limitations:
  - The package tracks the Feather icon set rather than newer community forks with additional icons.
  - The published peer dependency currently declares Preact 10 only; Preact 11 compatibility is not documented upstream.
  - Accessibility labels or aria-hidden behavior must be selected by the consuming application.
  - Import individual icons to avoid unnecessary bundle inclusion.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://github.com/ForsakenHarmony/preact-feather#readme'
lastReleaseAt: '2026-06-03'
lastCommitAt: '2026-06-03'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 4.3.0.'
  - >-
    The package documents direct Preact component imports and contains no browser-only runtime dependency for SVG
    rendering.
title: Preact Feather
description: Feather icon set exposed as individually importable Preact SVG components with bundled TypeScript declarations.
featured: false
islands: false
esm: true
qualityBadges: []
alternatives:
  - lucide-preact
  - heroicons
  - tabler-icons
---

## Introduction

`preact-feather` exposes the Feather icon set as Preact SVG components. Icons can be imported individually and accept standard SVG properties for size, color and accessibility attributes.

## Installation

```bash
npm install preact-feather
```

## Preact configuration

No compatibility aliases or providers are required. Import icons directly from the package or from individual compiled icon paths when strict import control is needed.

## Example

```tsx
import { Camera, GitHub } from 'preact-feather';

export function Actions() {
  return (
    <nav aria-label="Media actions">
      <button aria-label="Open camera"><Camera aria-hidden="true" /></button>
      <a href="https://github.com" aria-label="GitHub">
        <GitHub aria-hidden="true" />
      </a>
    </nav>
  );
}
```

## SSR notes

Icons render as ordinary SVG VNodes and are suitable for server rendering. Keep generated attributes deterministic between server and client.

## Known limitations

Feather contains a smaller icon set than some newer alternatives. The current package metadata declares Preact 10, so Preact 11 projects should run a smoke test before adoption. The consuming application must provide accessible labels for icon-only controls and choose whether decorative SVGs are hidden from assistive technology.

## Alternatives

Compare [Lucide Preact](/libraries/lucide-preact), [Heroicons](/libraries/heroicons) and [Tabler Icons](/libraries/tabler-icons).
