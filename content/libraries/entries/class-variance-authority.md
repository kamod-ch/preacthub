---
entryType: library
name: class-variance-authority
slug: class-variance-authority
shortDescription: Framework-independent utility for variant-based class composition.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - classes
  - variants
packageName: class-variance-authority
npmUrl: 'https://www.npmjs.com/package/class-variance-authority'
installCommand: npm install class-variance-authority
islands: true
esm: true
---

## Introduction

class-variance-authority is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install class-variance-authority
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>class-variance-authority can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

class-variance-authority can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
