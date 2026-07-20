---
entryType: library
name: uPlot
slug: uplot
shortDescription: Very small and fast time-series charting library.
category: charts
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - charts
  - performance
packageName: uplot
npmUrl: 'https://www.npmjs.com/package/uplot'
installCommand: npm install uplot
islands: true
esm: true
---

## Introduction

uPlot is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install uplot
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>uPlot can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

uPlot can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
