---
entryType: library
name: 'TanStack Table'
slug: tanstack-table
description: 'Headless table logic that can power custom Preact grids.'
category: ui
packageName: '@tanstack/table-core'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - tables
  - headless
---

## Introduction

TanStack Table is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @tanstack/table-core
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>TanStack Table can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

TanStack Table can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
