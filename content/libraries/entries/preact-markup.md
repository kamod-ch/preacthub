---
entryType: library
name: preact-markup
slug: preact-markup
shortDescription: Utility for rendering markup in Preact-oriented workflows.
category: ssr
compatibilityStatus: native
typescriptSupport: none
ssrSupport: supported
maintenanceStatus: active
tags:
  - markup
  - rendering
packageName: preact-markup
npmUrl: 'https://www.npmjs.com/package/preact-markup'
installCommand: npm install preact-markup
esm: true
---

## Introduction

preact-markup is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-markup
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-markup can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
