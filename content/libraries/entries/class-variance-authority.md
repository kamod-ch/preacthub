---
entryType: library
name: 'class-variance-authority'
slug: class-variance-authority
description: 'Framework-independent utility for variant-based class composition.'
category: ui
packageName: 'class-variance-authority'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - classes
  - variants
---

## Introduction

class-variance-authority is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install class-variance-authority
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>class-variance-authority can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

class-variance-authority can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
