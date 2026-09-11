---
entryType: library
name: 'TanStack Charts'
slug: 'tanstack-charts'
shortDescription: 'Headless chart definitions with an official Preact adapter export.'
category: 'charts'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@tanstack/charts'
repositoryUrl: 'https://github.com/TanStack/charts'
documentationUrl: 'https://tanstack.com/charts/latest/docs/framework/preact/adapter'
npmUrl: 'https://www.npmjs.com/package/@tanstack/charts'
license: 'MIT'
installCommand: 'npm install @tanstack/charts preact'
featured: false
islands: true
esm: true
tags:
  - charts
  - visualization
  - tanstack
limitations:
  - 'The Preact adapter is imported from the @tanstack/charts/preact subpath rather than a separate npm package.'
qualityBadges: []
alternatives:
  - chart-js
  - uplot
---

## Introduction

TanStack Charts separates chart definitions from rendering. The official Preact adapter exports a `Chart` component from `@tanstack/charts/preact` that hydrates SVG produced during SSR and delegates interaction to the shared chart runtime.

## Installation

```bash
npm install @tanstack/charts preact
```

## Preact configuration

Define charts with `defineChart` from `@tanstack/charts` and optional modules such as `@tanstack/charts/tooltip`. Render them through the Preact adapter import path `@tanstack/charts/preact`.

## Example

```tsx
import { useMemo } from "preact/hooks";
import { defineChart } from "@tanstack/charts";
import { tooltip } from "@tanstack/charts/tooltip";
import { Chart } from "@tanstack/charts/preact";

export function RevenueChart({ rows }: { rows: unknown[] }) {
  const definition = useMemo(
    () => defineChart(createRevenueChart(rows), { tooltip }),
    [rows],
  );

  return <Chart definition={definition} ariaLabel="Revenue by month" aspectRatio={16 / 9} />;
}
```

## SSR notes

The adapter emits the complete accessible SVG during Preact server rendering and adopts it after mount. Keep definitions, formatters and dimensions deterministic between server and client renders.

## Islands notes

Chart widgets are good island candidates because the adapter manages mount, resize and cleanup per host element.

## Known limitations

Use the documented subpath import `@tanstack/charts/preact`; there is no separate npm package name for the adapter.

## Alternatives

See [uPlot](/libraries/uplot) for a lighter canvas-oriented option or [Chart.js](/libraries/chart-js) for canvas charts via compatibility layers.

