---
entryType: library
name: 'simplebar'
slug: simplebar
description: 'Framework-independent custom scrollbar utility.'
category: ui
packageName: 'simplebar'
compatibility: native
status: stable
typescript: true
ssr: false
islands: true
esm: true
tags:
  - scrollbars
  - ui
---

## Introduction

simplebar is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install simplebar
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>simplebar can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

SSR support should be treated cautiously; load this library on the client when it depends on browser APIs.

## Islands notes

simplebar can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
