---
entryType: library
name: Panda CSS
slug: panda-css
shortDescription: Type-safe styling system that can generate framework-agnostic CSS.
category: developer-tools
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - css
  - styling
packageName: '@pandacss/dev'
npmUrl: 'https://www.npmjs.com/package/%40pandacss%2Fdev'
installCommand: npm install @pandacss/dev
islands: true
esm: true
---

## Introduction

Panda CSS is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @pandacss/dev
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>Panda CSS can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

Panda CSS can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
