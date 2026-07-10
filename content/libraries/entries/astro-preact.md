---
entryType: library
name: 'Astro Preact Integration'
slug: astro-preact
description: 'Astro integration for rendering Preact components and islands.'
category: ssr
packageName: '@astrojs/preact'
compatibility: native
status: recommended
typescript: true
ssr: true
islands: true
esm: true
tags:
  - astro
  - islands
  - integration
---

## Introduction

Astro Preact Integration is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @astrojs/preact
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Astro Preact Integration can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Astro Preact Integration can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
