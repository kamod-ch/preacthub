---
entryType: library
name: Heroicons
slug: heroicons
shortDescription: SVG-first icon set that can be embedded directly in Preact.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - icons
  - svg
packageName: heroicons
npmUrl: 'https://www.npmjs.com/package/heroicons'
installCommand: npm install heroicons
islands: true
esm: true
---

## Introduction

Heroicons is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install heroicons
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Heroicons can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Heroicons can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
