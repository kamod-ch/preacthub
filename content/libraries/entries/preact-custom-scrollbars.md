---
entryType: library
name: preact-custom-scrollbars
slug: preact-custom-scrollbars
shortDescription: Custom scrollbar components for Preact interfaces.
category: ui
compatibilityStatus: native
typescriptSupport: none
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - scrollbars
  - ui
packageName: preact-custom-scrollbars
npmUrl: 'https://www.npmjs.com/package/preact-custom-scrollbars'
installCommand: npm install preact-custom-scrollbars
islands: true
esm: true
---

## Introduction

preact-custom-scrollbars is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-custom-scrollbars
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-custom-scrollbars can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

SSR support should be treated cautiously; load this library on the client when it depends on browser APIs.

## Islands notes

preact-custom-scrollbars can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
