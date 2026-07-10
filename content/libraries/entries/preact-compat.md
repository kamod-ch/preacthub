---
entryType: library
name: 'preact/compat'
slug: preact-compat
description: 'Compatibility layer that lets many React libraries run on Preact.'
category: developer-tools
packageName: 'preact'
compatibility: native
status: recommended
typescript: true
ssr: true
islands: true
esm: true
tags:
  - compat
  - react
---

## Introduction

preact/compat is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact/compat can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

preact/compat can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
