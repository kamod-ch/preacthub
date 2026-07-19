---
entryType: library
name: preact-helmet
slug: preact-helmet
shortDescription: 'Head management for titles, meta tags and SEO in Preact.'
category: ssr
compatibilityStatus: native
typescriptSupport: none
ssrSupport: supported
maintenanceStatus: active
tags:
  - head
  - seo
packageName: preact-helmet
npmUrl: 'https://www.npmjs.com/package/preact-helmet'
installCommand: npm install preact-helmet
islands: true
esm: true
---

## Introduction

preact-helmet is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-helmet
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-helmet can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

preact-helmet can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
