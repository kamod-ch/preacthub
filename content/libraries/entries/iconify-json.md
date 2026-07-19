---
entryType: library
name: '@iconify-json/*'
slug: iconify-json
shortDescription: Framework-independent Iconify icon data packages.
category: ui
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - icons
  - data
packageName: '@iconify-json/mdi'
npmUrl: 'https://www.npmjs.com/package/%40iconify-json%2Fmdi'
installCommand: npm install @iconify-json/mdi
islands: true
esm: true
---

## Introduction

@iconify-json/* is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @iconify-json/mdi
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>@iconify-json/* can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

@iconify-json/* can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
