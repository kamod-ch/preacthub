---
entryType: library
name: Ariakit
slug: ariakit
shortDescription: Accessible React component toolkit relevant as a benchmark.
category: ui
compatibilityStatus: experimental
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - ui
  - a11y
packageName: ariakit
npmUrl: 'https://www.npmjs.com/package/ariakit'
installCommand: npm install ariakit
islands: true
esm: true
---

## Introduction

Ariakit is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install ariakit
```

## Preact configuration

Treat this as a compatibility candidate: start with `preact/compat`, then test interactions, SSR and bundle output.

## Example

```tsx
export function Example() {
  return <section>Ariakit can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Ariakit can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
