---
entryType: library
name: 'graphql-request'
slug: graphql-request
description: 'Minimal framework-independent GraphQL request client.'
category: data-fetching
packageName: 'graphql-request'
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - graphql
  - http
---

## Introduction

graphql-request is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install graphql-request
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>graphql-request can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

graphql-request can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
