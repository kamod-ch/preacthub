---
entryType: library
name: TanStack Form
slug: tanstack-form
shortDescription: Modern headless form state tooling with framework-independent pieces.
category: forms
compatibilityStatus: experimental
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - forms
  - tanstack
packageName: '@tanstack/form-core'
npmUrl: 'https://www.npmjs.com/package/%40tanstack%2Fform-core'
installCommand: npm install @tanstack/form-core
islands: true
esm: true
---

## Introduction

TanStack Form is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install @tanstack/form-core
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>TanStack Form can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

TanStack Form can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
