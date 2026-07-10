---
entryType: library
name: 'Embla Carousel'
slug: embla-carousel
description: 'Carousel engine with framework-independent core APIs.'
category: ui
packageName: 'embla-carousel'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - carousel
  - slider
---

## Introduction

Embla Carousel is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install embla-carousel
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Embla Carousel can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Embla Carousel can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
