---
entryType: library
name: 'PreactPress'
slug: preactpress
description: 'Preact-based static site generator and documentation framework.'
category: ssr
packageName: '@kamod-ch/preactpress'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - ssg
  - docs
  - kamod
---

## Introduction

PreactPress is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @kamod-ch/preactpress
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>PreactPress can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

PreactPress can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
