---
entryType: library
name: kamod-icons
slug: kamod-icons
shortDescription: Preact-native icon package from the Kamod ecosystem.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - icons
  - kamod
packageName: kamod-icons
npmUrl: 'https://www.npmjs.com/package/kamod-icons'
installCommand: npm install kamod-icons
islands: true
esm: true
---

## Introduction

kamod-icons is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install kamod-icons
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>kamod-icons can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

kamod-icons can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
