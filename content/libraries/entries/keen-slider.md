---
entryType: library
name: 'keen-slider'
slug: keen-slider
description: 'Touch slider library with a framework-agnostic core.'
category: ui
packageName: 'keen-slider'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - slider
  - carousel
---

## Introduction

keen-slider is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install keen-slider
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>keen-slider can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

keen-slider can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
