---
entryType: library
name: Shoelace
slug: shoelace
shortDescription: Web Components UI library that works well with Preact.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - web-components
  - ui
packageName: '@shoelace-style/shoelace'
npmUrl: 'https://www.npmjs.com/package/%40shoelace-style%2Fshoelace'
installCommand: npm install @shoelace-style/shoelace
islands: true
esm: true
---

## Introduction

Shoelace is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @shoelace-style/shoelace
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Shoelace can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Shoelace can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
