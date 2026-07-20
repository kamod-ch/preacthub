---
entryType: library
name: Million.js
slug: million
shortDescription: Performance-focused virtual DOM tooling relevant to Preact comparisons.
category: developer-tools
compatibilityStatus: experimental
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - performance
  - compiler
packageName: million
npmUrl: 'https://www.npmjs.com/package/million'
installCommand: npm install million
islands: true
esm: true
---

## Introduction

Million.js is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install million
```

## Preact configuration

Treat this as a compatibility candidate: start with `preact/compat`, then test interactions, SSR and bundle output.

## Example

```tsx
export function Example() {
  return <section>Million.js can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Million.js can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
