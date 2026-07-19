---
entryType: library
name: Vite Preact Template
slug: vite-preact-template
shortDescription: Official Vite starter path for new Preact applications.
category: developer-tools
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - starter
  - vite
  - template
packageName: vite
npmUrl: 'https://www.npmjs.com/package/vite'
installCommand: npm install vite
islands: true
esm: true
---

## Introduction

Vite Preact Template is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install vite
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Vite Preact Template can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Vite Preact Template can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
