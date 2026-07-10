---
entryType: library
name: 'kamod-ui'
slug: kamod-ui
description: 'Preact UI component library from the Kamod ecosystem.'
category: ui
packageName: 'kamod-ui'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - ui
  - components
  - kamod
---

## Introduction

kamod-ui is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install kamod-ui
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>kamod-ui can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

kamod-ui can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
