---
entryType: library
name: Superstruct
slug: superstruct
shortDescription: Composable validation library for JavaScript and TypeScript data.
category: forms
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - validation
  - schema
packageName: superstruct
npmUrl: 'https://www.npmjs.com/package/superstruct'
installCommand: npm install superstruct
islands: true
esm: true
---

## Introduction

Superstruct is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install superstruct
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Superstruct can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Superstruct can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
