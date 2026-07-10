---
entryType: library
name: 'urql'
slug: urql
description: 'GraphQL client with React bindings that can be evaluated via compat.'
category: data-fetching
packageName: 'urql'
compatibility: compat
status: stable
typescript: true
ssr: true
islands: true
esm: true
tags:
  - graphql
  - client
---

## Introduction

urql is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install urql
```

## Preact configuration

Use the React-facing package with `preact/compat` aliases and verify hooks or context-heavy usage in your app.

## Example

```tsx
export function Example() {
  return <section>urql can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

urql can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
