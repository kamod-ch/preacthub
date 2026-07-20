---
entryType: library
name: '@formisch/preact'
slug: formisch-preact
shortDescription: Type-safe form state library with a dedicated Preact package.
category: forms
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - forms
  - validation
packageName: '@formisch/preact'
npmUrl: 'https://www.npmjs.com/package/%40formisch%2Fpreact'
installCommand: npm install @formisch/preact
islands: true
esm: true
---

## Introduction

@formisch/preact is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @formisch/preact
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>@formisch/preact can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

@formisch/preact can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
