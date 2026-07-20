---
entryType: library
name: preact-habitat
slug: preact-habitat
shortDescription: Mounts Preact widgets into existing server-rendered pages.
category: ui
compatibilityStatus: native
typescriptSupport: none
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - widgets
  - mounting
packageName: preact-habitat
npmUrl: 'https://www.npmjs.com/package/preact-habitat'
installCommand: npm install preact-habitat
islands: true
esm: true
---

## Introduction

preact-habitat is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-habitat
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-habitat can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

SSR support should be treated cautiously; load this library on the client when it depends on browser APIs.

## Islands notes

preact-habitat can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
