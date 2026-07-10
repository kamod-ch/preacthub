---
entryType: library
name: 'preact-layout'
slug: preact-layout
description: 'Small layout helper library from the Preact ecosystem.'
category: ui
packageName: 'preact-layout'
compatibility: native
status: stable
typescript: false
ssr: true
islands: true
esm: true
tags:
  - layout
  - ui
---

## Introduction

preact-layout is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-layout
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-layout can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

preact-layout can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
