---
entryType: library
name: preact-portal
slug: preact-portal
shortDescription: 'Portal utility for modals, overlays and detached DOM rendering.'
category: ui
compatibilityStatus: native
typescriptSupport: none
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - portal
  - overlay
packageName: preact-portal
npmUrl: 'https://www.npmjs.com/package/preact-portal'
installCommand: npm install preact-portal
islands: true
esm: true
---

## Introduction

preact-portal is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-portal
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-portal can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

SSR support should be treated cautiously; load this library on the client when it depends on browser APIs.

## Islands notes

preact-portal can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
