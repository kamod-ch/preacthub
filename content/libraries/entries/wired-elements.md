---
entryType: library
name: wired-elements
slug: wired-elements
shortDescription: Sketch-style Web Components that can be used in Preact markup.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - web-components
  - ui
packageName: wired-elements
npmUrl: 'https://www.npmjs.com/package/wired-elements'
installCommand: npm install wired-elements
islands: true
esm: true
---

## Introduction

wired-elements is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install wired-elements
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>wired-elements can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

wired-elements can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
