---
entryType: library
name: Phosphor Icons
slug: phosphor-icons
shortDescription: Flexible icon family to evaluate via SVG or compatibility adapters.
category: ui
compatibilityStatus: experimental
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - icons
  - svg
packageName: phosphor-icons
npmUrl: 'https://www.npmjs.com/package/phosphor-icons'
installCommand: npm install phosphor-icons
islands: true
esm: true
---

## Introduction

Phosphor Icons is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install phosphor-icons
```

## Preact configuration

Treat this as a compatibility candidate: start with `preact/compat`, then test interactions, SSR and bundle output.

## Example

```tsx
export function Example() {
  return <section>Phosphor Icons can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Phosphor Icons can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
