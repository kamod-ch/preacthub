---
entryType: library
name: Valtio
slug: valtio
shortDescription: Proxy-based state library usable with compatibility considerations.
category: state-management
compatibilityStatus: compat
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - state
  - proxy
packageName: valtio
npmUrl: 'https://www.npmjs.com/package/valtio'
installCommand: npm install valtio
islands: true
esm: true
---

## Introduction

Valtio is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install valtio
```

## Preact configuration

Use the React-facing package with `preact/compat` aliases and verify hooks or context-heavy usage in your app.

## Example

```tsx
export function Example() {
  return <section>Valtio can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Valtio can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
