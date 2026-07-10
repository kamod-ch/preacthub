---
entryType: library
name: '@preact/preset-vite'
slug: preact-preset-vite
description: 'Official Vite preset for Preact projects.'
category: developer-tools
packageName: '@preact/preset-vite'
compatibility: native
status: recommended
typescript: true
ssr: true
islands: true
esm: true
tags:
  - vite
  - tooling
  - build
---

## Introduction

@preact/preset-vite is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @preact/preset-vite
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>@preact/preset-vite can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

@preact/preset-vite can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
