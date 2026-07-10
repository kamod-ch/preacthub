---
entryType: library
name: 'preact-cli'
slug: preact-cli
description: 'Historical command-line tooling for Preact projects.'
category: developer-tools
packageName: 'preact-cli'
compatibility: native
status: deprecated
typescript: false
ssr: true
islands: false
esm: false
tags:
  - cli
  - tooling
  - legacy
---

## Introduction

preact-cli is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-cli
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-cli can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
