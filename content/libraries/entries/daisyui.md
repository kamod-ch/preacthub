---
entryType: library
name: DaisyUI
slug: daisyui
shortDescription: CSS-first component classes that work independently of frameworks.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - css
  - ui
  - tailwind
packageName: daisyui
npmUrl: 'https://www.npmjs.com/package/daisyui'
installCommand: npm install daisyui
islands: true
esm: true
---

## Introduction

DaisyUI is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install daisyui
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>DaisyUI can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

DaisyUI can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
