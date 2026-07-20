---
entryType: library
name: Headless UI
slug: headlessui
shortDescription: Headless accessible components to evaluate through compatibility.
category: ui
compatibilityStatus: experimental
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - ui
  - a11y
packageName: '@headlessui/react'
npmUrl: 'https://www.npmjs.com/package/%40headlessui%2Freact'
installCommand: npm install @headlessui/react
islands: true
esm: true
---

## Introduction

Headless UI is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @headlessui/react
```

## Preact configuration

Treat this as a compatibility candidate: start with `preact/compat`, then test interactions, SSR and bundle output.

## Example

```tsx
export function Example() {
  return <section>Headless UI can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Headless UI can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
