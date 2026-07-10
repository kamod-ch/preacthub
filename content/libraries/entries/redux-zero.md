---
entryType: library
name: 'redux-zero'
slug: redux-zero
description: 'Minimal Redux-like state container usable from Preact.'
category: state-management
packageName: 'redux-zero'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - redux
  - state
  - minimal
---

## Introduction

redux-zero is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install redux-zero
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>redux-zero can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

redux-zero can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
