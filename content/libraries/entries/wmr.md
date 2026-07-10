---
entryType: library
name: 'WMR'
slug: wmr
description: 'Historical zero-config build tool created around Preact workflows.'
category: developer-tools
packageName: 'wmr'
compatibility: native
status: deprecated
typescript: true
ssr: true
islands: true
esm: true
tags:
  - build
  - tooling
  - legacy
---

## Introduction

WMR is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install wmr
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>WMR can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

WMR can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
