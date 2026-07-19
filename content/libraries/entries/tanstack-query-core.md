---
entryType: library
name: '@tanstack/query-core'
slug: tanstack-query-core
shortDescription: Framework-agnostic async state and cache core from TanStack Query.
category: data-fetching
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - query
  - cache
  - core
packageName: '@tanstack/query-core'
npmUrl: 'https://www.npmjs.com/package/%40tanstack%2Fquery-core'
installCommand: npm install @tanstack/query-core
islands: true
esm: true
---

## Introduction

@tanstack/query-core is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @tanstack/query-core
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>@tanstack/query-core can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

@tanstack/query-core can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
