---
entryType: library
name: ky
slug: ky
shortDescription: Small Fetch-based HTTP client for browser and server code.
category: data-fetching
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - http
  - fetch
packageName: ky
npmUrl: 'https://www.npmjs.com/package/ky'
installCommand: npm install ky
islands: true
esm: true
---

## Introduction

ky is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install ky
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>ky can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

ky can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
