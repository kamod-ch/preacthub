---
entryType: library
name: '@preact/preset-vite'
slug: preact-preset-vite
shortDescription: Official Vite preset for Preact projects.
category: developer-tools
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - vite
  - tooling
  - build
packageName: '@preact/preset-vite'
npmUrl: 'https://www.npmjs.com/package/%40preact%2Fpreset-vite'
installCommand: npm install @preact/preset-vite
islands: true
esm: true
---

## Introduction

@preact/preset-vite is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @preact/preset-vite
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>@preact/preset-vite can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

@preact/preset-vite can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
