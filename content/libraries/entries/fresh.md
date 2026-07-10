---
entryType: library
name: 'Fresh'
slug: fresh
description: 'Deno web framework that uses Preact for interactive islands.'
category: ssr
packageName: 'fresh'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - framework
  - deno
  - islands
---

## Introduction

Fresh is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
Install this tool using the package manager documented by the project.
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Fresh can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Fresh can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
