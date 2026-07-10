---
entryType: library
name: 'Unistore'
slug: unistore
description: 'Tiny centralized store historically associated with Preact.'
category: state-management
packageName: 'unistore'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - store
  - state
---

## Introduction

Unistore is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install unistore
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Unistore can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Unistore can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
