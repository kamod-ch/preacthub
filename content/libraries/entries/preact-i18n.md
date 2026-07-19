---
entryType: library
name: preact-i18n
slug: preact-i18n
shortDescription: Internationalization helpers built for Preact.
category: i18n
compatibilityStatus: native
typescriptSupport: none
ssrSupport: supported
maintenanceStatus: active
tags:
  - i18n
  - localization
packageName: preact-i18n
npmUrl: 'https://www.npmjs.com/package/preact-i18n'
installCommand: npm install preact-i18n
islands: true
esm: true
---

## Introduction

preact-i18n is tracked in PreactHub because it is relevant for Preact applications, migrations, ecosystem comparisons or adjacent tooling.

## Installation

```bash
npm install preact-i18n
```

## Preact configuration

No `preact/compat` alias is required for the primary API.

## Example

```tsx
export function Example() {
  return <section>preact-i18n can be evaluated inside a Preact component.</section>;
}
```

## SSR notes

The library can participate in SSR-oriented workflows when browser-only APIs are guarded.

## Islands notes

preact-i18n can be used from interactive islands as long as initialization is scoped to the island root and cleaned up when necessary.

## Known limitations

PreactHub still needs project-specific verification notes for versions, bundle impact and edge cases.
