---
entryType: library
name: Tabler Icons
slug: tabler-icons
shortDescription: Large SVG icon collection suitable for Preact UI.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - icons
  - svg
packageName: '@tabler/icons'
npmUrl: 'https://www.npmjs.com/package/%40tabler%2Ficons'
installCommand: npm install @tabler/icons
islands: true
esm: true
---

## Introduction

Tabler Icons is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @tabler/icons
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Tabler Icons can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Tabler Icons can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
