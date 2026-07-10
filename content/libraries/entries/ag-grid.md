---
entryType: library
name: 'AG Grid'
slug: ag-grid
description: 'Enterprise-grade data grid relevant for comparison and compat testing.'
category: ui
packageName: 'ag-grid-community'
compatibility: compat
status: stable
typescript: true
ssr: false
islands: true
esm: true
tags:
  - grid
  - tables
---

## Introduction

AG Grid is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install ag-grid-community
```

## Preact configuration

Use the React-facing package with `preact/compat` aliases and verify hooks or context-heavy usage in your app.

## Example

```tsx
export function Example() {
  return <section>AG Grid can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

SSR support should be treated cautiously; load this library on the client when it depends on browser APIs.

## Islands notes

AG Grid can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
