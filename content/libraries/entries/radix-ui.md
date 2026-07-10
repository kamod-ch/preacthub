---
entryType: library
name: 'Radix UI'
slug: radix-ui
description: 'React-focused headless primitives important for compatibility benchmarking.'
category: ui
packageName: '@radix-ui/react-slot'
compatibility: partial
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - ui
  - primitives
  - a11y
---

## Introduction

Radix UI is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @radix-ui/react-slot
```

## Preact configuration

Treat this as a compatibility candidate: start with `preact/compat`, then test interactions, SSR and bundle output.

## Example

```tsx
export function Example() {
  return <section>Radix UI can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Radix UI can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
