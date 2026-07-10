---
entryType: library
name: 'vanilla-extract'
slug: vanilla-extract
description: 'Zero-runtime CSS-in-TypeScript solution independent of Preact.'
category: developer-tools
packageName: '@vanilla-extract/css'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - css
  - typescript
---

## Introduction

vanilla-extract is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @vanilla-extract/css
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>vanilla-extract can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

vanilla-extract can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
